"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import NavbarWrapper from "@/components/NavbarWrapper";

gsap.registerPlugin(ScrollTrigger);

export default function ClientLayoutWrapper({ children }) {
  const scrollRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
    
    // Ensure GSAP ScrollTrigger is aware of the new scroll container's layout
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

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
