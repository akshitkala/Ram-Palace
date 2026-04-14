"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { GoldDivider } from "@/components/Ornaments";

const CAT_META = {
  beverages:       { gradient: "from-[#2B1810] via-[#1A0D08] to-[#1A0D08]", accent: "bg-amber-500/10",   num: "01", img: "/images/catering/catering-5.png" },
  "soups-salads":  { gradient: "from-[#142010] via-[#0A1208] to-[#0A1208]", accent: "bg-emerald-500/10", num: "02", img: "/images/catering/catering-6.png" },
  fruits:          { gradient: "from-[#2B0C10] via-[#1A080A] to-[#1A080A]", accent: "bg-rose-500/10",    num: "03", img: "/images/catering/catering-1.webp" },
  "savoury-house": { gradient: "from-[#2B1C10] via-[#1A0D08] to-[#1A0D08]", accent: "bg-orange-500/10", num: "04", img: "/images/catering/catering-2.webp" },
  snacks:          { gradient: "from-[#1C1C1C] via-[#0F0F0F] to-[#0F0F0F]", accent: "bg-stone-500/10",  num: "05", img: "/images/catering/catering-3.webp" },
  "live-stations": { gradient: "from-[#141416] via-[#0A0A0B] to-[#0A0A0B]", accent: "bg-zinc-500/10",   num: "06", img: "/images/catering/catering-4.webp" },
  "indian-mains":  { gradient: "from-[#2B0E0E] via-[#1A0505] to-[#1A0505]", accent: "bg-red-500/10",     num: "07", img: "/images/catering/catering-7.png" }, // BRP-FIX: C-1
  "breads-rice":   { gradient: "from-[#2B2310] via-[#1A1508] to-[#1A1508]", accent: "bg-yellow-500/10", num: "08", img: "/images/hero/hero.webp" },
  desserts:        { gradient: "from-[#2B1020] via-[#1A0A15] to-[#1A0A15]", accent: "bg-pink-500/10",   num: "09", img: "/images/hero/CateringHero.webp" },
  "pheron-service":{ gradient: "from-[#10102B] via-[#0A0A1A] to-[#0A0A1A]", accent: "bg-indigo-500/10", num: "10", img: "/images/hero/MenuHero.webp" },
};

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
                       ${isEven ? "-right-4 md:right-10" : "-left-4 md:left-10"}`}
           aria-hidden="true">
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

export default function MenuCategorySection({ cat, index }) {
  const meta = CAT_META[cat.id] || { gradient: "from-[#2B0E0E] via-[#1A0505] to-[#1A0505]", accent: "bg-red-500/10", num: `0${index+1}` };
  const cols = cat.subcategories.length === 1 ? "max-w-2xl mx-auto"
             : cat.subcategories.length === 2 ? "grid md:grid-cols-2"
             : "grid md:grid-cols-2 lg:grid-cols-3";

  return (
    <article id={cat.slug}>
      <CategoryHero cat={cat} meta={meta} index={index} />
      <div className={`px-6 md:px-14 lg:px-20 py-12 md:py-16 overflow-hidden
                       ${index % 2 === 0 ? "bg-[#FAF7F2]" : "bg-white"}`}>
        <div className={`${cols} gap-x-14 gap-y-2`}>
          {cat.subcategories.map((sub, si) => <SubPanel key={si} sub={sub} />)}
        </div>
      </div>
      <GoldDivider className="py-4" />
    </article>
  );
}
