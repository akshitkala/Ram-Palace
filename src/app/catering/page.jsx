"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Footer from "@/components/Footer";
import {
  cateringHero,
  culinaryPhilosophy,
  culinarySpectrum,
  eventsWeCater,
  serviceExcellence,
  cateringGallery,
  trustedClients,
} from "@/Data/catering";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────── PAGE ─────────────────────────────── */
export default function CateringPage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Fade‑up utility for all .reveal elements */
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* Hero parallax */
      gsap.to(".hero-bg", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Spectrum cards stagger */
      gsap.fromTo(
        ".spectrum-card",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".spectrum-grid",
            start: "top 80%",
          },
        }
      );

      /* Event cards stagger */
      gsap.fromTo(
        ".event-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".events-grid",
            start: "top 80%",
          },
        }
      );

      /* Service checkmarks */
      gsap.fromTo(
        ".service-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".service-grid",
            start: "top 80%",
          },
        }
      );

      /* Gallery items */
      ScrollTrigger.batch(".gallery-item", {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            overwrite: true,
          }),
        start: "top 90%",
        once: true,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-[#FAF7F2]">
      <style>{`
        .gold-underline {
          position: relative;
          display: inline-block;
        }
        .gold-underline::after {
          content: '';
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A96E, transparent);
        }
        .marquee-track {
          animation: marquee-scroll 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .cta-glow {
          box-shadow: 0 0 0 0 rgba(201, 169, 110, 0);
          transition: all 0.4s ease;
        }
        .cta-glow:hover {
          box-shadow: 0 0 30px rgba(201, 169, 110, 0.3);
          transform: translateY(-2px);
        }
        .spectrum-card-inner {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .spectrum-card:hover .spectrum-card-inner {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(201,169,110,0.3);
        }
        .event-card-inner {
          transition: all 0.35s ease;
        }
        .event-card:hover .event-card-inner {
          background: #FAF7F2;
          border-color: #C9A96E;
        }
        .gallery-item img {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-item:hover img {
          transform: scale(1.05);
        }
        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #C9A96E;
          border-radius: 50%;
          opacity: 0.15;
          animation: float-particle 8s ease-in-out infinite;
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.1; }
          50% { transform: translateY(-40px) translateX(20px); opacity: 0.25; }
        }
        .fade-edge-left {
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
      `}</style>

      {/* ═══════════════ 1. HERO ═══════════════ */}
      <section className="hero-section relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* BG */}
        <div className="hero-bg absolute inset-0 z-0">
          <img
            src={cateringHero.image}
            alt="Luxury catering setup"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="reveal font-body text-[#C9A96E] text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-semibold">
            Ram Palace Catering Division
          </p>
          <h1 className="reveal font-heading text-4xl sm:text-5xl md:text-7xl text-white leading-tight mb-6 gold-underline">
            {cateringHero.headline}
          </h1>
          <p className="reveal font-body text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-10 mb-4">
            {cateringHero.description}
          </p>
          <p className="reveal font-body text-white/65 text-sm md:text-base italic mb-10">
            {cateringHero.subtext}
          </p>

          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#culinary-spectrum"
              className="cta-glow bg-gradient-to-r from-[#C9A96E] to-[#A8883D] text-[#2B1E14] font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-lg text-sm"
            >
              Explore Culinary Experience
            </a>
            <Link
              href="/enquiry"
              className="cta-glow border border-white/30 text-white font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded-lg text-sm backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-colors"
            >
              Request Custom Proposal
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══════════════ 2. CULINARY PHILOSOPHY ═══════════════ */}
      <section className="py-20 md:py-32 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text */}
          <div className="reveal">
            <p className="text-[#C9A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Our Philosophy
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-[#2A1F15] leading-tight mb-6">
              {culinaryPhilosophy.heading}
            </h2>
            <p className="font-heading-italic text-xl md:text-2xl text-[#8B7A6A] mb-6">
              {culinaryPhilosophy.tagline}
            </p>
            <p className="font-body text-base md:text-lg text-[#555] leading-relaxed mb-8">
              {culinaryPhilosophy.description}
            </p>

            <p className="text-[#2A1F15] font-semibold text-sm uppercase tracking-wider mb-4">
              We specialize in:
            </p>
            <ul className="space-y-3 mb-8">
              {culinaryPhilosophy.points.map((point, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-[#555] text-base"
                >
                  <span className="w-1.5 h-1.5 bg-[#C9A96E] rounded-full flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>

            <p className="font-body text-[#8B7A6A] italic text-base">
              {culinaryPhilosophy.closing}
            </p>
          </div>

          {/* Image */}
          <div className="reveal relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={culinaryPhilosophy.image}
                alt="Culinary excellence"
                className="w-full h-[450px] md:h-[550px] object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-[#C9A96E]/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-24 h-24 border-2 border-[#C9A96E]/20 rounded-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. CULINARY SPECTRUM ═══════════════ */}
      <section
        id="culinary-spectrum"
        className="py-20 md:py-32 px-6 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[#C9A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Our Menu Portfolio
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-[#2A1F15] mb-4">
              A Grand Culinary Spectrum
            </h2>
            <p className="font-body text-[#555] text-base md:text-lg max-w-2xl mx-auto">
              Our expansive menu portfolio ensures every celebration receives a
              dining experience tailored to its scale and style.
            </p>
          </div>

          <div className="spectrum-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {culinarySpectrum.map((item) => (
              <div key={item.id} className="spectrum-card">
                <div className="spectrum-card-inner bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#E8E0D4]">
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute bottom-4 left-4 text-3xl">
                      {item.icon}
                    </span>
                  </div>
                  {/* Card Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="font-heading text-xl md:text-2xl text-[#2A1F15] mb-3">
                      {item.title}
                    </h3>
                    <p className="font-body text-[#555] text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="reveal text-center font-body text-[#8B7A6A] italic mt-12 text-base">
            Menus are customizable to reflect your event theme and guest
            preferences.
          </p>
        </div>
      </section>

      {/* ═══════════════ 4. EVENTS WE CATER ═══════════════ */}
      <section className="py-20 md:py-32 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[#C9A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Our Services
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-[#2A1F15] mb-4">
              Catering for Every Occasion
            </h2>
            <p className="font-body text-[#555] text-base md:text-lg max-w-2xl mx-auto">
              We provide complete catering solutions for:
            </p>
          </div>

          <div className="events-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {eventsWeCater.map((event, i) => (
              <div key={i} className="event-card">
                <div className="event-card-inner text-center px-6 py-8 rounded-xl border border-[#E8E0D4] bg-white">
                  <span className="inline-block w-10 h-10 bg-[#C9A96E]/10 rounded-full flex items-center justify-center mb-4 text-[#C9A96E] text-lg">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-body text-[#2A1F15] font-medium text-sm md:text-base">
                    {event}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="reveal text-center font-body text-[#8B7A6A] italic mt-12 text-base">
            Every event is handled with structured coordination and refined
            hospitality.
          </p>
        </div>
      </section>

      {/* ═══════════════ 5. SERVICE EXCELLENCE ═══════════════ */}
      <section className="relative py-20 md:py-32 px-6 bg-[#3B1520] overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="reveal text-[#C9A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
            Why Choose Us
          </p>
          <h2 className="reveal font-heading text-3xl md:text-5xl text-white mb-6">
            Complete Catering Solutions
          </h2>
          <p className="reveal font-body text-white/70 text-base md:text-lg mb-14 max-w-2xl mx-auto">
            Our team focuses on delivering:
          </p>

          <div className="service-grid grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 max-w-2xl mx-auto text-left">
            {serviceExcellence.map((item, i) => (
              <div
                key={i}
                className="service-item flex items-center gap-4"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#C9A96E]/20 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-[#C9A96E]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="font-body text-white/90 text-base">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <p className="reveal font-body text-white/50 italic mt-14 text-sm">
            Every detail is carefully managed to ensure a sophisticated and
            memorable dining experience.
          </p>
        </div>
      </section>

      {/* ═══════════════ 6. VISUAL GALLERY ═══════════════ */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <p className="text-[#C9A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Visual Experience
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-[#2A1F15] mb-4">
              Crafted to Impress
            </h2>
            <p className="font-body text-[#555] text-base md:text-lg max-w-2xl mx-auto">
              A glimpse into our buffet setups, live stations, outdoor catering
              layouts, and refined service presentation.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {cateringGallery.map((img) => (
              <div
                key={img.id}
                className="gallery-item opacity-0 translate-y-10 break-inside-avoid relative group rounded-xl overflow-hidden shadow-md bg-white cursor-pointer"
              >
                <img
                  src={img.image}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-body text-xs uppercase tracking-widest border border-white/30 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. TRUST & CLIENTS ═══════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 reveal">
            <p className="text-[#C9A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-4">
              Our Clients
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-[#2A1F15] mb-4">
              Trusted by Leading Organizations
            </h2>
            <p className="font-body text-[#555] text-base md:text-lg max-w-2xl mx-auto">
              Our catering services have been chosen by renowned institutions
              and corporate brands — a testament to our reliability and
              excellence.
            </p>
          </div>

          {/* Logo Marquee */}
          <div className="reveal overflow-hidden fade-edge-left">
            <div className="marquee-track flex w-max gap-12 items-center">
              {[...trustedClients, ...trustedClients].map((client, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-36 h-20 bg-white rounded-xl border border-[#E8E0D4] flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:shadow-md hover:border-[#C9A96E]/30"
                >
                  <div className="text-center">
                    <span className="block font-heading text-lg text-[#8B7A6A]">
                      {client.initials}
                    </span>
                    <span className="block text-[10px] text-[#AAA] tracking-wider uppercase mt-0.5">
                      {client.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. FINAL CTA ═══════════════ */}
      <section className="relative py-24 md:py-36 px-6 bg-[#3B1520] overflow-hidden">
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="reveal text-[#C9A96E] text-xs font-semibold tracking-[0.3em] uppercase mb-6">
            Ready to Begin?
          </p>
          <h2 className="reveal font-heading text-3xl sm:text-4xl md:text-6xl text-white leading-tight mb-6">
            Let Us Curate Your Perfect Menu
          </h2>
          <p className="reveal font-body text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-12">
            Planning a wedding, corporate gathering, or grand celebration? Our
            culinary experts will design a customized menu aligned with your
            event scale, preferences, and vision.
          </p>

          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/enquiry"
              className="cta-glow bg-gradient-to-r from-[#C9A96E] to-[#A8883D] text-[#2B1E14] font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-lg text-sm"
            >
              Request a Custom Proposal
            </Link>
            <a
              href="tel:+91XXXXXXXXXX"
              className="cta-glow border border-[#C9A96E]/40 text-[#C9A96E] font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded-lg text-sm hover:bg-[#C9A96E]/10 transition-colors"
            >
              Call Now
            </a>
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-glow border border-white/20 text-white/80 font-semibold uppercase tracking-[0.15em] px-8 py-4 rounded-lg text-sm hover:bg-white/5 transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <Footer />
    </div>
  );
}
