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
  corporate: "Basti Ram Palace — Professional Corporate Conference & Event",
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

export default function CorporatePage() {
  const eventType = "corporate";
  const galleryTag = "corporate";

  const hero = {
    cloudinaryTag: "corporate-hero",
    badge: "Corporate Events",
    titleLine1: "Where business meets",
    titleLine2: "exceptional hospitality.",
    sub: "Conferences · Launches · Awards · Off-sites",
  };

  const intro = {
    eyebrow: "The venue",
    headingLine1: "A professional",
    headingLine2: "setting without",
    headingLine3: "compromise",
    para1: "Basti Ram Palace offers a spacious and configurable banquet venue, perfect for theatre-style conferences, classroom seminars, or corporate gala rounds. Our venue provides a professional environment designed to accommodate your event comfortably.",
    para2: "We are proud to be the trusted choice for organizations such as Sandvik, Huawei, Vatika, Eli Lilly, and IICA. Every corporate event is handled with precision and attention to detail by our dedicated team and catering partner GD Foods India.",
  };

  const features = [
    {
      icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
      title: "Professional AV Setup",
      desc: "Equipped with modern audio-visual systems, projectors, and microphones for seamless presentations.",
    },
    {
      icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      title: "Event Connectivity",
      desc: "Reliable internet connectivity to support your corporate sessions and conferences.",
    },
    {
      icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
      title: "Flexible layouts",
      desc: "Theatre, classroom, U-shape, or banquet rounds — we configure the space to suit your event format.",
    },
    {
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0",
      title: "Dedicated Event Spaces",
      desc: "Configurable areas suitable for breakout sessions, parallel meetings, and parallel sessions.",
    },
    {
      icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
      title: "GD Foods India Catering",
      desc: "Working lunches, gala dinners, and high-tea setups — curated menus that impress your stakeholders.",
    },
    {
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
      title: "Ample Parking & Valet",
      desc: "Spacious on-site parking with valet services available for award nights and leadership events.",
    },
  ];

  const intro2 = {
    eyebrow: "Corporate dining",
    heading: "Catering that impresses your stakeholders",
    para: "From working lunches to gala dinners, our culinary team at GD Foods India builds menus around your event format. We ensure food is prepared fresh, presented well, and delivered on time.",
  };

  const cta = {
    headingLine: "Let's plan an event your team will talk about.",
    sub: "Site visits welcome. Our team is ready to provide a custom proposal for your next event.",
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
    // Zoom in/out on scroll
    gsap.to(".event-hero-image img", {
      scale: 1.25,
      ease: "none",
      scrollTrigger: {
        trigger: ".event-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

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
        <div className="event-hero-image scale-[1.15]" data-scroll data-scroll-speed="-0.3">
          <Image
            fill
            sizes="100vw"
            priority
            src="/images/hero/CorporateHero1.webp"
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
        </div>
      </section>

      <AntiGravitySection>
        <Footer />
      </AntiGravitySection>
    </div>
  );
}
