import React from "react";
import hallImgWebp from "../assets/images/hall3.webp";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* Background Image */}
      <img
        src={hallImgWebp}
        alt="Luxury banquet hall setup"
        className="absolute inset-0 h-full w-full object-cover"
        fetchpriority="high"
        decoding="async"
        sizes="(max-width: 768px) 100vw, 100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
        
        <h1 className="font-heading text-4xl leading-tight mb-6">
          A Space for Unforgettable Celebrations
        </h1>

        <p className="text-lg leading-relaxed max-w-md mb-8">
          An elegant banquet hall designed for weddings,
          receptions, corporate events, and private gatherings.
        </p>

        <button className="bg-[#A99686] text-white text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:opacity-80 hover:scale-105 hover:shadow-lg">
          Enquire About Events
        </button>

      </div>
    </section>
  );
};

export default Hero;
