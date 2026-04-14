"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { useImageCache } from "@/hooks/useImageCache";

const MiniGallery = () => {
  const [row1Images, setRow1Images] = useState([]);
  const [row2Images, setRow2Images] = useState([]);
  const track1Ref = useRef(null);
  const track2Ref = useRef(null);
  const containerRef = useRef(null);

  const { fetchWithCache } = useImageCache();

  useEffect(() => {
    async function getGallery() {
      const images = await fetchWithCache("gallery");
      if (!images || images.length === 0) {
        setRow1Images([]);
        setRow2Images([]);
        return;
      }

      const formatted = images
        .filter(img => img.url || img.secure_url)
        .map(img => ({
          id: img.public_id,
          image: img.url || img.secure_url,
          alt: "Basti Ram Palace — Grand Venue Highlight and Celebration Moment"
        }));

      const midPoint = Math.ceil(formatted.length / 2);
      const r1 = formatted.slice(0, midPoint);
      const r2 = formatted.slice(midPoint);

      // BRP-FIX: Ensure rows are wide enough to prevent whitespace on large screens
      const fillToMinimum = (arr, min = 12) => {
        if (arr.length === 0) return [];
        let result = [...arr];
        while (result.length < min) {
          result = [...result, ...arr];
        }
        return result;
      };

      const r1Base = fillToMinimum(r1);
      const r2Base = fillToMinimum(r2);

      setRow1Images([...r1Base, ...r1Base]);
      setRow2Images([...r2Base, ...r2Base]);
    }
    getGallery();
  }, [fetchWithCache]);

  useLayoutEffect(() => {
    if (row1Images.length === 0 || row2Images.length === 0) return;

    let ctx = gsap.context(() => {
      // Row 1 moves Left
      gsap.to(track1Ref.current, {
        xPercent: -50,
        ease: "none",
        duration: window.innerWidth <= 768 ? 30 : 40,
        repeat: -1,
      });

      // Row 2 moves Right
      gsap.fromTo(track2Ref.current, 
        { xPercent: -50 },
        {
          xPercent: 0,
          ease: "none",
          duration: window.innerWidth <= 768 ? 30 : 40,
          repeat: -1,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [row1Images, row2Images]);

  if (row1Images.length === 0) return null;

  const GalleryRow = ({ images, trackRef, reverse = false }) => (
    <div className="w-full overflow-hidden flex mb-8 md:mb-12">
      <div 
        ref={trackRef}
        className="flex gap-8 md:gap-16 px-4 md:px-0 w-max will-change-transform"
      >
        {images.map((img, index) => (
          <div 
            key={`${img.id}-${index}`}
            className={`
              relative group flex-shrink-0 w-[25vh] md:w-[35vh]
              ${index % 2 === 0 ? "md:mt-[5vh]" : ""}
              transition-all duration-500
            `}
          >
            <div className="relative overflow-hidden rounded-xl shadow-lg lg:h-[40vh] h-[25vh] gallery-item">
              <Image 
                src={img.image} 
                alt={img.alt || "Glimpse of Basti Ram Palace"}
                fill
                quality={70}
                sizes="(max-width: 768px) 100vw, 25vw"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#fdfbf7] py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-16 px-6 text-center">
        <h2 className="font-heading text-4xl md:text-5xl text-[#2a2015] mb-4">
          Moments at Basti Ram Palace
        </h2>
        <p className="font-body text-[#8c7b6c] text-lg tracking-wide">
          A glimpse into the elegance and grandeur
        </p>
      </div>

      <div className="space-y-4 md:space-y-8">
        <GalleryRow images={row1Images} trackRef={track1Ref} />
        <GalleryRow images={row2Images} trackRef={track2Ref} reverse />
      </div>

      <div className="flex justify-center mt-12 md:mt-20">
        <Link 
          href="/gallery"
          className="group relative inline-flex items-center gap-3 bg-[#2a2015] text-[#fdfbf7] px-8 py-4 rounded-full font-body tracking-widest uppercase text-sm hover:bg-[#3d2f21] transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 overflow-hidden"
        >
          <span className="relative z-10">View Full Gallery</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </Link>
      </div>
      
    </section>
  );
};

export default MiniGallery;
