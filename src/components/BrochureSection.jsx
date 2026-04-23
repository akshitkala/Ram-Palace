"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

const BrochureSection = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      contentRef.current.children,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );

    tl.fromTo(
      imageRef.current,
      { opacity: 0, scale: 0.9, x: 30 },
      { opacity: 1, scale: 1, x: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative py-24 md:py-32 bg-[#1C1C1E] overflow-hidden"
    >
      {/* Decorative Gold Thread/Line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <div ref={contentRef} className="z-10 order-2 md:order-1 text-center md:text-left">
          <span className="text-[#C9A84C] text-[10px] tracking-[4px] uppercase font-bold mb-6 block">
            The GD Foods Experience
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-8">
            Explore Our <br />
            <em className="text-[#C9A84C] not-italic">Full Catering Brochure</em>
          </h2>
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-10 max-w-xl mx-auto md:mx-0">
            Discover our extensive multi-cuisine selections, live stations, 
            and signature thalis curated by GD Foods India. Our brochure provides 
            a detailed look at how we craft memorable culinary experiences.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="/Brochure.pdf" 
              download="Basti_Ram_Palace_Catering_Brochure.pdf"
              className="
                bg-[#C9A84C] text-[#1C1C1E] 
                px-8 py-5 rounded-full 
                text-xs font-bold tracking-[2px] uppercase 
                hover:bg-[#b39540] transition-all duration-300 
                flex items-center justify-center gap-3
                group
              "
            >
              Download Brochure
              <svg 
                width="18" height="18" viewBox="0 0 24 24" fill="none" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="group-hover:translate-y-0.5 transition-transform"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Side: Visual representation of brochure */}
        <div className="relative order-1 md:order-2">
          <div 
            ref={imageRef}
            className="relative aspect-[3/4] max-w-sm mx-auto"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[#C9A84C]/10 blur-[80px] rounded-full scale-110" />
            
            {/* Brochure Mockup Frame */}
            <div className="relative z-10 w-full h-full border border-white/10 rounded-2xl overflow-hidden shadow-2xl bg-[#252527]">
              <Image 
                src="/images/hero/CateringHero.webp"
                alt="Basti Ram Palace Brochure Cover"
                fill
                className="object-cover opacity-80"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="w-12 h-1 bg-[#C9A84C] mb-4" />
                <p className="font-heading text-2xl text-white">Menu & Catering Selection</p>
                <p className="text-white/40 text-[10px] tracking-widest uppercase mt-2">2024-25 Edition</p>
              </div>
            </div>
            
            {/* Accent Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t border-r border-[#C9A84C]/40 rounded-tr-3xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b border-l border-[#C9A84C]/40 rounded-bl-3xl" />
          </div>
        </div>
      </div>
      
      {/* Decorative Gradient Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent pointer-events-none opacity-40" />
    </section>
  );
};

export default BrochureSection;
