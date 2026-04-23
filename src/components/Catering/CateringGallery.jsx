"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ShimmerLine } from "@/components/Ornaments";

export default function CateringGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCatering() {
      try {
        const res = await fetch("/api/images?section=catering");
        const data = await res.json();
        if (data.images) {
          setImages(data.images);
        }
      } catch (error) {
        console.error("Failed to fetch catering images:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCatering();
  }, []);

  return (
    <section className="py-24 md:py-36 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 reveal">
          <span className="block font-body text-[#C9A84C] text-xs font-semibold tracking-[0.35em] uppercase mb-5">
            Visual Experience
          </span>
          <h2 className="font-heading text-4xl md:text-6xl text-[#2A1F15] mb-6">
            Crafted to Impress
          </h2>
          <ShimmerLine className="w-16 mx-auto mb-6" />
          <p className="font-body text-[#666] text-base max-w-xl mx-auto">
            A glimpse into our buffet setups, live stations, outdoor catering layouts,
            and refined service presentation.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="columns-2 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {images.map((img) => (
              <div
                key={img.public_id}
                className="gallery-item break-inside-avoid relative group
                           rounded-xl overflow-hidden shadow-sm cursor-pointer"
              >
                <Image
                  src={img.url}
                  alt="Basti Ram Palace — Premium Luxury Catering & Service Presentation"
                  width={img.width || 800}
                  height={img.height || 600}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100
                               transition-opacity duration-300 flex items-end justify-start p-5"
                >
                  <span
                    className="font-body text-white text-xs uppercase tracking-widest
                                 border border-white/30 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
                  >
                    Basti Ram Palace
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
