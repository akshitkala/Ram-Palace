"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GoldThread } from "./EventAnimations";
import { EventNavTabs } from "./EventNavTabs";
import Footer from "@/components/Footer";
import AntiGravitySection from "@/components/AntiGravitySection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const cloudinaryUrl = (tag) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dogwrr4tq";
  return `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/ram-palace/events/${tag}`;
};

const FALLBACK_IMAGES = {
  weddings: [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2074&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1460364155252-97b4352f129c?q=80&w=2069&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1544132411-bdc2a933b93a?q=80&w=2070&auto=format&fit=cover"
  ],
  corporate: [
    "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=2070&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=2070&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1540575861501-7ad060e39fe1?q=80&w=2070&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=cover"
  ],
  "private-parties": [
    "https://images.unsplash.com/photo-1464366427604-47e0ef38f161?q=80&w=2071&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1514525253361-bee8a187499b?q=80&w=1974&auto=format&fit=cover",
    "https://images.unsplash.com/photo-1496337589254-7e19d01cedf8?q=80&w=2070&auto=format&fit=cover"
  ]
};

const GalleryImage = ({ src, fallback, sizes, i, totalImages }) => {
  const [err, setErr] = useState(false);
  return (
    <>
      <Image
        fill
        sizes={sizes}
        src={err ? fallback : src}
        alt=""
        style={{ objectFit: "cover" }}
        onError={() => setErr(true)}
      />
      {i === 4 && totalImages > 4 && (
        <Link href="/gallery" className="gm-more-overlay">
          +{totalImages - 4} photos
        </Link>
      )}
      <div className="gm-hover-overlay" />
    </>
  );
};

