"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: "Trusted Name", label: "Across Gurugram & NCR" },
  { value: "Spacious Venue", label: "Indoor & Outdoor" },
  { value: "Every Scale", label: "Intimate to Grand" },
  { value: "Extensive Menu", label: "Multi-Cuisine" },
];

const VenueStats = () => {
  const containerRef = useRef(null);

  return (
    <section 
      ref={containerRef}
      className="bg-[#FAF7F2] border-t border-b border-[#c9a96e]/15"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
          {STATS.map((stat, index) => (
            <div 
              key={index} 
              className="text-center flex flex-col items-center group"
            >
              <div className="font-heading text-2xl md:text-3xl lg:text-4xl text-[#2A1F15] mb-4">
                <span>{stat.value}</span>
              </div>
              <div className="w-12 h-px bg-[#c9a96e]/40 mb-4 transition-all duration-500 group-hover:w-20 group-hover:bg-[#c9a96e]" />
              <div className="font-body text-[10px] tracking-[0.25em] text-[#8B7A6A] uppercase font-bold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VenueStats;
