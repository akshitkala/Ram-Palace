"use client";

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiX, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Footer from "@/components/Footer";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function GalleryPage() {
  const [images,      setImages]      = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error,       setError]       = useState(false);
  const [hasMore,     setHasMore]     = useState(true);
  const [nextCursor,  setNextCursor]  = useState(null);
  
  const [selectedImage, setSelectedImage] = useState(null);
  
  const heroRef = useRef(null);
  const sentinelRef = useRef(null);
  const fetchingRef = useRef(false);

  const fetchImages = useCallback(async (cursor = null) => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    if (!cursor) {
      setLoading(true);
      setError(false);
    } else {
      setLoadingMore(true);
    }

    try {
      const url = cursor
        ? `/api/images/gallery?cursor=${cursor}`
        : `/api/images/gallery`;

      const res  = await fetch(url);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setImages(prev => cursor ? [...prev, ...data.images] : data.images);
      setNextCursor(data.nextCursor || null);
      setHasMore(data.hasMore || false);
    } catch (err) {
      console.error("Gallery fetch error:", err);
      setError(true);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      fetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const sentinel = entries[0];
        if (sentinel.isIntersecting && hasMore && !fetchingRef.current && nextCursor) {
          fetchImages(nextCursor);
        }
      },
      { rootMargin: "400px", threshold: 0 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, nextCursor, fetchImages]);

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
    }, heroRef);

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
        {/* TODO: migrate to <Image fill> for optimization */}
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

      {/* Main Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Initial load skeleton */}
        {loading && images.length === 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-[#E8E0D0] animate-pulse"
                style={{ animationDelay: `${i * 0.03}s` }}
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center py-20">
            <p className="text-[#A99686] text-sm font-body">Unable to load gallery.</p>
            <button
              onClick={() => fetchImages()}
              className="mt-4 text-xs text-[#C9A84C] underline font-body"
            >
              Try again
            </button>
          </div>
        )}

        {/* Image grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div
                key={img.public_id}
                className="aspect-square bg-[#F2EDE4] overflow-hidden group cursor-pointer rounded-sm"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img.secure_url}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  width={img.width  || 600}
                  height={img.height || 600}
                />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && images.length === 0 && !error && (
          <div className="text-center py-20">
            <p className="text-[#A99686] text-sm font-body tracking-widest uppercase">
              Gallery coming soon
            </p>
          </div>
        )}

        {/* ── SENTINEL ── */}
        <div ref={sentinelRef} className="w-full h-1" aria-hidden="true" />

        {/* Load more spinner */}
        {loadingMore && (
          <div className="flex justify-center items-center py-12 gap-3">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        )}

        {/* End of gallery message */}
        {!hasMore && images.length > 0 && !loadingMore && (
          <div className="flex flex-col items-center py-12 gap-3">
            <div className="w-8 h-px bg-[#C9A84C]/30" />
            <p className="text-[#A99686] text-[10px] tracking-[4px] uppercase font-body">
              All photos loaded
            </p>
            <div className="w-8 h-px bg-[#C9A84C]/30" />
          </div>
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
