"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AntiGravitySection = ({ children, className = "", stagger = false }) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      // Guard: window may not exist during SSR
      const isMobile = typeof window !== "undefined" && window.innerWidth <= 800;

      const target = stagger
        ? containerRef.current.children
        : containerRef.current;

      if (target && (stagger ? target.length > 0 : true)) {
        gsap.fromTo(
          target,
          {
            y: 60,
            opacity: 0,
            scale: 0.97,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power4.out",
            stagger: stagger ? 0.15 : 0,
            scrollTrigger: {
              trigger: containerRef.current,
              start: isMobile ? "top 95%" : "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: containerRef, dependencies: [stagger] }
  );

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

export default AntiGravitySection;