"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";

/* ─────────────────────────────────────────────
   DESIGN APPROACH
   ─────────────────────────────────────────────
   • Section = 100svh, min-height 600px floor
   • Three-row flex column (stretch):
       Row 1 — spacer (absorbs navbar height)
       Row 2 — main content (flex-1, flex-col, justify-end)
       Row 3 — bottom bar (stats + divider)
   • Zero absolute positioning for any content
   • clamp() on every font size and spacing value
   • Mobile: single column, centered or left-aligned
   • Tablet 768-1023: left-aligned, badge floats right in same row
   • Desktop 1024+: two-column grid, badge + subtext in right col
   • Ultrawide: max-w-[1440px] container caps layout drift
   • GSAP initial states set via gsap.set() — no opacity-0 classes
   ───────────────────────────────────────────── */

const STATS = [
  { value: "GD Foods India", label: "Catering Partner" },
  { value: "Multi-Cuisine",  label: "Extensive Menu"   },
  { value: "Live Counters",  label: "Chef-Led Stations" },
];

const MAPS_URL =
  "https://www.google.com/maps/place/Basti+Ram+Palace/@28.3919789,76.9144771,17z";

const StarIcon = ({ size = 10 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#C9A84C" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const PinIcon = () => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" className="text-white/60">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="9" r="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RatingBadge = ({ className = "" }) => (
  <a
    href={MAPS_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="4.8 stars on Google Maps — view location"
    className={`
      inline-flex items-center gap-2 shrink-0
      bg-[#0A0805]/90 backdrop-blur-xl
      border border-[#C9A84C]/35
      rounded-full px-3.5 py-2
      hover:border-[#C9A84C] hover:bg-[#0A0805]
      transition-all duration-300
      ${className}
    `}
  >
    <span className="text-white font-semibold text-[13px] leading-none">4.8</span>
    <StarIcon size={10} />
    <span className="w-px h-3 bg-white/20 block" />
    <PinIcon />
    <span className="text-white/70 font-medium uppercase tracking-[1.5px] text-[9px]">
      Google
    </span>
  </a>
);

export default function Hero() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      /* Set initial hidden states in JS — never rely on Tailwind opacity-0 */
      gsap.set(".h-bg", { scale: 1.07 });
      gsap.set([
        ".h-line", ".h-eyebrow",
        ".h-heading", ".h-desc",
        ".h-cta-1", ".h-cta-2", ".h-badge",
        ".h-subtext", ".h-stat", ".h-divider",
        ".h-scroll",
      ], { opacity: 0 });
      gsap.set(".h-heading", { y: 36, filter: "blur(5px)" });
      gsap.set([".h-eyebrow", ".h-desc", ".h-subtext"], { y: 18 });
      gsap.set([".h-cta-1", ".h-cta-2"], { y: 14 });
      gsap.set(".h-stat", { y: 12 });
      gsap.set(".h-badge", { scale: 0.92 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* 1 — Background cinematic zoom */
      tl.to(".h-bg", { scale: 1, duration: 2.8, ease: "power2.out" }, 0);

      /* 2 — Decorative line draws */
      tl.to(".h-line", {
        opacity: 1, scaleX: 1, duration: 1,
        ease: "power2.inOut",
        transformOrigin: "left center",
      }, 0.4);

      /* 3 — Eyebrow */
      tl.to(".h-eyebrow", { opacity: 1, y: 0, duration: 0.8 }, 0.55);

      /* 4 — Heading lines stagger */
      tl.to(".h-heading", {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 1.1, stagger: 0.13,
      }, 0.7);

      /* 5 — Description */
      tl.to(".h-desc", { opacity: 1, y: 0, duration: 0.85 }, 1.0);

      /* 6 — CTAs */
      tl.to(".h-cta-1", { opacity: 1, y: 0, duration: 0.7 }, 1.15);
      tl.to(".h-cta-2", { opacity: 1, y: 0, duration: 0.7 }, 1.25);

      /* 7 — Badge */
      tl.to(".h-badge", { opacity: 1, scale: 1, duration: 0.65 }, 1.35);

      /* 8 — Right subtext (desktop) */
      tl.to(".h-subtext", { opacity: 1, y: 0, duration: 0.8 }, 1.2);

      /* 9 — Stats + divider */
      tl.to(".h-divider", { opacity: 1, duration: 0.6 }, 1.4);
      tl.to(".h-stat", { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 }, 1.45);

      /* 10 — Scroll indicator */
      tl.to(".h-scroll", { opacity: 1, duration: 0.8 }, 1.9);
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Basti Ram Palace — hero banner"
      className="relative w-full bg-[#0A0805] overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >

      {/* ══════════════════════════════════════
          BACKGROUND IMAGE
      ══════════════════════════════════════ */}
      <div className="absolute inset-0 will-change-transform">
        <Image
          className="h-bg absolute inset-0 w-full h-full object-cover"
          src="/images/hero/hero.webp"
          alt="Basti Ram Palace banquet hall — premier wedding venue in Manesar, Gurugram"
          fill
          priority
          fetchPriority="high"
          quality={85}
          sizes="100vw"
          style={{ objectPosition: "center 35%" }}
        />
      </div>

      {/* ══════════════════════════════════════
          GRADIENT OVERLAYS  (inert layer)
      ══════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Global dim */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Bottom content fade — strong, always */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,8,5,0.97) 0%, rgba(10,8,5,0.80) 20%, rgba(10,8,5,0.45) 42%, rgba(10,8,5,0.10) 60%, transparent 75%)",
          }}
        />

        {/* Top navbar fade */}
        <div
          className="absolute top-0 inset-x-0"
          style={{
            height: "160px",
            background: "linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, transparent 100%)",
          }}
        />

        {/* Left content fade — desktop only */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(to right, rgba(10,8,5,0.75) 0%, rgba(10,8,5,0.35) 42%, rgba(10,8,5,0.05) 65%, transparent 80%)",
          }}
        />
      </div>

      {/* ══════════════════════════════════════
          CONTENT  (flex column, full height)
          Row A: navbar spacer
          Row B: main content  (flex-1)
          Row C: bottom stats bar
      ══════════════════════════════════════ */}
      <div className="relative z-10 h-full flex flex-col">

        {/* ── ROW A: Navbar spacer ── */}
        <div className="shrink-0" style={{ height: "clamp(56px, 10vh, 100px)" }} />

        {/* ── ROW B: Main content — fills remaining space, pushes to bottom ── */}
        <div className="flex-1 flex items-end">
          <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20 pb-0">

            {/*
              TWO-COLUMN GRID
              · col 1 (left) : eyebrow + heading + desc + CTAs  [always visible]
              · col 2 (right): badge + subtext                   [md+ only]
            */}
            <div
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-end"
              style={{ gap: "clamp(24px, 4vw, 64px)" }}
            >

              {/* ── LEFT COLUMN ── */}
              <div
                className="flex flex-col"
                style={{ gap: "clamp(14px, 2.2vw, 22px)", maxWidth: "700px" }}
              >
                {/* Eyebrow */}
                <div className="flex items-center" style={{ gap: "clamp(10px, 1.5vw, 16px)" }}>
                  <span
                    className="h-line block bg-[#C9A84C]"
                    style={{ width: "clamp(28px, 4vw, 52px)", height: "1px" }}
                  />
                  <span
                    className="h-eyebrow text-[#C9A84C] uppercase font-medium tracking-[3px]"
                    style={{ fontSize: "clamp(9px, 1.3vw, 11px)" }}
                  >
                    Manesar, Gurugram
                  </span>
                </div>

                {/* Heading */}
                <h1
                  className="font-heading text-white leading-[1.08]"
                  style={{ fontSize: "clamp(2rem, 5.8vw, 72px)" }}
                >
                  <span
                    className="h-heading block"
                    style={{ textShadow: "0 4px 24px rgba(0,0,0,0.65)" }}
                  >
                    The Finest Wedding
                  </span>
                  <span
                    className="h-heading block"
                    style={{ textShadow: "0 4px 24px rgba(0,0,0,0.65)" }}
                  >
                    Venue{" "}
                    <em className="not-italic text-[#C9A84C]">in Gurugram</em>
                  </span>
                </h1>

                {/* Description */}
                <p
                  className="h-desc text-white/70 font-light leading-relaxed"
                  style={{
                    fontSize: "clamp(13px, 1.6vw, 15px)",
                    maxWidth: "clamp(260px, 42vw, 460px)",
                  }}
                >
                  {/* Shorter on mobile, fuller on sm+ */}
                  <span className="hidden sm:inline">
                    A trusted name for celebrations across Gurugram and Delhi NCR —
                    from intimate family gatherings to grand wedding events.
                  </span>
                  <span className="sm:hidden">
                    Grand celebrations &amp; intimate gatherings — unforgettable moments.
                  </span>
                </p>

                {/* ── CTA ROW ──
                    Flex row on sm+, stacked on 320px.
                    Badge lives here on mobile only, as a separate item
                    after the two buttons so it wraps to its own line
                    when needed (flex-wrap).
                */}
                <div
                  className="flex flex-wrap items-center"
                  style={{ gap: "clamp(8px, 1.5vw, 14px)" }}
                >
                  {/* Primary CTA */}
                  <Link 
                    href="/contact" 
                    className="h-cta-1 shrink-0 bg-[#C9A84C] text-[#1C1C1E] font-semibold uppercase rounded-lg
                      transition-all duration-300 inline-block text-center
                      hover:bg-[#b8963e] hover:shadow-[0_8px_28px_rgba(201,168,76,0.40)]
                      active:scale-[0.97] whitespace-nowrap"
                    style={{
                      fontSize: "clamp(10px, 1.3vw, 11.5px)",
                      letterSpacing: "clamp(1.2px, 0.25vw, 2.5px)",
                      padding: "clamp(11px, 1.4vw, 15px) clamp(20px, 2.8vw, 34px)",
                    }}
                  >
                    Reserve Your Date
                  </Link>

                  {/* Secondary CTA */}
                  <Link 
                    href="/gallery" 
                    className="h-cta-2 shrink-0 bg-transparent text-white border border-white/55 font-semibold
                      uppercase rounded-lg transition-all duration-300 inline-block text-center
                      hover:bg-white/10 hover:border-white/85
                      active:scale-[0.97] whitespace-nowrap"
                    style={{
                      fontSize: "clamp(10px, 1.3vw, 11.5px)",
                      letterSpacing: "clamp(1.2px, 0.25vw, 2.5px)",
                      padding: "clamp(11px, 1.4vw, 15px) clamp(20px, 2.8vw, 34px)",
                      textShadow: "0 1px 6px rgba(0,0,0,0.55)",
                    }}
                  >
                    Explore Venue
                  </Link>

                  {/* Rating badge — mobile only, wraps to own row naturally */}
                  <div className="h-badge md:hidden shrink-0">
                    <RatingBadge />
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN — md+ only ── */}
              <div className="hidden md:flex flex-col items-end justify-end pb-0.5"
                style={{ gap: "clamp(16px, 2.5vw, 28px)", minWidth: "200px", maxWidth: "280px" }}>

                {/* Google Rating Badge */}
                <div className="h-badge">
                  <RatingBadge />
                </div>

                {/* Subtext */}
                <p
                  className="h-subtext text-right text-white/65 font-light leading-relaxed"
                  style={{ fontSize: "clamp(12px, 1.3vw, 14px)" }}
                >
                  Hosting events of every scale —<br />
                  from intimate family gatherings<br />
                  to grand wedding celebrations.
                </p>
              </div>

            </div>{/* /grid */}
          </div>
        </div>{/* /ROW B */}

        {/* ── ROW C: Bottom stats bar ── */}
        <div
          className="shrink-0 w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-20"
          style={{ paddingTop: "clamp(16px, 2.5vw, 24px)", paddingBottom: "clamp(20px, 3vw, 32px)" }}
        >
          {/* Divider */}
          <div
            className="h-divider w-full mb-0"
            style={{
              height: "0.5px",
              background: "linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 100%)",
              marginBottom: "clamp(14px, 2vw, 22px)",
            }}
          />

          {/* Stats row — scrollable on tiny screens */}
          <div
            className="flex items-start overflow-x-auto pb-0.5 scrollbar-hide"
            style={{ gap: "clamp(24px, 5vw, 72px)" }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="h-stat flex flex-col shrink-0"
                style={{ gap: "clamp(3px, 0.5vw, 6px)" }}
              >
                <span
                  className="font-heading text-[#C9A84C] font-light leading-none whitespace-nowrap"
                  style={{
                    fontSize: "clamp(13px, 2vw, 21px)",
                    textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                  }}
                >
                  {s.value}
                </span>
                <span
                  className="text-white/45 uppercase tracking-[2px] whitespace-nowrap"
                  style={{ fontSize: "clamp(8px, 0.9vw, 10px)" }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>{/* /ROW C */}

      </div>{/* /flex column */}

      {/* ══════════════════════════════════════
          SCROLL INDICATOR — absolute, safe corner
          Does not affect content flow at all.
      ══════════════════════════════════════ */}
      <div
        className="h-scroll absolute bottom-6 right-5 sm:bottom-8 sm:right-7 z-20
          flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="text-white/35 uppercase tracking-[2px] hidden sm:block"
          style={{ fontSize: "8px", writingMode: "vertical-lr" }}
        >
          Scroll
        </span>
        <div
          className="w-px"
          style={{
            height: "clamp(28px, 4vh, 44px)",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)",
          }}
        />
      </div>

    </section>
  );
}