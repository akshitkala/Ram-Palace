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
    
    // Initialize LocomotiveScroll
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      locomotiveScroll = new LocomotiveScroll();
      
      // Ensure GSAP ScrollTrigger is aware of the new scroll layout
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500); // Wait a bit longer for Next.js hydration
    })();

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
