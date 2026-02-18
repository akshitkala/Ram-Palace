import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { weddingGallery as galleryImages } from "../Data/gallery";

gsap.registerPlugin(ScrollTrigger);

const MiniGallery = () => {
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  // Duplicate images for infinite loop effect
  // Ensure we have enough length for smooth looping
  const images = [...galleryImages, ...galleryImages, ...galleryImages];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {

      // Marquee runs on all screen sizes
      const tween = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: window.innerWidth <= 768 ? 20 : 35, // faster on mobile
        repeat: -1,
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const direction = self.direction; // 1 = down, -1 = up
          gsap.to(tween, { timeScale: direction, duration: 0.5, overwrite: true });
        },
      });

      // Hover pause only on non-touch devices
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      if (!isTouch) {
        const items = trackRef.current.querySelectorAll(".gallery-item");
        items.forEach((item) => {
          item.addEventListener("mouseenter", () => tween.pause());
          item.addEventListener("mouseleave", () => tween.play());
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="w-full bg-[#fdfbf7] py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto mb-16 px-6 text-center">
        <h2 className="font-heading text-4xl md:text-5xl text-[#2a2015] mb-4">
          Moments at Basti Ram Palace
        </h2>
        <p className="font-body text-[#8c7b6c] text-lg tracking-wide">
          A glimpse into the elegance and grandeur
        </p>
      </div>

      {/* Marquee Container */}
      <div className="w-full overflow-hidden flex">
        {/* Track */}
        <div 
          ref={trackRef}
          className="flex gap-14 md:gap-20 px-4 md:px-0 w-max will-change-transform"
        >
          {images.map((img, index) => (
            <div 
              key={`${img.id}-${index}`}
              className={`
                relative group flex-shrink-0 w-[30vh] md:w-[40vh]
                ${index % 2 === 0 ? "md:mt-[10vh]" : ""}
                transition-all duration-500
              `}
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg h-[50vh] gallery-item">
                <img 
                  src={img.image} 
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                   <span className="text-white font-body tracking-widest uppercase text-sm border border-white/30 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full">
                     View Gallery
                   </span>
                </div>
                
                <Link to="/gallery" className="absolute inset-0 z-10" aria-label="View Gallery" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default MiniGallery;
