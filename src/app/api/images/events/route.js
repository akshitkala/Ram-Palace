import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

const checkAuth = (request) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || authHeader !== process.env.ADMIN_PASSWORD) {
    return false;
  }
  return true;
};

export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'ram-palace/events',
      max_results: 500,
    });

    const images = result.resources.map(img => ({
      public_id: img.public_id,
      secure_url: img.secure_url,
      width: img.width,
      height: img.height,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Cloudinary GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('image');
    const category = formData.get('category');

    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    if (!['weddings', 'corporate', 'private-parties'].includes(category)) {
      return NextResponse.json({ error: 'Invalid or missing category' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Create base64 string
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'ram-palace/events',
      tags: [category],
      use_filename: true,
      unique_filename: true,
    });

    return NextResponse.json({ 
      success: true, 
      image: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        width: result.width,
        height: result.height
      }
    });

  } catch (error) {
    console.error('Cloudinary POST error:', error);
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { public_id } = body;

    if (!public_id) {
      return NextResponse.json({ error: 'Missing public_id' }, { status: 400 });
    }

    await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Cloudinary DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
  }
}
