"use client";

import { useState, useEffect, useRef } from "react";
import { FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);
import NavLinks from "./NavLinks";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);

  const navRef = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const tl = useRef(null);

  // 🔹 NAVBAR SCROLL ANIMATIONS (Optimized with ScrollTrigger)
  useGSAP(
    () => {
      if (!navRef.current) return;

      // 1. Scroll-based Background & Blur Transition
      ScrollTrigger.create({
        start: "top -80",
        onUpdate: (self) => {
          if (!navRef.current) return;
          if (self.isActive) {
            gsap.to(navRef.current, { 
              backgroundColor: 'rgba(28,28,30,0.95)',
              backdropFilter: 'blur(8px)',
              duration: 0.4,
              overwrite: 'auto'
            });
          } else {
            gsap.to(navRef.current, { 
              backgroundColor: 'rgba(0,0,0,0.40)',
              backdropFilter: 'blur(8px)',
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
          if (!navRef.current) return;
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
          const logo = document.querySelector(".nav-logo");
          if (logo) {
            gsap.to(logo, { 
              scale: self.isActive ? 0.8 : 1, 
              duration: 0.4, 
              ease: "power2.out",
              overwrite: 'auto'
            });
          }
        }
      });
    },
    { scope: navRef, dependencies: [] }
  );

  // 🔹 MOBILE MENU TIMELINE (OPEN + CLOSE)
  useEffect(() => {
    if (!menuRef.current) return;
    
    tl.current = gsap.timeline({
      paused: true,
      defaults: { ease: "expo.inOut" },
    });

    tl.current
      .fromTo(
        menuRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.8 }
      )
      .fromTo(
        linksRef.current.filter(Boolean),
        { y: 50, opacity: 0, skewY: 5 },
        { y: 0, opacity: 1, skewY: 0, stagger: 0.08, duration: 0.6 },
        "-=0.5"
      );

    return () => {
      if (tl.current) tl.current.kill();
    };
  }, []);

  // 🔹 PLAY / REVERSE MENU
  useEffect(() => {
    if (!tl.current) return;
    if (open) {
      // Robust Body Lock for mobile and smooth-scroll cases
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; 
      tl.current.play();
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      tl.current.reverse();
    }
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[1000] text-white bg-black/40 backdrop-blur-sm border-b border-white/10 shadow-lg"
      >
        <div className="flex items-center justify-between px-6 py-4 lg:px-10">
          <NavLinks />

          <button
            onClick={() => setOpen(!open)}
            className={`relative lg:hidden w-8 h-8 flex items-center justify-center z-[10002] ${open ? 'text-black' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            <span className={`absolute w-7 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${open ? 'rotate-45' : '-translate-y-2.5'}`} />
            <span className={`absolute w-7 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${open ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}`} />
            <span className={`absolute w-7 h-[2px] bg-current transform transition-all duration-300 ease-in-out ${open ? '-rotate-45' : 'translate-y-2.5'}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU (ALWAYS MOUNTED) */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[10001] bg-[#E5DFDA] text-black flex flex-col justify-between pt-10 pb-10 translate-y-full overflow-y-auto scrollbar-hide"
      >
        {/* Links */}
          <div className="flex flex-col gap-4 md:gap-6 px-10 text-3xl md:text-4xl mt-8">
            <Link 
              ref={(el) => (linksRef.current[0] = el)}
              onClick={() => setOpen(false)} 
              href="/" 
              className="transition-all duration-300 hover:text-[#C9A84C] hover:translate-x-2 group"
            >
              Home <span className="font-light text-2xl lg:text-3xl">&gt;</span>
            </Link>
            <Link 
              ref={(el) => (linksRef.current[1] = el)}
              onClick={() => setOpen(false)} 
              href="/services" 
              className="transition-all duration-300 hover:text-[#C9A84C] hover:translate-x-2 group"
            >
              Services <span className="font-light text-2xl lg:text-3xl">&gt;</span>
            </Link>
            
            {/* Events Sub-menu */}
            <div ref={(el) => (linksRef.current[2] = el)} className="flex flex-col gap-2">
              <button 
                onClick={() => setEventsOpen(!eventsOpen)}
                className="flex items-center justify-between transition-all duration-300 hover:text-[#C9A84C] text-left"
              >
                Events <span className={`transition-transform duration-300 ${eventsOpen ? 'rotate-90' : ''}`}>&gt;</span>
              </button>
              {eventsOpen && (
                <div className="flex flex-col gap-3 pl-6 mt-2 text-2xl border-l border-[#C9A84C]/30">
                  <Link onClick={() => setOpen(false)} href="/events/weddings" className="text-black/60 hover:text-[#C9A84C]">Weddings</Link>
                  <Link onClick={() => setOpen(false)} href="/events/corporate" className="text-black/60 hover:text-[#C9A84C]">Corporate</Link>
                  <Link onClick={() => setOpen(false)} href="/events/private-parties" className="text-black/60 hover:text-[#C9A84C]">Private parties</Link>
                </div>
              )}
            </div>

            <Link 
              ref={(el) => (linksRef.current[3] = el)}
              onClick={() => setOpen(false)} 
              href="/catering" 
              className="transition-all duration-300 hover:text-[#C9A84C] hover:translate-x-2 group"
            >
              Catering <span className="font-light text-2xl lg:text-3xl">&gt;</span>
            </Link>
            <Link 
              ref={(el) => (linksRef.current[4] = el)}
              onClick={() => setOpen(false)} 
              href="/menu" 
              className="transition-all duration-300 hover:text-[#C9A84C] hover:translate-x-2 group"
            >
              Menu <span className="font-light text-2xl lg:text-3xl">&gt;</span>
            </Link>
            <Link 
              ref={(el) => (linksRef.current[5] = el)}
              onClick={() => setOpen(false)} 
              href="/gallery" 
              className="transition-all duration-300 hover:text-[#C9A84C] hover:translate-x-2 group"
            >
              Gallery <span className="font-light text-2xl lg:text-3xl">&gt;</span>
            </Link>
          </div>

        {/* Footer */}
        <div className="px-10 mt-8 mb-4 flex flex-col gap-5">
          <div className="flex gap-5">
            <a href="https://www.instagram.com/basti.ram.palace/" aria-label="Follow Basti Ram Palace on Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-2xl hover:text-[#C9A84C] transition-colors" />
            </a>
          </div>

          <Link href="/contact" className="w-fit">
            <button className="w-fit text-lg text-white px-8 py-3 bg-[#C9A84C] rounded-sm transition-all duration-300 hover:opacity-80 hover:scale-[1.02] hover:shadow-lg">
              Reserve Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
