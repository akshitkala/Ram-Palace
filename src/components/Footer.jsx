import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // let browser paint first
    requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        gsap.to(".letter", {
          scrollTrigger: {
            trigger: footerRef.current,
            start: window.innerWidth > 1024 ? "top 40%" : "top 55%",
            end: window.innerWidth > 1024 ? "top 10%" : "top 25%",
            scrub: true,
          },
          y: window.innerWidth > 1024 ? "20%" : "40%",
          stagger: 0.08,
          ease: "power3.out",
        });
      }, footerRef);

      ScrollTrigger.refresh();

      return () => ctx.revert();
    });
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#A99686] text-white px-6 pt-10 pb-24 min-h-screen"
    >
      {/* Brand animation */}
      <div className="mb-12 w-full border-b border-white/30 flex overflow-hidden">
        {"RAM PALACE".split("").map((letter, index) => (
          <span
            key={index}
            className="letter text-white/90 text-[50px] md:text-[150px] translate-y-[200%] leading-none"
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-3 text-sm">
        <div>
          <p className="font-semibold mb-3">Ram Palace</p>
          <p className="text-white/90">
            A premium banquet hall for weddings, birthday parties,
            corporate events, and private celebrations.
          </p>
        </div>

        <div>
          <p className="font-semibold mb-3">Events</p>
          <ul className="space-y-2 text-white/90">
            <li>Weddings & Receptions</li>
            <li>Birthday Parties</li>
            <li>Corporate Events</li>
            <li>Private Functions</li>
          </ul>
        </div>

        <div>
          <p className="font-semibold mb-3">Contact</p>
          <p className="text-white/90">
            Basti, Uttar Pradesh<br />
            +91 XXXXX XXXXX<br />
            info@rampalace.com
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-between text-xs text-white/80">
        <p>© {new Date().getFullYear()} Ram Palace</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-[#D4AF37] cursor-pointer">Privacy</span>
          <span className="hover:text-[#D4AF37] cursor-pointer">Terms</span>
          <span className="hover:text-[#D4AF37] cursor-pointer">Trust</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
