"use client";

import React, { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Enquire",
    description: "Share your event date and type via call, WhatsApp, or our enquiry form.",
    buttons: [
      { label: "Call Us", path: "tel:+918800190003", primary: true },
      { label: "WhatsApp", path: "https://wa.me/919650211469", primary: false }
    ]
  },
  {
    num: "02",
    title: "Visit",
    description: "Step inside the palace, sample our menus, and meet our dedicated events team.",
    buttons: [
      { label: "Get Directions", path: "https://maps.app.goo.gl/9yGZ3p6", primary: true },
      { label: "Book a Tour", path: "/contact", primary: false }
    ]
  },
  {
    num: "03",
    title: "Celebrate",
    description: "Confirm your date, finalise your details, and prepare for an unforgettable day.",
    buttons: [
      { label: "View Gallery", path: "/gallery", primary: true },
      { label: "Our Menu", path: "/menu", primary: false }
    ]
  }
];

const HowToBook = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Heading Reveal
      if (document.querySelectorAll(".htb-heading > *").length > 0) {
        gsap.fromTo(
          ".htb-heading > *",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              once: true,
            }
          }
        );
      }

      // Fade up one by one with scaling
      if (document.querySelectorAll(".step-item").length > 0 && document.querySelector(".step-grid")) {
        gsap.fromTo(
          ".step-item",
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.2,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: ".step-grid",
              start: "top 80%",
              once: true,
            }
          }
        );
      }

      // Parallax connections
      if (document.querySelector(".dashed-line") && document.querySelector(".step-grid")) {
        gsap.fromTo(
          ".dashed-line",
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: ".step-grid",
              start: "top 75%",
              once: true,
            }
          }
        );
      }

      // Parallax scroll effect for steps
      if (document.querySelector(".step-grid")) {
        gsap.to(".step-grid", {
          y: "-5%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <section 
      ref={containerRef}
      className="bg-[#FAF9F6] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-20 htb-heading">
          <span className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-4 block font-bold">
            HOW TO GET STARTED
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-[#1C1C1E] leading-tight">
            Book in <em className="italic text-[#c9a96e] not-italic underline decoration-[#c9a96e]/20 underline-offset-8">Three Steps</em>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="relative step-grid">
          {/* Dashed Connection Line (Desktop) */}
          <div className="absolute top-12 left-[15%] right-[15%] h-px border-t border-dashed border-[#c9a96e]/40 hidden lg:block dashed-line" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 text-center">
            {STEPS.map((step, index) => (
              <div 
                key={index}
                className="step-item opacity-0 relative flex flex-col items-center group"
              >
                {/* Step Circle */}
                <div className="w-24 h-24 rounded-full border border-[#c9a96e]/30 flex items-center justify-center bg-[#c9a96e] text-white font-heading text-4xl mb-8 relative z-10 transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] group-hover:border-[#c9a96e]">
                  {step.num}
                </div>

                <h3 className="font-heading text-2xl text-[#1C1C1E] mb-4 group-hover:text-[#c9a96e] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-[#666] text-base leading-relaxed mb-8 max-w-xs transition-colors duration-300">
                  {step.description}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 w-full max-w-[240px]">
                  {step.buttons.map((btn, btnIndex) => (
                    <Link 
                      key={btnIndex}
                      href={btn.path}
                      className={`
                        w-full border py-3 text-[10px] tracking-[0.2em] uppercase font-bold transition-all duration-300 rounded-none shadow-sm
                        ${btn.primary 
                          ? "bg-[#c9a96e] border-[#c9a96e] text-white hover:bg-[#b59862] hover:shadow-md hover:-translate-y-0.5" 
                          : "border-[#c9a96e]/30 text-[#c9a96e] hover:border-[#c9a96e] hover:bg-[#c9a96e]/5 bg-white"}
                      `}
                    >
                      {btn.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Text */}
        <div className="mt-24 text-center htb-heading">
          <p className="text-[#8B7A6A] text-sm font-body">
            Need immediate help? Contact us directly at{" "}
            <Link href="mailto:Maheshyadav0065@gmail.com" className="text-[#c9a96e] font-bold border-b border-[#c9a96e]/30 hover:border-[#c9a96e] transition-all">
              Maheshyadav0065@gmail.com
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToBook;
