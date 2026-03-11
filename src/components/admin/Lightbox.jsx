"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export default function Lightbox({ 
  isOpen, 
  onClose, 
  images = [], 
  currentIndex = 0, 
  onPrev, 
  onNext 
}) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft") onPrev();
        if (e.key === "ArrowRight") onNext();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "auto";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      >
        {/* Backdrop with grain */}
        <div 
          className="absolute inset-0 bg-[#000000ec] cursor-pointer" 
          onClick={onClose}
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
          onClick={onClose}
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
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center max-w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black/20">
            <img
              src={currentImage.secure_url}
              alt=""
              className="max-h-[80vh] md:max-h-[85vh] max-w-[90vw] object-contain select-none"
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
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
