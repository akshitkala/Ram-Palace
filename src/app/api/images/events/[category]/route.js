import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

const VALID_CATEGORIES = ['weddings', 'corporate', 'private-parties'];

const folderForCategory = (category) =>
  `ram-palace/events/${category}`;

export async function GET(_request, { params }) {
  const { category } = params;

  if (!VALID_CATEGORIES.includes(category)) {
    return NextResponse.json(
      { error: 'Invalid category' },
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

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Cloudinary GET events by category error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}