export default function EventPageTemplate({
  eventType,
  hero,
  intro,
  stats,
  features,
  intro2,
  galleryTag,
  cta,
}) {
  const [heroError, setHeroError] = useState(false);
  // ─── Refs ───────────────────────────────────────────────────────────
  const rootRef     = useRef(null);
  const badgeRef    = useRef(null);
  const titleRef    = useRef(null);
  const subRef      = useRef(null);
  const scrollIndRef = useRef(null);

  const eyebrowRef  = useRef(null);
  const introHRef   = useRef(null);
  const ruleRef     = useRef(null);
  const p1Ref       = useRef(null);
  const p2Ref       = useRef(null);

  // Fixed-length refs — always 4 stats, always 6 features, always 5 gallery cells, always 4 tags
  const statRefs      = useRef([null, null, null, null]);
  const numRefs       = useRef([null, null, null, null]);
  const barRefs       = useRef([null, null, null, null]);
  const fcRefs        = useRef([null, null, null, null, null, null]);
  const galleryRefs   = useRef([null, null, null, null, null]);
  const tagRefs       = useRef([null, null, null, null]);

  const catEyeRef    = useRef(null);
  const catHRef      = useRef(null);
  const catPRef      = useRef(null);
  const catBadgeRef  = useRef(null);

  const ctaH1Ref     = useRef(null);
  const ctaSubRef    = useRef(null);
  const ctaBtnsRef   = useRef(null);

  // ─── Gallery state ──────────────────────────────────────────────────
  const [images, setImages]           = useState([]);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    fetch(`/api/images?section=${galleryTag}`)
      .then((r) => r.json())
      .then((data) => {
        const imgs = data.images || [];
        if (imgs.length === 0 && FALLBACK_IMAGES[galleryTag]) {
          // Use Unsplash fallbacks if no gallery images found
          const fallbacks = FALLBACK_IMAGES[galleryTag].map((url, idx) => ({
            public_id: `fallback-${idx}`,
            secure_url: url,
            isFallback: true
          }));
          setImages(fallbacks.slice(0, 5));
          setTotalImages(fallbacks.length);
        } else {
          setImages(imgs.slice(0, 5));
          setTotalImages(imgs.length);
        }
      })
      .catch(() => {
        if (FALLBACK_IMAGES[galleryTag]) {
          const fallbacks = FALLBACK_IMAGES[galleryTag].map((url, idx) => ({
            public_id: `fallback-${idx}`,
            secure_url: url,
            isFallback: true
          }));
          setImages(fallbacks.slice(0, 5));
          setTotalImages(fallbacks.length);
        }
      });
  }, [galleryTag]);

  // ─── All GSAP animations in one useGSAP  ────────────────────────────
  useGSAP(() => {
    // HERO — fires immediately (no ScrollTrigger)
    if (badgeRef.current) gsap.fromTo(badgeRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power3.out" });
    if (titleRef.current) {
      const lines = titleRef.current.querySelectorAll(".reveal-line");
      gsap.fromTo(lines, { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.72, stagger: 0.12, delay: 0.3, ease: "power3.out" });
    }
    if (subRef.current) gsap.fromTo(subRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.65, ease: "power3.out" });
    if (scrollIndRef.current) {
      const line = scrollIndRef.current.querySelector(".scroll-line");
      const text = scrollIndRef.current.querySelector(".scroll-text");
      if (line) gsap.fromTo(line, { height: 0 }, { height: 28, duration: 0.6, delay: 1.2, ease: "power3.out" });
      if (text) gsap.fromTo(text, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1.8, ease: "power3.out" });
    }

    // INTRO — ScrollTrigger
    const stOpts = { start: "top 85%", once: true };

    if (eyebrowRef.current) gsap.fromTo(eyebrowRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: eyebrowRef.current, ...stOpts } });
    if (introHRef.current) {
      const lines = introHRef.current.querySelectorAll(".reveal-line");
      if (lines.length) gsap.fromTo(lines, { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.72, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: introHRef.current, ...stOpts } });
    }
    if (ruleRef.current) gsap.fromTo(ruleRef.current, { width: 0 }, { width: "100%", duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ruleRef.current, ...stOpts } });
    if (p1Ref.current) gsap.fromTo(p1Ref.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: p1Ref.current, ...stOpts } });
    if (p2Ref.current) gsap.fromTo(p2Ref.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.28, ease: "power3.out", scrollTrigger: { trigger: p2Ref.current, ...stOpts } });

    // STATS
    numRefs.current.forEach((el, i) => {
      if (!el || !stats[i]) return;
      const { numRaw, suffix } = stats[i];
      const obj = { value: 0 };
      gsap.to(obj, { value: numRaw, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", once: true }, onUpdate() { if (el) el.textContent = Math.round(obj.value) + suffix; } });
      gsap.fromTo(el, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.55, delay: i * 0.12, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    });
    barRefs.current.forEach((el, i) => {
      if (!el || !stats[i]) return;
      gsap.fromTo(el, { width: 0 }, { width: `${stats[i].barPct}%`, duration: 1, delay: i * 0.12, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    });

    // FEATURES
    fcRefs.current.forEach((el, i) => {
      if (!el || !features[i]) return;
      const delay = i < 3 ? i * 0.08 : (i - 3) * 0.08 + 0.1;
      gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", once: true } });
    });

    // GALLERY
    galleryRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.65, delay: i * 0.09, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });

    // CATERING
    if (catEyeRef.current) gsap.fromTo(catEyeRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: catEyeRef.current, ...stOpts } });
    if (catHRef.current) gsap.fromTo(catHRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.1, ease: "power3.out", scrollTrigger: { trigger: catHRef.current, ...stOpts } });
    if (catPRef.current) gsap.fromTo(catPRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: catPRef.current, ...stOpts } });
    if (catBadgeRef.current) gsap.fromTo(catBadgeRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.55, delay: 0.15, ease: "back.out(1.4)", scrollTrigger: { trigger: catBadgeRef.current, ...stOpts } });
    tagRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, delay: 0.35 + i * 0.1, ease: "back.out(1.4)", scrollTrigger: { trigger: el, start: "top 90%", once: true } });
    });

    // CTA
    if (ctaH1Ref.current) {
      const lines = ctaH1Ref.current.querySelectorAll(".reveal-line");
      if (lines.length) gsap.fromTo(lines, { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: ctaH1Ref.current, ...stOpts } });
    }
    if (ctaSubRef.current) gsap.fromTo(ctaSubRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.3, ease: "power3.out", scrollTrigger: { trigger: ctaSubRef.current, ...stOpts } });
    if (ctaBtnsRef.current) gsap.fromTo(ctaBtnsRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.45, ease: "power3.out", scrollTrigger: { trigger: ctaBtnsRef.current, ...stOpts } });
  }, { scope: rootRef, dependencies: [stats, features] });

  // ─── Render ──────────────────────────────────────────────────────────
  return (
    <div ref={rootRef} className="event-page-root">

      {/* ── SECTION 1 — HERO ── */}
      <section className="event-hero">
        <div className="event-hero-image">
          <Image
            fill
            sizes="100vw"
            priority
            src={heroError ? FALLBACK_IMAGES[eventType]?.[0] : cloudinaryUrl(hero.cloudinaryTag)}
            alt={hero.badge}
            style={{ objectFit: "cover" }}
            onError={() => setHeroError(true)}
          />
        </div>
        <div className="event-hero-overlay" />
        <div className="event-hero-content">
          <span className="hero-badge" ref={badgeRef}>{hero.badge}</span>
          <h1 className="event-hero-title" ref={titleRef}>
            <span className="reveal-wrap">
              <span className="reveal-line">{hero.titleLine1}</span>
            </span>
            <span className="reveal-wrap">
              <span className="reveal-line">{hero.titleLine2}</span>
            </span>
          </h1>
          <p className="event-hero-sub" ref={subRef}>{hero.sub}</p>
        </div>
        <div className="scroll-indicator" ref={scrollIndRef}>
          <div className="scroll-line" />
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      <EventNavTabs />

      <div style={{ background: "#FAF7F2" }}>
        <GoldThread />
      </div>

      {/* ── SECTION 2 — INTRO ── */}
      <section className="event-intro">
        <div className="event-intro-inner">
          <div className="event-intro-left">
            <p className="eyebrow" ref={eyebrowRef}>{intro.eyebrow}</p>
            <h2 className="event-intro-h" ref={introHRef}>
              <span className="reveal-wrap">
                <span className="reveal-line">{intro.headingLine1}</span>
              </span>
              <span className="reveal-wrap">
                <span className="reveal-line">{intro.headingLine2}</span>
              </span>
              <span className="reveal-wrap">
                <span className="reveal-line">{intro.headingLine3}</span>
              </span>
            </h2>
            <div className="gold-rule" ref={ruleRef} />
          </div>
          <div className="event-intro-right">
            <p className="event-body" ref={p1Ref}>{intro.para1}</p>
            <p className="event-body" ref={p2Ref}>{intro.para2}</p>
          </div>
        </div>
      </section>

      <GoldThread />

      {/* ── SECTION 3 — STATS ── */}
      <section className="event-stats">
        {stats.map((s, i) => (
          <div key={i} className="event-stat" ref={(el) => (statRefs.current[i] = el)}>
            <div
              className="stat-number"
              ref={(el) => (numRefs.current[i] = el)}
            >
              0{s.suffix}
            </div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-bar">
              <div
                className="stat-bar-fill"
                ref={(el) => (barRefs.current[i] = el)}
              />
            </div>
          </div>
        ))}
      </section>

      <div style={{ background: "linear-gradient(to bottom, #1C1C1E 50%, #FAF7F2 50%)" }}>
        <GoldThread />
      </div>

      {/* ── SECTION 4 — FEATURES ── */}
      <section className="event-features">
        <div className="event-features-inner">
          {features.map((f, i) => (
            <div
              key={i}
              className="event-fc"
              ref={(el) => (fcRefs.current[i] = el)}
            >
              <div className="fc-icon">
                <svg viewBox="0 0 24 24">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3 className="fc-title">{f.title}</h3>
              <p className="fc-desc">{f.desc}</p>
              <div className="fc-underline" />
            </div>
          ))}
        </div>
      </section>

      <GoldThread />

      {/* ── SECTION 5 — GALLERY STRIP ── */}
      <section className="event-gallery-strip">
        <div className="gallery-mosaic">
          {[0, 1, 2, 3, 4].map((i) => {
            const img = images[i];
            return (
              <div
                key={i}
                className={`gm-cell${i === 0 ? " gm-tall" : ""}`}
                ref={(el) => (galleryRefs.current[i] = el)}
              >
                {img ? (
                  <GalleryImage 
                    src={img.secure_url} 
                    fallback={FALLBACK_IMAGES[galleryTag]?.[i]}
                    sizes={i === 0 ? "50vw" : "25vw"}
                    i={i}
                    totalImages={totalImages}
                  />
                ) : (
                  <div className="gm-placeholder" />
                )}
              </div>
            );
          })}
        </div>
      </section>

      <GoldThread />

      {/* ── SECTION 6 — CATERING ── */}
      <section className="event-catering">
        <div className="event-catering-inner">
          <div className="catering-left">
            <p className="eyebrow" ref={catEyeRef}>{intro2.eyebrow}</p>
            <h3 className="catering-h" ref={catHRef}>{intro2.heading}</h3>
            <p className="event-body" ref={catPRef}>{intro2.para}</p>
          </div>
          <div className="catering-right">
            <div className="partner-badge" ref={catBadgeRef}>
              <p className="badge-name">GD Foods India</p>
              <div className="badge-dot" />
              <p className="badge-sub">Official catering partner</p>
              <div className="badge-tags">
                {["Multi-cuisine", "Live stations", "Custom thalis", "Dessert bars"].map((tag, i) => (
                  <span
                    key={tag}
                    className="badge-tag"
                    ref={(el) => (tagRefs.current[i] = el)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldThread />

      {/* ── SECTION 7 — CTA ── */}
      <section className="event-cta">
        <h2 className="event-cta-h" ref={ctaH1Ref}>
          <span className="reveal-wrap">
            <span className="reveal-line">{cta.headingLine}</span>
          </span>
        </h2>
        <p className="event-cta-sub" ref={ctaSubRef}>{cta.sub}</p>
        <div className="event-cta-btns" ref={ctaBtnsRef}>
          <Link href="/contact" className="cta-btn-primary">
            Request a quote
          </Link>
          <a href="tel:+918800190003" className="cta-btn-ghost">
            Call us now
          </a>
        </div>
      </section>

      <AntiGravitySection>
        <Footer />
      </AntiGravitySection>
    </div>
  );
}
