"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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
  const [shake, setShake] = useState(false);

  const handleBackdropClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleBackdropClick}
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            y: 0,
            x: shake ? [-6, 6, -6, 6, 0] : 0
          }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{
            x: { duration: 0.3, ease: "easeInOut" },
            default: { duration: 0.2 }
          }}
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
                      className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-[#E8E0D4] shadow-sm"
                    >
                      <img
                        src={img.secure_url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : image ? (
                /* Single Thumbnail */
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#F7F4EF] border border-[#E8E0D4]">
                    <img
                      src={image.secure_url}
                      alt=""
                      className="w-full h-full object-cover"
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
                onClick={onClose}
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
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
