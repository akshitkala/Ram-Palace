"use client";

import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const INCLUSIONS = [
  { 
    title: "Air Conditioned Hall", 
    description: "Fully climate-controlled spaces for ceremonies and receptions, regardless of the season." 
  },
  { 
    title: "Ample Parking", 
    description: "Secure, on-site parking for all your guests with dedicated entry and exit points." 
  },
  { 
    title: "GD Foods India Catering", 
    description: "Access to our award-winning catering partner with customizable menus and live stations." 
  },
  { 
    title: "Power Backup", 
    description: "24/7 heavy-duty silent generators to ensure your celebration never stops." 
  },
  { 
    title: "Professional Staff", 
    description: "Our dedicated event coordinators and service staff are trained for high-end hospitality." 
  },
  { 
    title: "Basic Décor", 
    description: "The hall comes with premium basic lighting and floral arrangements included." 
  }
];

const WhatsIncluded = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger fade-in left-to-right
      gsap.fromTo(
        ".inclusion-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#FAF7F2] py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-4 block font-bold">
            THE LUXURY EXPERIENCE
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-[#1C1C1E] leading-tight mb-6">
            What's <em className="italic text-[#c9a96e] not-italic underline decoration-[#c9a96e]/20 underline-offset-8">Included</em>
          </h2>
          <div className="w-24 h-px bg-[#c9a96e]/30 mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INCLUSIONS.map((item, index) => (
            <div 
              key={index}
              className="inclusion-item opacity-0 flex items-start gap-5 p-6 hover:bg-[#FDFBF7] transition-colors duration-300 rounded-none border border-[#c9a96e]/10 group"
            >
              <div className="flex-shrink-0 w-10 h-10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] transition-all duration-500 group-hover:bg-[#c9a96e] group-hover:text-white">
                ✦
              </div>
              <div>
                <h3 className="font-heading text-lg text-[#1C1C1E] mb-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[#666] text-xs leading-relaxed max-w-[200px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsIncluded;
