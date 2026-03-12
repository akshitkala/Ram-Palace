"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LEFT_TEXT      = "BASTI RAM ";
const RIGHT_TEXT     = "PALACE";
const MIN_MS         = 1000;
const SAFETY_MS      = 8000;
const HERO_IMAGE_SRC = "/images/hero/hero.webp";

const textStyle = {
  fontFamily:    "'Cormorant Garamond', Georgia, serif",
  fontWeight:    300,
  fontSize:      "clamp(1.1rem, 4.5vw, 2.75rem)",
  letterSpacing: "clamp(0.15em, 0.6vw, 0.28em)",
  lineHeight:    1,
  userSelect:    "none",
  whiteSpace:    "nowrap",
  color:         "#F5F1EC",
};

// onExiting  — fires the MOMENT panels begin sliding
//              set page opacity to 1 here so hero is
//              visible through the gap as doors open
// onComplete — fires when panels are fully off screen
export default function Preloader({ onExiting, onComplete }) {
  const containerRef  = useRef(null);
  const panelLeftRef  = useRef(null);
  const panelRightRef = useRef(null);
  const charsRef      = useRef([]);

  useEffect(() => {
    const allChars  = charsRef.current.filter(Boolean);
    const container = containerRef.current;

    const flags = {
      minTime:    false,
      windowLoad: false,
      fontsReady: false,
      heroImage:  false,
      goldDone:   false,
    };

    let exitFired = false;

    const safetyTimeout = setTimeout(() => {
      if (!exitFired) {
        Object.keys(flags).forEach(k => { flags[k] = true; });
        tryExit();
      }
    }, SAFETY_MS);

    function tryExit() {
      if (exitFired) return;
      const allReady = Object.values(flags).every(Boolean);
      if (!allReady) return;
      exitFired = true;
      doExit();
    }

    function doExit() {
      clearTimeout(safetyTimeout);

      // Fire onExiting BEFORE animation starts.
      // RootLayoutClient sets page to opacity:1
      // so the hero is painted and visible the
      // instant the doors start to open.
      if (onExiting) onExiting();

      gsap.timeline({
        defaults: {
          duration: 1.1,
          ease:     "power4.inOut",
        },
        onComplete: () => {
          container.style.display = "none";
          if (onComplete) onComplete();
        },
      })
      .to(panelLeftRef.current,  { xPercent: -100 })
      .to(panelRightRef.current, { xPercent:  100 }, "<");
    }

    // FLAG 1 — Minimum time
    setTimeout(() => {
      flags.minTime = true;
      tryExit();
    }, MIN_MS);

    // FLAG 2 — Window load
    if (document.readyState === "complete") {
      flags.windowLoad = true;
    } else {
      window.addEventListener("load", () => {
        flags.windowLoad = true;
        tryExit();
      }, { once: true });
    }

    // FLAG 3 — Fonts ready
    document.fonts.ready
      .then(() => { flags.fontsReady = true; tryExit(); })
      .catch(() => { flags.fontsReady = true; tryExit(); });

    // FLAG 4 — Hero image
    const heroImg   = new window.Image();
    heroImg.onload  = () => { flags.heroImage = true; tryExit(); };
    heroImg.onerror = () => { flags.heroImage = true; tryExit(); };
    heroImg.src     = HERO_IMAGE_SRC;

    // GOLD SWEEP
    gsap.set(container, { opacity: 1 });
    gsap.set(allChars,  { color: "#F5F1EC" });

    const goldTl = gsap.timeline({ delay: 0.4 });
    goldTl.to(allChars, {
      color:    "#C9A84C",
      duration: 0.25,
      stagger:  0.05,
      ease:     "none",
    });

    // FLAG 5 — Gold done
    goldTl.call(() => {
      flags.goldDone = true;
      tryExit();
    });

    return () => {
      goldTl.kill();
      clearTimeout(safetyTimeout);
    };
  }, [onExiting, onComplete]);

  const renderChars = (text, offset) =>
    text.split("").map((char, i) => {
      const idx = offset + i;
      return (
        <span
          key={idx}
          ref={el => { charsRef.current[idx] = el; }}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </span>
      );
    });

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        9999,
        overflow:      "hidden",
        opacity:       1,
        pointerEvents: "none",
        background:    "transparent",
      }}
    >
      {/* LEFT PANEL — slides left, text rides with it */}
      <div
        ref={panelLeftRef}
        style={{
          position:       "absolute",
          top:            0,
          left:           0,
          width:          "calc(50% + 1px)",
          height:         "100%",
          background:     "#2C0A0A",
          overflow:       "hidden",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "flex-end",
        }}
      >
        <span style={textStyle}>
          {renderChars(LEFT_TEXT, 0)}
        </span>
      </div>

      {/* RIGHT PANEL — slides right, text rides with it */}
      <div
        ref={panelRightRef}
        style={{
          position:       "absolute",
          top:            0,
          right:          0,
          width:          "calc(50% + 1px)",
          height:         "100%",
          background:     "#2C0A0A",
          overflow:       "hidden",
          display:        "flex",
          alignItems:     "center",
          justifyContent: "flex-start",
        }}
      >
        <span style={textStyle}>
          {renderChars(RIGHT_TEXT, LEFT_TEXT.length)}
        </span>
      </div>

      {/* BOTTOM LABEL */}
      <div
        style={{
          position:      "absolute",
          bottom:        "clamp(16px, 4vh, 32px)",
          left:          "50%",
          transform:     "translateX(-50%)",
          zIndex:        20,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "8px",
          pointerEvents: "none",
          whiteSpace:    "nowrap",
        }}
      >
        <div style={{
          width:      "24px",
          height:     "1px",
          background: "rgba(201,168,76,0.35)",
        }} />
        <p style={{
          fontFamily:    "'DM Sans', sans-serif",
          fontWeight:    400,
          fontSize:      "clamp(9px, 1.8vw, 10px)",
          letterSpacing: "0.3em",
          color:         "rgba(201,168,76,0.5)",
          textTransform: "uppercase",
          margin:        0,
        }}>
          Manesar · Gurugram
        </p>
      </div>
    </div>
  );
}