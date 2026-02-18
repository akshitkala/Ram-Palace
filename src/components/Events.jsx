import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { eventCards } from "../Data/events";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const EventCard = ({ event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Shared interval logic could be hoisted, but per-card is okay if lightweight.
    // CSS-based transition is much cheaper than Framer Motion unmount/mount.
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % event.images.length);
    }, 4000); // Fixed 4s interval for consistency

    return () => clearInterval(intervalId);
  }, [event.images.length]);

  return (
    <div className="group cursor-pointer">
      {/* Image Wrapper */}
      <div className="relative overflow-hidden mb-10 h-80 md:h-96 w-full rounded-lg bg-gray-200">
        {event.images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${event.title} - view ${index + 1}`}
            className={`
              absolute inset-0 w-full h-full object-cover transition-opacity duration-1000
              ${index === currentImageIndex ? "opacity-100" : "opacity-0"}
            `}
            loading="lazy"
          />
        ))}

        {/* Overlay - Hover Effect */}
        <div className="
          absolute inset-0 bg-black/0 z-10
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
  );
};

const Events = () => {
  return (
    <section className="w-full bg-[#F5F1EB] px-6 py-24">
      
      {/* Section Heading */}
      <h2 className="font-heading text-3xl md:text-4xl text-center mb-16">
        Host Your Event With Us
      </h2>

      {/* Cards Wrapper */}
      <div className="max-w-7xl mx-auto grid gap-20 md:grid-cols-2 lg:grid-cols-3">
        {eventCards.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
};

export default Events;
