"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function ConfirmDeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  image, 
  images,
  isLoading,
  count = 1
}) {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const backdropRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      const tl = gsap.timeline();
      tl.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        .fromTo(modalRef.current, { scale: 0.95, opacity: 0, y: 10 }, { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }, "-=0.2");
    } else if (shouldRender) {
      handleClose();
    }
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setShouldRender(false);
        onClose();
      }
    });
    tl.to(modalRef.current, { scale: 0.95, opacity: 0, y: 10, duration: 0.2, ease: "power2.in" })
      .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
  };

  const handleBackdropClick = () => {
    // Shake animation with GSAP
    gsap.to(modalRef.current, {
      x: -6,
      duration: 0.05,
      repeat: 5,
      yoyo: true,
      onComplete: () => {
        gsap.to(modalRef.current, { x: 0, duration: 0.05 });
      }
    });
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header / Thumbnail */}
          <div className="flex flex-col gap-6 mb-8">
            {count > 1 && images && images.length > 0 ? (
              /* Bulk Thumbnails Strip */
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img) => (
                  <div 
                    key={img.public_id} 
                    className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-[#E8E0D4] shadow-sm"
                  >
                    <Image
                      src={img.secure_url}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : image ? (
              /* Single Thumbnail */
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#F7F4EF] border border-[#E8E0D4]">
                  <Image
                    src={image.secure_url}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[#1C1009] font-semibold text-base mb-1">
                    Delete Image
                  </p>
                  <p className="text-[#7A6A5A] text-xs truncate font-body">
                    {image?.public_id || "Permanent action"}
                  </p>
                </div>
              </div>
            ) : (
              /* Generic Icon */
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-lg bg-[#FAF0F0] flex items-center justify-center text-3xl">
                  🗑
                </div>
                <div className="overflow-hidden">
                  <p className="text-[#1C1009] font-semibold text-base">
                    {count > 1 ? `Delete ${count} Images` : "Confirm Deletion"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Title for bulk action */}
          {count > 1 && (
            <p className="text-[#1C1009] font-semibold text-lg mb-2">
              Delete {count} images permanently?
            </p>
          )}

          {/* Warning Text */}
          <p className="text-[#7A6A5A] text-sm leading-relaxed mb-8 font-body">
            This will permanently delete {count > 1 ? "these images" : "this image"} from Cloudinary and cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-lg border border-[#E8E0D4] text-[#1C1009] text-sm font-semibold hover:bg-[#F7F4EF] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#DC2626] text-white text-sm font-semibold hover:bg-[#B91C1C] transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center min-w-[120px]"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                count > 1 ? "Delete All" : "Delete Permanently"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
