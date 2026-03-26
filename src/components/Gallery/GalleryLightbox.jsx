"use client";

import Image from "next/image";
import { FiX, FiArrowLeft, FiArrowRight } from "react-icons/fi";

export default function GalleryLightbox({ 
  selectedImage, 
  closeLightbox, 
  handlePrev, 
  handleNext 
}) {
  if (!selectedImage) return null;

  return (
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
  );
}
