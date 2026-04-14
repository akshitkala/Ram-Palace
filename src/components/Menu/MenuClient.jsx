"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero entrance timeline */
      gsap.timeline({ delay: 0.1 })
        .fromTo(".mh-eyebrow",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .fromTo(".mh-title-word",
          { opacity: 0, y: 80, rotationX: -20, transformPerspective: 1000 },
          { opacity: 1, y: 0, rotationX: 0, duration: 1.1, stagger: 0.1, ease: "power3.out" },
          "-=0.4")
        .fromTo(".mh-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.5")
        .fromTo(".mh-stat",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.09, ease: "power3.out" },
          "-=0.4")
        .fromTo(".mh-cta",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.3");

      /* Hero bg parallax */
      gsap.to(".mh-bg", {
        yPercent: 20, ease: "none",
        scrollTrigger: { trigger: ".mh-section", start: "top top", end: "bottom top", scrub: true },
      });

      /* Ticker */
      gsap.to(tickerRef.current, { xPercent: -50, ease: "none", duration: 20, repeat: -1 });

      /* Sticky nav sentinel */
      ScrollTrigger.create({
        trigger: ".mh-sentinel",
        start: "top top",
        onEnter:     () => setNavSticky(true),
        onLeaveBack: () => setNavSticky(false),
      });

      /* Active section tracking */
      menuCategories.forEach((cat) => {
        ScrollTrigger.create({
          trigger: `#${cat.slug}`,
          start: "top 45%",
          end: "bottom 45%",
          onEnter:     () => setActiveId(cat.id),
          onEnterBack: () => setActiveId(cat.id),
        });
      });

      /* Count-up */
      gsap.utils.toArray(".hero-count").forEach((el) => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2, ease: "power2.out", delay: 1.1,
          onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
        });
      });

    }, pageRef);
    return () => ctx.revert();
  }, []);

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
