import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { virtualTourData } from "../Data/VirtualTourData";

/**
 * Immersive background image with smooth crossfade transitions
 */
function TourImage({ image, title }) {
  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.img
          key={image}
          src={image}
          alt={title}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/40 backdrop-grayscale-[0.2]" />
    </div>
  );
}

/**
 * Responsive glassmorphism menu
 * Mobile: Sits at the bottom/top with adapted spacing
 * Desktop: Elegant left-aligned panel
 */
function TourMenu({ activeId, onSelect, items }) {
  return (
    <div className="relative z-10 flex h-full w-full flex-col p-4 sm:p-6 md:p-16 lg:p-20">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex w-full flex-col rounded-[2rem] border border-white/20 bg-white/10 p-6 sm:p-8 md:max-w-[380px] md:p-12 lg:max-w-[420px] backdrop-blur-3xl shadow-2xl overflow-hidden"
        >
          {/* Branding Section */}
          <div className="mb-8 md:mb-16">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              className="mb-1 text-[8px] tracking-[0.4em] text-white/70 uppercase sm:text-[10px]"
            >
              Heritage
            </motion.p>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-serif text-4xl tracking-tight text-white sm:text-5xl md:text-7xl"
            >
              Lumina
            </motion.h1>
          </div>
  
          {/* Navigation - Vertical list that adapts to screen height */}
          <nav className="flex flex-col space-y-6 sm:space-y-8 md:space-y-10 overflow-y-auto overflow-x-hidden max-h-[40vh] md:max-h-none scrollbar-hide">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => onSelect(item)}
              className="group relative text-left"
            >
              <span className={`block text-[10px] font-bold tracking-[0.25em] uppercase transition-all duration-300 sm:text-xs
                ${activeId === item.id 
                  ? "text-white scale-105 origin-left" 
                  : "text-white/40 group-hover:text-white/80"
                }`}
              >
                {item.title}
              </span>
              
              {/* Active Indicator */}
              <AnimatePresence>
                {activeId === item.id && (
                  <motion.div 
                    layoutId="activeIndicator"
                    initial={{ width: 0 }}
                    animate={{ width: 32 }}
                    exit={{ width: 0 }}
                    className="mt-2 h-[2px] bg-[#c9a24d]"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </nav>

        {/* Panel Footer */}
        <div className="mt-12 md:mt-auto md:pt-24">
          <p className="text-[8px] tracking-[0.3em] text-white/30 leading-loose sm:text-[9px]">
            RESERVED EXPERIENCES<br />
            EST. 1924
          </p>
        </div>
      </motion.div>

      {/* Screen Edge Footer - Hidden on very small screens */}
      <div className="absolute bottom-6 right-6 hidden sm:block md:bottom-10 md:right-10">
        <p className="text-[8px] tracking-[0.4em] text-white/30 uppercase sm:text-[10px]">
          Virtual Tour &copy; 2026
        </p>
      </div>
    </div>
  );
}

export default function VirtualTour() {
  const [activeTour, setActiveTour] = useState(virtualTourData[0]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-neutral-950 font-sans antialiased">
      {/* Background Component */}
      <TourImage 
        image={activeTour.image} 
        title={activeTour.title} 
      />

      {/* UI Overlay */}
      <TourMenu 
        activeId={activeTour.id} 
        onSelect={setActiveTour} 
        items={virtualTourData} 
      />
      
      {/* Subtle vignettes for depth */}
      <div className="pointer-events-none absolute inset-0 z-5 shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]" />
    </main>
  );
}
