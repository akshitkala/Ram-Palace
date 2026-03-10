import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

const VALID_CATEGORIES = ['weddings', 'corporate', 'private-parties'];

const folderForCategory = (category) =>
  `ram-palace/events/${category}`;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  if (!category || !VALID_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: 'Invalid or missing category' },
      { status: 400 }
    );
  }

  try {
    const folder = folderForCategory(category);
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folder,
      max_results: 500,
    });

    const images = result.resources.map((img) => ({
      public_id: img.public_id,
      secure_url: img.secure_url,
      width: img.width,
      height: img.height,
      created_at: img.created_at,
      bytes: img.bytes,
    }));

    return NextResponse.json({ images, category });
  } catch (error) {
    console.error('Cloudinary events GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch event images' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') || formData.get('image');
    const category = formData.get('category');

    if (!file) {
      return NextResponse.json(
        { error: 'Missing file' },
        { status: 400 }
      );
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: 'Invalid or missing category' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = `data:${file.type};base64,${buffer.toString(
      'base64'
    )}`;

    const folder = folderForCategory(category);

    const result = await cloudinary.uploader.upload(base64String, {
      folder,
      use_filename: true,
      unique_filename: true,
      transformation: {
        quality: 'auto',
        fetch_format: 'auto',
      },
    });

    const image = {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      created_at: result.created_at,
      bytes: result.bytes,
      category,
    };

    return NextResponse.json(image, { status: 200 });
  } catch (error) {
    console.error('Cloudinary events POST error:', error);
    return NextResponse.json(
      { error: 'Failed to upload event image' },
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

    if (!public_id.startsWith('ram-palace/events/')) {
      return NextResponse.json(
        { error: 'Invalid public_id for events' },
        { status: 400 }
      );
    }

    await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Cloudinary events DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete event image' },
      { status: 500 }
    );
  }
}
