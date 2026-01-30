import { useState, useEffect, useRef } from "react";

import img1 from "../assets/images/carousel/carousel1.webp";
import img2 from "../assets/images/carousel/carousel2.webp";
import img3 from "../assets/images/carousel/carousel3.webp";
import img4 from "../assets/images/carousel/carousel4.webp";

const images = [img1, img2, img3, img4];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // 🔹 Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // 🔹 Touch handlers (Android swipe)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (distance > 50) {
      // swipe left → next
      setCurrent((prev) => (prev + 1) % images.length);
    } else if (distance < -50) {
      // swipe right → previous
      setCurrent((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    }
  };

  return (
    <section
      className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      
      {/* Images - Only render current and next for performance */}
      {images.map((img, index) => {
        const isCurrent = index === current;
        const isNext = index === (current + 1) % images.length;
        const shouldRender = isCurrent || isNext;
        
        if (!shouldRender) return null;
        
        return (
          <img
            key={index}
            src={img}
            alt="Ram Palace ambience"
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-1000
              ${isCurrent ? "opacity-100" : "opacity-0"}
            `}
            loading="lazy"
            decoding="async"
            fetchPriority="auto"
          />
        );
      })}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              w-2.5 h-2.5 rounded-full transition-all duration-300
              ${
                index === current
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/70 hover:scale-110"
              }
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
