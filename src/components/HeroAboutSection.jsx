import React, { useLayoutEffect, useRef, useState, useEffect ,useCallback} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const HeroAboutSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  
  // Count-up animation state
  const [counts, setCounts] = useState({ weddings: 0, awards: 0, events: 0 });
  const hasAnimatedRef = useRef(false);

  const animateCounters = useCallback(() => {
    const targets = { weddings: 300, awards: 50, events: 150 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounts({
        weddings: Math.floor(targets.weddings * progress),
        awards: Math.floor(targets.awards * progress),
        events: Math.floor(targets.events * progress),
      });

      if (step >= steps) {
        setCounts(targets);
        clearInterval(timer);
      }
    }, interval);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animation for content
      gsap.fromTo(
        ".about-content",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Image reveal animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );

      // Stats cards animation
      gsap.fromTo(
        ".stat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".stats-container",
            start: "top 80%",
            onEnter: () => {
              if (!hasAnimatedRef.current) {
                animateCounters();
                hasAnimatedRef.current = true;
              }
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [animateCounters]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F5F1EB] px-6 py-16 md:py-24 lg:py-32"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - Image */}
          <div className="relative order-1 lg:order-1">
            <div
              ref={imageRef}
              className="relative rounded-[2rem] overflow-hidden shadow-2xl"
            >
              <img
                src='/images/hall3.webp'
                alt="Ram Palace Interior"
                className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />
              
              {/* Floating Badge */}
              <div className="absolute top-8 right-8 w-24 h-24 bg-[#A99686] rounded-full flex items-center justify-center shadow-lg animate-spin-slow">
                <div className="text-white text-xs font-semibold text-center leading-tight">
                  ABOUT<br/>US
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Content */}
          <div className="about-content order-2 lg:order-2">
            {/* Label */}
            <p className="text-sm tracking-[0.3em] uppercase text-[#A99686] mb-4 font-semibold">
              Welcome to Ram Palace
            </p>

            {/* Main Heading */}
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 text-[#2A1F15]">
              We can create these remarkable moments, elegant occasions & memorable events.
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg leading-relaxed text-[#555] mb-10 max-w-xl">
              Located in the heart of Basti, Ram Palace combines timeless elegance with modern amenities. 
              Our spacious banquet hall offers a refined setting for your celebrations, complemented by 
              ample parking, professional service, and an ambiance designed to make every moment special.
            </p>

            {/* Stats Cards */}
            <div className="stats-container grid grid-cols-3 gap-4 md:gap-6">
              {/* Weddings */}
              <div className="stat-card bg-white rounded-xl p-4 md:p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#A99686] mb-2">
                  {counts.weddings}+
                </p>
                <p className="text-xs md:text-sm text-[#555] uppercase tracking-wider">
                  Weddings
                </p>
              </div>

              {/* Awards */}
              <div className="stat-card bg-white rounded-xl p-4 md:p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#A99686] mb-2">
                  {counts.awards}+
                </p>
                <p className="text-xs md:text-sm text-[#555] uppercase tracking-wider">
                  Awards
                </p>
              </div>

              {/* Events */}
              <div className="stat-card bg-white rounded-xl p-4 md:p-6 text-center shadow-md hover:shadow-lg transition-shadow duration-300">
                <p className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#A99686] mb-2">
                  {counts.events}+
                </p>
                <p className="text-xs md:text-sm text-[#555] uppercase tracking-wider">
                  Events
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Custom CSS for slow spin animation */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroAboutSection;
