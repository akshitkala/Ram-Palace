"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import { menuCategories } from "@/Data/menu";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────
   Each category gets a hero image + number
───────────────────────────────────────────────────────── */
const CAT_META = {
  beverages:       { gradient: "from-[#2B1810] via-[#1A0D08] to-[#1A0D08]", accent: "bg-amber-500/10",   num: "01" },
  "soups-salads":  { gradient: "from-[#142010] via-[#0A1208] to-[#0A1208]", accent: "bg-emerald-500/10", num: "02" },
  fruits:          { gradient: "from-[#2B0C10] via-[#1A080A] to-[#1A080A]", accent: "bg-rose-500/10",    num: "03" },
  "savoury-house": { gradient: "from-[#2B1C10] via-[#1A0D08] to-[#1A0D08]", accent: "bg-orange-500/10", num: "04" },
  snacks:          { gradient: "from-[#1C1C1C] via-[#0F0F0F] to-[#0F0F0F]", accent: "bg-stone-500/10",  num: "05" },
  "live-stations": { gradient: "from-[#141416] via-[#0A0A0B] to-[#0A0A0B]", accent: "bg-zinc-500/10",   num: "06" },
  "indian-mains":  { gradient: "from-[#2B0E0E] via-[#1A0505] to-[#1A0505]", accent: "bg-red-500/10",     num: "07" },
  "breads-rice":   { gradient: "from-[#2B2310] via-[#1A1508] to-[#1A1508]", accent: "bg-yellow-500/10", num: "08" },
  desserts:        { gradient: "from-[#2B1020] via-[#1A0A15] to-[#1A0A15]", accent: "bg-pink-500/10",   num: "09" },
  "pheron-service":{ gradient: "from-[#10102B] via-[#0A0A1A] to-[#0A0A1A]", accent: "bg-indigo-500/10", num: "10" },
};

/* ─────────────────────────────────────────────────────────
   Ornamental divider
───────────────────────────────────────────────────────── */
const OrnamentDivider = () => (
  <div className="flex items-center justify-center gap-4 py-0">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/30" />
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5Z"
        fill="#C9A84C" fillOpacity="0.5"/>
    </svg>
    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/30" />
  </div>
);

