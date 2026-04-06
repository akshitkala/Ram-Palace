"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { num: 800, suffix: "+", label: "Guests Capacity" },
  { num: 15, suffix: "+", label: "Years of Excellence" },
  { num: 1200, suffix: "+", label: "Events Completed" },
  { num: 200, suffix: "+", label: "Menu Items" },
];

const VenueStats = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".stat-counter").forEach((el) => {
        const target = parseInt(el.getAttribute("data-target"), 10);
        const suffix = el.getAttribute("data-suffix") || "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

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
              <div className="font-heading text-4xl md:text-5xl text-[#2A1F15] mb-4">
                <span 
                  className="stat-counter" 
                  data-target={stat.num}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </span>
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
