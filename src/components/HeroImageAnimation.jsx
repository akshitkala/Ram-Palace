"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const bg = "/images/hero/bg.webp";
const palace = "/images/hero/palace.webp";

const HeroImageAnimation = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background Image: Subtle zoom out
      gsap.fromTo(
        ".bg-image",
        { scale: 1.3 },
        {
          scale: 1,
          duration: 2,
          ease: "power2.out",
        }
      );

      // Palace: Smooth rise from bottom
      gsap.to(".palace", {
        y: () => (window.innerWidth > 1024 ? "6%" : "14%"), // comes from bottom
        duration: 1.8,
        ease: "power4.out", // very smooth, premium feel
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      {/* Background (static) */}
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-110 bg-image"
      />

      {/* Palace (animated from bottom) */}
      <img
        src={palace}
        alt="Palace"
        className="absolute inset-0 w-full h-full object-cover palace translate-y-full brightness-110"
      />
    </div>
  );
};

export default HeroImageAnimation;
