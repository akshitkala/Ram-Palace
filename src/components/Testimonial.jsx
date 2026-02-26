"use client";

import {
  IconArrowLeft,
  IconArrowRight,
  IconStarFilled,
  IconStar,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo, useCallback } from "react";

// class merge helper
const cn = (...classes) => classes.filter(Boolean).join(" ");

const Testimonial = ({
  testimonials,
  autoplay = false,
  autoplayInterval = 3000,
  className,
}) => {
  const [active, setActive] = useState(0);

  // Memoize random rotations so they don't change on re-renders (like active state change)
  const randomRotations = useMemo(() => {
    return testimonials.map(() => Math.floor(Math.random() * 21) - 10);
  }, [testimonials]);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = (index) => index === active;

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, autoplayInterval);
      return () => clearInterval(interval);
    }
  }, [autoplay, autoplayInterval, handleNext]);

  return (
    <section
      className={cn(
        "min-h-screen md:min-h-0 flex items-center justify-center px-4 md:px-8 lg:px-12 py-10 md:py-20",
        className
      )}
    >
      <div className="w-full max-w-sm md:max-w-6xl mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
          
          {/* Image Section */}
          <div>
            <div className="relative h-64 md:h-80 w-full">
              <AnimatePresence>
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      rotate: randomRotations[index],
                    }}
                    animate={{
                      opacity: isActive(index) ? 1 : 0.7,
                      scale: isActive(index) ? 1 : 0.95,
                      rotate: isActive(index) ? 0 : randomRotations[index],
                      zIndex: isActive(index)
                        ? 999
                        : testimonials.length + 2 - index,
                      y: isActive(index) ? [0, -40, 0] : 0,
                    }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0 origin-bottom"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      draggable={false}
                      loading="lazy"
                      className="h-full w-full rounded-3xl object-cover object-center shadow-xl"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Text Section */}
          <div className="flex flex-col justify-between h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold">
                  {testimonials[active].name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {testimonials[active].designation}
                </p>

                {/* ⭐ Rating */}
                <div className="flex gap-1 mt-3 mb-4">
                  {[...Array(5)].map((_, i) =>
                    i < testimonials[active].rating ? (
                      <IconStarFilled
                        key={i}
                        size={18}
                        className="text-yellow-500"
                      />
                    ) : (
                      <IconStar
                        key={i}
                        size={18}
                        className="text-gray-300"
                      />
                    )
                  )}
                </div>

                <motion.p className="text-lg text-gray-600 mt-4 leading-relaxed">
                  {testimonials[active].quote.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </motion.p>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex gap-4 mt-10">
              <button
                onClick={handlePrev}
                className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center hover:scale-110 transition"
              >
                <IconArrowLeft size={18} />
              </button>

              <button
                onClick={handleNext}
                className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center hover:scale-110 transition"
              >
                <IconArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Testimonial;
