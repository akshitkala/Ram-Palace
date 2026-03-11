import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

const FOLDER = 'ram-palace/carousel';
const MAX_SLIDES = 8;

export async function GET() {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: FOLDER,
      max_results: 10,
    });

    const images = result.resources
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      .map((img) => ({
        public_id: img.public_id,
        secure_url: img.secure_url,
        width: img.width,
        height: img.height,
        bytes: img.bytes,
      }));

    return NextResponse.json(
      { images },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error('Carousel GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch carousel images' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const existing = await cloudinary.api.resources({
      type: 'upload',
      prefix: FOLDER,
      max_results: 10,
    });

    if (existing.resources.length >= MAX_SLIDES) {
      return NextResponse.json(
        {
          error:
            'Carousel is full (8/8). Delete a slide to add a new one.',
        },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') || formData.get('image');

    if (!file) {
      return NextResponse.json(
        { error: 'Missing file' },
        { status: 400 }
      );
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
          width: 1920,
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
    console.error('Carousel POST error:', error);
    return NextResponse.json(
      { error: 'Failed to upload carousel image' },
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
        { error: 'Invalid public_id for carousel' },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Carousel DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete carousel image' },
      { status: 500 }
    );
  }
}

