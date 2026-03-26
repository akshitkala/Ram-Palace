"use client";

import Image from "next/image";

export default function GalleryGrid({ 
  images, 
  loading, 
  error, 
  hasMore, 
  loadingMore, 
  sentinelRef, 
  fetchImages, 
  setSelectedImage 
}) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      
      {/* Initial load skeleton */}
      {loading && images.length === 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-[#E8E0D0] animate-pulse"
              style={{ animationDelay: `${i * 0.03}s` }}
            />
          ))}
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="text-center py-20">
          <p className="text-[#A99686] text-sm font-body">Unable to load gallery.</p>
          <button
            onClick={() => fetchImages()}
            className="mt-4 text-xs text-[#C9A84C] underline font-body"
          >
            Try again
          </button>
        </div>
      )}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <div
              key={img.public_id}
              className="relative aspect-square bg-[#F2EDE4] overflow-hidden group cursor-pointer rounded-sm"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img.secure_url}
                alt={`Gallery ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && images.length === 0 && !error && (
        <div className="text-center py-20">
          <p className="text-[#A99686] text-sm font-body tracking-widest uppercase">
            Gallery coming soon
          </p>
        </div>
      )}

      {/* ── SENTINEL ── */}
      <div ref={sentinelRef} className="w-full h-1" aria-hidden="true" />

      {/* Load more spinner */}
      {loadingMore && (
        <div className="flex justify-center items-center py-12 gap-3">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      )}

      {/* End of gallery message */}
      {!hasMore && images.length > 0 && !loadingMore && (
        <div className="flex flex-col items-center py-12 gap-3">
          <div className="w-8 h-px bg-[#C9A84C]/30" />
          <p className="text-[#A99686] text-[10px] tracking-[4px] uppercase font-body">
            All photos loaded
          </p>
          <div className="w-8 h-px bg-[#C9A84C]/30" />
        </div>
      )}
    </div>
  );
}
