"use client";

import Image from "next/image";
import Link from "next/link";

export default function MenuHero({ totalItems, menuCategories, scrollTo }) {
  return (
    <section className="mh-section relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#1A0D08]">
      <div className="mh-bg absolute inset-0 z-0">
        <Image
          src="/images/hero/MenuHero.webp"
          alt="The Menu — GD Foods India"
          fill
          priority
          sizes="100vw"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-[#1A0D08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D08]/55 via-transparent to-transparent" />
      </div>

      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-14 lg:px-20 pb-20 md:pb-32">
        <div className="mh-eyebrow flex items-center gap-4 mb-10">
          <span className="w-10 h-px bg-[#C9A84C]" />
          <span className="font-body text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-semibold">
            GD Foods India · Basti Ram Palace
          </span>
        </div>

        <h1 className="font-heading leading-[0.8] mb-8 mt-14 lg:mt-20">
          <span className="mh-title-word block text-white text-[clamp(4rem,11vw,140px)]">The</span>
          <span className="mh-title-word block text-[#C9A84C] text-[clamp(4rem,11vw,140px)]">Menu</span>
        </h1>

        <p className="mh-sub font-heading-italic text-white/40 text-xl md:text-2xl lg:text-3xl mb-14 max-w-lg leading-relaxed">
          Where every dish tells a story of craft, care, and celebration.
        </p>

        <div className="flex flex-wrap gap-x-10 gap-y-5 mb-14">
          {[
            { target: totalItems, suffix: "+", label: "Dishes" },
            { target: 10, suffix: "", label: "Categories" },
            { target: 8, suffix: "", label: "Live Counters" },
            { target: 500, suffix: "+", label: "Events Catered" },
          ].map((s, i) => (
            <div key={i} className={`mh-stat ${i > 0 ? "border-l border-white/10 pl-10" : ""}`}>
              <div className="font-heading text-3xl md:text-4xl text-[#C9A84C] leading-none">
                <span className="hero-count" data-target={s.target} data-suffix={s.suffix}>0{s.suffix}</span>
              </div>
              <div className="font-body text-white/30 text-[9px] tracking-[3px] uppercase mt-1.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mh-cta flex flex-col sm:flex-row gap-4">
          <button onClick={() => scrollTo(menuCategories[0].slug)}
            className="inline-flex items-center gap-2 bg-gradient-to-br from-[#C9A84C] to-[#A8883D]
                       text-[#1a0f08] font-body font-bold uppercase tracking-[0.18em]
                       px-9 py-4 rounded-lg text-sm transition-all duration-300
                       hover:shadow-[0_8px_32px_rgba(201,168,76,0.5)] hover:-translate-y-0.5">
            Browse Menu ↓
          </button>
          <Link href="/contact"
            className="inline-flex items-center gap-2 border border-white/20 text-white/60
                       font-body font-semibold uppercase tracking-[0.15em]
                       px-9 py-4 rounded-lg text-sm transition-all duration-300
                       hover:bg-white/6 hover:text-white/90">
            Request Custom Menu
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 right-10 z-10 hidden md:flex flex-col items-center gap-2">
        <div className="w-px h-14 bg-gradient-to-b from-transparent via-[#C9A84C]/50 to-transparent animate-pulse" />
        <span className="font-body text-white/20 text-[8px] tracking-[3px] uppercase">Scroll</span>
      </div>
    </section>
  );
}
