import { useState, useEffect } from "react";



import img1 from "../assets/images/carousel/carousel1.jpg";
import img2 from "../assets/images/carousel/carousel2.jpg";
import img3 from "../assets/images/carousel/carousel3.jpg";
import img4 from "../assets/images/carousel/carousel4.jpg";
const images = [img1, img2, img3, img4];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[70vh] md:h-screen overflow-hidden bg-black">
      
      {/* Images */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Ram Palace ambience"
          className={`
            absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
            ${index === current ? "opacity-100" : "opacity-0"}
          `}
          fetchpriority={index === 0 ? "high" : "auto"}
          decoding="async"
        />
      ))}

      {/* Overlay (subtle, optional) */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`
              w-2.5 h-2.5 rounded-full transition-all duration-300
              ${index === current ? "bg-white scale-110" : "bg-white/40 hover:bg-white/70 hover:scale-110"}
            `}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;
