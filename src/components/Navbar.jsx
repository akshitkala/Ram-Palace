"use client";

import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const logoRef = useRef(null);
  const dropdownRef = useRef(null);
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
              backdropFilter: 'blur(20px)',
              duration: 0.4,
              overwrite: 'auto'
            });
          } else {
            gsap.to(navRef.current, { 
              backgroundColor: 'rgba(0,0,0,0.40)',
              backdropFilter: 'blur(12px)',
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

      // 3. Logo Scaling
      ScrollTrigger.create({
        start: "top -50",
        onUpdate: (self) => {
          gsap.to(logoRef.current, { 
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

  // 🔹 DROPDOWN ANIMATION
  const handleDropdownEnter = () => {
    gsap.to(dropdownRef.current, { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" });
  };
  
  const handleDropdownLeave = () => {
    gsap.to(dropdownRef.current, { autoAlpha: 0, y: 10, duration: 0.2, ease: "power2.in" });
  };

  // Initial set for dropdown
  useEffect(() => {
     gsap.set(dropdownRef.current, { autoAlpha: 0, y: 10 });
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
        className="fixed top-0 left-0 w-full z-50 text-white bg-black/40 backdrop-blur-md border-b border-white/10 shadow-lg"
      >
        <div className="flex items-center justify-between px-4 py-4 lg:px-10">
          <Link 
            href="/" 
            ref={logoRef}
            className="text-2xl md:text-3xl font-serif font-bold text-[#C9A84C] tracking-wider whitespace-nowrap origin-left will-change-transform"
          >
            Basti Ram Palace
          </Link>

            <ul className="hidden lg:flex gap-8 items-center">
              <li>
                <Link 
                  href="/" 
                  className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              
              {/* Events Dropdown */}
              <li 
                className="relative group h-full"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="relative text-white transition-all duration-300 hover:text-[#C9A84C] flex items-center gap-1 py-4">
                  Events
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  ref={dropdownRef}
                  className="absolute top-full left-0 mt-0 w-56 bg-white rounded-md shadow-lg overflow-hidden will-change-transform"
                >
                  <div className="py-2">
                    <Link
                      href="/events/weddings"
                      className="block px-6 py-3 text-[#555] hover:bg-[#F5F1EB] hover:text-[#A99686] transition-colors duration-200"
                    >
                      Weddings & Receptions
                    </Link>
                    <Link
                      href="/events/corporate-events"
                      className="block px-6 py-3 text-[#555] hover:bg-[#F5F1EB] hover:text-[#A99686] transition-colors duration-200"
                    >
                      Corporate Events
                    </Link>
                    <Link
                      href="/events/private-parties"
                      className="block px-6 py-3 text-[#555] hover:bg-[#F5F1EB] hover:text-[#A99686] transition-colors duration-200"
                    >
                      Private Parties
                    </Link>
                  </div>
                </div>
              </li>
              
              <li>
                <Link 
                  href="/catering" 
                  className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group"
                >
                  Catering
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/Menu" 
                  className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group"
                >
                  Menu
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/gallery" 
                  className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group"
                >
                  Gallery
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="relative text-white transition-all duration-300 hover:text-[#C9A84C] group"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C9A84C] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>

            {/* FIX 4 — RESERVE NOW BUTTON */}
            <Link 
              href="/contact" 
              className="hidden lg:block ml-4"
            >
              <button className="
                bg-[#C9A84C] text-[#1C1C1E]
                px-6 py-2.5
                text-xs tracking-[2px] uppercase font-medium
                transition-all duration-300
                hover:bg-[#b8963e] 
                hover:scale-105 
                hover:shadow-[0_4px_20px_rgba(201,168,76,0.4)]
              ">
                Reserve Now
              </button>
            </Link>

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
