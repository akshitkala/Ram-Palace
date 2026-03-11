"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// ── EVENT CARD STATIC DATA ───────────────────────────────────────────
// Images fetched from Cloudinary. Only copy + links hardcoded here.
const EVENT_CONFIG = [
  {
    id:          "weddings",
    category:    "weddings",
    title:       "Weddings & Receptions",
    description: "From the ceremony to the last dance — every detail of your wedding day deserves a setting as extraordinary as the occasion itself. Grand hall, adorned to your vision, with cuisine by GD Foods India.",
    features:    ["Grand Banquet Hall", "Custom Décor", "GD Foods Catering"],
    cta:         "Plan Your Wedding",
    link:        "/contact?event=wedding",
  },
  {
    id:          "corporate",
    category:    "corporate",
    title:       "Corporate Events",
    description: "Boardroom announcements, product launches, annual galas — we bring precision and warmth to every corporate occasion. Trusted by leading organisations through our catering partner GD Foods India.",
    features:    ["AV & Projector Setup", "Conference Layout", "Corporate Catering"],
    cta:         "Request a Proposal",
    link:        "/contact?event=corporate",
  },
  {
    id:          "private-parties",
    category:    "private-parties",
    title:       "Private Celebrations",
    description: "Birthdays, anniversaries, engagements, and family milestones. Intimate or grand — every private celebration gets the five-star treatment that Basti's families have come to trust.",
    features:    ["Flexible Capacity", "Themed Décor", "Live Food Stations"],
    cta:         "Plan Your Celebration",
    link:        "/contact?event=private",
  },
];

// ── IMAGE CYCLING HOOK ───────────────────────────────────────────────
const useImageCycle = (images, ms = 4500) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const t = setInterval(() => setIndex((p) => (p + 1) % images.length), ms);
    return () => clearInterval(t);
  }, [images, ms]);
  return index;
};

// ── EVENT CARD ───────────────────────────────────────────────────────
const EventCard = ({ config, images, loading }) => {
  const currentIndex = useImageCycle(images);

  return (
    <div className="group flex flex-col">

      {/* IMAGE */}
      <div className="relative overflow-hidden mb-7 h-72 md:h-80 lg:h-[360px] bg-[#E8E0D0]">

        {loading && (
          <div className="absolute inset-0 bg-[#E8E0D0] animate-pulse" />
        )}

        {!loading && images && images.map((img, i) => (
          <Image
            key={img.public_id || i}
            src={img.secure_url}
            alt={`${config.title} at Basti Ram Palace`}
            fill
            quality={70}
            sizes="(max-width: 768px) 100vw, 25vw"
            className={`
              absolute inset-0 w-full h-full object-cover
              transition-opacity duration-1000
              ${i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
          />
        ))}

        {!loading && (!images || images.length === 0) && (
          <div className="absolute inset-0 bg-[#D8CFC4] flex items-center justify-center">
            <span className="text-[10px] tracking-[3px] uppercase text-[#999]">
              Coming Soon
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 z-20 transition-colors duration-700 group-hover:bg-black/15 pointer-events-none" />

        {/* Image dots */}
        {images && images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-30 flex gap-1.5">
            {images.slice(0, 5).map((_, i) => (
              <div
                key={i}
                className={`transition-all duration-300 ${
                  i === currentIndex
                    ? "w-4 h-1 bg-white"
                    : "w-1 h-1 rounded-full bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col items-center text-center flex-1">

        <p className="text-[9px] tracking-[4px] uppercase text-[#C9A84C] mb-3 font-medium">
          {config.category.replace("-", " ")}
        </p>

        <h3 className="font-heading text-2xl md:text-[26px] text-[#1C1C1E] mb-4 leading-tight">
          {config.title}
        </h3>

        <p className="text-[14px] leading-relaxed text-[#666] max-w-sm mb-5">
          {config.description}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-7">
          {config.features.map((f) => (
            <span key={f} className="text-[9px] tracking-[1.5px] uppercase text-[#888] border border-[#DDD6CC] px-2.5 py-1">
              {f}
            </span>
          ))}
        </div>

        <div className="mt-auto">
          <Link href={config.link}>
            <button className="
              bg-[#1C1C1E] text-white
              px-7 py-3
              text-[10px] tracking-[2.5px] uppercase font-medium
              transition-all duration-300
              hover:bg-[#C9A84C] hover:text-[#1C1C1E]
              hover:shadow-[0_8px_24px_rgba(201,168,76,0.25)]
            ">
              {config.cta} →
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

// ── EVENTS SECTION ───────────────────────────────────────────────────
const Events = () => {
  const [imageMap, setImageMap] = useState({});
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const results = await Promise.allSettled(
          EVENT_CONFIG.map((e) =>
            fetch(`/api/images/events/${e.category}`)
              .then((r) => r.json())
              .then((data) => ({ category: e.category, images: data.images || [] }))
          )
        );
        const map = {};
        results.forEach((r) => {
          if (r.status === "fulfilled") map[r.value.category] = r.value.images;
        });
        setImageMap(map);
      } catch (err) {
        console.error("Events fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <section className="w-full bg-[#FAF7F2] px-6 py-20 md:py-28 lg:py-36">
      <div className="max-w-7xl mx-auto">

        {/* SECTION HEADER */}
        <div className="text-center mb-16 md:mb-20">
          <div className="flex items-center justify-center gap-4 mb-5">
            <div className="w-8 h-px bg-[#C9A84C]" />
            <p className="text-[10px] tracking-[4px] uppercase text-[#C9A84C] font-medium">
              What We Host
            </p>
            <div className="w-8 h-px bg-[#C9A84C]" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#1C1C1E] leading-tight">
            Every Occasion Deserves<br className="hidden md:block" />{" "}
            the Perfect Setting
          </h2>
          <p className="text-[14px] text-[#888] mt-4 max-w-lg mx-auto leading-relaxed">
            From grand weddings to intimate celebrations — Basti Ram Palace and
            GD Foods India come together to make every event unforgettable.
          </p>
        </div>

        {/* CARDS */}
        {error ? (
          <div className="text-center py-20">
            <p className="text-[#999] text-sm tracking-wide">
              Unable to load event images. Please try again shortly.
            </p>
          </div>
        ) : (
          <div className="grid gap-12 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {EVENT_CONFIG.map((config) => (
              <EventCard
                key={config.id}
                config={config}
                images={imageMap[config.category]}
                loading={loading}
              />
            ))}
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="text-center mt-16 md:mt-20 pt-12 border-t border-[#E8E0D0]">
          <p className="text-[13px] text-[#999] mb-5 tracking-wide">
            Not sure which package suits your occasion?
          </p>
          <Link href="/contact">
            <button className="
              border border-[#1C1C1E] text-[#1C1C1E]
              px-8 py-3.5
              text-[10px] tracking-[2.5px] uppercase font-medium
              transition-all duration-300
              hover:bg-[#1C1C1E] hover:text-white
            ">
              Talk to Our Events Team
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Events;