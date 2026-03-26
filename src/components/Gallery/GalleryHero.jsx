"use client";

import Image from "next/image";

export default function GalleryHero({ heroRef }) {
  return (
    <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Cinematic Hero Background */}
      <Image 
        src="/images/hero/GalleryHero.jpg"
        alt="Basti Ram Palace Gallery"
        fill
        priority
        className="object-cover object-center z-0"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40 z-[1]" />

      <div className="relative z-10 text-center text-white px-6">
        <h1 className="hero-text font-heading text-5xl md:text-7xl mb-4 tracking-wide">
          Gallery
        </h1>
        <p className="hero-text font-body text-xl md:text-2xl font-light tracking-widest uppercase opacity-90">
          Moments at Basti Ram Palace
        </p>
        <div className="hero-text w-24 h-[1px] bg-[#C9A84C] mx-auto mt-8"></div>
      </div>
    </section>
  );
}
