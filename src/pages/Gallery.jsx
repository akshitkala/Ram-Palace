import React, { useState, useEffect, useRef, useMemo } from "react";
import Footer from "../components/Footer";
import { weddingGallery } from "../Data/gallery";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [filteredImages, setFilteredImages] = useState(weddingGallery);
  const galleryRef = useRef(null);

  // Extract unique categories
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const categories = useMemo(() => ["All", ...new Set(weddingGallery.map((item) => item.category))], [weddingGallery]);

  useEffect(() => {
    if (filter === "All") {
      setFilteredImages(weddingGallery);
    } else {
      setFilteredImages(weddingGallery.filter((item) => item.category === filter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, weddingGallery, setFilteredImages]);

  // Animation on filter change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gallery-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }, galleryRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredImages]);

  return (
    <div className="pt-20 bg-[#F5F1EB] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] w-full overflow-hidden bg-gradient-to-br from-[#A99686] to-[#8B7A6A] flex items-center justify-center">
        <div className="relative z-10 text-center px-6">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Our Gallery
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            A visual journey through our finest moments and elegant setups.
          </p>
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
      </section>

      {/* Filter Bar */}
      <section className="py-10 px-6 sticky top-20 z-30 bg-[#F5F1EB]/95 backdrop-blur-sm shadow-sm transition-all">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm tracking-wide transition-all duration-300 ${
                filter === cat
                  ? "bg-[#A99686] text-white shadow-md transform scale-105"
                  : "bg-white text-[#555] hover:bg-[#e0d8cf]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section ref={galleryRef} className="px-6 pb-20">
        <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="gallery-item break-inside-avoid relative group rounded-lg overflow-hidden shadow-md cursor-pointer"
            >
              <img
                src={image.image}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  {image.category}
                </span>
                <h3 className="text-white font-heading text-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
