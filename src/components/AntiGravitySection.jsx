import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AntiGravitySection = ({ children, className = "", stagger = false }) => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // If stagger is true, animate immediate children
      const target = stagger ? containerRef.current.children : containerRef.current;
      
      gsap.fromTo(
        target,
        {
          y: 150,
          opacity: 0,
          scale: 0.9,
          rotation: stagger ? 0 : 2, // Slight rotation for single sections
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.8,
          ease: "power4.out", // Luxurious ease
          stagger: stagger ? 0.2 : 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: window.innerWidth < 768 ? "top 95%" : "top 85%", // Trigger earlier on mobile
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <div ref={containerRef} className={`${className} will-change-transform`}>
      {children}
    </div>
  );
};

export default AntiGravitySection;
