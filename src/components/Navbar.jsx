"use client";

import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
import NavLinks from "./NavLinks";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navRef = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const tl = useRef(null);

  // 🔹 NAVBAR SCROLL ANIMATIONS (Optimized with ScrollTrigger)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-based Background & Blur Transition
      ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
          if (self.isActive) {
            gsap.to(navRef.current, { 
              backgroundColor: 'rgba(28,28,30,0.95)',
              backdropFilter: 'blur(8px)', // Reduced from 20px as per FIX 11
              duration: 0.4,
              overwrite: 'auto'
            });
          } else {
            gsap.to(navRef.current, { 
              backgroundColor: 'rgba(0,0,0,0.40)',
              backdropFilter: 'blur(8px)', // Consistent with FIX 11
              duration: 0.4,
              overwrite: 'auto'
            });
          }
        }
      });

      // 2. Hide/Show Navbar on Direction Change
      ScrollTrigger.create({
        start: "top -100",
        onUpdate: (self) => {
          if (self.direction === 1) { // Scrolling down
            gsap.to(navRef.current, { y: "-100%", duration: 0.4, ease: "power2.out" });
          } else { // Scrolling up
            gsap.to(navRef.current, { y: "0%", duration: 0.4, ease: "power2.out" });
          }
        }
      });

      // 3. Logo Scaling (using class selector)
      ScrollTrigger.create({
        start: "top -50",
        onUpdate: (self) => {
          gsap.to(".nav-logo", { 
            scale: self.isActive ? 0.8 : 1, 
            duration: 0.4, 
            ease: "power2.out",
            overwrite: 'auto'
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  // 🔹 MOBILE MENU TIMELINE (OPEN + CLOSE)
  useEffect(() => {
    tl.current = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out" },
    });

    tl.current
      .fromTo(
        menuRef.current,
        { y: "100%" },
        { y: "0%", duration: 0.3 }
      )
      .fromTo(
        linksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.2 },
        "-=0.15"
      );
  }, []);

  // 🔹 PLAY / REVERSE MENU
  useEffect(() => {
    if (!tl.current) return;
    open ? tl.current.play() : tl.current.reverse();
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-50 text-white bg-black/40 backdrop-blur-sm border-b border-white/10 shadow-lg"
      >
        <div className="flex items-center justify-between px-4 py-4 lg:px-10">
          <NavLinks />

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-3xl z-50"
            aria-label="Toggle menu"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU (ALWAYS MOUNTED) */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#E5DFDA] text-black flex flex-col justify-between pt-32 pb-10 translate-y-full overflow-y-auto scrollbar-hide"
      >
        {/* Links */}
          <div className="flex flex-col gap-6 px-10 text-4xl">
            {[
              { label: "Home", path: "/" },
              { label: "Weddings", path: "/events/weddings" },
              { label: "Corporate Events", path: "/events/corporate-events" },
              { label: "Private Parties", path: "/events/private-parties" },
              { label: "Catering", path: "/catering" },
              { label: "Gallery", path: "/gallery" },
              { label: "Menu", path: "/Menu" },
              { label: "Contact", path: "/contact" }
            ].map((item, i) => (
              <Link
                key={item.label}
                ref={(el) => (linksRef.current[i] = el)}
                onClick={() => setOpen(false)}
                href={item.path}
                className="transition-all duration-300 hover:text-[#C9A84C] hover:translate-x-2 group"
              >
                {item.label} <span className="font-light transition-transform duration-300 group-hover:translate-x-1 inline-block">&gt;</span>
              </Link>
            ))}
          </div>

        {/* Footer */}
        <div className="px-10 flex flex-col gap-6">
          <div className="flex gap-5">
            <FaFacebookF className="text-2xl" />
            <FaInstagram className="text-2xl" />
          </div>

          <button className="text-xl text-white px-6 py-3 bg-[#C9A84C] rounded-sm transition-all duration-300 hover:opacity-80 hover:scale-105 hover:shadow-lg">
            Reserve Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
