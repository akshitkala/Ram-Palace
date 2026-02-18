import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const logoRef = useRef(null);
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const tl = useRef(null);

  // 🔹 NAVBAR HIDE / SHOW + LOGO SCALE
  useEffect(() => {
    let lastScroll = window.scrollY;

    const updateNavbar = () => {
      const current = window.scrollY;

      // Hide/Show Navbar Logic
      if (current > lastScroll && current > 100) {
        gsap.to(navRef.current, { y: "-100%", duration: 0.4, ease: "power2.out" });
      } else {
        gsap.to(navRef.current, { y: "0%", duration: 0.4, ease: "power2.out" });
      }

      // Logo Scaling Logic
      if (current > 50) {
         gsap.to(logoRef.current, { scale: 0.8, duration: 0.4, ease: "power2.out" });
      } else {
         gsap.to(logoRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
      }

      lastScroll = current;
    };

    window.addEventListener("scroll", updateNavbar);
    return () => window.removeEventListener("scroll", updateNavbar);
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
        className="fixed top-0 left-0 w-full z-50 text-white bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg"
      >
        <div className="flex items-center justify-between px-4 py-4 lg:px-10">
          <Link 
            to="/" 
            ref={logoRef}
            className="text-2xl md:text-3xl font-serif font-bold text-[#D4AF37] tracking-wider whitespace-nowrap origin-left will-change-transform"
          >
            Basti Ram Palace
          </Link>

            <ul className="hidden lg:flex gap-8 items-center">
              <li>
                <Link 
                  to="/" 
                  className="relative text-white transition-all duration-300 hover:text-[#D4AF37] group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              
              {/* Events Dropdown */}
              <li 
                className="relative group h-full"
                onMouseEnter={handleDropdownEnter}
                onMouseLeave={handleDropdownLeave}
              >
                <button className="relative text-white transition-all duration-300 hover:text-[#D4AF37] flex items-center gap-1 py-4">
                  Events
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
                </button>
                
                {/* Dropdown Menu */}
                <div 
                  ref={dropdownRef}
                  className="absolute top-full left-0 mt-0 w-56 bg-white rounded-md shadow-lg overflow-hidden will-change-transform"
                >
                  <div className="py-2">
                    <Link
                      to="/events/weddings"
                      className="block px-6 py-3 text-[#555] hover:bg-[#F5F1EB] hover:text-[#A99686] transition-colors duration-200"
                    >
                      Weddings & Receptions
                    </Link>
                    <Link
                      to="/events/corporate-events"
                      className="block px-6 py-3 text-[#555] hover:bg-[#F5F1EB] hover:text-[#A99686] transition-colors duration-200"
                    >
                      Corporate Events
                    </Link>
                    <Link
                      to="/events/private-parties"
                      className="block px-6 py-3 text-[#555] hover:bg-[#F5F1EB] hover:text-[#A99686] transition-colors duration-200"
                    >
                      Private Parties
                    </Link>
                  </div>
                </div>
              </li>
              
              <li>
                <Link 
                  to="/gallery" 
                  className="relative text-white transition-all duration-300 hover:text-[#D4AF37] group"
                >
                  Gallery
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/Contact" 
                  className="relative text-white transition-all duration-300 hover:text-[#D4AF37] group"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>

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
              { label: "Gallery", path: "/gallery" },
              { label: "Contact", path: "/Contact" }
            ].map((item, i) => (
              <Link
                key={item.label}
                ref={(el) => (linksRef.current[i] = el)}
                onClick={() => setOpen(false)}
                to={item.path}
                className="transition-all duration-300 hover:text-[#D4AF37] hover:translate-x-2 group"
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

          <button className="text-xl text-white px-6 py-3 bg-[#A99686] rounded-sm transition-all duration-300 hover:opacity-80 hover:scale-105 hover:shadow-lg">
            Reserve Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
