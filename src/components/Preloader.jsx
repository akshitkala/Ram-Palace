"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LEFT_TEXT  = "BASTI RAM ";
const RIGHT_TEXT = "PALACE";
const BG_COLOR   = "#161412";
const MIN_MS     = 1000;

// The hero image src — used to detect
// when the above-fold image has loaded.
// Update this path if hero image changes.
const HERO_IMAGE_SRC = "/images/hero/hero.png";

export default function Preloader({ onComplete }) {
  const containerRef  = useRef(null);
  const panelLeftRef  = useRef(null);
  const panelRightRef = useRef(null);
  const charsRef      = useRef([]);

  useEffect(() => {
    const start    = Date.now();
    const allChars = charsRef.current.filter(Boolean);

    // ─────────────────────────────────────────
    // READINESS FLAGS
    // All must be true before exit fires
    // ─────────────────────────────────────────
    const flags = {
      minTime:   false,
      windowLoad: false,
      fontsReady: false,
      heroImage:  false,
      goldDone:   false,
    };

    let exitFired = false;

    const tryExit = () => {
      if (exitFired) return;
      const allReady = Object.values(flags)
        .every(Boolean);
      if (!allReady) return;
      exitFired = true;
      doExit();
    };

    // ─────────────────────────────────────────
    // FLAG 1 — Minimum time (1000ms)
    // ─────────────────────────────────────────
    setTimeout(() => {
      flags.minTime = true;
      tryExit();
    }, MIN_MS);

    // ─────────────────────────────────────────
    // FLAG 2 — window.load
    // ─────────────────────────────────────────
    if (document.readyState === "complete") {
      flags.windowLoad = true;
    } else {
      window.addEventListener("load", () => {
        flags.windowLoad = true;
        tryExit();
      }, { once: true });
    }

    // ─────────────────────────────────────────
    // FLAG 3 — Fonts ready
    // document.fonts.ready resolves when all
    // @font-face fonts are loaded and rendered
    // ─────────────────────────────────────────
    document.fonts.ready.then(() => {
      flags.fontsReady = true;
      tryExit();
    }).catch(() => {
      // Never block on font failure
      flags.fontsReady = true;
      tryExit();
    });

    // ─────────────────────────────────────────
    // FLAG 4 — Hero image loaded
    // Create an Image object to track the
    // hero image load without affecting the DOM
    // ─────────────────────────────────────────
    const heroImg = new Image();
    heroImg.onload = () => {
      flags.heroImage = true;
      tryExit();
    };
    heroImg.onerror = () => {
      // Never block on image failure
      flags.heroImage = true;
      tryExit();
    };
    heroImg.src = HERO_IMAGE_SRC;

    // If hero image is already cached
    if (heroImg.complete) {
      flags.heroImage = true;
    }

    // ─────────────────────────────────────────
    // GOLD ANIMATION
    // ─────────────────────────────────────────
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(allChars, { color: "#F5F1EC" });

    const goldTl = gsap.timeline({ delay: 0.4 });

    goldTl.to(allChars, {
      color:    "#C9A84C",
      duration: 0.25,
      stagger:  0.05,
      ease:     "none",
    });

    // FLAG 5 — Gold animation complete
    goldTl.call(() => {
      flags.goldDone = true;
      tryExit();
    });

    // ─────────────────────────────────────────
    // SAFETY NET — never hang forever
    // If something fails to load after 8s,
    // exit anyway — broken image/font should
    // never trap the user on the preloader
    // ─────────────────────────────────────────
    const safetyTimeout = setTimeout(() => {
      if (!exitFired) {
        Object.keys(flags).forEach(k => {
          flags[k] = true;
        });
        tryExit();
      }
    }, 8000);

    // ─────────────────────────────────────────
    // EXIT ANIMATION
    // ─────────────────────────────────────────
    const doExit = () => {
      clearTimeout(safetyTimeout);

      gsap.timeline({
        defaults: {
          duration: 0.85,
          ease:     "power4.inOut",
        },
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.display =
              "none";
          }
          if (onComplete) onComplete();
        },
      })
      .to(panelLeftRef.current,  { xPercent: -100 })
      .to(panelRightRef.current, { xPercent:  100 },
        "<"
      );
    };

    return () => {
      goldTl.kill();
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  // Render char spans with refs
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
      className="fixed inset-0 z-[9999]
        overflow-hidden pointer-events-none"
      style={{ opacity: 1 }}
      aria-hidden="true"
    >

      {/* LEFT PANEL */}
      <div
        ref={panelLeftRef}
        className="absolute top-0 left-0 h-full
          flex items-center justify-end"
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

      {/* RIGHT PANEL */}
      <div
        ref={panelRightRef}
        className="absolute top-0 right-0 h-full
          flex items-center justify-start"
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
        className="absolute bottom-8 left-1/2
          -translate-x-1/2 z-20
          flex flex-col items-center gap-2
          pointer-events-none"
      >
        <div style={{
          width:      "24px",
          height:     "1px",
          background: "rgba(201,168,76,0.35)",
        }} />
        <p style={{
          fontFamily:    "'DM Sans', sans-serif",
          fontWeight:    400,
          fontSize:      "9px",
          letterSpacing: "0.35em",
          color:         "rgba(201,168,76,0.45)",
          textTransform: "uppercase",
          margin:        0,
        }}>
          Manesar · Gurugram
        </p>
      </div>

    </div>
  );
}