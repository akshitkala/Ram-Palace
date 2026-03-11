import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    const [galleryResult, carouselResult, eventsResult] = await Promise.all([
      cloudinary.api.resources({
        type: "upload",
        prefix: "ram-palace/gallery",
        max_results: 1,
      }),
      cloudinary.api.resources({
        type: "upload",
        prefix: "ram-palace/carousel",
        max_results: 10,
      }),
      cloudinary.api.resources({
        type: "upload",
        prefix: "ram-palace/events",
        max_results: 500,
      }),
    ]);

    const galleryCount = galleryResult.total_count || 0;
    const carouselImages = carouselResult.resources || [];
    const eventImages = eventsResult.resources || [];

    const weddingCount = eventImages.filter(r => r.public_id.includes("/weddings/")).length;
    const corporateCount = eventImages.filter(r => r.public_id.includes("/corporate/")).length;
    const partiesCount = eventImages.filter(r => r.public_id.includes("/private-parties/")).length;

    const totalBytes = [...carouselImages, ...eventImages].reduce((sum, r) => sum + (r.bytes || 0), 0);

    return NextResponse.json(
      {
        gallery: {
          count: galleryCount,
          bytes: 0, // skip for speed as per FIX 10 notes
        },
        carousel: {
          count: carouselImages.length,
          max: 8,
        },
        events: {
          weddings: weddingCount,
          corporate: corporateCount,
          "private-parties": partiesCount,
          total: weddingCount + corporateCount + partiesCount,
        },
        totalImages: galleryCount + carouselImages.length + weddingCount + corporateCount + partiesCount,
        totalBytes,
      },
      {
        headers: {
          "Cache-Control": "private, s-maxage=30, stale-while-revalidate=60",
        },
      }
    );
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

