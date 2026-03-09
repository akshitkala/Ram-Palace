"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import "./globals.css";

gsap.registerPlugin(ScrollTrigger);

export default function RootLayout({ children }) {
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
    <html lang="en">
      <head>
        <title>Basti Ram Palace</title>
        <meta name="description" content="A premium banquet hall for weddings, birthday parties, corporate events, and private celebrations in Basti, Uttar Pradesh." />
        <link rel="icon" type="image/png" href="/images/branding/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <div data-scroll-container ref={scrollRef} className="overflow-x-hidden">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
