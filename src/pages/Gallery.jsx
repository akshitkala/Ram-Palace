import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { weddingGallery } from "../Data/gallery";
import { FiX, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Weddings", "Corporate Events", "Private Parties", "Dining", "Decor", "Interiors"];

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [filteredImages, setFilteredImages] = useState(weddingGallery);
  const [selectedImage, setSelectedImage] = useState(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  // Filter effect
  useEffect(() => {
    if (filter === "All") {
      setFilteredImages(weddingGallery);
    } else {
      setFilteredImages(weddingGallery.filter((img) => img.category === filter));
    }
  }, [filter]);

  // GSAP Animations
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.2,
      });

      // Grid Animation (runs when filteredImages changes)
      // Small timeout to allow React to render the new list
      setTimeout(() => {
          ScrollTrigger.batch(".gallery-card", {
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                overwrite: true
              }),
            start: "top 90%",
            once: true
          });
      }, 100);

    }, [gridRef, heroRef]);

    return () => ctx.revert();
  }, [filteredImages]); // Re-run animation on filter change

  // Lightbox Navigation
  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  // Close animation
  const closeLightbox = () => setSelectedImage(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") handleNext(e);
      if (e.key === "ArrowLeft") handlePrev(e);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);


  return (
    <div className="bg-[#fefaf6] min-h-screen">
      
      {/* 1. Cinematic Hero Section */}
      <section ref={heroRef} className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div 
            className="absolute inset-0 z-0 bg-fixed bg-center bg-cover"
            style={{ 
                backgroundImage: "url('/images/gallery/pixel-studios-IFCN-tBVNPI-unsplash.jpg')",
                willChange: "transform"
            }}
        >
            <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <h1 className="hero-text font-heading text-5xl md:text-7xl mb-4 tracking-wide">
            Gallery
          </h1>
          <p className="hero-text font-body text-xl md:text-2xl font-light tracking-widest uppercase opacity-90">
            Moments at Ram Palace
          </p>
          <div className="hero-text w-24 h-[1px] bg-[#D4AF37] mx-auto mt-8"></div>
        </div>
      </section>

      {/* 2. Filter Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-6 py-2 rounded-full text-sm tracking-wide transition-all duration-300 border border-[#D4AF37]/20
                ${
                  filter === cat
                    ? "bg-[#D4AF37] text-white shadow-md transform scale-105"
                    : "bg-transparent text-[#555] hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]"
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3. Main Gallery Grid (Masonry-ish) */}
        <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="gallery-card opacity-0 translate-y-10 break-inside-avoid relative group rounded-xl overflow-hidden shadow-md cursor-pointer bg-white"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img.image}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <span className="text-white font-heading text-xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img.title}
                </span>
                <span className="text-white/80 font-body text-xs uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  View
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State */}
        {filteredImages.length === 0 && (
            <p className="text-center text-[#888] py-20 italic">No images found for this category.</p>
        )}
      </div>

      {/* 4. Lightbox Modal */}
      {selectedImage && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeLightbox}
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2"
            onClick={closeLightbox}
          >
            <FiX size={40} />
          </button>

          {/* Navigation */}
          <button 
            className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-all p-4 hover:bg-white/10 rounded-full"
            onClick={handlePrev}
          >
            <FiArrowLeft size={30} />
          </button>

          <button 
            className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-all p-4 hover:bg-white/10 rounded-full"
            onClick={handleNext}
          >
            <FiArrowRight size={30} />
          </button>

          {/* Image */}
          <div 
            className="max-w-5xl max-h-[85vh] relative"
            onClick={(e) => e.stopPropagation()} // Prevent close on image click
          >
            <img
              src={selectedImage.image}
              alt={selectedImage.alt}
              className="max-h-[85vh] w-auto object-contain rounded-sm shadow-2xl"
            />
            <div className="absolute bottom-[-3rem] left-0 w-full text-center">
                <h3 className="text-white font-heading text-2xl">{selectedImage.title}</h3>
                <p className="text-white/60 font-body text-sm mt-1">{selectedImage.category}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
