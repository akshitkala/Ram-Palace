"use client";

import React from "react";

/**
 * GoldDivider
 * A cinematic ornamental divider with a center diamond/dot and flanking hairlines.
 */
export function GoldDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 py-0 ${className}`} aria-hidden="true">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C9A84C]/30" />
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5Z"
          fill="#C9A84C"
          fillOpacity="0.5"
        />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C9A84C]/30" />
    </div>
  );
}

/**
 * GoldHairline
 * A simple gold horizontal line with standard project opacity.
 */
export function GoldHairline({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`h-px bg-[#C9A84C]/30 ${className}`}
    />
  );
}

/**
 * ShimmerLine
 * A gold horizontal line with gradients at the ends.
 * direction: 'left', 'right', or 'center' (default)
 */
export function ShimmerLine({ className = "", direction = "center" }) {
  const gradientClass = 
    direction === "left" ? "bg-gradient-to-r from-transparent to-[#C9A84C]" :
    direction === "right" ? "bg-gradient-to-l from-transparent to-[#C9A84C]" :
    "bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent";

  return (
    <div
      aria-hidden="true"
      className={`h-px ${gradientClass} ${className}`}
    />
  );
}

/**
 * SectionDivider
 * A centered ornamental divider for section headers.
 */
export function SectionDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 mb-8 ${className}`} aria-hidden="true">
      <ShimmerLine className="w-12 opacity-60" direction="left" />
      <span className="text-[#C9A84C] text-sm opacity-40">✦</span>
      <ShimmerLine className="w-12 opacity-60" direction="right" />
    </div>
  );
}

/**
 * SimpleGoldDivider
 * The specific SVG pattern requested in the prompt with 3 parts (line-dot-line).
 */
export function SimpleGoldDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className="flex-1 h-px bg-[#C9A84C]/40" />
      <svg
        viewBox="0 0 12 12"
        className="w-3 h-3 flex-shrink-0"
      >
        <circle
          cx="6" cy="6" r="2"
          fill="#C9A84C"
          fillOpacity="0.6"
        />
      </svg>
      <div className="flex-1 h-px bg-[#C9A84C]/40" />
    </div>
  );
}
