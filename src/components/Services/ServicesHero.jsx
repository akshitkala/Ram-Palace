"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesHero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(
    () => {
      // Cinematic entrance for hero content
      if (document.querySelectorAll(".hero-fade-up").length > 0) {
        gsap.fromTo(
          ".hero-fade-up",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "expo.out",
            delay: 0.2,
          }
        );
      }

      // Parallax effect on background
      if (document.querySelector(".parallax-bg")) {
        gsap.to(".parallax-bg", {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/service.webp"
          alt="Basti Ram Palace Services"
          fill
          priority
          fetchPriority="high"
          quality={95}
          sizes="(max-width: 768px) 150vw, 100vw"
          className="object-cover parallax-bg md:scale-125 origin-top"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={contentRef}>
          <div className="overflow-hidden mb-4">
            <span className="hero-fade-up opacity-0 text-[#c9a96e] text-xs tracking-[0.2em] uppercase block drop-shadow-md font-semibold">
              BASTI RAM PALACE · SERVICES
            </span>
          </div>
          <h1 className="hero-fade-up opacity-0 font-heading text-5xl md:text-7xl text-[#f5f0e8] leading-tight mb-6 drop-shadow-xl">
            A Complete Celebration,<br />
            Crafted for <em className="italic text-[#c9a96e] not-italic">You</em>
          </h1>
          <p className="hero-fade-up opacity-0 font-body text-[#e2dfd5] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md">
            From the hall to the food to the final farewell —
            every element of your event, managed under one roof.
          </p>
          
          <div className="hero-fade-up opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact"
              className="w-full sm:w-auto bg-[#c9a96e] border border-[#c9a96e] text-[#0a0a0a] px-10 py-4 hover:bg-transparent hover:text-[#c9a96e] transition-all duration-300 font-bold tracking-wide shadow-xl shadow-[#c9a96e]/10"
            >
              Plan Your Event
            </Link>
            <Link 
              href="/menu"
              className="w-full sm:w-auto border border-[#f5f0e8]/30 text-[#f5f0e8] hover:bg-[#f5f0e8]/10 px-10 py-4 transition-all duration-300 font-medium backdrop-blur-sm"
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
