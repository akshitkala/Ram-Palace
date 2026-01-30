import { useState } from "react";
import { virtualTourData } from "../Data/virtualTourData";

function TourImage({ image, title }) {
  return (
    <div className="absolute inset-0 z-0">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}

function TourMenu({ activeId, onSelect, items }) {
  return (
    <div className="relative z-10 flex h-full flex-col p-6 md:p-16">
      <div className="flex w-full max-w-[400px] flex-col rounded-[2.5rem] border border-white/20 bg-white/10 p-8 md:p-12 backdrop-blur-2xl">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-2 text-[10px] tracking-[0.4em] text-white/70">HERITAGE</p>
          <h1 className="font-serif text-5xl tracking-tight text-white md:text-7xl">LUMINA</h1>
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col space-y-10">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={`text-left text-xs font-bold tracking-[0.25em] uppercase
                ${activeId === item.id 
                  ? "text-white" 
                  : "text-white/40 hover:text-white/80"
                }`}
            >
              {item.title}
              {activeId === item.id && (
                <div className="mt-2 h-[2px] w-8 bg-[#c9a24d]" />
              )}
            </button>
          ))}
        </nav>

        {/* Footer info inside panel */}
        <div className="mt-auto pt-24">
          <p className="text-[9px] tracking-[0.3em] text-white/40 leading-loose">
            RESERVED EXPERIENCES<br />
            EST. 1924
          </p>
        </div>
      </div>

      {/* Page-level footer info outside panel */}
      <div className="absolute bottom-10 right-10 hidden md:block">
        <p className="text-[10px] tracking-[0.4em] text-white/40 uppercase">VIRTUAL TOUR © 2026</p>
      </div>
    </div>
  );
}

export default function VirtualTour() {
  const [activeTour, setActiveTour] = useState(virtualTourData[0]);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black font-sans antialiased">
      <TourImage 
        image={activeTour.image} 
        title={activeTour.title} 
      />

      <TourMenu 
        activeId={activeTour.id} 
        onSelect={setActiveTour} 
        items={virtualTourData} 
      />
    </main>
  );
}
