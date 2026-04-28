"use client";

import { useEffect, useRef } from "react";
// Dynamic import used in useEffect to ensure client-only initialization
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavbarWrapper from "@/components/NavbarWrapper";

gsap.registerPlugin(ScrollTrigger);

export default function ClientLayoutWrapper({ children }) {
  const scrollRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    let locomotiveScroll;
    
    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;
        locomotiveScroll = new LocomotiveScroll({
          lenisOptions: {
            lerp: 0.05,
            duration: 1.5,
            smoothWheel: true,
            wheelMultiplier: 1,
          }
        });
        
        // Use custom event or smaller timeout for better UX
        // Locomotive v5 is quite fast, but GSAP needs to know about the new height
        ScrollTrigger.refresh();
      } catch (err) {
        console.error("LocomotiveScroll init error:", err);
      }
    };

    initScroll();

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, [pathname]);

  return (
    <div data-scroll-container ref={scrollRef} className="overflow-x-hidden">
      <NavbarWrapper />
      {children}
    </div>
  );
}
