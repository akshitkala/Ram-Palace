"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function useReveal(ref, options = {}) {
  const { type = "fade", delay = 0, stagger = 0.1 } = options;

  useGSAP(() => {
    if (!ref.current) return;

    if (type === "lines") {
      const lines = ref.current.querySelectorAll(".reveal-line");
      gsap.from(lines, {
        y: "100%",
        opacity: 0,
        duration: 0.72,
        ease: "power3.out",
        stagger,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    } else if (type === "fade") {
      gsap.from(ref.current, {
        opacity: 0,
        y: 28,
        duration: 0.65,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    } else if (type === "scale") {
      gsap.from(ref.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.55,
        ease: "back.out(1.4)",
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    } else if (type === "rule") {
      gsap.from(ref.current, {
        width: 0,
        duration: 0.8,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    }
  }, { scope: ref });
}

export function useCountUp(ref, target, suffix = "", options = {}) {
  useGSAP(() => {
    if (!ref.current) return;

    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 1.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.value) + suffix;
        }
      },
    });
  }, { scope: ref });
}

export const GoldThread = () => {
  const lineRef = useRef(null);
  const dotRef = useRef(null);
  const wrapRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapRef.current,
        start: "top 85%",
        once: true,
      },
    });

    tl.to(lineRef.current, {
      height: 32,
      duration: 0.7,
      ease: "power2.out",
    }).to(
      dotRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(1.7)",
      },
      "-=0.1"
    );
  }, { scope: wrapRef });

  return (
    <div className="thread-wrap" ref={wrapRef}>
      <div className="thread-line" ref={lineRef} />
      <div className="thread-dot" ref={dotRef} />
    </div>
  );
};
