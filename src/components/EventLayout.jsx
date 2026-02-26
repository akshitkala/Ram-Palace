"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Footer from "./Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EventLayout = ({ hero, intro, storySections, cta }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(
        ".hero-text",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.2 }
      );

      // Story Sections Animation
      storySections.forEach((section) => {
        gsap.fromTo(
          `.story-section-${section.id} .visual`,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            scrollTrigger: {
              trigger: `.story-section-${section.id}`,
              start: "top 70%",
            },
          }
        );
        
        gsap.fromTo(
          `.story-section-${section.id} .content`,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            delay: 0.2,
            scrollTrigger: {
              trigger: `.story-section-${section.id}`,
              start: "top 70%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [storySections]);

  return (
    <div ref={containerRef} className="bg-[#F5F1EB] min-h-screen">
      
      {/* 1. HERO SECTION - Immersive & Emotional */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={hero.image} 
            alt={hero.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="hero-text text-white/90 text-sm md:text-base tracking-[0.2em] uppercase mb-4">
            {hero.subtitle}
          </p>
          <h1 className="hero-text font-heading text-5xl md:text-7xl lg:text-8xl text-[#F5F1EC] mb-8">
            {hero.title}
          </h1>
        </div>
      </section>

      {/* 2. INTRO - The Hook */}
      <section className="py-20 md:py-32 px-6 max-w-4xl mx-auto text-center">
        <h2 className="font-heading text-3xl md:text-5xl text-[#2A1F15] mb-8 leading-tight">
          {intro.heading}
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-[#555]">
          {intro.description}
        </p>
      </section>

      {/* 3. STORYTELLING BLOCKS - Alternating Layouts */}
      <div className="space-y-0">
        {storySections.map((section, index) => (
          <section 
            key={section.id}
            className={`story-section-${section.id} grid lg:grid-cols-2 min-h-[70vh] items-center`}
          >
            {/* Visual Side */}
            <div className={`visual relative h-[50vh] lg:h-full w-full overflow-hidden ${
              section.align === 'image-left' ? 'lg:order-1' : 'lg:order-2'
            }`}>
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>

            {/* Content Side */}
            <div className={`content px-8 py-16 md:px-20 lg:py-0 flex flex-col justify-center ${
              section.align === 'image-left' ? 'lg:order-2' : 'lg:order-1'
            }`}>
              <span className="text-[#A99686] text-xs font-bold tracking-widest uppercase mb-4">
                0{index + 1}
              </span>
              <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#2A1F15] mb-6">
                {section.title}
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-[#555] max-w-md">
                {section.description}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* 4. FINAL CTA - Conversion Focus */}
      <section className="py-20 px-6 text-center  text-[#F6F1EC]">
        <div className="max-w-3xl mx-auto">
          <Link href={cta.link}>
            <button className="bg-[#B9A089] text-[#2B1E14] px-10 py-5 text-base tracking-widest uppercase hover:bg-[#F6F1EC] transition-all duration-300 transform hover:-translate-y-1 font-semibold shadow-lg">
              {cta.text}
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventLayout;
