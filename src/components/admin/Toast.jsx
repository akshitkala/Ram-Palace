"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Toast({ 
  message, 
  type = "success", 
  onClose 
}) {
  const toastRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Entrance Animation
    gsap.fromTo(toastRef.current, 
      { opacity: 0, y: -20, x: 20 },
      { opacity: 1, y: 0, x: 0, duration: 0.3, ease: "back.out(1.7)" }
    );

    // Auto-close after 3s
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (isExiting) return;
    setIsExiting(true);
    
    gsap.to(toastRef.current, {
      opacity: 0,
      scale: 0.95,
      y: -10,
      duration: 0.2,
      onComplete: onClose
    });
  };

  const isSuccess = type === "success";

  return (
    <div
      ref={toastRef}
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
        onClick={handleClose}
        className="text-[#7A6A5A] hover:text-[#1C1009] transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
