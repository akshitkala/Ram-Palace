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
          start: "top 50%",
          end: "top 25%",
          scrub: true
        },
        y: () => window.innerWidth > 1024 ? "20%" : "40%"
        ,
        duration:1.5,
        stagger:0.2,
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
        className="relative bg-[#A99686] text-white px-8 pt-10 pb-24"
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
        <div className="max-w-7xl mx-auto grid gap-16 md:grid-cols-3 text-sm">
          
          <div>
            <p className="mb-4 font-semibold text-white">Ram Palace</p>
            <p className="text-white/90 leading-relaxed">
              A premium banquet hall for weddings, birthday parties,
              corporate events, and private celebrations.
            </p>
          </div>

          <div>
            <p className="mb-4 font-semibold text-white">Events</p>
            <ul className="space-y-2 text-white/90">
              <li>Weddings & Receptions</li>
              <li>Birthday Parties</li>
              <li>Corporate Events</li>
              <li>Private Functions</li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-semibold text-white">Contact</p>
            <p className="text-white/90">
              Basti, Uttar Pradesh<br />
              +91 XXXXX XXXXX<br />
              info@rampalace.com
            </p>
          </div>
        </div>

       

        {/* FOOTER BOTTOM */}
        <div className="mt-6 flex flex-col md:flex-row items-center justify-between text-xs text-white/80">
          <p>© {new Date().getFullYear()} Ram Palace</p>
          <div className="flex gap-6 mt-4 md:mt-0">
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
