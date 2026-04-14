"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EVENT_TYPES = [
  { 
    title: "Weddings & Receptions", 
    description: "Grand ceremonies and celebrations for your most important day, from the mandap to the last dance." 
  },
  { 
    title: "Pre-Wedding Functions", 
    description: "Sangeet, Mehendi, Haldi, and Roka — every pre-wedding ritual celebrated with equal warmth." 
  },
  { 
    title: "Corporate Events", 
    description: "Product launches, conferences, annual galas — handled with precision and professional hospitality." 
  },
  { 
    title: "Birthday Celebrations", 
    description: "Milestone birthdays deserve a setting as extraordinary as the person being celebrated." 
  },
  { 
    title: "Engagement Ceremonies", 
    description: "Intimate ring ceremonies or grand engagements — every detail tailored to your vision." 
  },
  { 
    title: "Kitty & Social Parties", 
    description: "Elegant spaces for gatherings that deserve more than an ordinary venue." 
  },
  { 
    title: "Religious Functions", 
    description: "Jagrans, Bhandaras, and festive functions — hosted with the respect every occasion deserves." 
  },
  { 
    title: "Theme Events", 
    description: "From Bollywood nights to royal Rajasthani setups — we bring any theme to life." 
  },
];

const EventTypesGrid = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger fade-up on scroll with 3D rotation effect
      gsap.fromTo(
        ".event-card",
        { opacity: 0, y: 100, rotationX: 15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          stagger: { amount: 0.8 },
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Section Heading Reveal
      gsap.fromTo(
        ".section-heading > *",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".section-heading",
            start: "top 85%",
            once: true,
          },
        }
      );

      // Parallax effect on cards on scroll
      gsap.to(".parallax-cards-wrapper", {
        y: "-5%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#FAFDF9] py-20 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-16 section-heading perspective-1000">
          <span className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-4 block font-bold">
            EVENTS WE HOST
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-[#1C1C1E] leading-tight">
            Every Occasion Deserves<br />
            the <em className="italic text-[#c9a96e] not-italic underline decoration-[#c9a96e]/20 underline-offset-8">Perfect Setting</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="parallax-cards-wrapper">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
            {EVENT_TYPES.map((type, index) => (
              <div 
                key={index}
                className={`event-card group bg-white border border-[#c9a96e]/15 p-8 transition-all duration-700 hover:border-[#c9a96e]/50 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(201,168,76,0.12)] relative overflow-hidden`}
              >
                <div className="w-8 h-px bg-[#c9a96e]/40 mb-6 transition-all duration-500 group-hover:w-16 group-hover:bg-[#c9a96e]" />
                <h3 className="font-heading text-xl text-[#1C1C1E] mb-4 group-hover:text-[#c9a96e] transition-colors duration-300 relative z-10">
                  {type.title}
                </h3>
                <p className="text-[#666] text-sm leading-relaxed mb-8 relative z-10">
                  {type.description}
                </p>
                <div className="absolute bottom-6 right-8 text-[#c9a96e]/40 text-xl transform transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#c9a96e] group-hover:scale-110 z-10">
                  →
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#c9a96e]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-bl-full pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Muted CTA */}
        <div className="mt-20 text-center section-heading">
          <p className="text-[#8B7A6A] font-body text-sm">
            Not sure which package suits your occasion?{" "}
            <Link 
              href="/contact" 
              className="text-[#c9a96e] font-bold border-b border-[#c9a96e]/30 hover:border-[#c9a96e] transition-all pb-0.5 inline-flex items-center group"
            >
              Talk to our team <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default EventTypesGrid;
