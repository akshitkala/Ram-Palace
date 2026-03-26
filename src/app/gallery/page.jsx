"use client";

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import GalleryHero from "@/components/Gallery/GalleryHero";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import GalleryLightbox from "@/components/Gallery/GalleryLightbox";

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
      <GalleryHero heroRef={heroRef} />
      
      <GalleryGrid 
        images={images}
        loading={loading}
        error={error}
        hasMore={hasMore}
        loadingMore={loadingMore}
        sentinelRef={sentinelRef}
        fetchImages={fetchImages}
        setSelectedImage={setSelectedImage}
      />

      <GalleryLightbox 
        selectedImage={selectedImage}
        closeLightbox={closeLightbox}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      <Footer />
    </div>
  );
}
