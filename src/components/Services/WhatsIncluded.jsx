"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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

  useGSAP(
    () => {
      // Heading Reveal
      if (document.querySelectorAll(".wi-heading > *").length > 0) {
        gsap.fromTo(
          ".wi-heading > *",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Stagger fade-in left-to-right with slight scale
      if (document.querySelectorAll(".inclusion-item").length > 0 && document.querySelector(".inclusion-grid")) {
        gsap.fromTo(
          ".inclusion-item",
          { opacity: 0, x: -30, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".inclusion-grid",
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Parallax float on the whole grid
      if (document.querySelector(".inclusion-grid")) {
        gsap.to(".inclusion-grid", {
          y: "-5%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section 
      ref={sectionRef}
      className="bg-[#FAF7F2] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-16 wi-heading">
          <span className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-4 block font-bold">
            THE LUXURY EXPERIENCE
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-[#1C1C1E] leading-tight mb-6">
            What's <em className="italic text-[#c9a96e] not-italic underline decoration-[#c9a96e]/20 underline-offset-8">Included</em>
          </h2>
          <div className="w-24 h-px bg-[#c9a96e]/30 mx-auto" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 inclusion-grid">
          {INCLUSIONS.map((item, index) => (
            <div 
              key={index}
              className="inclusion-item opacity-0 flex items-start gap-5 p-6 hover:bg-[#FDFBF7] transition-colors duration-300 rounded-none border border-[#c9a96e]/10 group hover:border-[#c9a96e]/30 hover:shadow-sm"
            >
              <div className="flex-shrink-0 w-10 h-10 border border-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] transition-all duration-500 group-hover:bg-[#c9a96e] group-hover:text-white group-hover:scale-110">
                ✦
              </div>
              <div>
                <h3 className="font-heading text-lg text-[#1C1C1E] mb-2 leading-tight group-hover:text-[#c9a96e] transition-colors">
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
