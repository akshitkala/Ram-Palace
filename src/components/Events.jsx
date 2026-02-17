import React from "react";
import { Link } from "react-router-dom";
import { eventCards } from "../Data/events";

import weddingImg from "../assets/images/Events/wedding.webp";
import celebrationImg from "../assets/images/Events/birthday.webp";

const Events = () => {
  // Map images to event cards
  const images = {
    "/src/assets/images/Events/wedding.webp": weddingImg,
    "/src/assets/images/Events/birthday.webp": celebrationImg
  };

  return (
    <section className="w-full bg-[#F5F1EB] px-6 py-24">
      
      {/* Section Heading */}
      <h2 className="font-heading text-3xl md:text-4xl text-center mb-16">
        Host Your Event With Us
      </h2>

      {/* Cards Wrapper */}
      <div className="max-w-7xl mx-auto grid gap-20 md:grid-cols-2 lg:grid-cols-3">
        
        {eventCards.map((event) => (
          <div key={event.id} className="group cursor-pointer">
            
            {/* Image Wrapper */}
            <div className="relative overflow-hidden mb-10">
              <img
                src={images[event.image]}
                alt={`${event.title} at Ram Palace`}
                className="
                  w-full h-80 md:h-96 object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-105
                "
                loading="lazy"
                decoding="async"
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
                {event.title}
              </h3>

              <p className="text-base leading-relaxed text-[#555] max-w-md mx-auto mb-8">
                {event.description}
              </p>

              <Link to={event.link}>
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
              </Link>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Events;
