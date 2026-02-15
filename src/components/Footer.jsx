import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const letters = gsap.utils.toArray(".letter");

      // Set initial state (instead of Tailwind translate)
      gsap.set(letters, { yPercent: 120 });

      ScrollTrigger.matchMedia({

        // Desktop
        "(min-width: 1024px)": function () {
          gsap.to(letters, {
            yPercent: 0,
            ease: "power4.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 60%",
              end: "top 20%",
              scrub: 1,
            },
          });
        },

        // Mobile + Tablet
        "(max-width: 1023px)": function () {
          gsap.to(letters, {
            yPercent: 0,
            ease: "power4.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 75%",
              end: "top 40%",
              scrub: 1,
            },
          });
        },
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative bg-[#A99686] text-white px-4 sm:px-6 md:px-8 pt-8 sm:pt-10 pb-16 sm:pb-20 md:pb-24 min-h-screen lg:h-[90vh]"
    >
      {/* Name Animation */}
      <div className="mb-10 w-full border-b border-white/30 flex justify-between overflow-hidden">
        {"RAM PALACE".split("").map((letter, index) => (
          <span
            key={index}
            className="letter text-white/90 text-[48px] sm:text-[80px] md:text-[150px] leading-none"
          >
            {letter}
          </span>
        ))}
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:gap-12 md:gap-16 md:grid-cols-3 text-xs sm:text-sm">
        <div>
          <p className="mb-3 sm:mb-4 font-semibold text-white text-sm sm:text-base">
            Ram Palace
          </p>
          <p className="text-white/90 leading-relaxed">
            A premium banquet hall for weddings, birthday parties,
            corporate events, and private celebrations.
          </p>
        </div>

        <div>
          <p className="mb-3 sm:mb-4 font-semibold text-white text-sm sm:text-base">
            Events
          </p>
          <ul className="space-y-2 text-white/90">
            <li>Weddings & Receptions</li>
            <li>Birthday Parties</li>
            <li>Corporate Events</li>
            <li>Private Functions</li>
          </ul>
        </div>

        <div>
          <p className="mb-3 sm:mb-4 font-semibold text-white text-sm sm:text-base">
            Contact
          </p>
          <p className="text-white/90">
            Basti, Uttar Pradesh <br />
            +91 XXXXX XXXXX <br />
            info@rampalace.com
          </p>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/80">
        <p>© {new Date().getFullYear()} Ram Palace</p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
            Privacy
          </span>
          <span className="hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
            Terms
          </span>
          <span className="hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">
            Trust
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
