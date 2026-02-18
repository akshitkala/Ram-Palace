import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the entire footer container like AntiGravitySection
      gsap.fromTo(
        footerRef.current,
        {
          y: 100,
          opacity: 0,
          scale: 0.95,
          rotation: -2
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "bottom 90%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate letters
      gsap.fromTo(
        ".letter",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 75%", 
            toggleActions: "play none none reverse",
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* FOOTER SECTION */}
      <footer
        ref={footerRef}
        className="relative bg-[#A99686] text-white px-8 pt-10 pb-10"
      >
        {/* name animation */}
        <div className="mb-10 w-full border-b border-white/30 flex justify-between overflow-hidden">
          {"RAM PALACE".split("").map((letter, index) => (
            <span
              key={index}
              className="letter inline-block text-[12vw] md:text-[9vw] font-heading leading-none"
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>

        {/* CONTENT */}
        <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3 text-sm mb-16">
          <div>
            <p className="mb-4 font-semibold text-white/90 uppercase tracking-widest">Ram Palace</p>
            <p className="text-white/80 leading-relaxed max-w-xs">
              A premium banquet hall for weddings, birthday parties,
              corporate events, and private celebrations.
            </p>
          </div>

          <div>
            <p className="mb-4 font-semibold text-white/90 uppercase tracking-widest">Events</p>
            <ul className="space-y-2 text-white/80">
              <li className="hover:text-white transition-colors cursor-pointer">Weddings & Receptions</li>
              <li className="hover:text-white transition-colors cursor-pointer">Birthday Parties</li>
              <li className="hover:text-white transition-colors cursor-pointer">Corporate Events</li>
              <li className="hover:text-white transition-colors cursor-pointer">Private Functions</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-semibold text-white/90 uppercase tracking-widest">Contact</p>
            <p className="text-white/80 leading-relaxed">
              Basti, Uttar Pradesh<br />
              +91 XXXXX XXXXX<br />
              info@rampalace.com
            </p>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-white/60 border-t border-white/10 pt-6">
          <p>© {new Date().getFullYear()} Ram Palace. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span className="hover:text-white transition-colors duration-300 cursor-pointer">Privacy</span>
            <span className="hover:text-white transition-colors duration-300 cursor-pointer">Terms</span>
            <span className="hover:text-white transition-colors duration-300 cursor-pointer">Trust</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;