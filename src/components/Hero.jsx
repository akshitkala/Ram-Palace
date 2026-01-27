import React, { useEffect, useRef } from "react";
import HeroImageAnimation from "./HeroImageAnimation";
import gsap from "gsap";

const Hero = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".fade-in");

      gsap.fromTo(
        elements,
        {
          y: 20,
        },
        {
          y: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.1,
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* Background Animation */}
      <HeroImageAnimation />

      {/* Overlay (OK, this is fine) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <h1 className="font-heading text-4xl leading-tight mb-6 text-[#F5F1EC] fade-in">
          A Space for Unforgettable Celebrations
        </h1>

        <p className="text-lg leading-relaxed max-w-md mb-8 text-[#F5F1EC] fade-in">
          An elegant banquet hall designed for weddings,
          receptions, corporate events, and private gatherings.
        </p>
      </div>
    </section>
  );
};

export default Hero;
