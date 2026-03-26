"use client";

import { ShimmerLine } from "@/components/Ornaments";

export default function TrustedClients({ data }) {
  return (
    <section className="py-24 md:py-32 px-6 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 reveal">
          <span className="block font-body text-[#C9A84C] text-xs font-semibold tracking-[0.35em] uppercase mb-5">
            Our Clients
          </span>
          <h2 className="font-heading text-4xl md:text-6xl text-[#2A1F15] mb-6">
            Trusted by Leading Organizations
          </h2>
          <ShimmerLine className="w-16 mx-auto mb-6" />
          <p className="font-body text-[#666] text-base max-w-xl mx-auto">
            From global corporations to premier institutions — our catering services have been
            chosen by brands that demand nothing less than excellence.
          </p>
        </div>

        <div
          className="reveal overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex w-max gap-8 items-center py-2 [animation:marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
            {[...data, ...data].map((client, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-36 h-20 bg-white rounded-xl border border-[#EDE5D8]
                           flex flex-col items-center justify-center gap-1 px-4
                           grayscale hover:grayscale-0 transition-all duration-300
                           hover:shadow-md hover:border-[#C9A84C]/40"
              >
                <span className="font-heading text-xl font-semibold text-[#6B5C4C]">{client.initials}</span>
                <span className="font-body text-[9px] text-[#AAA] tracking-wider uppercase text-center leading-tight">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
