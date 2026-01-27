import React from "react";

import weddingImg from "../assets/images/Events/wedding.webp";
import celebrationImg from "../assets/images/Events/birthday.webp";

const Events = () => {
  return (
    <section className="w-full bg-[#F5F1EB] px-6 py-24">
      
      {/* Section Heading */}
      <h2 className="font-heading text-3xl md:text-4xl text-center mb-16">
        Host Your Event With Us
      </h2>

      {/* Cards Wrapper */}
      <div className="max-w-7xl mx-auto grid gap-20 md:grid-cols-2">
        
        {/* WEDDINGS */}
        <div className="group cursor-pointer">
          
          {/* Image Wrapper */}
          <div className="relative overflow-hidden mb-10">
            <img
              src={weddingImg}
              alt="Wedding celebrations at Ram Palace"
              className="
                w-full h-80 md:h-105 object-cover
                transition-transform duration-700 ease-out
                group-hover:scale-105
              "
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />

            {/* Overlay */}
            <div className="
              absolute inset-0 bg-black/0
              transition-colors duration-700
              group-hover:bg-black/20
            "></div>
          </div>

          <div className="text-center">
            <h3 className="font-heading text-2xl mb-4">
              Weddings & Receptions
            </h3>

            <p className="text-base leading-relaxed text-[#555] max-w-md mx-auto mb-8">
              Ram Palace offers a beautifully designed banquet space for weddings
              and receptions, creating a refined setting for celebrations filled
              with joy, tradition, and timeless elegance.
            </p>

            <button className="
              bg-[#A99686] text-white px-8 py-3 text-sm tracking-widest uppercase
              transition-all duration-300
              hover:opacity-80
              hover:-translate-y-1
              hover:shadow-lg
              hover:scale-105
            ">
              Find Out More
            </button>
          </div>
        </div>

        {/* BIRTHDAY & PRIVATE EVENTS */}
        <div className="group cursor-pointer">
          
          {/* Image Wrapper */}
          <div className="relative overflow-hidden mb-10">
            <img
              src={celebrationImg}
              alt="Birthday parties at Ram Palace"
              className="
                w-full h-80 md:h-105 object-cover
                transition-transform duration-700 ease-out
                group-hover:scale-105
              "
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />

            {/* Overlay */}
            <div className="
              absolute inset-0 bg-black/0
              transition-colors duration-700
              group-hover:bg-black/20
            "></div>
          </div>

          <div className="text-center">
            <h3 className="font-heading text-2xl mb-4">
              Birthday & Private Celebrations
            </h3>

            <p className="text-base leading-relaxed text-[#555] max-w-md mx-auto mb-8">
              Celebrate birthdays, anniversaries, and family gatherings in a
              warm banquet environment designed for joyful moments, comfort,
              and memorable experiences.
            </p>

            <button className="
              bg-[#A99686] text-white px-8 py-3 text-sm tracking-widest uppercase
              transition-all duration-300
              hover:opacity-80
              hover:-translate-y-1
              hover:shadow-lg
              hover:scale-105
            ">
              Find Out More
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Events;
