"use client";

import { useRef } from "react";
import Link from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import NextLink from "next/link";

export default function MenuFinalCTA() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      ".cta-reveal",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#1C1C1E] py-32 md:py-48 overflow-hidden text-center"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.1)_0%,transparent_70%)]" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="cta-reveal">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="w-12 h-px bg-[#C9A84C]/30" />
            <span className="text-[#C9A84C] text-[10px] tracking-[6px] uppercase font-bold">The Final Touch</span>
            <div className="w-12 h-px bg-[#C9A84C]/30" />
          </div>
          
          <h2 className="font-heading text-5xl md:text-8xl text-white leading-[1] mb-10">
            Craft Your Perfect <br />
            <em className="text-[#C9A84C] not-italic">Culinary Journey.</em>
          </h2>
          
          <p className="text-white/50 text-lg md:text-xl font-light mb-16 max-w-2xl mx-auto leading-relaxed">
            Whether it's a grand wedding reception or an intimate private party, 
            our menus are fully customizable to your vision. 
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <NextLink 
              href="/contact" 
              className="px-12 py-6 bg-[#C9A84C] text-[#1C1C1E] rounded-full text-xs font-bold tracking-[3px] uppercase hover:bg-[#b39540] hover:scale-105 transition-all duration-300 shadow-[0_15px_40px_rgba(201,168,76,0.3)]"
            >
              Request a Custom Menu
            </NextLink>
            <a 
              href="https://wa.me/919650211469" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-12 py-6 border border-white/10 text-white rounded-full text-xs font-bold tracking-[3px] uppercase hover:bg-white/5 hover:border-white/30 transition-all duration-300"
            >
              Consult Our Chef
            </a>
          </div>

          <div className="mt-20 flex flex-col md:flex-row gap-8 justify-center items-center">
            <div className="text-white/30 text-[9px] tracking-[4px] uppercase font-bold">Contact Our Experts</div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {["+91-8800190003", "+91-9650211469", "+91-9810679550"].map((n) => (
                <a 
                  key={n} 
                  href={`tel:${n.replace(/-/g, "")}`}
                  className="text-white/60 hover:text-[#C9A84C] transition-colors text-sm font-light tracking-wide"
                >
                  {n}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
    </section>
  );
}
