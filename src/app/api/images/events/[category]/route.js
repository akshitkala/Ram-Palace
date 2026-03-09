import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

const checkAuth = (request) => {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || authHeader !== process.env.ADMIN_PASSWORD) {
    return false;
  }
  return true;
};

export async function GET(request, { params }) {

  const { category } = await params;

  try {
    const result = await cloudinary.api.resources_by_tag(category, {
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
    console.error('Cloudinary GET by tag error:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
