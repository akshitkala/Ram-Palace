"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(
    () => {
      // Cinematic Background Zoom
      if (bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1.08, filter: "brightness(0.95)" },
          { scale: 1, filter: "brightness(1)", duration: 2.5, ease: "power2.out" }
        );
      }

      const fadeElements = gsap.utils.toArray(".fade-in");
      if (fadeElements.length > 0) {
        gsap.fromTo(
          fadeElements,
          { opacity: 0, y: 50, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.12,
            delay: 0.5,
            ease: "power3.out",
          }
        );
      }
    },
    { scope: contentRef, dependencies: [] }
  );

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <div className="absolute inset-0">

        {/* ── BACKGROUND IMAGE ── */}
        <Image
          ref={bgRef}
          src="/images/hero/hero.webp"
          alt="Basti Ram Palace — The Finest Wedding Venue in Gurugram"
          fill
          priority
          fetchPriority="high"
          quality={85}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover will-change-transform hero-img"
          style={{ objectPosition: "center 35%" }} // Initial desktop position
          loading="eager"
        />
        <style jsx>{`
          @media (max-width: 768px) {
            :global(.hero-img) {
              object-position: center 45% !important;
            }
          }
        `}</style>

        {/* ── GENERAL DARKENING OVERLAY ── */}
        <div className="absolute inset-0 bg-black/25 z-[1] pointer-events-none" />

        {/* ── BOTTOM BAND GRADIENT ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to top,
              rgba(10, 8, 5, 0.92) 0%,
              rgba(10, 8, 5, 0.72) 20%,
              rgba(10, 8, 5, 0.35) 42%,
              transparent            58%
            )`,
          }}
        />

        {/* ── TOP BAND — navbar legibility ── */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "130px",
            background: `linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.50) 0%,
              transparent           100%
            )`,
          }}
        />

        {/* ── SIDE GRADIENT — left darkening on desktop ── */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background: `linear-gradient(
              to right,
              rgba(10, 8, 5, 0.55) 0%,
              rgba(10, 8, 5, 0.20) 40%,
              transparent           65%
            )`,
          }}
        />

        {/* ── HERO CONTENT ── */}
        <div ref={contentRef} className="relative z-10 w-full h-full">

          {/* ── LEFT CONTENT BLOCK ── */}
          <div className="absolute bottom-[25vh] left-6 right-6 md:bottom-44 md:left-16 lg:left-24 md:w-[58%] md:right-auto z-20">

            {/* Pre-heading label */}
           

            {/* Main Heading — SEO Optimized */}
            <h1 className="font-heading text-[clamp(1.75rem,7vw,72px)] leading-[1.1] text-white fade-in opacity-0 mb-7 md:mb-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
              The Finest Wedding Venue
              <br />
              <em className="text-[#C9A84C] not-italic">
                in Manesar, Gurugram
              </em>
            </h1>

            {/* CTA Buttons & Mobile Badge Stack */}
            <div className="flex flex-row flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 justify-start fade-in opacity-0">
              <Link href="/contact" className="w-auto">
                <button className="w-auto bg-[#C9A84C] text-[#1C1C1E] px-4 md:px-8 py-[10px] md:py-4 text-[9px] md:text-xs tracking-[1px] md:tracking-[2.5px] uppercase font-semibold rounded-lg transition-all duration-300 hover:bg-[#b8963e] hover:shadow-[0_8px_28px_rgba(201,168,76,0.4)] active:scale-100 whitespace-nowrap">
                  Reserve Your Date
                </button>
              </Link>
              <Link href="/gallery" className="w-auto">
                <button className="w-auto bg-transparent text-white border-2 border-white/60 px-4 md:px-8 py-[8px] md:py-[14px] text-[9px] md:text-xs tracking-[1px] md:tracking-[2.5px] uppercase font-semibold rounded-lg transition-all duration-300 hover:bg-white/10 hover:border-white/90 active:bg-white/5 whitespace-nowrap" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>
                  Explore Venue
                </button>
              </Link>

              {/* Mobile Badge */}
              <a 
                href="https://www.google.com/maps/place/Basti+Ram+Palace/@28.3919789,76.9144771,17z"
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden flex items-center bg-[#0A0805]/95 backdrop-blur-xl border border-[#C9A84C]/40 px-3 py-[9px] rounded-full shadow-2xl hover:border-[#C9A84C] transition-all"
              >
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold text-white tracking-tight">4.8</span>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="#C9A84C">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* SUBTEXT — desktop only, bottom right */}
          <div className="hidden md:block absolute right-16 lg:right-24 bottom-28 max-w-[280px] text-right fade-in opacity-0">
            <p className="text-sm leading-relaxed text-white/85 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              A trusted name for celebrations across Gurugram and Delhi NCR.
              Hosting events of every scale, from intimate gatherings to grand celebrations.
            </p>
          </div>

          {/* TRUST SIGNALS — desktop only */}
          <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-10 lg:gap-16 fade-in opacity-0">
            {[
              { num: "GD Foods India", label: "Catering Partner" },
              { num: "Multi-Cuisine",  label: "Extensive Menu"    },
              { num: "Live Counters",  label: "Chef-Led Stations" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-heading text-xl lg:text-2xl text-[#C9A84C] font-light leading-none"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
                >
                  {stat.num}
                </div>
                <div
                  className="text-[9px] tracking-[2.5px] uppercase text-white/55 mt-1.5"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.9)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* DIVIDER LINE above trust signals */}
          <div className="hidden lg:block absolute bottom-[76px] left-1/2 -translate-x-1/2 w-px h-8 bg-white/20 fade-in opacity-0" />

          {/* ── GOOGLE RATING BADGE — desktop only ── */}
          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 right-8 z-30 fade-in opacity-0">
            <a 
              href="https://www.google.com/maps/place/Basti+Ram+Palace/@28.3919789,76.9144771,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center bg-[#0A0805]/95 backdrop-blur-xl border border-[#C9A84C]/40 px-3.5 py-2 rounded-full shadow-2xl hover:border-[#C9A84C] hover:bg-black transition-all duration-300"
            >
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-white tracking-tight">4.8</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#C9A84C">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              
              <div className="w-px h-3 bg-white/20 mx-2.5" />
              
              <div className="flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/70">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="9" r="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[9px] tracking-[1.5px] uppercase text-white/80 font-medium">Google</span>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;