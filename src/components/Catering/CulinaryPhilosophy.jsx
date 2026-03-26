"use client";

import Image from "next/image";

export default function CulinaryPhilosophy({ data }) {
  return (
    <section className="py-24 md:py-36 px-6 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
        <div className="reveal">
          <span className="block font-body text-[#C9A84C] text-xs font-semibold tracking-[0.35em] uppercase mb-5">
            Our Philosophy
          </span>
          <h2 className="font-heading text-4xl md:text-6xl text-[#2A1F15] leading-tight mb-5">
            {data.heading}
          </h2>
          <p className="font-heading-italic text-[#8B7A6A] text-xl md:text-2xl mb-7">
            {data.tagline}
          </p>
          <p className="font-body text-[#555] text-base leading-relaxed mb-8">
            {data.description}
          </p>
          <ul className="space-y-3 mb-8">
            {data.points.map((pt, i) => (
              <li key={i} className="flex items-start gap-3 font-body text-[#444] text-sm leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 bg-[#C9A84C] rounded-full flex-shrink-0" />
                {pt}
              </li>
            ))}
          </ul>
          <p className="font-heading-italic text-[#8B7A6A] text-lg">
            {data.closing}
          </p>
        </div>

        <div className="reveal relative">
          <div className="relative rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18)] h-[480px] md:h-[580px]">
            <Image
              src={data.image}
              alt="Culinary excellence"
              fill
              quality={70}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-7 -left-7 w-36 h-36 border border-[#C9A84C]/20 rounded-2xl -z-10" />
          <div className="absolute -top-7 -right-7 w-28 h-28 border border-[#C9A84C]/20 rounded-2xl -z-10" />
          <div className="absolute bottom-6 right-6 bg-[#2B1810]/90 backdrop-blur-sm rounded-xl px-5 py-3 border border-[#C9A84C]/25">
            <span className="font-heading-italic text-[#C9A84C] text-sm block">Culinary</span>
            <span className="font-body text-white text-xs tracking-widest uppercase">Excellence</span>
          </div>
        </div>
      </div>
    </section>
  );
}
