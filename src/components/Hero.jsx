import React, { useLayoutEffect, useRef } from "react";
import HeroImageAnimation from "./HeroImageAnimation";
import gsap from "gsap";

const Hero = () => {
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const fadeElements = gsap.utils.toArray(".fade-in");
      
      if (fadeElements.length === 0) return;

      gsap.fromTo(
        fadeElements,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0,
          delay: 1, // Wait for HeroImageAnimation to finish (1.5s)
          ease: "power2.out",
        }
      );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* Background Animation */}
      <HeroImageAnimation />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div ref={contentRef} className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        
        <h1 className="font-heading text-4xl leading-tight mb-6 text-[#F5F1EC] fade-in opacity-0">
          A Space for Unforgettable Celebrations
        </h1>

        <p className="text-lg leading-relaxed max-w-md mb-8 text-[#F5F1EC] fade-in opacity-0">
          An elegant banquet hall designed for weddings,
          receptions, corporate events, and private gatherings.
        </p>

        

      </div>
    </section>
  );
};

export default Hero;
