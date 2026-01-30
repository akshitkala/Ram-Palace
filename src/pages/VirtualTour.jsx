import React from 'react';
import { motion } from 'framer-motion';
import hallImg from '../assets/images/hall3.webp';

const menuItems = [
  "THE GRAND BALLROOM",
  "PRIVATE DINING SUITE",
  "THE GARDEN TERRACE",
  "VINTAGE WINE CELLAR",
  "SKYLINE LOUNGE"
];

const VirtualTour = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-900">
      {/* Background Image with Overlay */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${hallImg})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 flex min-h-screen items-center px-6 py-12 md:px-12 lg:px-24">
        
        {/* Glassmorphism Sidebar Card */}
        <motion.div 
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-fit w-full max-w-[420px] overflow-hidden rounded-[2rem] border border-white/20 bg-white/5 p-10 shadow-2xl backdrop-blur-[24px] md:p-14"
        >
          {/* Header Section */}
          <div className="mb-16">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-body text-[10px] tracking-[0.4em] text-white/60 uppercase"
            >
              Heritage
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-playfair mt-3 text-6xl font-normal tracking-tight text-white md:text-7xl"
            >
              LUMINA
            </motion.h1>
          </div>

          {/* Navigation Links */}
          <nav className="mb-24 flex flex-col gap-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="group relative cursor-pointer"
              >
                <span className="font-body block text-xs tracking-[0.25em] text-white/40 transition-all duration-500 group-hover:translate-x-3 group-hover:text-white md:text-[13px]">
                  {item}
                </span>
                {/* Subtle indicator on hover */}
                <div className="absolute -left-4 top-1/2 h-[1px] w-0 -translate-y-1/2 bg-white/40 transition-all duration-500 group-hover:w-3" />
              </motion.div>
            ))}
          </nav>

          {/* Card Footer Info */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col gap-1 border-t border-white/10 pt-10"
          >
            <p className="font-body text-[9px] tracking-[0.3em] text-white/30 uppercase">Reserved Experiences</p>
            <p className="font-body text-[9px] tracking-[0.3em] text-white/30 uppercase">Est. 1924</p>
          </motion.div>

          {/* Glossy Reflection Overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-50" />
        </motion.div>
      </div>

      {/* Floating Footer Label */}
      <div className="absolute right-8 bottom-8 z-10 md:right-16 md:bottom-16">
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8 }}
          className="font-body text-[10px] font-light tracking-[0.4em] text-white/40 uppercase"
        >
          Virtual Tour © 2026
        </motion.p>
      </div>

      {/* Subtle Grain Overlay for Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] contrast-150" 
           style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />
    </div>
  );
};

export default VirtualTour;
