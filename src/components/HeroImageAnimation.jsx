import { useEffect, useRef } from "react";
import gsap from "gsap";

import palace from "../assets/images/hero/palace.webp";

const HeroImageAnimation = () => {
  const containerRef = useRef(null);
  const palaceRef = useRef(null);

  useEffect(() => {
    const img = palaceRef.current;
    if (!img) return;

    const animate = () => {
      gsap.fromTo(
        img,
        { y: "100%" },
        {
          y: window.innerWidth > 1024 ? "6%" : "14%",
          duration: 1.5,
          ease: "expo.out",
        }
      );
    };

    // ✅ Wait until image is decoded & ready
    if (img.complete) {
      animate();
    } else {
      img.addEventListener("load", animate);
    }

    return () => img.removeEventListener("load", animate);
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

      {/* Decorative animated layer - LCP IMAGE */}
      <img
        ref={palaceRef}
        src={palace}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover brightness-110"
        loading="eager"
        fetchPriority="high"
        decoding="sync"
      />
    </div>
  );
};

export default HeroImageAnimation;
