"use client";

import { ShimmerLine } from "@/components/Ornaments";

export default function EventsWeCater({ data }) {
  return (
    <section className="py-24 md:py-36 px-6 bg-[#FAF7F2]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14 reveal">
          <span className="block font-body text-[#C9A84C] text-xs font-semibold tracking-[0.35em] uppercase mb-5">
            Our Services
          </span>
          <h2 className="font-heading text-4xl md:text-6xl text-[#2A1F15] mb-6">
            Catering for Every Occasion
          </h2>
          <ShimmerLine className="w-16 mx-auto mb-6" />
          <p className="font-body text-[#666] text-base max-w-xl mx-auto">
            Complete catering solutions delivered with structured coordination and refined
            hospitality — for events of any scale.
          </p>
        </div>

        <div className="events-wrap flex flex-wrap justify-center gap-3">
          {data.map((event, i) => (
            <span
              key={i}
              className="event-tag font-body text-[#2A1F15] text-sm border border-[#D5C9B8] bg-white
                         px-5 py-2.5 rounded-full cursor-default
                         transition-all duration-200
                         hover:bg-[#C9A84C] hover:text-[#1a0f08] hover:border-[#C9A84C]"
            >
              {event}
            </span>
          ))}
        </div>

        <p className="reveal text-center font-heading-italic text-[#8B7A6A] mt-12 text-base">
          Every event is handled with structured coordination and refined hospitality.
        </p>
      </div>
    </section>
  );
}
