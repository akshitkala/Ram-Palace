import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import bg from "../assets/images/hero/bg.webp";
import palace from "../assets/images/hero/palace.webp";

const HeroImageAnimation = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".palace", {
        y: () => window.innerWidth > 1024 ? "6%" : "14%",        // comes from bottom
        ease: "expo.out",   // very smooth, premium feel
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      {/* Background (static) */}
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover brightness-110"
      />

      {/* Palace (animated from bottom) */}
      <img
        src={palace}
        alt="Palace"
        className="absolute inset-0 w-full h-full object-cover palace translate-y-full brightness-110"
      />
    </div>
  );
};

export default HeroImageAnimation;
