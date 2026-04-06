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
      
      {/* Initial load skeleton (Masonry style) */}
      {loading && images.length === 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {[48, 64, 56, 72, 40, 60, 52, 68].map((h, i) => (
            <div
              key={i}
              className="w-full bg-[#E8E0D0] animate-pulse rounded-lg break-inside-avoid"
              style={{ 
                height: `${h * 4}px`,
                animationDelay: `${i * 0.05}s` 
              }}
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

      {/* Image grid (Masonry style) */}
      {images.length > 0 && (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {images.map((img, i) => (
            <div
              key={img.public_id}
              className="relative break-inside-avoid rounded-lg overflow-hidden group cursor-pointer bg-[#F2EDE4] shadow-sm hover:shadow-xl transition-all duration-500 border border-black/5"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img.secure_url}
                alt={`Gallery ${i + 1}`}
                width={img.width}
                height={img.height}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                 <span className="text-white text-xs font-body tracking-[4px] uppercase border border-white/40 px-4 py-2 bg-black/20 backdrop-blur-sm scale-90 group-hover:scale-100 transition-transform duration-500">
                   View
                 </span>
              </div>
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
