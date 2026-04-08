"use client";

import { useState, useEffect, useRef, useLayoutEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import GalleryHero from "@/components/Gallery/GalleryHero";
import GalleryGrid from "@/components/Gallery/GalleryGrid";
import GalleryLightbox from "@/components/Gallery/GalleryLightbox";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GalleryPage() {
  const [allImages,    setAllImages]    = useState([]);
  const [displayImages, setDisplayImages] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(false);
  
  const [page,         setPage]         = useState(1);
  const [pageSize]                      = useState(24);
  const [hasMore,      setHasMore]      = useState(false);
  
  const [selectedImage, setSelectedImage] = useState(null);
  
  const heroRef = useRef(null);
  const sentinelRef = useRef(null);

  // Fetch ALL images from unified endpoint
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch("/api/images?section=gallery");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        
        // Convert to expected format for GalleryGrid
        const formatted = (data.images || []).map(img => ({
           public_id: img.public_id,
           secure_url: img.url,
           width: img.width,
           height: img.height
        }));

        setAllImages(formatted);
        setDisplayImages(formatted.slice(0, pageSize));
        setHasMore(formatted.length > pageSize);
      } catch (err) {
        console.error("Gallery fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, [pageSize]);

  // Handle "Load More" internally (client-side slicing)
  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    const nextPage = page + 1;
    const nextBatch = allImages.slice(0, nextPage * pageSize);
    
    setDisplayImages(nextBatch);
    setPage(nextPage);
    setHasMore(allImages.length > nextBatch.length);
  }, [allImages, page, pageSize, hasMore, loading]);

  useEffect(() => {
    if (!sentinelRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "600px", threshold: 0 }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  // GSAP Animations
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.2,
      });
    }, heroRef);
    return () => ctx.revert();
  }, [loading]);

  // Lightbox Navigation
  const handleNext = (e) => {
    if (e) e.stopPropagation();
    const currentIndex = displayImages.findIndex((img) => img.public_id === selectedImage.public_id);
    const nextIndex = (currentIndex + 1) % displayImages.length;
    setSelectedImage(displayImages[nextIndex]);
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    const currentIndex = displayImages.findIndex((img) => img.public_id === selectedImage.public_id);
    const prevIndex = (currentIndex - 1 + displayImages.length) % displayImages.length;
    setSelectedImage(displayImages[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, displayImages]);

  return (
    <div className="bg-[#fefaf6] min-h-screen">
      <GalleryHero heroRef={heroRef} />
      
      <GalleryGrid 
        images={displayImages}
        loading={loading}
        error={error}
        hasMore={hasMore}
        loadingMore={false} // No longer a separate state
        sentinelRef={sentinelRef}
        fetchImages={loadMore} 
        setSelectedImage={setSelectedImage}
      />

      <GalleryLightbox 
        selectedImage={selectedImage}
        closeLightbox={() => setSelectedImage(null)}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      <Footer />
    </div>
  );
}
