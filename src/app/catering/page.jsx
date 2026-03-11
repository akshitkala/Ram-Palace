"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
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

export default function CateringPage() {
  const pageRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 55 },
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

      gsap.to(".hero-bg", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".spectrum-card",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".spectrum-grid", start: "top 82%" },
        }
      );

      gsap.fromTo(
        ".spectrum-card",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".spectrum-grid", start: "top 82%" },
        }
      );

      gsap.fromTo(
        ".event-tag",
        { opacity: 0, scale: 0.88 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "back.out(1.4)",
          scrollTrigger: { trigger: ".events-wrap", start: "top 82%" },
        }
      );

      gsap.fromTo(
        ".service-item",
        { opacity: 0, x: -28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.09,
          ease: "power2.out",
          scrollTrigger: { trigger: ".service-grid", start: "top 80%" },
        }
      );

      ScrollTrigger.batch(".gallery-item", {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.09,
            ease: "power3.out",
            overwrite: true,
          }),
        start: "top 92%",
        once: true,
      });

      gsap.utils.toArray(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.target, 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate() {
            el.textContent = Math.round(obj.val) + "+";
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-[#FAF7F2] overflow-x-hidden">

      {/* ═══ 1. HERO ═══ */}
      <section className="hero-section relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
        <div className="hero-bg absolute inset-0 z-0">
          <Image
            src={cateringHero.image}
            alt="Luxury catering setup"
            fill
            sizes="100vw"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/75" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="reveal flex items-center justify-center gap-3 mb-8">
            <span className="block w-12 h-px bg-gradient-to-r from-transparent to-[#C9A96E]" />
            <span className="font-body text-[#C9A96E] text-xs tracking-[0.35em] uppercase font-semibold">
              GD Foods India · Basti Ram Palace
            </span>
            <span className="block w-12 h-px bg-gradient-to-l from-transparent to-[#C9A96E]" />
          </div>

          <h1 className="reveal font-heading text-5xl sm:text-6xl md:text-8xl text-white leading-tight mb-8">
            {cateringHero.headline}
          </h1>

          <p className="reveal font-body text-white/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-3">
            {cateringHero.description}
          </p>
          <p className="reveal font-heading-italic text-white/55 text-lg md:text-xl mb-12">
            {cateringHero.subtext}
          </p>

          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#culinary-spectrum"
              className="bg-gradient-to-br from-[#C9A96E] to-[#A8883D] text-[#1a0f08] font-body font-bold
                         uppercase tracking-[0.15em] px-8 py-4 rounded-lg text-sm
                         transition-all duration-300 hover:shadow-[0_8px_32px_rgba(201,169,110,0.45)] hover:-translate-y-0.5"
            >
              Explore the Menu
            </a>
            <Link
              href="/enquiry"
              className="border border-white/30 text-white/90 font-body font-semibold uppercase
                         tracking-[0.15em] px-8 py-4 rounded-lg text-sm backdrop-blur-sm bg-white/5
                         transition-all duration-300 hover:bg-white/10"
            >
              Request a Proposal
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#C9A96E]/60 to-transparent animate-pulse" />
          <span className="font-body text-white/30 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        </div>
      </section>

      {/* ═══ 2. STATS STRIP ═══ */}
      <section className="bg-[#2B1810] py-10 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-12">
          {[
            { target: 500, label: "Events Catered" },
            { target: 14,  label: "Trusted Clients" },
            { target: 8,   label: "Live Counter Concepts" },
            { target: 200, label: "Menu Items" },
          ].map((s, i) => (
            <div
              key={i}
              className={`text-center ${
                i > 0 ? "border-l border-[#C9A96E]/20 pl-12" : ""
              }`}
            >
              <div className="font-heading text-4xl md:text-5xl text-[#C9A96E] font-semibold">
                <span className="stat-num" data-target={s.target}>0+</span>
              </div>
              <div className="font-body text-white/45 text-xs tracking-widest uppercase mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 3. CULINARY PHILOSOPHY ═══ */}
      <section className="py-24 md:py-36 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <div className="reveal">
            <span className="block font-body text-[#C9A96E] text-xs font-semibold tracking-[0.35em] uppercase mb-5">
              Our Philosophy
            </span>
            <h2 className="font-heading text-4xl md:text-6xl text-[#2A1F15] leading-tight mb-5">
              {culinaryPhilosophy.heading}
            </h2>
            <p className="font-heading-italic text-[#8B7A6A] text-xl md:text-2xl mb-7">
              {culinaryPhilosophy.tagline}
            </p>
            <p className="font-body text-[#555] text-base leading-relaxed mb-8">
              {culinaryPhilosophy.description}
            </p>
            <ul className="space-y-3 mb-8">
              {culinaryPhilosophy.points.map((pt, i) => (
                <li key={i} className="flex items-start gap-3 font-body text-[#444] text-sm leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 bg-[#C9A96E] rounded-full flex-shrink-0" />
                  {pt}
                </li>
              ))}
            </ul>
            <p className="font-heading-italic text-[#8B7A6A] text-lg">
              {culinaryPhilosophy.closing}
            </p>
          </div>

          <div className="reveal relative">
            <div className="rounded-2xl overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18)]">
              <Image
                src={culinaryPhilosophy.image}
                alt="Culinary excellence"
                width={1200}
                height={800}
                quality={70}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full h-[480px] md:h-[580px] object-cover"
              />
            </div>
            <div className="absolute -bottom-7 -left-7 w-36 h-36 border border-[#C9A96E]/20 rounded-2xl -z-10" />
            <div className="absolute -top-7 -right-7 w-28 h-28 border border-[#C9A96E]/20 rounded-2xl -z-10" />
            <div className="absolute bottom-6 right-6 bg-[#2B1810]/90 backdrop-blur-sm rounded-xl px-5 py-3 border border-[#C9A96E]/25">
              <span className="font-heading-italic text-[#C9A96E] text-sm block">Culinary</span>
              <span className="font-body text-white text-xs tracking-widest uppercase">Excellence</span>
            </div>
          </div>
        </div>
      </section>

      
      {/* ═══ 5. EVENTS WE CATER ═══ */}
      <section className="py-24 md:py-36 px-6 bg-[#FAF7F2]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="block font-body text-[#C9A96E] text-xs font-semibold tracking-[0.35em] uppercase mb-5">
              Our Services
            </span>
            <h2 className="font-heading text-4xl md:text-6xl text-[#2A1F15] mb-6">
              Catering for Every Occasion
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-6" />
            <p className="font-body text-[#666] text-base max-w-xl mx-auto">
              Complete catering solutions delivered with structured coordination and refined
              hospitality — for events of any scale.
            </p>
          </div>

          <div className="events-wrap flex flex-wrap justify-center gap-3">
            {eventsWeCater.map((event, i) => (
              <span
                key={i}
                className="event-tag font-body text-[#2A1F15] text-sm border border-[#D5C9B8] bg-white
                           px-5 py-2.5 rounded-full cursor-default
                           transition-all duration-200
                           hover:bg-[#C9A96E] hover:text-[#1a0f08] hover:border-[#C9A96E]"
              >
                {event}
              </span>
            ))}
          </div>

          <p className="reveal text-center font-heading-italic text-[#8B7A6A] mt-12 text-base">
            Every event is handled with structured coordination and refined hospitality.
          </p>
        </div>
      </section>

      {/* ═══ 6. SERVICE EXCELLENCE ═══ */}
      <section className="relative py-24 md:py-36 px-6 bg-[#2B1810] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px]
                        bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="block font-body text-[#C9A96E] text-xs font-semibold tracking-[0.35em] uppercase mb-5">
              Why Choose Us
            </span>
            <h2 className="reveal font-heading text-4xl md:text-6xl text-white mb-6">
              Complete Catering Solutions
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-6" />
            <p className="reveal font-body text-white/60 text-base max-w-xl mx-auto">
              Our team focuses on delivering an experience that goes beyond the food —
              every detail, every moment, managed with precision.
            </p>
          </div>

          <div className="service-grid grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-5 max-w-2xl mx-auto">
            {serviceExcellence.map((item, i) => (
              <div key={i} className="service-item flex items-center gap-4">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30
                               flex items-center justify-center"
                >
                  <svg className="w-3.5 h-3.5 text-[#C9A96E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="font-body text-white/85 text-sm leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <p className="reveal text-center font-heading-italic text-white/35 mt-14 text-base">
            Every detail is carefully managed to ensure a sophisticated and memorable dining experience.
          </p>
        </div>
      </section>

      {/* ═══ 7. GALLERY ═══ */}
      <section className="py-24 md:py-36 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal">
            <span className="block font-body text-[#C9A96E] text-xs font-semibold tracking-[0.35em] uppercase mb-5">
              Visual Experience
            </span>
            <h2 className="font-heading text-4xl md:text-6xl text-[#2A1F15] mb-6">
              Crafted to Impress
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-6" />
            <p className="font-body text-[#666] text-base max-w-xl mx-auto">
              A glimpse into our buffet setups, live stations, outdoor catering layouts,
              and refined service presentation.
            </p>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
            {cateringGallery.map((img) => (
              <div
                key={img.id}
                className="gallery-item opacity-0 translate-y-10 break-inside-avoid relative group
                           rounded-xl overflow-hidden shadow-sm cursor-pointer"
              >
                <Image
                  src={img.image}
                  alt={img.alt}
                  width={800}
                  height={600}
                  quality={70}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100
                              transition-opacity duration-300 flex items-end justify-start p-5"
                >
                  <span
                    className="font-body text-white text-xs uppercase tracking-widest
                                 border border-white/30 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
                  >
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 8. TRUSTED CLIENTS ═══ */}
      <section className="py-24 md:py-32 px-6 bg-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14 reveal">
            <span className="block font-body text-[#C9A96E] text-xs font-semibold tracking-[0.35em] uppercase mb-5">
              Our Clients
            </span>
            <h2 className="font-heading text-4xl md:text-6xl text-[#2A1F15] mb-6">
              Trusted by Leading Organizations
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-6" />
            <p className="font-body text-[#666] text-base max-w-xl mx-auto">
              From global corporations to premier institutions — our catering services have been
              chosen by brands that demand nothing less than excellence.
            </p>
          </div>

          <div
            className="reveal overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="flex w-max gap-8 items-center py-2 [animation:marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
              {[...trustedClients, ...trustedClients].map((client, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-36 h-20 bg-white rounded-xl border border-[#EDE5D8]
                             flex flex-col items-center justify-center gap-1 px-4
                             grayscale hover:grayscale-0 transition-all duration-300
                             hover:shadow-md hover:border-[#C9A96E]/40"
                >
                  <span className="font-heading text-xl font-semibold text-[#6B5C4C]">{client.initials}</span>
                  <span className="font-body text-[9px] text-[#AAA] tracking-wider uppercase text-center leading-tight">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 9. FINAL CTA ═══ */}
      <section className="relative py-28 md:py-40 px-6 bg-[#2B1810] overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[600px] h-[400px] bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <span className="block font-body text-[#C9A96E] text-xs font-semibold tracking-[0.35em] uppercase mb-6">
            Ready to Begin?
          </span>

          <h2 className="reveal font-heading text-4xl sm:text-5xl md:text-7xl text-white leading-tight mb-6">
            Let Us Curate Your Perfect Menu
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent mx-auto mb-8" />
          <p className="reveal font-body text-white/65 text-base leading-relaxed max-w-xl mx-auto mb-12">
            From intimate dinners to grand weddings, GD Foods India crafts every menu with care,
            precision, and a passion for exceptional food. Get in touch — we'd love to be a part of your celebration.
          </p>

          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/enquiry"
              className="bg-gradient-to-br from-[#C9A96E] to-[#A8883D] text-[#1a0f08] font-body font-bold
                         uppercase tracking-[0.15em] px-8 py-4 rounded-lg text-sm
                         transition-all duration-300 hover:shadow-[0_8px_32px_rgba(201,169,110,0.45)] hover:-translate-y-0.5"
            >
              Request a Custom Proposal
            </Link>
            <a
              href="tel:+918800190003"
              className="border border-[#C9A96E]/40 text-[#C9A96E] font-body font-semibold uppercase
                         tracking-[0.15em] px-8 py-4 rounded-lg text-sm
                         transition-all duration-300 hover:bg-[#C9A96E]/10"
            >
              Call +91-88001 90003
            </a>
            <a
              href="https://wa.me/919650211469"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 text-white/75 font-body font-semibold uppercase
                         tracking-[0.15em] px-8 py-4 rounded-lg text-sm
                         transition-all duration-300 hover:bg-white/8"
            >
              WhatsApp Us
            </a>
          </div>

          <div className="reveal flex flex-wrap justify-center gap-8 pt-8 border-t border-white/10">
            {["+91-8800190003", "+91-9650211469", "+91-9810679550"].map((num) => (
              <a
                key={num}
                href={`tel:${num.replace(/-/g, "")}`}
                className="font-body text-white/35 text-sm tracking-wider hover:text-[#C9A96E] transition-colors"
              >
                {num}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}