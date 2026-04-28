import { NextResponse } from "next/server"
import { unstable_cache, revalidateTag } from "next/cache"
import cloudinary from "@/lib/cloudinary-server"
import { verifySession } from "@/lib/auth/verifySession"

const SECTIONS = {
  "carousel":        "ram-palace/carousel",
  "gallery":         "ram-palace/gallery",
  "catering":        "ram-palace/catering",
  "weddings":        "ram-palace/events/weddings",
  "corporate":       "ram-palace/events/corporate",
  "private-parties": "ram-palace/events/private-parties",
}

function folder(section) {
  return SECTIONS[section] ?? null
}

const getCachedImages = unstable_cache(
  async (dir, section) => {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: dir,
      max_results: 500,
      resource_type: "image",
    })

    const images = result.resources.map(r => ({
      public_id:  r.public_id,
      url:        r.secure_url,
      secure_url: r.secure_url,
      width:      r.width,
      height:     r.height,
      created_at: r.created_at,
    }))

    if (section === "carousel") {
      images.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    } else {
      images.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }

    return images
  },
  ["cloudinary-images"],
  { tags: ["images"], revalidate: 3600 }
)

// GET /api/images?section=gallery
export async function GET(req) {
  const section = req.nextUrl.searchParams.get("section")
  const dir = folder(section)
  if (!dir) return NextResponse.json(
    { error: "Invalid section. Valid: " + Object.keys(SECTIONS).join(", ") },
    { status: 400 }
  )

  try {
    const images = await getCachedImages(dir, section)
    return NextResponse.json({ images }, {
      headers: { "Cache-Control": "public, max-age=0, must-revalidate" }
    })
  } catch (error) {
    console.error("Cloudinary fetch error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch images" }, { status: 500 })
  }
}

// POST /api/images — upload
// FormData: file (File), section (string)
export async function POST(req) {
  const auth = await verifySession(req)
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const form    = await req.formData()
  const file    = form.get("file")
  const section = form.get("section")
  const dir     = folder(section)

  if (!file)   return NextResponse.json({ error: "No file provided" }, { status: 400 })
  if (!dir)    return NextResponse.json({ error: "Invalid section" },  { status: 400 })

  // Carousel hard limit: 8 slides max
  if (section === "carousel") {
    const existing = await cloudinary.api.resources({
      type: "upload", prefix: dir, max_results: 10,
    })
    if (existing.resources.length >= 8) {
      return NextResponse.json(
        { error: "Carousel is full (8/8). Delete a slide first." },
        { status: 400 }
      )
    }
  }

  const bytes  = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const upload = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: dir,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (err, result) => err ? reject(err) : resolve(result)
    )
    stream.end(buffer)
  })

  revalidateTag("images")

  return NextResponse.json({
    public_id:  upload.public_id,
    url:        upload.secure_url,
    secure_url: upload.secure_url, // Add for compatibility
    width:      upload.width,
    height:     upload.height,
    created_at: upload.created_at,
  })
}

// DELETE /api/images
// JSON body: { public_id, section }
export async function DELETE(req) {
  const auth = await verifySession(req)
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { public_id, section } = await req.json()
  const dir = folder(section)

  if (!public_id) return NextResponse.json({ error: "Missing public_id" }, { status: 400 })
  if (!dir)       return NextResponse.json({ error: "Invalid section" },   { status: 400 })

  // Safety: only allow deletion from the correct folder
  if (!public_id.startsWith(dir)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  await cloudinary.uploader.destroy(public_id)
  revalidateTag("images")
  
  return NextResponse.json({ success: true })
}
