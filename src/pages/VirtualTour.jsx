import { useState } from "react";
import useSeo from "../hooks/useSeo";
import { virtualTourData } from "../Data/virtualTourData";

export default function VirtualTour() {
    useSeo({
        title: "Virtual Tour – Ram Palace",
        description:
          "Explore different spaces at Ram Palace including our grand ballroom, dining hall and terrace.",
      });
    const [activeTour, setActiveTour] = useState(virtualTourData[0]);
    
  return (
    <>
      <Seo
        title="Virtual Tour – Ram Palace"
        description="Explore different spaces at Ram Palace including our grand ballroom, dining suite, terrace and lounge."
      />

      <section className="mx-auto max-w-7xl px-4 py-16">
        {/* Section Heading */}
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Virtual Tour
          </h1>
          <p className="mt-3 text-sm text-white/70 md:text-base">
            Explore our elegant spaces and experience the grandeur of Ram Palace.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
          {/* LEFT MENU */}
          <aside className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
            <h3 className="mb-4 text-xs uppercase tracking-wider text-white/60">
              Explore Spaces
            </h3>

            <div className="flex gap-2 md:flex-col">
              {virtualTourData.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTour(item)}
                  className={`whitespace-nowrap rounded-xl px-4 py-3 text-left text-sm transition-all
                    ${
                      activeTour.id === item.id
                        ? "bg-[#c9a24d] text-black"
                        : "border border-white/10 text-white/80 hover:bg-white/10"
                    }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </aside>

          {/* RIGHT IMAGE */}
          <div>
            <div className="overflow-hidden rounded-2xl">
              <img
                src={activeTour.image}
                alt={activeTour.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <p className="mt-3 text-sm text-white/70">
              {activeTour.description}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
