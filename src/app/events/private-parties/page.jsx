"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl as optimizeUrl } from "@/lib/cloudinary-client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { GoldThread } from "@/components/events/EventAnimations";
import { EventNavTabs } from "@/components/events/EventNavTabs";
import Footer from "@/components/Footer";
import AntiGravitySection from "@/components/AntiGravitySection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const getEventImageUrl = (tag) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dogwrr4tq";
  return `https://res.cloudinary.com/${cloudName}/image/upload/v1/ram-palace/events/${tag}`;
};

const GALLERY_ALTS = {
  "private-parties": "Basti Ram Palace — Unforgettable Private Party and Milestone Celebration"
};

const GalleryImage = ({ src, sizes, eventType }) => {
  return (
    <>
      <div className="gm-img-container">
        <Image
          width={800}
          height={1200}
          src={optimizeUrl(src, { width: 800 })}
          alt={GALLERY_ALTS[eventType] || "Basti Ram Palace — Luxury Event Moment"}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="gm-hover-overlay" />
    </>
  );
};

export default function PrivatePartiesPage() {
  const eventType = "private-parties";
  const galleryTag = "private-parties";

  const hero = {
    cloudinaryTag: "private-hero",
    badge: "Private Parties & Celebrations",
    titleLine1: "Every milestone",
    titleLine2: "deserves this setting.",
    sub: "Birthdays · Anniversaries · Engagements · Family gatherings",
  };

  const intro = {
    eyebrow: "The experience",
    headingLine1: "Intimate or grand",
    headingLine2: "— we make",
    headingLine3: "it memorable",
    para1: "Basti Ram Palace is designed to host events of every scale, from intimate gatherings to grand celebrations. Whether it's a small family dinner or a large anniversary bash, every occasion is handled with attention to detail and precision.",
    para2: "We believe in personalizing every element of your celebration. Every private event at Basti Ram Palace is planned and executed around your specific vision — the menu, the décor, and the hospitality.",
  };

  const features = [
    {
      icon: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.704 2.704 0 003 15.546M21 4h-3.5a.5.5 0 01-.5-.5v-1a.5.5 0 00-.5-.5h-11a.5.5 0 00-.5.5v1a.5.5 0 01-.5.5H3m18 0v11a2 2 0 01-2 2H5a2 2 0 01-2-2V4",
      title: "Custom themes",
      desc: "From birthdays to anniversaries, we help you build the theme you've imagined for your milestone.",
    },
    {
      icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
      title: "Event support",
      desc: "Full support for your celebration requirements, from music coordination to specialized setups.",
    },
    {
      icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z",
      title: "Photo-op areas",
      desc: "Thoughtfully designed corners and backdrops perfect for capturing your family's precious moments.",
    },
    {
      icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "GD Foods India Catering",
      desc: "Customized menus by GD Foods India, including live stations, mocktail bars, and Indian vegetarian mains.",
    },
    {
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      title: "Flexible settings",
      desc: "Day parties or evening celebrations — our venue provides the perfect setting for your milestones.",
    },
    {
      icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
      title: "Secured Premises",
      desc: "Full premises security and professional hospitality to ensure your guests celebrate comfortably.",
    },
  ];

  const intro2 = {
    eyebrow: "Food & celebration",
    heading: "The food should be as memorable as the occasion",
    para: "Every dish is prepared with precision and every event handled with attention to detail by our catering partner GD Foods India. We ensure a delightful culinary experience for your guests.",
  };

  const cta = {
    headingLine: "Every celebration deserves to be unforgettable.",
    sub: "Contact our team to plan your next private celebration at Basti Ram Palace.",
  };

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

  const fcRefs        = useRef([null, null, null, null, null, null]);
  const tagRefs       = useRef([null, null, null, null]);

  const catEyeRef    = useRef(null);
  const catHRef      = useRef(null);
  const catPRef      = useRef(null);
  const catBadgeRef  = useRef(null);

  const ctaH1Ref     = useRef(null);
  const ctaSubRef    = useRef(null);
  const ctaBtnsRef   = useRef(null);

  // ─── Gallery state ──────────────────────────────────────────────────
  const [images, setImages] = useState([]);
  const galleryItemRefs = useRef([]);

  useEffect(() => {
    fetch(`/api/images?section=${galleryTag}`)
      .then((r) => r.json())
      .then((data) => {
        setImages(data.images || []);
      })
      .catch((err) => {
        console.error("Failed to fetch gallery images:", err);
      });
  }, [galleryTag]);

  // ─── Hero Animations (Run once) ────────────────────────────────────
  useGSAP(() => {
    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current, 
        { opacity: 0, y: 8 }, 
        { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: "power3.out" }
      );
    }
    if (titleRef.current) {
      const lines = titleRef.current.querySelectorAll(".reveal-line");
      gsap.fromTo(lines, 
        { y: "100%", opacity: 0 }, 
        { y: "0%", opacity: 1, duration: 0.72, stagger: 0.12, delay: 0.3, ease: "power3.out" }
      );
    }
    if (subRef.current) {
      gsap.fromTo(subRef.current, 
        { opacity: 0, y: 28 }, 
        { opacity: 1, y: 0, duration: 0.65, delay: 0.65, ease: "power3.out" }
      );
    }
    if (scrollIndRef.current) {
      const line = scrollIndRef.current.querySelector(".scroll-line");
      const text = scrollIndRef.current.querySelector(".scroll-text");
      if (line) gsap.fromTo(line, { height: 0 }, { height: 28, duration: 0.6, delay: 1.2, ease: "power3.out" });
      if (text) gsap.fromTo(text, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1.8, ease: "power3.out" });
    }
  }, { scope: rootRef, dependencies: [] });

  // ─── Content Animations (Track dependencies) ────────────────────────
  useGSAP(() => {
    const stOpts = { start: "top 85%", toggleActions: "play none none none" };

    if (eyebrowRef.current) gsap.fromTo(eyebrowRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: eyebrowRef.current, ...stOpts } });
    if (introHRef.current) {
      const lines = introHRef.current.querySelectorAll(".reveal-line");
      if (lines.length) gsap.fromTo(lines, { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.72, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: introHRef.current, ...stOpts } });
    }
    if (ruleRef.current) gsap.fromTo(ruleRef.current, { width: 0 }, { width: "100%", duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: ruleRef.current, ...stOpts } });
    if (p1Ref.current) gsap.fromTo(p1Ref.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: p1Ref.current, ...stOpts } });
    if (p2Ref.current) gsap.fromTo(p2Ref.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.28, ease: "power3.out", scrollTrigger: { trigger: p2Ref.current, ...stOpts } });

    fcRefs.current.forEach((el, i) => {
      if (!el || !features[i]) return;
      const delay = i < 3 ? i * 0.08 : (i - 3) * 0.08 + 0.1;
      gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" } });
    });

    galleryItemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, delay: (i % 3) * 0.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none none" } });
    });

    if (catEyeRef.current) gsap.fromTo(catEyeRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: catEyeRef.current, ...stOpts } });
    if (catHRef.current) gsap.fromTo(catHRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.1, ease: "power3.out", scrollTrigger: { trigger: catHRef.current, ...stOpts } });
    if (catPRef.current) gsap.fromTo(catPRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: catPRef.current, ...stOpts } });
    if (catBadgeRef.current) gsap.fromTo(catBadgeRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.55, delay: 0.15, ease: "back.out(1.4)", scrollTrigger: { trigger: catBadgeRef.current, ...stOpts } });
    tagRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.45, delay: 0.35 + i * 0.1, ease: "back.out(1.4)", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" } });
    });

    if (ctaH1Ref.current) {
      const lines = ctaH1Ref.current.querySelectorAll(".reveal-line");
      if (lines.length) gsap.fromTo(lines, { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: ctaH1Ref.current, ...stOpts } });
    }
    if (ctaSubRef.current) gsap.fromTo(ctaSubRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.3, ease: "power3.out", scrollTrigger: { trigger: ctaSubRef.current, ...stOpts } });
    if (ctaBtnsRef.current) gsap.fromTo(ctaBtnsRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.45, ease: "power3.out", scrollTrigger: { trigger: ctaBtnsRef.current, ...stOpts } });
  }, { scope: rootRef, dependencies: [features, images] });

  return (
    <div ref={rootRef} className="event-page-root">
      <section className="event-hero">
        <div className="event-hero-image">
          <Image
            fill
            sizes="100vw"
            priority
            src="/images/hero/Privatehero.webp"
            alt={GALLERY_ALTS[eventType]}
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

      <section className="event-gallery-wrap" id="gallery">
        <div className="gallery-masonry">
          {images.map((img, i) => (
            <div
              key={img.public_id}
              className="gm-item"
              ref={(el) => (galleryItemRefs.current[i] = el)}
            >
              <GalleryImage 
                src={img.secure_url} 
                eventType={eventType}
              />
            </div>
          ))}
        </div>

        <div className="view-all-btn-wrap">
          <Link href="/gallery" className="view-all-btn">
            <span>View Full Gallery</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <GoldThread />

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
