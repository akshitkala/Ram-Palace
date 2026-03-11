"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function Toast({ 
  message, 
  type = "success", 
  onClose 
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border
                 ${isSuccess 
                   ? "bg-white border-green-100 text-green-800" 
                   : "bg-white border-red-100 text-red-800"}`}
    >
      <div className={`w-2 h-2 rounded-full ${isSuccess ? "bg-green-500" : "bg-red-500"}`} />
      <p className="font-body text-sm font-medium pr-2">
        {message}
      </p>
      <button 
        onClick={onClose}
        className="text-[#7A6A5A] hover:text-[#1C1009] transition-colors"
      >
        ✕
      </button>
    </motion.div>
  );
}
