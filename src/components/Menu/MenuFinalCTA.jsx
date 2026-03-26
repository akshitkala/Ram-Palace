"use client";

import Link from "next/link";
import { GoldDivider } from "@/components/Ornaments";

export default function MenuFinalCTA() {
  return (
    <section className="relative bg-[#2B1810] py-28 md:py-40 px-6 overflow-hidden text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[700px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-[#C9A84C]/15 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-[#C9A84C]/15 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <GoldDivider className="mb-10" />
        <h2 className="font-heading text-4xl md:text-6xl text-white leading-tight mb-5">
          Craft Your Perfect<br />
          <em className="not-italic text-[#C9A84C]">Celebration Menu</em>
        </h2>
        <p className="font-body text-white/40 text-base leading-relaxed mb-12 max-w-md mx-auto">
          Every menu is fully customizable. Tell us your occasion, guest count,
          and preferences — we'll craft the experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact"
            className="inline-block bg-gradient-to-br from-[#C9A84C] to-[#A8883D]
                       text-[#1a0f08] font-body font-bold uppercase tracking-[0.18em]
                       px-10 py-4 rounded-lg text-sm transition-all duration-300
                       hover:shadow-[0_8px_32px_rgba(201,168,76,0.45)] hover:-translate-y-0.5">
            Request a Custom Menu
          </Link>
          <a href="https://wa.me/919650211469" target="_blank" rel="noopener noreferrer"
            className="inline-block border border-[#C9A84C]/35 text-[#C9A84C]
                       font-body font-semibold uppercase tracking-[0.15em]
                       px-10 py-4 rounded-lg text-sm transition-all duration-300
                       hover:bg-[#C9A84C]/10">
            WhatsApp Us
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-8 pt-10 mt-10 border-t border-white/8">
          {["+91-8800190003", "+91-9650211469", "+91-9810679550"].map((n) => (
            <a key={n} href={`tel:${n.replace(/-/g, "")}`}
              className="font-body text-white/20 text-sm tracking-wider hover:text-[#C9A84C] transition-colors">
              {n}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
