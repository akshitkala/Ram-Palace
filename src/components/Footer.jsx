import { useEffect, useRef ,useLayoutEffect} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".letter", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: () => window.innerWidth > 1024 ? "top 40%" : "top 55%",
          end: () => window.innerWidth > 1024 ? "top 10%" : "top 25%",
          scrub: true
        },
        y: () => window.innerWidth > 1024 ? "20%" : "40%"
        ,
        duration:1.5,
        stagger:0.4,
        ease:"power3.out"
      });
    }, footerRef);

    return () => ctx.revert(); // cleanup
  }, []);

  

  return (
    <>
      

      {/* FOOTER SECTION */}
      <footer
        ref={footerRef}
        className="relative bg-[#A99686] text-white px-4 sm:px-6 md:px-8 pt-8 sm:pt-10 pb-16 sm:pb-20 md:pb-24 min-h-screen lg:h-[90vh]"
      >
         {/* name animation */}
         

         <div className="mb-10 w-full border-b border-white/30  flex justify-between overflow-y-hidden">
        {"RAM PALACE".split("").map((letter, index) => (
            <span key={index} className="text-white/90  letter text-[50px] md:text-[150px] translate-y-[200%] h-[100px] md:h-[220px]">
    {letter}
  </span>
))}
</div>

       
        {/* CONTENT */}
        <div className="max-w-7xl mx-auto grid gap-8 sm:gap-12 md:gap-16 md:grid-cols-3 text-xs sm:text-sm">
          
          <div>
            <p className="mb-3 sm:mb-4 font-semibold text-white text-sm sm:text-base">Ram Palace</p>
            <p className="text-white/90 leading-relaxed text-xs sm:text-sm">
              A premium banquet hall for weddings, birthday parties,
              corporate events, and private celebrations.
            </p>
          </div>

          <div>
            <p className="mb-3 sm:mb-4 font-semibold text-white text-sm sm:text-base">Events</p>
            <ul className="space-y-1.5 sm:space-y-2 text-white/90 text-xs sm:text-sm">
              <li>Weddings & Receptions</li>
              <li>Birthday Parties</li>
              <li>Corporate Events</li>
              <li>Private Functions</li>
            </ul>
          </div>

          <div>
            <p className="mb-3 sm:mb-4 font-semibold text-white text-sm sm:text-base">Contact</p>
            <p className="text-white/90 text-xs sm:text-sm">
              Basti, Uttar Pradesh<br />
              +91 XXXXX XXXXX<br />
              info@rampalace.com
            </p>
          </div>
        </div>

       

        {/* FOOTER BOTTOM */}
        <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-center justify-between text-[10px] sm:text-xs text-white/80">
          <p>© {new Date().getFullYear()} Ram Palace</p>
          <div className="flex gap-4 sm:gap-6 mt-3 sm:mt-4 md:mt-0">
            <span className="hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">Privacy</span>
            <span className="hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">Terms</span>
            <span className="hover:text-[#D4AF37] transition-colors duration-300 cursor-pointer">Trust</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
