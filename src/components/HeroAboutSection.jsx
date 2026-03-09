"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const HeroAboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef   = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        }
      );

      gsap.fromTo(
        ".gold-accent",
        { opacity: 0, scale: 0 },
        {
          opacity: 1, scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
        }
      );

      gsap.fromTo(
        ".about-content",
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAF7F2] py-14 md:py-28 lg:py-40"
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center">

          {/* ── IMAGE ── */}
          <div className="relative order-1">
            <div ref={imageRef} className="relative">

              <div className="relative overflow-hidden">
                <img
                  src="/images/hall3.webp"
                  alt="Basti Ram Palace Interior"
                  className="w-full h-[260px] sm:h-[340px] md:h-[460px] lg:h-[580px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>

              {/* Gold frame — desktop only */}
              <div className="gold-accent absolute -bottom-4 -right-4 w-full h-full border border-[#C9A84C]/35 pointer-events-none hidden lg:block" />
              <div className="gold-accent absolute -top-4 -left-4 w-14 h-14 border-t-2 border-l-2 border-[#C9A84C] pointer-events-none hidden lg:block" />
              <div className="gold-accent absolute -bottom-4 -right-4 w-14 h-14 border-b-2 border-r-2 border-[#C9A84C] pointer-events-none hidden lg:block" />

              {/* GD Foods badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2.5 shadow-xl flex items-center gap-2.5">
                <div className="w-7 h-7 bg-[#C9A84C] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[10px]">✦</span>
                </div>
                <div>
                  <p className="text-[8px] tracking-[2px] uppercase text-[#999] leading-none mb-0.5">
                    Catering Partner
                  </p>
                  <p className="text-[11px] font-medium text-[#1C1C1E] tracking-wide leading-none">
                    GD Foods India
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ── CONTENT ── */}
          <div className="about-content order-2 flex flex-col gap-4 md:gap-6">

            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-px bg-[#C9A84C]" />
              <p className="text-[10px] tracking-[4px] uppercase text-[#C9A84C] font-medium">
                Our Story
              </p>
            </div>

            {/* Pull quote — hidden on mobile */}
            <p className="hidden md:block font-heading text-2xl md:text-3xl lg:text-[34px] italic font-light leading-snug text-[#1C1C1E]">
              "We don't just host events —<br />
              we craft moments that{" "}
              <span className="text-[#C9A84C]">last a lifetime.</span>"
            </p>

            {/* Divider — hidden on mobile */}
            <div className="hidden md:block w-12 h-px bg-[#C9A84C]/40" />

            {/* Heading */}
            <h2 className="font-heading text-2xl md:text-3xl lg:text-[38px] leading-tight text-[#1C1C1E]">
              Basti's Home for Every<br />Cherished Celebration
            </h2>

            {/* Single paragraph on mobile, two on desktop */}
            <p className="text-[14px] md:text-[15px] leading-relaxed text-[#666] max-w-lg">
              Basti Ram Palace is more than a venue — it is where Basti's
              families gather to celebrate their most meaningful moments. From
              intimate ceremonies to grand wedding receptions, every occasion
              is treated with the same care, warmth, and attention to detail.
            </p>

            <p className="hidden md:block text-[15px] leading-relaxed text-[#666] max-w-lg">
              In partnership with{" "}
              <span className="text-[#1C1C1E] font-medium">GD Foods India</span>
              {" "}— one of the region's most celebrated culinary teams — we
              bring together an exceptional venue and world-class cuisine under
              one roof. Everything you need for a flawless celebration,
              in one place.
            </p>

            {/* Feature pills — hidden on mobile */}
            <div className="hidden md:flex flex-wrap gap-2 pt-1">
              {[
                "Grand Banquet Hall",
                "Ample Parking",
                "Fully Air Conditioned",
                "Professional Staff",
                "Customisable Décor",
                "In-house Catering",
              ].map((feature) => (
                <span
                  key={feature}
                  className="text-[10px] tracking-[1.5px] uppercase text-[#888] border border-[#E0D8CC] px-3 py-1.5"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-5 pt-3 md:pt-4 border-t border-[#E8E0D0]">
              <Link href="/contact">
                <button className="
                  bg-[#1C1C1E] text-white
                  px-6 py-3 md:px-7 md:py-3.5
                  text-[10px] tracking-[2.5px] uppercase font-medium
                  transition-all duration-300
                  hover:bg-[#C9A84C] hover:text-[#1C1C1E]
                  hover:shadow-[0_8px_28px_rgba(201,168,76,0.3)]
                ">
                  Plan Your Event
                </button>
              </Link>
              <Link
                href="/gallery"
                className="flex items-center gap-2 text-[10px] tracking-[2px] uppercase text-[#999] hover:text-[#C9A84C] transition-colors duration-300 group"
              >
                View Gallery
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAboutSection;