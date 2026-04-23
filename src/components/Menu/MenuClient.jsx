"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import { menuCategories } from "@/Data/menu";
import MenuHero from "@/components/Menu/MenuHero";
import MenuTicker from "@/components/Menu/MenuTicker";
import MenuStickyNav from "@/components/Menu/MenuStickyNav";
import MenuIntro from "@/components/Menu/MenuIntro";
import MenuCategorySection from "@/components/Menu/MenuCategorySection";
import MenuFinalCTA from "@/components/Menu/MenuFinalCTA";
import MenuFloatingNav from "@/components/Menu/MenuFloatingNav";
import BrochureSection from "@/components/BrochureSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MenuClient() {
  const pageRef    = useRef(null);
  const tickerRef  = useRef(null);
  const [activeId, setActiveId]   = useState(menuCategories[0].id);
  const [navSticky, setNavSticky] = useState(false);

  const totalItems = menuCategories.reduce(
    (a, cat) => a + cat.subcategories.reduce((b, s) => b + s.items.length, 0), 0
  );

  useGSAP(
    () => {
      /* Hero entrance timeline */
      const tl = gsap.timeline({ delay: 0.1 });

      if (document.querySelector(".mh-eyebrow")) {
        tl.fromTo(".mh-eyebrow",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      }

      if (document.querySelectorAll(".mh-title-word").length > 0) {
        tl.fromTo(".mh-title-word",
          { opacity: 0, y: 80, rotationX: -20, transformPerspective: 1000 },
          { opacity: 1, y: 0, rotationX: 0, duration: 1.1, stagger: 0.1, ease: "power3.out" },
          "-=0.4");
      }

      if (document.querySelector(".mh-sub")) {
        tl.fromTo(".mh-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5");
      }

      if (document.querySelectorAll(".mh-stat").length > 0) {
        tl.fromTo(".mh-stat",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: "power3.out" },
          "-=0.4");
      }

      if (document.querySelector(".mh-cta")) {
        tl.fromTo(".mh-cta",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.3");
      }

      /* Hero bg parallax */
      if (document.querySelector(".mh-bg") && document.querySelector(".mh-section")) {
        gsap.to(".mh-bg", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: ".mh-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      /* Ticker */
      if (tickerRef.current) {
        gsap.to(tickerRef.current, { xPercent: -50, ease: "none", duration: 20, repeat: -1 });
      }

      /* Sticky nav sentinel */
      if (document.querySelector(".mh-sentinel")) {
        ScrollTrigger.create({
          trigger: ".mh-sentinel",
          start: "top top",
          onEnter: () => setNavSticky(true),
          onLeaveBack: () => setNavSticky(false),
        });
      }

      /* Active section tracking */
      menuCategories.forEach((cat) => {
        const el = document.getElementById(cat.slug);
        if (el) {
          ScrollTrigger.create({
            trigger: el,
            start: "top 45%",
            end: "bottom 45%",
            onEnter: () => setActiveId(cat.id),
            onEnterBack: () => setActiveId(cat.id),
          });
        }
      });
    },
    { scope: pageRef, dependencies: [] }
  );

  const scrollTo = (slug) =>
    document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div ref={pageRef} className="bg-[#FAF7F2] overflow-x-hidden">
      <MenuFloatingNav 
        categories={menuCategories} 
        activeId={activeId} 
        onSelect={scrollTo} 
      />

      <MenuHero 
        totalItems={totalItems} 
        menuCategories={menuCategories} 
        scrollTo={scrollTo} 
      />

      <MenuTicker 
        tickerRef={tickerRef} 
        categories={menuCategories} 
      />

      <MenuStickyNav 
        menuCategories={menuCategories} 
        activeId={activeId} 
        scrollTo={scrollTo} 
        navSticky={navSticky} 
      />

      <MenuIntro />
      <BrochureSection />

      <main>
        {menuCategories.map((cat, i) => (
          <MenuCategorySection 
            key={cat.id} 
            cat={cat} 
            index={i} 
          />
        ))}
      </main>

      <MenuFinalCTA />

      <Footer />
    </div>
  );
}
