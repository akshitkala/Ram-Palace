"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AntiGravitySection = ({ children, className = "", stagger = false }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Guard: window may not exist during SSR
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 800;

    const ctx = gsap.context(() => {
      const target = stagger
        ? containerRef.current.children
        : containerRef.current;

      gsap.fromTo(
        target,
        {
          y: 60,          // was 150 — too aggressive, causes layout jank
          opacity: 0,
          scale: 0.97,    // was 0.9 — subtle scale, not tumbling
          // rotation removed — causes repaint on every frame, 
          // especially damaging on mobile with large images
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          stagger: stagger ? 0.15 : 0,  // was 0.2 — tighter sequence
          scrollTrigger: {
            trigger: containerRef.current,
            start: isMobile ? "top 95%" : "top 88%",
            toggleActions: "play none none none", // was "reverse" — sections
            // should stay visible when scrolling back up, not disappear
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default AntiGravitySection;