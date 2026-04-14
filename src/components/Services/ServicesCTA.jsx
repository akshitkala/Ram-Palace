"use client";

import React, { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesCTA = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal text
      gsap.fromTo(
        ".cta-content > *",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          }
        }
      );

      // Section subtle zoom parallax
      gsap.fromTo(sectionRef.current, 
        { backgroundSize: "100%" },
        {
          backgroundSize: "110%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-[#FAF7F2] py-24 md:py-32 border-t border-[#c9a96e]/15 text-center overflow-hidden relative"
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(201, 168, 76, 0.03) 0%, transparent 70%)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="cta-content flex flex-col items-center">
          <span className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mb-4 block font-bold">
            BEGIN YOUR STORY
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-[#2A1F15] leading-tight mb-8">
            The Hall, the Catering,<br />
            the <em className="italic text-[#c9a96e] not-italic underline decoration-[#c9a96e]/20 underline-offset-8">Perfect Day.</em>
          </h2>
          <p className="font-body text-[#8B7A6A] text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Your celebration is already perfect in your mind.
            We're just here to bring it to life, under one beautiful roof.
          </p>
          
          <Link 
            href="/contact"
            className="inline-block bg-[#c9a96e] border border-[#c9a96e] text-white px-12 py-5 text-xs tracking-[0.2em] uppercase font-bold hover:bg-[#b59862] transition-all duration-300 rounded-none shadow-[0_15px_40px_rgba(201,168,76,0.18)] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(201,168,76,0.3)] group"
          >
            Check Availability <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesCTA;
