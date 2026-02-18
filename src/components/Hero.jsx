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
          y: 100,
          filter: "blur(15px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: 0.2,
          delay: 0.5, // Wait for HeroImageAnimation to finish (1.5s)
          ease: "power4.out",
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
      <div ref={contentRef} className="relative z-10 w-full h-full">
        
        {/* Main Heading - Bottom Left on Desktop, Centered on Mobile */}
        <div className="absolute w-full px-6 text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:text-left md:top-auto md:translate-y-0 md:left-24 md:bottom-24 md:w-[60%] md:px-0 md:translate-x-0">
          <h1 className="font-heading text-4xl md:text-7xl leading-tight text-[#F5F1EC] fade-in opacity-0 drop-shadow-md">
            A Space for Unforgettable Celebrations
          </h1>
        </div>

        {/* Subtext - Bottom Right on Desktop, Below Heading on Mobile */}
        <div className="absolute w-full px-6 text-center top-[65%] left-1/2 -translate-x-1/2 md:text-right md:top-auto md:left-auto md:right-24 md:bottom-24 md:w-auto md:max-w-xs md:translate-x-0 md:px-0">
          <p className="text-lg md:text-base leading-relaxed text-[#F5F1EC] fade-in opacity-0 drop-shadow-md">
            An elegant banquet hall designed for weddings,
            receptions, corporate events, and private gatherings.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Hero;
