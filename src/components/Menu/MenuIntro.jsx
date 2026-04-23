"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function MenuIntro() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (containerRef.current.querySelector(".intro-fade")) {
      gsap.fromTo(
        ".intro-fade",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#FAF7F2] py-24 md:py-40 overflow-hidden"
    >
      {/* Subtle Background Ornament */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.03] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-[#2B1810]">
          <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Left: Philosophy Text */}
          <div className="lg:col-span-7">
            <div className="intro-fade flex items-center gap-4 mb-8">
              <span className="w-10 h-px bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-[10px] tracking-[5px] uppercase font-bold">
                The Culinary Philosophy
              </span>
            </div>
            
            <h2 className="intro-fade font-heading text-5xl md:text-7xl lg:text-8xl text-[#2B1810] leading-[0.95] mb-12">
              Where <em className="text-[#C9A84C] not-italic">Flavour</em> <br />
              Meets Artistry.
            </h2>
            
            <div className="intro-fade space-y-6 max-w-2xl">
              <p className="text-[#5A4A3A] text-lg md:text-xl font-light leading-relaxed">
                In partnership with <strong className="text-[#2B1810] font-semibold">GD Foods India</strong>, we believe that catering is more than just service—it's a performance. Every ingredient is sourced with intent, and every menu is a curated journey designed to elevate your celebration.
              </p>
              <p className="text-[#5A4A3A]/80 text-base leading-relaxed italic border-l-2 border-[#C9A84C]/30 pl-6">
                "We don't just serve food; we craft memories through a symphony of spices, textures, and impeccable presentation."
              </p>
            </div>

            {/* Feature Pills */}
            <div className="intro-fade flex flex-wrap gap-4 mt-14">
              {["Farm-to-Table", "Chef-Led Stations", "Global Flavors", "Bespoke Menus"].map((trait) => (
                <span key={trait} className="px-5 py-2.5 bg-white border border-[#EDE5D8] rounded-full text-[11px] tracking-[0.2em] uppercase text-[#8B735B] font-bold shadow-sm">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Visual Accent Card */}
          <div className="lg:col-span-5 relative">
            <div className="intro-fade relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group">
              <Image 
                src="/images/catering/catering-1.webp" 
                alt="Gourmet Excellence"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1810]/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-[#C9A84C] text-[9px] tracking-widest uppercase font-bold mb-2">Signature Quality</p>
                <p className="text-xl font-heading">Hand-crafted selection by GD Foods India</p>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="intro-fade absolute -bottom-6 -left-6 bg-[#C9A84C] text-[#1C1C1E] p-8 rounded-2xl shadow-xl z-20 hidden md:block">
              <div className="text-center">
                <span className="block text-3xl font-heading mb-1">500+</span>
                <span className="block text-[9px] tracking-widest uppercase font-bold opacity-70">Curated Dishes</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
