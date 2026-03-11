"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const STATIC_FALLBACKS = [
  "/images/carousel/carousel1.webp",
  "/images/carousel/carousel2.webp",
  "/images/carousel/carousel3.webp",
  "/images/carousel/carousel4.webp",
];

const Carousel = () => {
  const [images, setImages] = useState(STATIC_FALLBACKS);
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const touchStartX = useRef(0);
  const touchEndX   = useRef(0);

  // Fetch images from backend
  useEffect(() => {
    async function fetchCarousel() {
      try {
        const res = await fetch("/api/images/carousel");
        const data = await res.json();
        if (data.images && data.images.length > 0) {
          // Use secure_url from Cloudinary
          setImages(data.images.map(img => img.secure_url));
        }
      } catch (error) {
        console.error("Failed to fetch carousel images:", error);
        // Fallback already set in state
      }
    }
    fetchCarousel();
  }, []);

  // Auto-slide — pauses on hover
  useEffect(() => {
    if (paused || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [paused, images.length]);

  const prev = () => setCurrent((p) => (p === 0 ? images.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p + 1) % images.length);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove  = (e) => { touchEndX.current   = e.touches[0].clientX; };
  const handleTouchEnd   = () => {
    const d = touchStartX.current - touchEndX.current;
    if (d > 50) next();
    else if (d < -50) prev();
  };

  return (
    <section
      className="relative w-full h-[55vh] md:h-[72vh] overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── IMAGES — all mounted, fade via opacity only ──
          Keeps previous slide visible during transition.
          Prevents flash-to-black bug on last→first loop.  */}
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={`Basti Ram Palace — slide ${index + 1}`}
          fill
          priority={index === 0}
          quality={85}
          sizes="100vw"
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-1000
            ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
        />
      ))}

      {/* ── BOTTOM GRADIENT — legibility only, top stays bright ── */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            rgba(0,0,0,0.65) 0%,
            rgba(0,0,0,0.20) 30%,
            transparent      55%
          )`,
        }}
      />

      {/* ── BRAND LABEL — bottom left ── */}
      <div className="absolute bottom-10 left-6 md:bottom-12 md:left-12 z-30">
        <p className="text-[9px] md:text-[10px] tracking-[4px] uppercase text-[#C9A84C] mb-1.5 font-body">
          Basti Ram Palace
        </p>
        <p className="text-white/70 text-[11px] md:text-sm font-light tracking-wide font-body">
          Every detail, crafted for your celebration
        </p>
      </div>

      {/* ── ARROW NAVIGATION — desktop only ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="
          hidden md:flex
          absolute left-5 top-1/2 -translate-y-1/2 z-30
          w-10 h-10 items-center justify-center
          border border-white/30 text-white/60
          hover:border-white/80 hover:text-white hover:bg-white/10
          transition-all duration-300
        "
      >
        ←
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="
          hidden md:flex
          absolute right-5 top-1/2 -translate-y-1/2 z-30
          w-10 h-10 items-center justify-center
          border border-white/30 text-white/60
          hover:border-white/80 hover:text-white hover:bg-white/10
          transition-all duration-300
        "
      >
        →
      </button>

      {/* ── DOTS + COUNTER — bottom right ── */}
      <div className="absolute bottom-10 right-6 md:bottom-12 md:right-12 z-30 flex items-center gap-4">

        {/* Slide counter */}
        <span className="text-[10px] tracking-[2px] text-white/40 tabular-nums hidden md:block font-body">
          {String(current + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>

        {/* Pill dots — active becomes a gold bar */}
        <div className="flex items-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`
                transition-all duration-300
                ${index === current
                  ? "w-5 h-1.5 bg-[#C9A84C]"
                  : "w-1.5 h-1.5 rounded-full bg-white/35 hover:bg-white/65"}
              `}
            />
          ))}
        </div>
      </div>

      {/* ── PROGRESS BAR — resets on slide change ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10 z-30">
        <div
          key={current}
          className="h-full bg-[#C9A84C]"
          style={{ animation: paused ? "none" : "carousel-progress 5s linear forwards" }}
        />
      </div>

      <style>{`
        @keyframes carousel-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default Carousel;