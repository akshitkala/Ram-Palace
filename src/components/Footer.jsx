"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShimmerLine, GoldHairline } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

const MAPS_URL =
  "https://www.google.com/maps/place/Basti+Ram+Palace/@28.3919789,76.9144771,17z";

const NAV_LINKS = [
  { label: "Home",             href: "/" },
  { label: "Weddings",         href: "/events/weddings" },
  { label: "Corporate Events", href: "/events/corporate-events" },
  { label: "Private Parties",  href: "/events/private-parties" },
  { label: "Catering",         href: "/catering" },
  { label: "Enquire Now",      href: "/enquiry" },
];

const CONTACTS = [
  { label: "+91-88001 90003", href: "tel:+918800190003" },
  { label: "+91-96502 11469", href: "tel:+919650211469" },
  { label: "+91-98106 79550", href: "tel:+919810679550" },
];

const Footer = () => {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // Stagger in each column
      gsap.fromTo(".footer-col",
        { opacity: 0, y: 36 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      // Gold rule expands
      gsap.fromTo(".footer-rule",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 88%",
            once: true,
          },
        }
      );

      // Letter-by-letter brand name
      gsap.fromTo(".footer-letter",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.035,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-brand-row",
            start: "top 92%",
            once: true,
          },
        }
      );

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#2B1810] overflow-hidden"
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2
                   w-[700px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.07) 0%, transparent 70%)" }}
      />

      {/* ── Corner ornaments ── */}
      <div className="absolute top-10 left-10 w-16 h-16 border-t border-l border-[#C9A84C]/20 pointer-events-none" />
      <div className="absolute top-10 right-10 w-16 h-16 border-t border-r border-[#C9A84C]/20 pointer-events-none" />

      {/* ── Grain ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      {/* ══════════ MAIN GRID ══════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 lg:px-16 pt-16 md:pt-20 pb-12">

        {/* Gold top rule */}
        <ShimmerLine className="footer-rule w-full opacity-60 mb-14" direction="left" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-10">

          {/* ── Col 1: Venue identity ── */}
          <div className="footer-col lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <GoldHairline className="w-5" />
              <span className="font-body text-[#C9A84C] text-[9px] tracking-[0.4em] uppercase font-bold">
                The Venue
              </span>
            </div>
            <h3 className="font-heading text-2xl text-white leading-snug mb-4">
              Basti Ram<br />
              <em className="not-italic text-[#C9A84C]">Palace</em>
            </h3>
            <p className="font-body text-white/45 text-sm leading-relaxed mb-6 max-w-[220px]">
              Gurugram&apos;s premier banquet destination for weddings, corporate
              events, and private celebrations.
            </p>

            {/* Rating pill */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-[#C9A84C]/25
                         hover:border-[#C9A84C]/60 px-4 py-2 rounded-full
                         transition-all duration-300 group"
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M5 1L6.12 3.62L9 3.93L7 5.76L7.63 8.59L5 7.1L2.37 8.59L3 5.76L1 3.93L3.88 3.62Z"
                      fill="#C9A84C" fillOpacity="1"/>
                  </svg>
                ))}
              </div>
              <span className="font-body text-[#C9A84C] text-xs font-semibold">4.8</span>
              <span className="font-body text-white/30 text-xs">on Google</span>
              <span className="font-body text-[#C9A84C]/50 text-xs
                                group-hover:translate-x-0.5 transition-transform duration-300">↗</span>
            </a>
          </div>

          {/* ── Col 2: Navigation ── */}
          <div className="footer-col">
            <div className="flex items-center gap-3 mb-5">
              <GoldHairline className="w-5" />
              <span className="font-body text-[#C9A84C] text-[9px] tracking-[0.4em] uppercase font-bold">
                Explore
              </span>
            </div>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-white/50 text-sm tracking-wide
                               hover:text-white transition-colors duration-300
                               flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#C9A84C]
                                     transition-all duration-300 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Contact ── */}
          <div className="footer-col">
            <div className="flex items-center gap-3 mb-5">
              <GoldHairline className="w-5" />
              <span className="font-body text-[#C9A84C] text-[9px] tracking-[0.4em] uppercase font-bold">
                Contact
              </span>
            </div>

            {/* Phone numbers */}
            <ul className="space-y-3 mb-8">
              {CONTACTS.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    className="font-body text-white/50 text-sm tracking-wide
                               hover:text-white transition-colors duration-300
                               flex items-center gap-2 group"
                  >
                    <span className="text-[#C9A84C]/40 group-hover:text-[#C9A84C] transition-colors text-xs">
                      ✆
                    </span>
                    {c.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="mailto:info@bastirampalace.com"
                  className="font-body text-white/50 text-sm tracking-wide
                             hover:text-white transition-colors duration-300
                             flex items-center gap-2 group"
                >
                  <span className="text-[#C9A84C]/40 group-hover:text-[#C9A84C] transition-colors text-xs">
                    ✉
                  </span>
                  info@bastirampalace.com
                </a>
              </li>
            </ul>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919650211469"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5
                         bg-[#25D366]/10 border border-[#25D366]/25
                         hover:bg-[#25D366]/20 hover:border-[#25D366]/50
                         text-[#25D366] font-body text-xs font-semibold
                         uppercase tracking-[0.15em] px-5 py-2.5 rounded-full
                         transition-all duration-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Enquiry
            </a>
          </div>

          {/* ── Col 4: Address + Map ── */}
          <div className="footer-col">
            <div className="flex items-center gap-3 mb-5">
              <GoldHairline className="w-5" />
              <span className="font-body text-[#C9A84C] text-[9px] tracking-[0.4em] uppercase font-bold">
                Find Us
              </span>
            </div>

            <address className="not-italic font-body text-white/50 text-sm leading-relaxed mb-6">
              16G, Kankrola<br />
              IMT Manesar, Manesar<br />
              Gurugram, Haryana<br />
              <span className="text-[#C9A84C]/60">122505</span>
            </address>

            {/* Google Maps button */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5
                         border border-white/15 hover:border-[#C9A84C]/50
                         text-white/40 hover:text-white/80
                         font-body text-xs uppercase tracking-[0.15em]
                         px-5 py-2.5 rounded-full
                         transition-all duration-300 group"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                   className="text-[#C9A84C]/50 group-hover:text-[#C9A84C] transition-colors">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                   fill="currentColor"/>
              </svg>
              Get Directions
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">↗</span>
            </a>
          </div>

        </div>

        <div className="footer-brand-row mt-16 mb-8 overflow-hidden">
          <div className="flex items-end gap-0">
            {"BASTI RAM PALACE".split("").map((char, i) => {
              const isP = i === 10; // The 'P' in PALACE
              const content = (
                <span
                  key={i}
                  className={`footer-letter font-heading leading-none text-white/[0.06] select-none
                             ${isP ? "cursor-default pointer-events-auto" : "pointer-events-none"}`}
                  style={{ fontSize: "clamp(1.8rem, 5.5vw, 6rem)" }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );

              if (isP) {
                return (
                  <Link href="/admin/login" key={i} className="inline-block transition-opacity hover:opacity-100">
                    {content}
                  </Link>
                );
              }

              return content;
            })}
          </div>
        </div>

        {/* ══════════ BOTTOM BAR ══════════ */}
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row
                        items-center justify-between gap-4">
          <p className="font-body text-white/25 text-xs tracking-wide">
            © {new Date().getFullYear()} Basti Ram Palace. All rights reserved.
          </p>

          <div className="flex items-center gap-1 font-body text-white/20 text-xs tracking-wide">
            <span>Catering by</span>
            <span className="text-[#C9A84C]/50 ml-1 font-semibold">GD Foods India</span>
          </div>

          <div className="flex gap-6">
            {["Privacy", "Terms"].map((item) => (
              <span
                key={item}
                className="font-body text-white/20 text-xs tracking-wide
                           hover:text-white/50 transition-colors duration-300 cursor-pointer"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;