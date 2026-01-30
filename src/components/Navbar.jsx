import { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navRef = useRef(null);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const tl = useRef(null);

  // 🔹 NAVBAR HIDE / SHOW ON SCROLL
  useEffect(() => {
    let lastScroll = window.scrollY;

    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: () => {
        const current = window.scrollY;

        if (current > lastScroll && current > 100) {
          gsap.to(navRef.current, { y: "-100%", duration: 0.4, ease: "power2.out" });
        } else {
          gsap.to(navRef.current, { y: "0%", duration: 0.1, ease: "power2.out" });
        }

        lastScroll = current;
      },
    });
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
        className="fixed top-0 left-0 w-full z-50 text-white"
      >
        <div className="flex items-center justify-between px-4 py-4 lg:px-10">
          <img 
            src={logo} 
            alt="Ram Palace Logo" 
            className="h-20 w-auto sm:h-10 md:h-12 lg:h-14 object-contain transition-all duration-300"
          />

            <ul className="hidden lg:flex gap-8">
              <li>
                <Link 
                  to="/" 
                  className="relative text-white transition-all duration-300 hover:text-[#D4AF37] group"
                >
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/EventsPage" 
                  className="relative text-white transition-all duration-300 hover:text-[#D4AF37] group"
                >
                  Events
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/VirtualTour" 
                  className="relative text-white transition-all duration-300 hover:text-[#D4AF37] group"
                >
                  Visual Tour
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
        className="fixed inset-0 z-40 bg-[#E5DFDA] text-black flex flex-col justify-between pt-32 pb-10 translate-y-full"
      >
        {/* Links */}
          <div className="flex flex-col gap-6 px-10 text-4xl">
            {[
              { label: "Home", path: "/" },
              { label: "Events", path: "/EventsPage" },
              { label: "Visual Tour", path: "/VirtualTour" },
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
