import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

const FOLDER = 'ram-palace/gallery';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor") || null;
    const limit  = 24; // Increased to 24 for better initial load as per PART B checklist

    const options = {
      type:        "upload",
      prefix:      FOLDER,
      max_results: limit,
    };

    if (cursor) {
      options.next_cursor = cursor;
    }

    const result = await cloudinary.api.resources(options);

    const images = result.resources.map((img) => ({
      public_id: img.public_id,
      secure_url: img.secure_url,
      width: img.width,
      height: img.height,
      bytes: img.bytes,
    }));

    return NextResponse.json(
      { 
        images,
        nextCursor: result.next_cursor || null,
        hasMore: !!result.next_cursor,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error('Cloudinary GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') || formData.get('image');

    if (!file) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = `data:${file.type};base64,${buffer.toString(
      'base64'
    )}`;

    const result = await cloudinary.uploader.upload(base64String, {
      folder: FOLDER,
      transformation: [
        {
          width: 2000,
          crop: "limit",
          quality: "auto:good",
        }
      ],
      use_filename: true,
      unique_filename: true,
    });

    const image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      created_at: result.created_at,
      bytes: result.bytes,
    };

    return NextResponse.json(image, { status: 200 });
  } catch (error) {
    console.error('Cloudinary POST error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { public_id } = body;

    if (!public_id) {
      return NextResponse.json(
        { error: 'Missing public_id' },
        { status: 400 }
      );
    }

    if (!public_id.startsWith(FOLDER)) {
      return NextResponse.json(
        { error: 'Invalid public_id for gallery' },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Cloudinary DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
