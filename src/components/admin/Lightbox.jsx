"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Lightbox({ 
  isOpen, 
  onClose, 
  images = [], 
  currentIndex = 0, 
  onPrev, 
  onNext 
}) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const backdropRef = useRef(null);
  const contentRef = useRef(null);
  const containerRef = useRef(null);
  const currentImage = images[currentIndex];

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      
      const tl = gsap.timeline();
      tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(contentRef.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }, "-=0.2");

      const handleKeyDown = (e) => {
        if (e.key === "Escape") handleClose();
        if (e.key === "ArrowLeft") onPrev();
        if (e.key === "ArrowRight") onNext();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else if (shouldRender) {
      handleClose();
    }
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShouldRender(false);
        document.body.style.overflow = "auto";
        onClose();
      }
    });

    tl.to(contentRef.current, { scale: 0.92, opacity: 0, duration: 0.2, ease: "power2.in" })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  if (!shouldRender || !currentImage) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" ref={containerRef}>
      {/* Backdrop with grain */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-[#000000ec] cursor-pointer" 
        onClick={handleClose}
      >
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />
      </div>

      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Navigation - Left */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hidden md:flex items-center justify-center text-white transition-colors"
        >
          ←
        </button>
      )}

      {/* Navigation - Right */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hidden md:flex items-center justify-center text-white transition-colors"
        >
          →
        </button>
      )}

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/20">
          <Image
            src={currentImage.secure_url}
            alt=""
            width={1600}
            height={1200}
            className="max-h-[80vh] md:max-h-[85vh] max-w-[90vw] w-auto h-auto object-contain select-none"
            priority
            unoptimized
          />
        </div>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="font-body text-white/50 text-sm tracking-[0.2em] uppercase">
            {currentIndex + 1} / {images.length}
          </p>
          <div className="mt-3 flex flex-col gap-1 items-center">
            <p className="text-white/30 text-[10px] tracking-wider uppercase">
              {currentImage.public_id}
            </p>
            {currentImage.created_at && (
              <p className="text-white/30 text-[10px] tracking-wider uppercase">
                Uploaded: {new Date(currentImage.created_at).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
