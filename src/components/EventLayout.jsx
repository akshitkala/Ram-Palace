"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const EventLayout = ({ hero, intro, storySections, cta }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        ".hero-label",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 56 },
        { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(
        ".hero-rule",
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 1, ease: "power3.out", delay: 0.9 }
      );
      gsap.fromTo(
        ".hero-cta",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1.1 }
      );

      // Hero parallax
      gsap.to(".hero-bg", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Intro block
      gsap.fromTo(
        ".intro-block",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".intro-block", start: "top 82%" },
        }
      );

      // Story sections
      storySections.forEach((section) => {
        gsap.fromTo(
          `.story-${section.id} .s-visual`,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.story-${section.id}`,
              start: "top 74%",
            },
          }
        );
        gsap.fromTo(
          `.story-${section.id} .s-content`,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: `.story-${section.id}`,
              start: "top 74%",
            },
          }
        );
      });

      // CTA section
      gsap.fromTo(
        ".cta-block",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cta-block", start: "top 85%" },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [storySections]);

  return (
    <div ref={containerRef} className="bg-[#FAF7F2] min-h-screen overflow-x-hidden">

      {/* ── 1. HERO ── */}
      <section className="hero-section relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        {/* BG */}
        <div className="hero-bg absolute inset-0 z-0">
          <Image
            src={hero.image}
            alt={hero.title}
            fill
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* Label */}
          <div className="hero-label flex items-center justify-center gap-3 mb-7">
            <span className="block w-10 h-px bg-gradient-to-r from-transparent to-[#C9A96E]" />
            <span className="font-body text-[#C9A96E] text-xs tracking-[0.35em] uppercase font-semibold">
              {hero.subtitle}
            </span>
            <span className="block w-10 h-px bg-gradient-to-l from-transparent to-[#C9A96E]" />
          </div>

          {/* Title */}
          <h1 className="hero-title font-heading text-5xl sm:text-6xl md:text-8xl text-white leading-tight mb-8">
            {hero.title}
          </h1>

          {/* Gold rule */}
          <div className="hero-rule w-20 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-10 origin-center" />

          {/* CTA */}
          <div className="hero-cta">
            <Link
              href={cta.link}
              className="inline-block bg-gradient-to-br from-[#C9A96E] to-[#A8883D] text-[#1a0f08]
                         font-body font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-lg text-sm
                         transition-all duration-300 hover:shadow-[0_8px_32px_rgba(201,169,110,0.45)] hover:-translate-y-0.5"
            >
              {cta.text}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#C9A96E]/60 to-transparent animate-pulse" />
          <span className="font-body text-white/30 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ── 2. INTRO ── */}
      <section className="py-24 md:py-36 px-6">
        <div className="intro-block max-w-3xl mx-auto text-center">
          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="block w-16 h-px bg-gradient-to-r from-transparent to-[#C9A96E]/50" />
            <span className="text-[#C9A96E] text-lg">✦</span>
            <span className="block w-16 h-px bg-gradient-to-l from-transparent to-[#C9A96E]/50" />
          </div>

          <h2 className="font-heading text-4xl md:text-6xl text-[#2A1F15] leading-tight mb-8">
            {intro.heading}
          </h2>
          <p className="font-body text-lg md:text-xl leading-relaxed text-[#666]">
            {intro.description}
          </p>
        </div>
      </section>

      {/* ── 3. STORY SECTIONS ── */}
      <div>
        {storySections.map((section, index) => {
          const isImageLeft = section.align === "image-left";
          return (
            <section
              key={section.id}
              className={`story-${section.id} grid lg:grid-cols-2 min-h-[75vh] items-stretch
                          ${index % 2 === 0 ? "bg-white" : "bg-[#FAF7F2]"}`}
            >
              {/* Visual */}
              <div
                className={`s-visual relative h-[55vw] max-h-[640px] lg:h-auto overflow-hidden
                             ${isImageLeft ? "lg:order-1" : "lg:order-2"}`}
              >
                <Image
                  src={section.image}
                  alt={section.title}
                  fill
                  quality={70}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                />
                {/* Number watermark */}
                <span
                  className="absolute bottom-6 right-6 font-heading text-8xl font-bold
                               text-white/10 leading-none select-none pointer-events-none"
                >
                  0{index + 1}
                </span>
              </div>

              {/* Content */}
              <div
                className={`s-content flex flex-col justify-center px-8 py-16 md:px-16 lg:px-20 lg:py-24
                             ${isImageLeft ? "lg:order-2" : "lg:order-1"}`}
              >
                {/* Index label */}
                <span className="font-body text-[#C9A96E] text-xs font-bold tracking-[0.35em] uppercase mb-5">
                  0{index + 1} — {section.title.split(" ")[0]}
                </span>

                {/* Thin gold line */}
                <div className="w-10 h-px bg-[#C9A96E] mb-6" />

                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#2A1F15] leading-tight mb-6">
                  {section.title}
                </h3>
                <p className="font-body text-base md:text-lg leading-relaxed text-[#666] max-w-md">
                  {section.description}
                </p>

                {/* Subtle bottom accent */}
                <div className="mt-10 w-8 h-px bg-[#C9A96E]/40" />
              </div>
            </section>
          );
        })}
      </div>

      {/* ── 4. CTA ── */}
      <section className="cta-block relative py-28 md:py-40 px-6 bg-[#2B1810] overflow-hidden text-center">
        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[500px] h-[300px] bg-[#C9A96E]/6 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Ornament */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="block w-12 h-px bg-gradient-to-r from-transparent to-[#C9A96E]/40" />
            <span className="text-[#C9A96E]/60 text-base">✦</span>
            <span className="block w-12 h-px bg-gradient-to-l from-transparent to-[#C9A96E]/40" />
          </div>

          <h2 className="font-heading text-4xl md:text-6xl text-white leading-tight mb-5">
            Let's Create Something Extraordinary
          </h2>
          <p className="font-body text-white/55 text-base md:text-lg leading-relaxed mb-12 max-w-lg mx-auto">
            Our team is ready to bring your vision to life. Every detail, every moment — crafted with care.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={cta.link}
              className="inline-block bg-gradient-to-br from-[#C9A96E] to-[#A8883D] text-[#1a0f08]
                         font-body font-bold uppercase tracking-[0.15em] px-10 py-4 rounded-lg text-sm
                         transition-all duration-300 hover:shadow-[0_8px_32px_rgba(201,169,110,0.45)] hover:-translate-y-0.5"
            >
              {cta.text}
            </Link>
            <a
              href="tel:+918800190003"
              className="inline-block border border-white/20 text-white/75 font-body font-semibold
                         uppercase tracking-[0.15em] px-10 py-4 rounded-lg text-sm
                         transition-all duration-300 hover:bg-white/8 hover:border-white/35"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventLayout;