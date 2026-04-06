"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up one by one
      gsap.fromTo(
        ".step-item",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="bg-[#FAF9F6] py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-20">
          <span className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-4 block font-bold">
            HOW TO GET STARTED
          </span>
          <h2 className="font-heading text-4xl md:text-5xl text-[#1C1C1E] leading-tight">
            Book in <em className="italic text-[#c9a96e] not-italic underline decoration-[#c9a96e]/20 underline-offset-8">Three Steps</em>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Dashed Connection Line (Desktop) */}
          <div className="absolute top-12 left-[15%] right-[15%] h-px border-t border-dashed border-[#c9a96e]/25 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-12 text-center">
            {STEPS.map((step, index) => (
              <div 
                key={index}
                className="step-item opacity-0 relative flex flex-col items-center group"
              >
                {/* Step Circle */}
                <div className="w-24 h-24 rounded-full border border-[#c9a96e]/30 flex items-center justify-center bg-[#c9a96e] text-white font-heading text-4xl mb-8 relative z-10 transition-all duration-500 group-hover:scale-110">
                  {step.num}
                </div>

                <h3 className="font-heading text-2xl text-[#1C1C1E] mb-4">
                  {step.title}
                </h3>
                <p className="text-[#666] text-base leading-relaxed mb-8 max-w-xs">
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
                          ? "bg-[#c9a96e] border-[#c9a96e] text-white hover:bg-[#b59862]" 
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
        <div className="mt-24 text-center">
          <p className="text-[#8B7A6A] text-sm font-body">
            Need immediate help? Contact us directly at{" "}
            <Link href="mailto:info@bastirampalace.com" className="text-[#c9a96e] font-bold border-b border-[#c9a96e]/30 hover:border-[#c9a96e] transition-all">
              info@bastirampalace.com
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowToBook;
