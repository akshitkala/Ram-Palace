"use client";

import { IconArrowLeft, IconArrowRight, IconStarFilled, IconStar } from "@tabler/icons-react";
import gsap from "gsap";
import { useEffect, useState, useCallback, useRef } from "react";

const AUTOPLAY_INTERVAL = 5500;

const Testimonial = ({ testimonials, autoplay = true, className = "" }) => {
  const [active, setActive]     = useState(0);
  const [paused, setPaused]     = useState(false);
  const [direction, setDirection] = useState(1);
  const contentRef = useRef(null);

  const goTo = useCallback((index, dir = 1) => {
    setDirection(dir);
    setActive(index);
  }, []);

  const handleNext = useCallback(() => {
    goTo((active + 1) % testimonials.length, 1);
  }, [active, testimonials.length, goTo]);

  const handlePrev = useCallback(() => {
    goTo((active - 1 + testimonials.length) % testimonials.length, -1);
  }, [active, testimonials.length, goTo]);

  useEffect(() => {
    if (!autoplay || paused) return;
    const t = setInterval(handleNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(t);
  }, [autoplay, paused, handleNext]);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: direction > 0 ? 15 : -15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [active, direction]);

  const current = testimonials[active];

  return (
    <section
      className={`relative bg-[#FAF7F2] px-6 md:px-12 lg:px-20 py-20 md:py-28 overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Faint watermark */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   font-heading text-[18vw] leading-none text-[#2B1810]/[0.025]
                   pointer-events-none select-none whitespace-nowrap"
        aria-hidden="true"
      >
        Reviews
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-12 md:mb-16">
          <span className="w-8 h-px bg-[#C9A84C]" />
          <span className="font-body text-[#C9A84C] text-[10px] tracking-[0.4em] uppercase font-semibold">
            What Our Guests Say
          </span>
        </div>

        {/* Large decorative quote mark */}
        <span
          className="block font-heading text-[96px] md:text-[128px] leading-none
                     text-[#C9A84C]/15 select-none mb-2"
          aria-hidden="true"
        >
          "
        </span>

        {/* Animated content */}
        <div ref={contentRef}>
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) =>
              i < current.rating
                ? <IconStarFilled key={i} size={18} className="text-[#C9A84C]" />
                : <IconStar       key={i} size={18} className="text-[#D5C9B8]" />
            )}
          </div>

          {/* Quote */}
          <blockquote className="mb-8">
            <p className="font-body text-[#4A3728] text-lg md:text-xl leading-relaxed">
              {current.quote}
            </p>
          </blockquote>

          {/* Name + designation */}
          <div className="flex items-center gap-4">
            <span className="w-8 h-px bg-[#C9A84C]/50" />
            <div>
              <p className="font-heading text-xl text-[#2B1810] leading-none mb-1">
                {current.name}
              </p>
              <p className="font-body text-[#8B7A6A] text-xs tracking-wide">
                {current.designation}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-[#EDE5D8]">

          {/* Arrows */}
          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-[#2B1810]/20 bg-white
                         flex items-center justify-center text-[#2B1810]
                         hover:bg-[#2B1810] hover:text-[#C9A84C] hover:border-[#2B1810]
                         transition-all duration-300"
            >
              <IconArrowLeft size={16} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-[#2B1810]
                         flex items-center justify-center text-[#C9A84C]
                         hover:bg-[#3B2218] transition-all duration-300"
            >
              <IconArrowRight size={16} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex gap-2 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > active ? 1 : -1)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`rounded-full transition-all duration-300
                            ${i === active
                              ? "w-6 h-2 bg-[#C9A84C]"
                              : "w-2 h-2 bg-[#D5C9B8] hover:bg-[#C9A84C]/50"}`}
              />
            ))}
          </div>

          {/* Counter */}
          <span className="font-body text-[#8B7A6A] text-xs tracking-[2px]">
            {String(active + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
          </span>

        </div>
      </div>
    </section>
  );
};

export default Testimonial;