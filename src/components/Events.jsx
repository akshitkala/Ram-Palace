import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { eventCards } from "../Data/events";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const EventCard = ({ event }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Random interval between 3000ms (3s) and 6000ms (6s)
    const randomInterval = Math.floor(Math.random() * 3000) + 3000;

    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % event.images.length);
    }, randomInterval);

    return () => clearInterval(intervalId);
  }, [event.images.length, event]);

  return (
    <div className="group cursor-pointer">
      {/* Image Wrapper */}
      <div className="relative overflow-hidden mb-10 h-80 md:h-96 w-full rounded-lg">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={event.images[currentImageIndex]}
            alt={`${event.title} at Ram Palace`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="
              absolute inset-0 w-full h-full object-cover
            "
            loading="lazy"
          />
        </AnimatePresence>

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
