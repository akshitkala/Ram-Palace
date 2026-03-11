"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const fadeElements = gsap.utils.toArray(".fade-in");
      if (fadeElements.length === 0) return;

      // Cinematic Background Zoom
      gsap.fromTo(
        bgRef.current,
        { scale: 1.08, filter: "brightness(0.95)" },
        { scale: 1, filter: "brightness(1)", duration: 2.5, ease: "power2.out" }
      );

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
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      data-scroll-section
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div data-scroll data-scroll-speed="-0.3" className="absolute inset-0">

        {/* ── BACKGROUND IMAGE ── */}
        <Image
          ref={bgRef}
          src="/images/hero/hero.webp"
          alt="Basti Ram Palace"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{ objectPosition: "center 35%" }}
        />

        {/* ── TECHNIQUE 07: BOTTOM BAND GRADIENT ──
            Only affects bottom 45% of image.
            Top 55% (the beautiful floral arches) stays
            completely untouched and full brightness.       */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(
              to top,
              rgba(10, 8, 5, 0.88) 0%,
              rgba(10, 8, 5, 0.65) 22%,
              rgba(10, 8, 5, 0.20) 42%,
              transparent            58%
            )`,
          }}
        />

        {/* ── TECHNIQUE 07b: TOP BAND — navbar legibility only ──
            Very subtle — just enough to read the nav links
            against the bright cherry blossom sky.            */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: "130px",
            background: `linear-gradient(
              to bottom,
              rgba(0, 0, 0, 0.45) 0%,
              transparent           100%
            )`,
          }}
        />

        {/* ── HERO CONTENT ── */}
        <div ref={contentRef} className="relative z-10 w-full h-full">

          {/* LEFT CONTENT BLOCK */}
          <div className="
            absolute w-full px-6 text-center
            top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2
            md:text-left md:top-auto md:translate-y-0 md:translate-x-0
            md:left-16 lg:left-24 md:bottom-44
            md:w-[58%] md:px-0
          ">

            {/* Pre-heading label */}
            <p
              className="
                text-[10px] md:text-xs
                tracking-[6px] uppercase
                text-[#C9A84C]
                mb-4 md:mb-6
                font-medium
                fade-in opacity-0
                drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]
              "
            >
              Basti's Most Beloved Celebration Venue
            </p>

            {/* Main Heading */}
            <h1
              className="
                font-heading
                text-4xl md:text-6xl lg:text-[76px]
                leading-[1.08]
                text-luxury
                fade-in opacity-0
                mb-8 md:mb-10
              "
            >
              Where Every Occasion
              <br />
              <em
                className="text-luxury-secondary not-italic"
              >
                Becomes a Memory
              </em>
            </h1>

            {/* CTA Buttons */}
            <div className="
              flex gap-3 md:gap-4
              justify-center md:justify-start
              fade-in opacity-0
            ">
              <Link href="/contact">
                <button className="
                  bg-[#C9A84C] text-[#1C1C1E]
                  px-6 py-3.5 md:px-8 md:py-4
                  text-[10px] md:text-xs
                  tracking-[2.5px] uppercase font-medium
                  transition-all duration-300
                  hover:bg-[#b8963e]
                  hover:scale-105
                  hover:shadow-[0_8px_28px_rgba(201,168,76,0.4)]
                  active:scale-100
                ">
                  Reserve Your Date
                </button>
              </Link>
              <Link href="/gallery">
                <button className="
                  bg-transparent text-white
                  border border-white/60
                  px-6 py-3.5 md:px-8 md:py-4
                  text-[10px] md:text-xs
                  tracking-[2.5px] uppercase font-medium
                  transition-all duration-300
                  hover:bg-white/10
                  hover:border-white
                  active:bg-white/5
                "
                style={{
                  textShadow: "0 1px 4px rgba(0,0,0,0.6)",
                }}
                >
                  Explore Venue
                </button>
              </Link>
            </div>
          </div>

          {/* SUBTEXT — desktop only, bottom right */}
          <div className="
            hidden md:block
            absolute
            right-16 lg:right-24
            bottom-28
            max-w-[260px]
            text-right
            fade-in opacity-0
          ">
            <p
              className="text-sm leading-relaxed text-white/85 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              From intimate gatherings to grand weddings,
              Basti Ram Palace has been the heart of Basti's
              most treasured celebrations for over 15 years.
            </p>
          </div>

          {/* TRUST SIGNALS — desktop only */}
          <div className="
            hidden md:flex
            absolute
            bottom-6
            left-1/2 -translate-x-1/2
            gap-10 lg:gap-16
            fade-in opacity-0
          ">
            {[
              { num: "500+",   label: "Weddings Hosted"    },
              { num: "1,200+", label: "Events Completed"   },
              { num: "15",     label: "Years of Excellence" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="font-heading text-2xl lg:text-3xl text-[#C9A84C] font-light leading-none"
                  style={{
                    textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                  }}
                >
                  {stat.num}
                </div>
                <div
                  className="text-[9px] tracking-[2.5px] uppercase text-white/55 mt-1.5"
                  style={{
                    textShadow: "0 1px 4px rgba(0,0,0,0.9)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* DIVIDER LINE above trust signals */}
          <div className="
            hidden md:block
            absolute bottom-[72px]
            left-1/2 -translate-x-1/2
            w-px h-8
            bg-white/20
            fade-in opacity-0
          " />

          {/* SCROLL INDICATOR — mobile only */}
          <div className="
            md:hidden
            absolute bottom-8
            left-1/2 -translate-x-1/2
            flex flex-col items-center gap-2
            fade-in opacity-0
          ">
            <span
              className="text-[9px] tracking-[3px] uppercase text-white/50"
              style={{ textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
            >
              Scroll
            </span>
            <div className="w-px h-8 bg-white/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bg-[#C9A84C] animate-scroll-line" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;