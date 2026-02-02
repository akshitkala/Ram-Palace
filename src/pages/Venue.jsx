import { useState } from "react";
import { venues } from "../Data/venue";

export default function Venue() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <img
        src={venues[active].image}
        alt={venues[active].name}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 md:bg-black/30" />

      {/* Desktop Left Panel */}
      <div className="relative hidden h-full w-[320px] flex-col justify-between rounded-r-3xl bg-white/10 p-8 backdrop-blur-2xl md:flex">
        <div>
          <p className="mb-2 text-xs tracking-widest text-white/60">
            HERITAGE
          </p>

          <h1 className="mb-10 text-3xl font-light">
            {venues[active].name}
          </h1>

          <ul className="space-y-5 text-sm tracking-wide">
            {venues.map((venue, index) => (
              <li
                key={venue.id}
                onClick={() => setActive(index)}
                className={`cursor-pointer transition-all ${
                  index === active
                    ? "text-white"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {venue.name}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-white/40">
          Reserved Experiences
          <br />
          EST. 1924
        </p>
      </div>

      {/* Mobile Title (positioned ABOVE slider) */}
      <div className="absolute left-6 right-6 bottom-[calc(20vh+5.5rem)] md:hidden">
        <h2 className="text-2xl font-light leading-tight">
          {venues[active].name}
        </h2>
        <p className="mt-1 text-sm tracking-wide text-white/65">
          {venues[active].subtitle}
        </p>
      </div>

      {/* Mobile Venue Slider (20% from bottom) */}
      <div className="absolute left-0 right-0 bottom-[20vh] md:hidden">
        <div className="flex gap-6 overflow-x-auto px-6 py-5 backdrop-blur-xl bg-white/10 snap-x snap-mandatory">
          {venues.map((venue, index) => (
            <button
              key={venue.id}
              onClick={() => setActive(index)}
              className={`snap-start whitespace-nowrap text-sm tracking-wide transition-all ${
                index === active
                  ? "text-white"
                  : "text-white/50"
              }`}
            >
              {venue.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
