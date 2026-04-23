"use client";

import React from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GoldHairline } from "@/components/Ornaments";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GalleryIntro() {
  const containerRef = React.useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      containerRef.current.querySelectorAll(".animate-up"),
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 bg-[#fefaf6] overflow-hidden"
    >
      {/* Subtle Background Ornament */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A84C]/[0.03] blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-up flex items-center justify-center gap-3 mb-6">
          <GoldHairline className="w-8 md:w-12" />
          <span className="font-body text-[#C9A84C] text-[10px] md:text-xs tracking-[0.3em] uppercase font-bold">
            The Experience
          </span>
          <GoldHairline className="w-8 md:w-12" />
        </div>

        <h2 className="animate-up font-heading text-4xl md:text-6xl text-[#2B1810] mb-8 leading-[1.1]">
          Every Event, <span className="text-[#C9A84C]">Beautifully Remembered</span>
        </h2>

        <p className="animate-up font-body text-[#A99686] text-lg md:text-xl font-medium tracking-wide mb-12 italic">
          A glimpse into the celebrations we have had the honour of hosting
        </p>

        <div className="animate-up space-y-6 text-left md:text-center">
          <p className="font-body text-[#4A3728]/80 text-base md:text-lg leading-relaxed">
            Each photograph in this gallery tells a story — of families coming together, milestones celebrated, and moments that will be remembered for a lifetime. From grand wedding receptions adorned with lights and florals, to polished corporate gatherings and intimate private parties, Basti Ram Palace has been the backdrop for thousands of cherished occasions across Gurugram and the Delhi NCR region.
          </p>
          <p className="font-body text-[#4A3728]/80 text-base md:text-lg leading-relaxed">
            We take pride not just in the scale of what we offer, but in the warmth and attention to detail that goes into every single event. The décor, the dining, the service — every element is thoughtfully executed so that you and your guests can celebrate without a worry.
          </p>
          <p className="font-body text-[#4A3728]/80 text-base md:text-lg leading-relaxed mb-12">
            Browse through our gallery to see the venue, the setups, and the experiences we have crafted for our guests. If you can picture your celebration here, we would love to make it a reality.
          </p>
        </div>

        <div className="animate-up mt-16">
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-[#2B1810] text-[#C9A84C] font-body text-xs md:text-sm tracking-[0.2em] uppercase font-bold transition-all duration-500 hover:bg-[#C9A84C] hover:text-[#2B1810] hover:shadow-[0_20px_40px_rgba(201,168,76,0.2)] group"
          >
            Reserve Your Date
            <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
