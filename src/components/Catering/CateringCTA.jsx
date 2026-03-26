"use client";

import Link from "next/link";
import { ShimmerLine, GoldDivider } from "@/components/Ornaments";

export default function CateringCTA({ data }) {
  return (
    <section className="relative py-28 md:py-40 px-6 bg-[#2B1810] overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[600px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <span className="block font-body text-[#C9A84C] text-xs font-semibold tracking-[0.35em] uppercase mb-6">
          Ready to Begin?
        </span>

        <h2 className="reveal font-heading text-4xl sm:text-5xl md:text-7xl text-white leading-tight mb-6">
          Let Us Curate Your Perfect Menu
        </h2>
        <ShimmerLine className="w-16 mx-auto mb-8" />
        <p className="reveal font-body text-white/65 text-base leading-relaxed max-w-xl mx-auto mb-12">
          From intimate dinners to grand weddings, GD Foods India crafts every menu with care,
          precision, and a passion for exceptional food. Get in touch — we&apos;d love to be a part of your celebration.
        </p>

        <div className="reveal flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/contact"
            className="bg-gradient-to-br from-[#C9A84C] to-[#A8883D] text-[#1a0f08] font-body font-bold
                       uppercase tracking-[0.15em] px-8 py-4 rounded-lg text-sm
                       transition-all duration-300 hover:shadow-[0_8px_32px_rgba(201,169,110,0.45)] hover:-translate-y-0.5"
          >
            Request a Custom Proposal
          </Link>
          <a
            href="tel:+918800190003"
            className="border border-[#C9A84C]/40 text-[#C9A84C] font-body font-semibold uppercase
                       tracking-[0.15em] px-8 py-4 rounded-lg text-sm
                       transition-all duration-300 hover:bg-[#C9A84C]/10"
          >
            Call +91-88001 90003
          </a>
          <a
            href="https://wa.me/919650211469"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 text-white/75 font-body font-semibold uppercase
                       tracking-[0.15em] px-8 py-4 rounded-lg text-sm
                       transition-all duration-300 hover:bg-white/8"
          >
            WhatsApp Us
          </a>
        </div>

        <div className="reveal flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10">
          {["+91-8800190003", "+91-9650211469", "+91-9810679550"].map((num) => (
            <a
              key={num}
              href={`tel:${num.replace(/-/g, "")}`}
              className="font-body text-white/35 text-sm tracking-wider hover:text-[#C9A84C] transition-colors"
            >
              {num}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
