"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const ServicesHero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic entrance for hero content
      gsap.fromTo(
        ".hero-fade-up",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero.webp"
          alt="Basti Ram Palace Services"
          fill
          priority
          quality={75}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={contentRef}>
          <span className="hero-fade-up opacity-0 text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-4 block">
            BASTI RAM PALACE · SERVICES
          </span>
          <h1 className="hero-fade-up opacity-0 font-heading text-5xl md:text-7xl text-[#f5f0e8] leading-tight mb-6">
            A Complete Celebration,<br />
            Crafted for <em className="italic text-[#c9a96e] not-italic">You</em>
          </h1>
          <p className="hero-fade-up opacity-0 font-body text-[#a09880] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            From the hall to the food to the final farewell —
            every element of your event, managed under one roof.
          </p>
          
          <div className="hero-fade-up opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact"
              className="w-full sm:w-auto border border-[#c9a96e] text-[#c9a96e] px-10 py-4 hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300 font-medium"
            >
              Plan Your Event
            </Link>
            <Link 
              href="/menu"
              className="w-full sm:w-auto border border-transparent text-[#f5f0e8] hover:text-[#c9a96e] px-10 py-4 transition-all duration-300 font-medium"
            >
              View Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-px h-12 bg-gradient-to-b from-[#c9a96e] to-transparent animate-pulse" />
      </div>
    </section>
  );
};

export default ServicesHero;
