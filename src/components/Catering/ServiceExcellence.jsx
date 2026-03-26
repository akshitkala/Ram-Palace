"use client";

import { ShimmerLine } from "@/components/Ornaments";

export default function ServiceExcellence({ data }) {
  return (
    <section className="relative py-24 md:py-36 px-6 bg-[#2B1810] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]
                      bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="block font-body text-[#C9A84C] text-xs font-semibold tracking-[0.35em] uppercase mb-5">
            Why Choose Us
          </span>
          <h2 className="reveal font-heading text-4xl md:text-6xl text-white mb-6">
            Complete Catering Solutions
          </h2>
          <ShimmerLine className="w-16 mx-auto mb-6" />
          <p className="reveal font-body text-white/60 text-base max-w-xl mx-auto">
            Our team focuses on delivering an experience that goes beyond the food —
            every detail, every moment, managed with precision.
          </p>
        </div>

        <div className="service-grid grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-5 max-w-2xl mx-auto">
          {data.map((item, i) => (
            <div key={i} className="service-item flex items-center gap-4">
              <span
                className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30
                             flex items-center justify-center"
              >
                <svg className="w-3.5 h-3.5 text-[#C9A84C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="font-body text-white/85 text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

        <p className="reveal text-center font-heading-italic text-white/35 mt-14 text-base">
          Every detail is carefully managed to ensure a sophisticated and memorable dining experience.
        </p>
      </div>
    </section>
  );
}
