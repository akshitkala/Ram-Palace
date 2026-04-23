"use client";

import Image from "next/image";

export default function GalleryHero({ heroRef }) {
  return (
    <section ref={heroRef} className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Cinematic Hero Background */}
      <Image 
        src="/images/hero/GHero.webp"
        alt="Basti Ram Palace Gallery"
        fill
        priority
        quality={95}
        sizes="(max-width: 768px) 150vw, 100vw"
        className="object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-black/50 z-[1]" />

      <div className="relative z-10 text-center text-white px-6">
        <h1 className="hero-text font-heading text-5xl md:text-7xl mb-4 tracking-wide drop-shadow-2xl">
          Gallery
        </h1>
        <p className="hero-text font-body text-xl md:text-2xl font-light tracking-widest uppercase opacity-95 drop-shadow-lg">
          Moments at Basti Ram Palace
        </p>
        <div className="hero-text w-24 h-[1px] bg-[#C9A84C] mx-auto mt-8"></div>
      </div>
    </section>
  );
}
