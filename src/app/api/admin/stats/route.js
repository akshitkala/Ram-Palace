import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    const [
      gallery,
      carousel,
      weddings,
      corporate,
      parties,
    ] = await Promise.all([
      cloudinary.api.resources({
        prefix: 'ram-palace/gallery',
        max_results: 500,
      }),
      cloudinary.api.resources({
        prefix: 'ram-palace/carousel',
        max_results: 10,
      }),
      cloudinary.api.resources({
        prefix: 'ram-palace/events/weddings',
        max_results: 500,
      }),
      cloudinary.api.resources({
        prefix: 'ram-palace/events/corporate',
        max_results: 500,
      }),
      cloudinary.api.resources({
        prefix: 'ram-palace/events/private-parties',
        max_results: 500,
      }),
    ]);

    const galleryCount = gallery.resources.length;
    const carouselCount = carousel.resources.length;
    const weddingsCount = weddings.resources.length;
    const corporateCount = corporate.resources.length;
    const partiesCount = parties.resources.length;

    const galleryBytes = gallery.resources.reduce(
      (sum, r) => sum + (r.bytes || 0),
      0
    );
    const carouselBytes = carousel.resources.reduce(
      (sum, r) => sum + (r.bytes || 0),
      0
    );
    const weddingsBytes = weddings.resources.reduce(
      (sum, r) => sum + (r.bytes || 0),
      0
    );
    const corporateBytes = corporate.resources.reduce(
      (sum, r) => sum + (r.bytes || 0),
      0
    );
    const partiesBytes = parties.resources.reduce(
      (sum, r) => sum + (r.bytes || 0),
      0
    );

    const eventsTotal =
      weddingsCount + corporateCount + partiesCount;
    const totalImages =
      galleryCount + carouselCount + eventsTotal;
    const totalBytes =
      galleryBytes +
      carouselBytes +
      weddingsBytes +
      corporateBytes +
      partiesBytes;

    return NextResponse.json({
      gallery: {
        count: galleryCount,
        bytes: galleryBytes,
      },
      carousel: {
        count: carouselCount,
        max: 8,
      },
      events: {
        weddings: { count: weddingsCount },
        corporate: { count: corporateCount },
        privateParties: { count: partiesCount },
        total: eventsTotal,
      },
      totalImages,
      totalBytes,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Failed to load Cloudinary stats' },
      { status: 500 }
    );
  }
}

