"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MENU_TICKER = [
  "Dal Makhani", "Paneer Tikka", "Jalebi with Rabri", "Gol Gappe",
  "Kulfi Mania", "Hakka Noddles", "Stone-Fired Pizza", "Ras Malai",
  "Vergin Mojito", "Dum Aloo", "Gulab Jamun", "Masala Kullad Tea",
  "Kadhai Paneer", "Veg Biryani", "Shahi Tukda", "Pina Colada",
];

const CATEGORIES = [
  { icon: "🍢", label: "Chaat & Starters" },
  { icon: "🍛", label: "Indian Mains" },
  { icon: "🌍", label: "Live Multi-Cuisine" },
  { icon: "🍮", label: "Desserts & Sweets" },
  { icon: "🥤", label: "Mocktail Bar" },
  { icon: "🫕", label: "Soups & Salads" },
];

const STATS = [
  { num: "200", suffix: "+", label: "Menu Items" },
  { num: "8",   suffix: "",  label: "Live Counters" },
  { num: "14",  suffix: "",  label: "Corporate Clients" },
];

const CLIENTS = [
  "Sandvik", "Huawei", "Vatika", "Masters' Union",
  "Eli Lilly", "IICA", "Eugenix", "Unicosmos",
];

const CateringFeature = () => {
  const sectionRef = useRef(null);
  const tickerRef  = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Gold rule expands in
      gsap.fromTo(".cf-rule",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      // Left text block stagger
      gsap.fromTo(".cf-left > *",
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0, duration: 0.85, stagger: 0.11,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cf-left", start: "top 78%" },
        }
      );

      // Right image
      gsap.fromTo(".cf-img-wrap",
        { opacity: 0, scale: 0.95, y: 20 },
        {
          opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ".cf-img-wrap", start: "top 80%" },
        }
      );

      // Chips stagger
      gsap.fromTo(".cf-chip",
        { opacity: 0, y: 16 },
        {
          opacity: 1, y: 0, duration: 0.45, stagger: 0.06,
          ease: "back.out(1.5)",
          scrollTrigger: { trigger: ".cf-chips", start: "top 84%" },
        }
      );

      // Count-up stats
      gsap.utils.toArray(".cf-count").forEach((el) => {
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 1.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
        });
      });

      // Parallax on image
      gsap.to(".cf-img-wrap img", {
        yPercent: -6, ease: "none",
        scrollTrigger: {
          trigger: ".cf-img-wrap",
          start: "top bottom", end: "bottom top", scrub: true,
        },
      });

      // Ticker
      gsap.to(tickerRef.current, {
        xPercent: -50, ease: "none", duration: 30, repeat: -1,
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FAF7F2] overflow-hidden"
    >
      {/* ── Top gold rule ── */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />

      {/* ── Faint watermark ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   font-heading text-[18vw] leading-none text-[#2B1810]/[0.025]
                   pointer-events-none select-none whitespace-nowrap"
        aria-hidden="true"
      >
        GD Foods
      </div>

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT ── */}
          <div className="cf-left flex flex-col">

            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <div className="cf-rule w-8 h-px bg-[#C9A84C]" />
              <span className="font-body text-[#C9A84C] text-[10px] tracking-[4px] uppercase font-semibold">
                Catering Partner
              </span>
            </div>

            <p className="font-body text-[#8B7A6A] text-sm tracking-widest uppercase mb-2">
              Powered by
            </p>

            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-[#2B1810] leading-[1.0] mb-2">
              GD Foods
              <em className="not-italic text-[#C9A84C]"> India</em>
            </h2>
            <p className="font-heading-italic text-[#8B7A6A] text-2xl md:text-3xl mb-10">
              Basti Ram Palace's Culinary Soul
            </p>

            <p className="font-body text-[#5A4A3A] text-base md:text-lg leading-relaxed mb-5 max-w-lg">
              Every celebration at Basti Ram Palace is elevated by GD Foods India —
              renowned for flavorful, hygienic, and thoughtfully crafted cuisine.
              From live counters to traditional Indian mains, they craft the food
              that makes your guests remember the night forever.
            </p>
            <p className="font-body text-[#8B7A6A] text-sm leading-relaxed mb-12 max-w-lg">
              Trusted by Sandvik, Huawei, Masters' Union, Vatika Group, and over
              a dozen leading organizations across the region.
            </p>

            {/* Stats */}
            <div className="flex gap-0 mb-12">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex-1 ${i > 0 ? "border-l border-[#D5C9B8] pl-6" : "pr-6"}`}
                >
                  <div className="font-heading text-3xl md:text-4xl text-[#2B1810] leading-none mb-1">
                    <span className="cf-count" data-target={s.num} data-suffix={s.suffix}>
                      0{s.suffix}
                    </span>
                  </div>
                  <div className="font-body text-[#8B7A6A] text-[10px] tracking-[2px] uppercase mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Chips */}
            <div className="cf-chips flex flex-wrap gap-2 mb-12">
              {CATEGORIES.map((cat) => (
                <span
                  key={cat.label}
                  className="cf-chip flex items-center gap-2 bg-white
                             border border-[#D5C9B8] text-[#5A4A3A]
                             font-body text-xs tracking-wide px-4 py-2 rounded-full
                             hover:border-[#C9A84C] hover:text-[#2B1810] hover:bg-[#FDF8EE]
                             transition-all duration-300 cursor-default"
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/catering/menu"
                className="inline-flex items-center justify-center gap-2
                           bg-gradient-to-br from-[#C9A84C] to-[#A8883D] text-white
                           font-body font-bold uppercase tracking-[0.15em]
                           px-8 py-4 rounded-lg text-sm
                           shadow-[0_4px_20px_rgba(201,168,76,0.3)]
                           transition-all duration-300
                           hover:shadow-[0_8px_32px_rgba(201,168,76,0.45)] hover:-translate-y-0.5"
              >
                Explore Full Menu →
              </Link>
              <Link
                href="/enquiry"
                className="inline-flex items-center justify-center
                           border border-[#2B1810]/20 text-[#2B1810]/70 bg-white
                           font-body font-semibold uppercase tracking-[0.15em]
                           px-8 py-4 rounded-lg text-sm
                           transition-all duration-300
                           hover:border-[#2B1810]/50 hover:text-[#2B1810]"
              >
                Request Menu Package
              </Link>
            </div>
          </div>

          {/* ── RIGHT: IMAGE ── */}
          <div className="cf-img-wrap relative hidden lg:block">

            <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(43,24,16,0.15)]">
              <img
                src="/images/cateringHome.jpg"
                alt="GD Foods India catering spread"
                className="w-full h-[560px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B1810]/15 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Gold badge */}
            <div className="absolute -top-5 -left-5 bg-[#2B1810] text-[#C9A84C] px-4 py-3 shadow-xl rounded-xl">
              <p className="font-body text-[9px] tracking-[3px] uppercase font-bold leading-none mb-1 opacity-60">
                Est. Catering Partner
              </p>
              <p className="font-heading text-lg font-semibold leading-none">
                GD Foods India
              </p>
            </div>

            {/* Live counters card */}
            <div className="absolute -bottom-6 -left-6 bg-white border border-[#EDE5D8] rounded-xl px-5 py-4 shadow-lg w-52">
              <p className="font-body text-[#C9A84C] text-[9px] tracking-[3px] uppercase mb-3 font-semibold">
                Live Counters
              </p>
              <div className="space-y-1.5">
                {["Stone-Fired Pizzeria", "Italian Pasta Bar", "Chandni Chowk Special", "South Indian Corner"].map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/50 flex-shrink-0" />
                    <span className="font-body text-[#5A4A3A] text-[11px]">{c}</span>
                  </div>
                ))}
                <p className="font-body text-[#8B7A6A] text-[10px] pt-1">+ 4 more stations</p>
              </div>
            </div>

            {/* Corner accents */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t border-r border-[#C9A84C]/35 rounded-tr-2xl pointer-events-none" />
            <div className="absolute -bottom-3 right-20 w-16 h-16 border-b border-r border-[#C9A84C]/20 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* ══════════════ TICKER ══════════════ */}
      <div className="border-t border-[#EDE5D8] bg-white py-4 overflow-hidden">
        <div ref={tickerRef} className="flex w-max" aria-hidden="true">
          {[...MENU_TICKER, ...MENU_TICKER].map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="font-body text-[10px] tracking-[3px] uppercase text-[#8B7A6A] px-6">
                {item}
              </span>
              <span className="text-[#C9A84C]/40 text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════ TRUSTED BY ══════════════ */}
      <div className="border-t border-[#EDE5D8] bg-[#F5F0E8] py-7 px-6 md:px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-10">
          <p className="font-body text-[#8B7A6A] text-[10px] tracking-[3px] uppercase whitespace-nowrap flex-shrink-0">
            Trusted by
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {CLIENTS.map((name) => (
              <span
                key={name}
                className="font-body text-[#B0A090] text-xs tracking-[2px] uppercase
                           hover:text-[#2B1810] transition-colors duration-300 cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A84C]/20 to-transparent" />
    </section>
  );
};

export default CateringFeature;