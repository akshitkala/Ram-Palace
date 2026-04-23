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
import GalleryLightbox from "@/components/Gallery/GalleryLightbox";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GALLERY_ALTS = {
  weddings: "Basti Ram Palace — Grand Wedding Celebration & Venue",
};

const GalleryImage = ({ src, eventType }) => {
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

export default function WeddingsClient() {
  const eventType = "weddings";
  const galleryTag = "weddings";

  const hero = {
    badge: "Weddings & Receptions",
    titleLine1: "Your wedding deserves",
    titleLine2: "a hall this grand.",
    sub: "A trusted name for celebrations across Gurugram.",
  };

  const intro = {
    eyebrow: "The setting",
    headingLine1: "A hall built",
    headingLine2: "for the grandest",
    headingLine3: "celebrations",
    para1: "A spacious banquet hall designed to accommodate your event comfortably, indoors and outdoors. Giving you the freedom to design your wedding exactly as you've imagined it, our venue adapts to your vision for celebrations of every scale.",
    para2: "Our in-house décor team works from scratch to bring your vision to life. Every arrangement, every lighting choice, and every floral detail is thoughtfully planned and handled with attention to detail.",
  };

  const features = [
    {
      icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9m0 0h18",
      title: "Grand banquet hall",
      desc: "A spacious pillar-free venue that allows for flexible layouts and grand setups.",
    },
    {
      icon: "M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4M17 3h-4v4M13 21l4-4M17 21h-4v-4",
      title: "Outdoor lawns",
      desc: "Beautifully manicured lawns perfect for pheras, receptions, and outdoor gatherings.",
    },
    {
      icon: "M18 8h1a4 4 0 010 8h-1 M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z M6 1v3M10 1v3M14 1v3",
      title: "GD Foods India Catering",
      desc: "Extensive multi-cuisine menus including Indian vegetarian mains and specialty live counters.",
    },
    {
      icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
      title: "Full décor support",
      desc: "Floral mandaps, elegant draping, and stage setups customized for your special day.",
    },
    {
      icon: "M15 10l4.553-2.069A1 1 0 0121 8.82V18a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h8",
      title: "Professional Hospitality",
      desc: "Every dish prepared with precision and every event handled with attention to detail.",
    },
    {
      icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
      title: "Seamless Coordination",
      desc: "Planning with care to ensure your celebration is delivered on time and presented perfectly.",
    },
  ];

  const intro2 = {
    eyebrow: "Food & hospitality",
    heading: "Every plate tells the story of your celebration",
    para: "From Indian vegetarian mains and live counters like The Savoury House and Stone-fired Pizzeria to desserts and mocktails — our culinary team at GD Foods India builds menus with care.",
  };

  const cta = {
    headingLine: "Your perfect wedding begins with one conversation.",
    sub: "Our team is available to help you plan your celebration with precision and care.",
  };

  // Refs
  const rootRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const scrollIndRef = useRef(null);
  const eyebrowRef = useRef(null);
  const introHRef = useRef(null);
  const ruleRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const fcRefs = useRef([]);
  const tagRefs = useRef([]);
  const catEyeRef = useRef(null);
  const catHRef = useRef(null);
  const catPRef = useRef(null);
  const catBadgeRef = useRef(null);
  const ctaH1Ref = useRef(null);
  const ctaSubRef = useRef(null);
  const ctaBtnsRef = useRef(null);

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const galleryItemRefs = useRef([]);

  useEffect(() => {
    fetch(`/api/images?section=${galleryTag}`)
      .then((r) => r.json())
      .then((data) => setImages(data.images || []))
      .catch((err) => console.error("Failed to fetch gallery images:", err));
  }, [galleryTag]);

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    if (!selectedImage || images.length === 0) return;
    const currentIndex = images.findIndex((img) => img.public_id === selectedImage.public_id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    if (!selectedImage || images.length === 0) return;
    const currentIndex = images.findIndex((img) => img.public_id === selectedImage.public_id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, images]);

  useGSAP(() => {
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
  }, { scope: rootRef });

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
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: el, ...stOpts } });
    });

    galleryItemRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.8, delay: (i % 3) * 0.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 92%" } });
    });

    if (catEyeRef.current) gsap.fromTo(catEyeRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { trigger: catEyeRef.current, ...stOpts } });
    if (catHRef.current) gsap.fromTo(catHRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.1, ease: "power3.out", scrollTrigger: { trigger: catHRef.current, ...stOpts } });
    if (catPRef.current) gsap.fromTo(catPRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: catPRef.current, ...stOpts } });
    if (catBadgeRef.current) gsap.fromTo(catBadgeRef.current, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.55, delay: 0.15, ease: "back.out(1.4)", scrollTrigger: { trigger: catBadgeRef.current, ...stOpts } });

    if (ctaH1Ref.current) {
      const lines = ctaH1Ref.current.querySelectorAll(".reveal-line");
      if (lines.length) gsap.fromTo(lines, { y: "100%", opacity: 0 }, { y: "0%", opacity: 1, duration: 0.72, ease: "power3.out", scrollTrigger: { trigger: ctaH1Ref.current, ...stOpts } });
    }
    if (ctaSubRef.current) gsap.fromTo(ctaSubRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.3, ease: "power3.out", scrollTrigger: { trigger: ctaSubRef.current, ...stOpts } });
    if (ctaBtnsRef.current) gsap.fromTo(ctaBtnsRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, delay: 0.45, ease: "power3.out", scrollTrigger: { trigger: ctaBtnsRef.current, ...stOpts } });
  }, { scope: rootRef, dependencies: [images] });

  return (
    <div ref={rootRef} className="event-page-root">
      <section className="event-hero">
        <div className="event-hero-image">
          <Image
            fill
            sizes="100vw"
            priority
            fetchPriority="high"
            src="/images/hero/WeddingHero.webp"
            alt={GALLERY_ALTS[eventType]}
            className="object-cover"
          />
        </div>
        <div className="event-hero-overlay" />
        <div className="event-hero-content">
          <span className="hero-badge" ref={badgeRef}>{hero.badge}</span>
          <h1 className="event-hero-title" ref={titleRef}>
            <span className="reveal-wrap"><span className="reveal-line">{hero.titleLine1}</span></span>
            <span className="reveal-wrap"><span className="reveal-line">{hero.titleLine2}</span></span>
          </h1>
          <p className="event-hero-sub" ref={subRef}>{hero.sub}</p>
        </div>
        <div className="scroll-indicator" ref={scrollIndRef}>
          <div className="scroll-line" />
          <span className="scroll-text">Scroll</span>
        </div>
      </section>

      <EventNavTabs />
      <div style={{ background: "#FAF7F2" }}><GoldThread /></div>

      <section className="event-intro">
        <div className="event-intro-inner">
          <div className="event-intro-left">
            <p className="eyebrow" ref={eyebrowRef}>{intro.eyebrow}</p>
            <h2 className="event-intro-h" ref={introHRef}>
              <span className="reveal-wrap"><span className="reveal-line">{intro.headingLine1}</span></span>
              <span className="reveal-wrap"><span className="reveal-line">{intro.headingLine2}</span></span>
              <span className="reveal-wrap"><span className="reveal-line">{intro.headingLine3}</span></span>
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
            <div key={i} className="event-fc" ref={(el) => (fcRefs.current[i] = el)}>
              <div className="fc-icon"><svg viewBox="0 0 24 24"><path d={f.icon} /></svg></div>
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
              className="gm-item cursor-pointer" 
              ref={(el) => (galleryItemRefs.current[i] = el)}
              onClick={() => setSelectedImage(img)}
            >
              <GalleryImage src={img.secure_url} eventType={eventType} />
            </div>
          ))}
        </div>
        <div className="view-all-btn-wrap">
          <Link href="/gallery" className="view-all-btn">
            <span>View Full Gallery</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
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
                  <span key={tag} className="badge-tag" ref={(el) => (tagRefs.current[i] = el)}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldThread />

      <section className="event-cta">
        <h2 className="event-cta-h" ref={ctaH1Ref}>
          <span className="reveal-wrap"><span className="reveal-line">{cta.headingLine}</span></span>
        </h2>
        <p className="event-cta-sub" ref={ctaSubRef}>{cta.sub}</p>
        <div className="event-cta-btns" ref={ctaBtnsRef}>
          <Link href="/contact" className="cta-btn-primary">Request a quote</Link>
          <a href="tel:+918800190003" className="cta-btn-ghost">Call us now</a>
        </div>
      </section>

      <AntiGravitySection><Footer /></AntiGravitySection>

      <GalleryLightbox 
        selectedImage={selectedImage}
        closeLightbox={() => setSelectedImage(null)}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />
    </div>
  );
}
