"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LEFT_TEXT  = "BASTI RAM "; // 10 chars incl space
const RIGHT_TEXT = "PALACE";     // 6 chars
const BG_COLOR   = "#161412";

export default function Preloader({ onComplete }) {
  const containerRef  = useRef(null);
  const panelLeftRef  = useRef(null);
  const panelRightRef = useRef(null);
  const charsRef      = useRef([]);

  useEffect(() => {
    const MIN_MS   = 1000;
    const start    = Date.now();
    const allChars = charsRef.current.filter(Boolean);

    // Initial state — text is ivory, container visible
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(allChars, { color: "#F5F1EC" });

    // ─────────────────────────────────────
    // GOLD SWEEP — color only, no movement
    // 16 chars × 0.05s stagger = 0.8s sweep
    // 0.25s per char = smooth transition
    // ─────────────────────────────────────
    const goldTl = gsap.timeline({ delay: 0.5 });

    goldTl.to(allChars, {
      color:    "#C9A84C",
      duration: 0.25,
      stagger:  0.05,
      ease:     "none",
    });

    // ─────────────────────────────────────
    // EXIT — fires when BOTH are true:
    //   ① gold animation complete
    //   ② window fully loaded
    //   ③ minimum 1000ms elapsed
    // ─────────────────────────────────────
    const doExit = () => {
      const elapsed   = Date.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);

      setTimeout(() => {
        gsap.timeline({
          defaults: {
            duration: 0.85,
            ease:     "power4.inOut",
          },
          onComplete: () => {
            if (containerRef.current) {
              containerRef.current.style.display = "none";
            }
            if (onComplete) onComplete();
          },
        })
        .to(panelLeftRef.current,  { xPercent: -100 })
        .to(panelRightRef.current, { xPercent:  100 }, "<");
      }, remaining);
    };

    let goldDone = false;
    let pageDone = false;

    const tryExit = () => {
      if (goldDone && pageDone) doExit();
    };

    // Gold complete callback
    goldTl.call(() => {
      goldDone = true;
      tryExit();
    });

    // Page load — if already loaded, set flag
    // tryExit will be called by goldTl.call above
    if (document.readyState === "complete") {
      pageDone = true;
    } else {
      window.addEventListener("load", () => {
        pageDone = true;
        tryExit();
      }, { once: true });
    }

    return () => {
      goldTl.kill();
    };
  }, [onComplete]);

  // Render individual char spans with refs
  const renderChars = (text, offset) =>
    text.split("").map((char, i) => {
      const idx = offset + i;
      return (
        <span
          key={idx}
          ref={el => { charsRef.current[idx] = el; }}
          style={{
            display:    "inline-block",
            whiteSpace: "pre",
          }}
        >
          {char}
        </span>
      );
    });

  const textStyle = {
    fontFamily:    "'Cormorant Garamond', Georgia, serif",
    fontWeight:    300,
    fontSize:      "clamp(1.6rem, 3vw, 2.75rem)",
    letterSpacing: "0.3em",
    lineHeight:    1,
    userSelect:    "none",
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden pointer-events-none"
      style={{ opacity: 1 }}
      aria-hidden="true"
    >

      {/* LEFT PANEL — "BASTI RAM " right-aligned to seam */}
      <div
        ref={panelLeftRef}
        className="absolute top-0 left-0 h-full flex items-center justify-end"
        style={{
          width:      "calc(50% + 1px)",
          background: BG_COLOR,
          overflow:   "hidden",
        }}
      >
        <span style={textStyle}>
          {renderChars(LEFT_TEXT, 0)}
        </span>
      </div>

      {/* RIGHT PANEL — "PALACE" left-aligned to seam */}
      <div
        ref={panelRightRef}
        className="absolute top-0 right-0 h-full flex items-center justify-start"
        style={{
          width:      "calc(50% + 1px)",
          background: BG_COLOR,
          overflow:   "hidden",
        }}
      >
        <span style={textStyle}>
          {renderChars(RIGHT_TEXT, LEFT_TEXT.length)}
        </span>
      </div>

      {/* BOTTOM LABEL */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div
          style={{
            width:      "24px",
            height:     "1px",
            background: "rgba(201,168,76,0.35)",
          }}
        />
        <p
          style={{
            fontFamily:    "'DM Sans', sans-serif",
            fontWeight:    400,
            fontSize:      "9px",
            letterSpacing: "0.35em",
            color:         "rgba(201,168,76,0.45)",
            textTransform: "uppercase",
            margin:        0,
          }}
        >
          Manesar · Gurugram
        </p>
      </div>

    </div>
  );
}