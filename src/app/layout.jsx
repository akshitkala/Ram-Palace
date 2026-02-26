"use client";

import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({ children }) {
  const scrollRef = useRef(null);
  const locoScrollRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!scrollRef.current) return;

    locoScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    return () => {
      if (locoScrollRef.current) {
        locoScrollRef.current.destroy();
        locoScrollRef.current = null;
      }
    };
  }, []);

  // Handle route changes
  useEffect(() => {
    window.scrollTo(0, 0);

    if (locoScrollRef.current) {
      setTimeout(() => {
        locoScrollRef.current.scrollTo(0, { duration: 0, disableLerp: true });
      }, 100);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <title>Basti Ram Palace</title>
        <meta name="description" content="A premium banquet hall for weddings, birthday parties, corporate events, and private celebrations in Basti, Uttar Pradesh." />
        <link rel="icon" type="image/png" href="/images/logo.png" />
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