/* ─────────────────────────────────────────────────────────
   Single dish item with hover animation
───────────────────────────────────────────────────────── */
const DishItem = ({ name }) => {
  const [hov, setHov] = useState(false);
  return (
    <li
      className="relative flex items-baseline justify-between gap-4 py-2.5
                 border-b border-[#EDE5D8]/80 last:border-0 cursor-default overflow-hidden"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span
        className={`absolute inset-0 bg-gradient-to-r from-[#C9A84C]/7 to-transparent
                    transition-transform duration-500 ease-out origin-left
                    ${hov ? "scale-x-100" : "scale-x-0"}`}
      />
      <span className="relative flex items-center gap-3">
        <span className={`w-1 h-1 rounded-full flex-shrink-0 transition-all duration-300
                          ${hov ? "bg-[#C9A84C] scale-150" : "bg-[#C9A84C]/30"}`} />
        <span className={`font-body text-sm md:text-[15px] leading-snug transition-colors duration-300
                          ${hov ? "text-[#2B1810]" : "text-[#4A3728]"}`}>
          {name}
        </span>
      </span>
      <span className={`relative font-body text-[#C9A84C] text-xs flex-shrink-0
                        transition-all duration-300
                        ${hov ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}`}>
        ✦
      </span>
    </li>
  );
};

/* ─────────────────────────────────────────────────────────
   Sub-category panel
───────────────────────────────────────────────────── */
const SubPanel = ({ sub }) => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 88%", once: true } }
      );
      gsap.fromTo(ref.current.querySelectorAll("li"),
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.03, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 86%", once: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="mb-10 last:mb-0">
      <div className="flex items-center gap-3 mb-5">
        <span className="font-body text-[9px] font-bold tracking-[0.4em] uppercase text-[#C9A84C]">
          {sub.title}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-[#C9A84C]/25 to-transparent" />
      </div>
      <ul>{sub.items.map((item, i) => <DishItem key={i} name={item} />)}</ul>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Category full-bleed hero banner
───────────────────────────────────────────────────── */
const CategoryHero = ({ cat, meta, index }) => {
  const ref = useRef(null);
  const isEven = index % 2 === 0;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ref.current.querySelector(".cbg"),
        { yPercent: 15, ease: "none",
          scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true } }
      );
      gsap.fromTo(ref.current.querySelector(".ctitle"),
        { opacity: 0, x: isEven ? -50 : 50 },
        { opacity: 1, x: 0, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } }
      );
      gsap.fromTo(ref.current.querySelector(".cnum"),
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.3, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const count = cat.subcategories.reduce((a, s) => a + s.items.length, 0);

  return (
    <div ref={ref} className="relative h-[35vh] min-h-[260px] overflow-hidden">
      {/* Dynamic Gradient Background */}
      <div className={`cbg absolute inset-0 w-full h-[120%] -top-[10%] bg-gradient-to-br ${meta.gradient}`} />
      
      {/* Decorative radial highlight */}
      <div className={`absolute inset-0 opacity-40 mix-blend-overlay ${meta.accent} blur-[120px] rounded-full scale-150`} />

      {/* Subtle Mesh Texture Layer */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      {/* Dark gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className={`absolute inset-0 bg-gradient-to-r
        ${isEven ? "from-black/40 via-transparent to-transparent"
                 : "from-transparent via-transparent to-black/40"}`} />

      {/* Large watermark number */}
      <div className={`cnum absolute top-1/2 -translate-y-1/2
                       font-heading leading-none select-none pointer-events-none
                       text-[140px] md:text-[200px] text-white/[0.04]
                       ${isEven ? "-right-4 md:right-10" : "-left-4 md:left-10"}`}>
        {meta.num}
      </div>

      {/* Text block — bottom anchored */}
      <div className={`ctitle absolute bottom-0 w-full px-8 md:px-14 lg:px-20 pb-8 md:pb-12
                       ${!isEven ? "text-right" : ""}`}>
        <div className={`flex items-center gap-3 mb-3 ${!isEven ? "justify-end" : ""}`}>
          <span className="font-body text-[#C9A84C] text-[9px] tracking-[0.45em] uppercase font-bold">
            {meta.num}
          </span>
          <span className="w-5 h-px bg-[#C9A84C]/40" />
          <span className="font-body text-white/40 text-[9px] tracking-[0.4em] uppercase">
            GD Foods India
          </span>
        </div>

        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-[70px] text-white leading-none mb-4">
          {cat.label}
        </h2>

        <div className={`flex items-center gap-3 ${!isEven ? "justify-end" : ""}`}>
          <span className="w-8 h-px bg-[#C9A84C]/60" />
          <span className="font-body text-[#C9A84C]/70 text-xs tracking-[3px] uppercase">
            {count} dishes
          </span>
          {cat.note && <>
            <span className="text-white/20">·</span>
            <span className="font-body italic text-white/35 text-xs">{cat.note}</span>
          </>}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────
   Full category block
───────────────────────────────────────────────────── */
const CategoryBlock = ({ cat, index }) => {
  const meta = CAT_META[cat.id] || { gradient: "from-[#2B0E0E] via-[#1A0505] to-[#1A0505]", accent: "bg-red-500/10", num: `0${index+1}` };
  const cols = cat.subcategories.length === 1 ? "max-w-2xl mx-auto"
             : cat.subcategories.length === 2 ? "grid md:grid-cols-2"
             : "grid md:grid-cols-2 lg:grid-cols-3";
  return (
    <article id={cat.slug}>
      <CategoryHero cat={cat} meta={meta} index={index} />
      <div className={`px-6 md:px-14 lg:px-20 py-12 md:py-16
                       ${index % 2 === 0 ? "bg-[#FAF7F2]" : "bg-white"}`}>
        <div className={`${cols} gap-x-14 gap-y-2`}>
          {cat.subcategories.map((sub, si) => <SubPanel key={si} sub={sub} />)}
        </div>
      </div>
      <OrnamentDivider />
    </article>
  );
};

/* ─────────────────────────────────────────────────────────
   Floating right-side dot nav (desktop)
───────────────────────────────────────────────────── */
const FloatingNav = ({ categories, activeId, onSelect }) => (
  <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
    {categories.map((cat) => {
      const active = activeId === cat.id;
      return (
        <button key={cat.id} onClick={() => onSelect(cat.slug)} title={cat.label}
          className="group relative flex items-center gap-2">
          <span className={`absolute right-6 font-body text-[9px] tracking-[2px] uppercase
                            bg-[#2B1810] text-[#C9A84C] px-3 py-1.5 rounded-md whitespace-nowrap
                            transition-all duration-300 pointer-events-none
                            ${active ? "opacity-100 translate-x-0"
                                     : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>
            {cat.label}
          </span>
          <span className={`block rounded-full transition-all duration-300 flex-shrink-0
                            ${active ? "w-3 h-3 bg-[#C9A84C] shadow-[0_0_10px_rgba(201,168,76,0.7)]"
                                     : "w-2 h-2 bg-[#C9A84C]/25 hover:bg-[#C9A84C]/55"}`} />
        </button>
      );
    })}
  </div>
);

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────── */
export default function MenuPage() {
  const pageRef    = useRef(null);
  const tickerRef  = useRef(null);
  const [activeId, setActiveId]   = useState(menuCategories[0].id);
  const [navSticky, setNavSticky] = useState(false);

  const TICKER = menuCategories.map(c => c.label);
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

      <FloatingNav categories={menuCategories} activeId={activeId} onSelect={scrollTo} />

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section className="mh-section relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#1A0D08]">
        <div className="mh-bg absolute inset-0 z-0 ">
          <Image
            src="/images/hero/Menu.png"
            alt=""
            fill
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-[#1A0D08]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A0D08]/55 via-transparent to-transparent" />
        </div>
        {/* Grain */}
        {/* TODO: migrate to <Image fill> for optimization */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize:"180px" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-14 lg:px-20 pb-20 md:pb-32">
          <div className="mh-eyebrow flex items-center gap-4 mb-10">
            <span className="w-10 h-px bg-[#C9A84C]" />
            <span className="font-body text-[#C9A84C] text-[10px] tracking-[0.45em] uppercase font-semibold">
              GD Foods India · Basti Ram Palace
            </span>
          </div>

          <h1 className="font-heading leading-[0.9] mb-8">
            <span className="mh-title-word block text-white text-[clamp(4rem,11vw,140px)]">The</span>
            <span className="mh-title-word block text-[#C9A84C] text-[clamp(4rem,11vw,140px)]">Menu</span>
          </h1>

          <p className="mh-sub font-heading-italic text-white/40 text-xl md:text-2xl lg:text-3xl mb-14 max-w-lg leading-relaxed">
            Where every dish tells a story of craft, care, and celebration.
          </p>

          <div className="flex flex-wrap gap-x-10 gap-y-5 mb-14">
            {[
              { target: totalItems, suffix: "+", label: "Dishes" },
              { target: 10,  suffix: "",  label: "Categories" },
              { target: 8,   suffix: "",  label: "Live Counters" },
              { target: 500, suffix: "+", label: "Events Catered" },
            ].map((s, i) => (
              <div key={i} className={`mh-stat ${i > 0 ? "border-l border-white/10 pl-10" : ""}`}>
                <div className="font-heading text-3xl md:text-4xl text-[#C9A84C] leading-none">
                  <span className="hero-count" data-target={s.target} data-suffix={s.suffix}>0{s.suffix}</span>
                </div>
                <div className="font-body text-white/30 text-[9px] tracking-[3px] uppercase mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mh-cta flex flex-col sm:flex-row gap-4">
            <button onClick={() => scrollTo(menuCategories[0].slug)}
              className="inline-flex items-center gap-2 bg-gradient-to-br from-[#C9A84C] to-[#A8883D]
                         text-[#1a0f08] font-body font-bold uppercase tracking-[0.18em]
                         px-9 py-4 rounded-lg text-sm transition-all duration-300
                         hover:shadow-[0_8px_32px_rgba(201,168,76,0.5)] hover:-translate-y-0.5">
              Browse Menu ↓
            </button>
            <Link href="/enquiry"
              className="inline-flex items-center gap-2 border border-white/20 text-white/60
                         font-body font-semibold uppercase tracking-[0.15em]
                         px-9 py-4 rounded-lg text-sm transition-all duration-300
                         hover:bg-white/6 hover:text-white/90">
              Request Custom Menu
            </Link>
          </div>
        </div>

        {/* Scroll line */}
        <div className="absolute bottom-8 right-10 z-10 hidden md:flex flex-col items-center gap-2">
          <div className="w-px h-14 bg-gradient-to-b from-transparent via-[#C9A84C]/50 to-transparent animate-pulse" />
          <span className="font-body text-white/20 text-[8px] tracking-[3px] uppercase">Scroll</span>
        </div>
      </section>

      {/* ════════════════════════ TICKER ════════════════════════ */}
      <div className="mh-sentinel bg-[#2B1810] py-3.5 overflow-hidden border-y border-[#C9A84C]/10">
        <div ref={tickerRef} className="flex w-max" aria-hidden="true">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="font-body text-[10px] tracking-[4px] uppercase text-[#C9A84C]/45 px-8">{item}</span>
              <span className="text-[#C9A84C]/20 text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════ STICKY NAV ════════════════════════ */}
      <div className={`sticky top-0 z-40 transition-all duration-300
                       ${navSticky ? "bg-white/96 backdrop-blur-md border-b border-[#EDE5D8] shadow-sm py-3"
                                   : "bg-[#FAF7F2] py-4"}`}>
        <div className="flex gap-2 overflow-x-auto px-6 md:px-14 max-w-7xl mx-auto"
             style={{ scrollbarWidth: "none" }}>
          {menuCategories.map((cat) => (
            <button key={cat.id} onClick={() => scrollTo(cat.slug)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs
                          font-body font-medium tracking-wide whitespace-nowrap flex-shrink-0
                          transition-all duration-300
                          ${activeId === cat.id
                            ? "bg-[#2B1810] text-[#C9A84C] border-[#2B1810] shadow-sm"
                            : "bg-white text-[#666] border-[#E0D8CC] hover:border-[#C9A84C]/50 hover:text-[#2B1810]"}`}>
              <span className="text-sm">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ════════════════════════ INTRO STATEMENT ════════════════════════ */}
      <div className="bg-white border-b border-[#EDE5D8]">
        <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-6 h-px bg-[#C9A84C]" />
                <span className="font-body text-[#C9A84C] text-[9px] tracking-[4px] uppercase font-bold">
                  Our Philosophy
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-5xl text-[#2B1810] leading-tight">
                Where Flavour<br />
                <em className="not-italic text-[#C9A84C]">Meets Precision</em>
              </h2>
            </div>
            <p className="font-body text-[#5A4A3A] text-base md:text-lg leading-relaxed">
              GD Foods India specializes in delivering thoughtfully curated catering
              solutions that balance great taste, consistency, and flawless execution.
              Every menu is planned with care, every dish prepared fresh, presented with
              precision, and delivered on time.
            </p>
          </div>
        </div>
      </div>

      {/* ════════════════════════ ALL MENU CATEGORIES ════════════════════════ */}
      <main>
        {menuCategories.map((cat, i) => (
          <CategoryBlock key={cat.id} cat={cat} index={i} />
        ))}
      </main>

      {/* ════════════════════════ FINAL CTA ════════════════════════ */}
      <section className="relative bg-[#2B1810] py-28 md:py-40 px-6 overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-[700px] h-[400px] bg-[#C9A84C]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-[#C9A84C]/15 pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-[#C9A84C]/15 pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-5 mb-10">
            <span className="w-14 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/35" />
            <span className="text-[#C9A84C]/45 text-xl">✦</span>
            <span className="w-14 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/35" />
          </div>
          <h2 className="font-heading text-4xl md:text-6xl text-white leading-tight mb-5">
            Craft Your Perfect<br />
            <em className="not-italic text-[#C9A84C]">Celebration Menu</em>
          </h2>
          <p className="font-body text-white/40 text-base leading-relaxed mb-12 max-w-md mx-auto">
            Every menu is fully customizable. Tell us your occasion, guest count,
            and preferences — we'll craft the experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/enquiry"
              className="inline-block bg-gradient-to-br from-[#C9A84C] to-[#A8883D]
                         text-[#1a0f08] font-body font-bold uppercase tracking-[0.18em]
                         px-10 py-4 rounded-lg text-sm transition-all duration-300
                         hover:shadow-[0_8px_32px_rgba(201,168,76,0.45)] hover:-translate-y-0.5">
              Request a Custom Menu
            </Link>
            <a href="https://wa.me/919650211469" target="_blank" rel="noopener noreferrer"
              className="inline-block border border-[#C9A84C]/35 text-[#C9A84C]
                         font-body font-semibold uppercase tracking-[0.15em]
                         px-10 py-4 rounded-lg text-sm transition-all duration-300
                         hover:bg-[#C9A84C]/10">
              WhatsApp Us
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-8 pt-10 mt-10 border-t border-white/8">
            {["+91-8800190003", "+91-9650211469", "+91-9810679550"].map((n) => (
              <a key={n} href={`tel:${n.replace(/-/g,"")}`}
                className="font-body text-white/20 text-sm tracking-wider hover:text-[#C9A84C] transition-colors">
                {n}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}