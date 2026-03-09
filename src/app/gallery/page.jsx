"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiX, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Footer from "@/components/Footer";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/images/gallery');
        const data = await res.json();
        if (data.images) {
          setImages(data.images);
        }
      } catch (error) {
        console.error('Failed to fetch gallery images', error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

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

      // Grid Animation (runs when images changes)
      if (!loading && images.length > 0) {
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
      }

    }, [gridRef, heroRef]);

    return () => ctx.revert();
  }, [images, loading]);

  // Lightbox Navigation
  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = images.findIndex((img) => img.public_id === selectedImage.public_id);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = images.findIndex((img) => img.public_id === selectedImage.public_id);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
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
            Moments at Basti Ram Palace
          </p>
          <div className="hero-text w-24 h-[1px] bg-[#C9A84C] mx-auto mt-8"></div>
        </div>
      </section>

      {/* Main Gallery Grid (Masonry-ish) */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="py-20 flex justify-center"><div className="animate-pulse w-10 h-10 rounded-full bg-[#C9A84C]"></div></div>
        ) : (
          <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {images.map((img) => (
              <div
                key={img.public_id}
                className="gallery-card opacity-0 translate-y-10 break-inside-avoid relative group rounded-xl overflow-hidden shadow-md cursor-pointer bg-white"
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img.secure_url}
                  alt="Gallery image"
                  width={img.width || 800}
                  height={img.height || 600}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-white/80 font-body text-xs uppercase tracking-widest border border-white/30 px-4 py-2 rounded-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Empty State */}
        {!loading && images.length === 0 && (
            <p className="text-center text-[#888] py-20 italic">No images found in gallery.</p>
        )}
      </div>

      {/* Lightbox Modal */}
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
            className="max-w-5xl max-h-[85vh] relative flex justify-center w-full h-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[80vh]">
              <Image
                src={selectedImage.secure_url}
                alt="Selected image"
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
