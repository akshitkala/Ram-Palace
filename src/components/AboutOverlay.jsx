import React from "react";

const AboutOverlay = () => {
  return (
    <section className="relative min-h-[70vh] w-full bg-[#A99686] text-white">
      
      

      {/* Content Wrapper */}
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col gap-16 lg:flex-row lg:gap-24">
        
        {/* Left: Big Statement */}
        <div className="lg:w-1/2">
          <h2 className="font-heading text-3xl leading-tight lg:text-6xl lg:leading-tight">
            A grand banquet destination <br />
            crafted for timeless celebrations <br />
            and unforgettable moments.
          </h2>
        </div>

        {/* Right: Description + CTA */}
        <div className="lg:w-1/2 flex flex-col gap-10">
          <p className="text-sm leading-relaxed lg:text-lg text-white/90">
            At Ram Palace, we bring together elegant interiors, thoughtful
            planning, and warm hospitality to create celebrations that feel
            truly special. From weddings and receptions to corporate gatherings
            and private events, our venue adapts effortlessly to every occasion.
            As the day unfolds, Ram Palace transforms into a refined evening
            setting designed for memorable experiences shared with family,
            friends, and colleagues.
          </p>

          {/* CTA */}
          <button className="w-fit bg-white text-[#A99686] px-10 py-4 rounded-md text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-80 hover:scale-105 hover:shadow-lg">
            Virtual Tour
          </button>
        </div>

      </div>
    </section>
  );
};

export default AboutOverlay;
