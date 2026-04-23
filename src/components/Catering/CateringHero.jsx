"use client";

import Image from "next/image";
import Link from "next/link";
import { ShimmerLine } from "@/components/Ornaments";

export default function CateringHero({ data }) {
  return (
    <section className="hero-section relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden ">
      <div className="hero-bg absolute inset-0 z-0">
        <Image
          src={data.image}
          alt="Luxury catering setup"
          fill
          priority
          quality={95}
          sizes="(max-width: 768px) 150vw, 100vw"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-[1] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/7 via-black/4 to-black/8" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="reveal flex items-center justify-center gap-3 mb-8 drop-shadow-md">
          <ShimmerLine className="w-12" direction="left" />
          <span className="font-body text-[#C9A84C] text-xs tracking-[0.35em] uppercase font-bold">
            GD Foods India · Basti Ram Palace
          </span>
          <ShimmerLine className="w-12" direction="right" />
        </div>

        <h1 className="reveal font-heading text-5xl sm:text-6xl md:text-8xl text-white leading-tight mb-8 drop-shadow-2xl">
          {data.headline}
        </h1>

        <p className="reveal font-body text-white/95 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-3 drop-shadow-md">
          {data.description}
        </p>
        <p className="reveal font-heading-italic text-white/70 text-lg md:text-xl mb-12 drop-shadow-md">
          {data.subtext}
        </p>

        <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#culinary-spectrum"
            className="bg-gradient-to-br from-[#C9A84C] to-[#A8883D] text-[#1a0f08] font-body font-bold
                       uppercase tracking-[0.15em] px-8 py-4 rounded-lg text-sm
                       transition-all duration-300 hover:shadow-[0_8px_32px_rgba(201,169,110,0.45)] hover:-translate-y-0.5"
          >
            Explore the Menu
          </a>
          <Link
            href="/contact"
            className="border border-white/40 text-white font-body font-bold uppercase
                       tracking-[0.15em] px-8 py-4 rounded-lg text-sm backdrop-blur-md bg-white/10
                       transition-all duration-300 hover:bg-white/20 shadow-lg"
          >
            Request a Proposal
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#C9A84C]/60 to-transparent animate-pulse" />
        <span className="font-body text-white/30 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
      </div>
    </section>
  );
}
