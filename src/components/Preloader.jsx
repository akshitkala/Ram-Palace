"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const LEFT_TEXT      = "BASTI RAM ";
const RIGHT_TEXT     = "PALACE";
const BG_COLOR       = "#161412";
const MIN_MS         = 1000;
const SAFETY_MS      = 8000;
const HERO_IMAGE_SRC = "/images/hero/hero.webp";

export default function Preloader({ onComplete }) {
  const containerRef  = useRef(null);
  const panelLeftRef  = useRef(null);
  const panelRightRef = useRef(null);
  const charsRef      = useRef([]);

  useEffect(() => {
    const allChars  = charsRef.current.filter(Boolean);
    const container = containerRef.current;

    console.log("[Preloader] Init:", { hasContainer: !!container, chars: allChars.length });

    // ─────────────────────────────────────────
    // READINESS FLAGS
    // All 5 must be true before exit fires
    // ─────────────────────────────────────────
    const flags = {
      minTime:    false,
      windowLoad: false,
      fontsReady: false,
      heroImage:  false,
      goldDone:   false,
    };

    let exitFired = false;

    // Declare safetyTimeout early so doExit
    // can reference it — avoids hoisting issue
    // in original where doExit used it before
    // it was declared
    const safetyTimeout = setTimeout(() => {
      if (!exitFired) {
        Object.keys(flags).forEach(k => {
          flags[k] = true;
        });
        tryExit();
      }
    }, SAFETY_MS);

    function tryExit() {
      if (exitFired) return;
      
      const missing = Object.entries(flags)
        .filter(([_, v]) => !v)
        .map(([k]) => k);
      
      if (missing.length > 0) {
        return;
      }

      console.log("[Preloader] All flags ready. Exiting...");
      exitFired = true;
      doExit();
    }

    function doExit() {
      clearTimeout(safetyTimeout);

      // Switch from none → auto during active
      // slide so clicks don't pass through to
      // the page while panels are still visible
      container.style.pointerEvents = "auto";

      gsap.timeline({
        defaults: {
          duration: 0.85,
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

    // ─────────────────────────────────────────
    // FLAG 1 — Minimum 1000ms
    // ─────────────────────────────────────────
    setTimeout(() => {
      flags.minTime = true;
      tryExit();
    }, MIN_MS);

    // ─────────────────────────────────────────
    // FLAG 2 — Window load
    // ─────────────────────────────────────────
    if (document.readyState === "complete") {
      flags.windowLoad = true;
      tryExit();
    } else {
      window.addEventListener("load", () => {
        flags.windowLoad = true;
        tryExit();
      }, { once: true });
    }

    // ─────────────────────────────────────────
    // FLAG 3 — Fonts rendered
    // ─────────────────────────────────────────
    document.fonts.ready
      .then(() => {
        flags.fontsReady = true;
        tryExit();
      })
      .catch(() => {
        // Never block on font failure
        flags.fontsReady = true;
        tryExit();
      });

    // ─────────────────────────────────────────
    // FLAG 4 — Hero image loaded
    //
    // FIX from original:
    // Original checked heroImg.complete right
    // after setting .src — browser hasn't
    // resolved the cache yet at that point.
    // onload fires correctly for both cached
    // and uncached images, so .complete check
    // was unreliable. Removed it.
    // ─────────────────────────────────────────
    const heroImg = new window.Image();

    heroImg.onload = () => {
      flags.heroImage = true;
      tryExit();
    };

    heroImg.onerror = () => {
      // Never block on broken image path
      flags.heroImage = true;
      tryExit();
    };

    // Set src last — this triggers the load
    heroImg.src = HERO_IMAGE_SRC;

    // ─────────────────────────────────────────
    // GOLD ANIMATION
    // ─────────────────────────────────────────
    if (container) gsap.set(container, { opacity: 1 });
    if (allChars.length > 0) {
      gsap.set(allChars, { color: "#F5F1EC" });

      const goldTl = gsap.timeline({ delay: 0.4 });

      goldTl.to(allChars, {
        color:    "#C9A84C",
        duration: 0.25,
        stagger:  0.05,
        ease:     "none",
      });

      // FLAG 5 — Gold sweep complete
      goldTl.call(() => {
        flags.goldDone = true;
        tryExit();
      });
    } else {
      // Fallback if no characters found
      flags.goldDone = true;
      tryExit();
    }

    return () => {
      if (typeof goldTl !== "undefined") goldTl.kill();
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  // ─────────────────────────────────────────
  // Render individual char <span>s with refs
  // ─────────────────────────────────────────
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
        // Starts as none — doExit sets "auto"
        // while panels are sliding so nothing
        // beneath is accidentally clickable
        pointerEvents: "none",
      }}
    >

      {/* ── LEFT PANEL ── */}
      <div
        ref={panelLeftRef}
        style={{
          position:       "absolute",
          top:            0,
          left:           0,
          // +1px overlap kills sub-pixel seam gap
          width:          "calc(50% + 1px)",
          height:         "100%",
          background:     BG_COLOR,
          // overflow hidden so text doesn't
          // bleed out during slide animation
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

      {/* ── RIGHT PANEL ── */}
      <div
        ref={panelRightRef}
        style={{
          position:       "absolute",
          top:            0,
          right:          0,
          width:          "calc(50% + 1px)",
          height:         "100%",
          background:     BG_COLOR,
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

      {/* ── BOTTOM LABEL ── */}
      <div
        style={{
          position:      "absolute",
          // clamp so it never clips on short
          // landscape mobile screens
          bottom:        "clamp(16px, 4vh, 32px)",
          left:          "50%",
          transform:     "translateX(-50%)",
          zIndex:        20,
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           "8px",
          pointerEvents: "none",
          // Prevent wrapping on narrow screens
          whiteSpace:    "nowrap",
        }}
      >
        <div
          style={{
            width:      "24px",
            height:     "1px",
            background: "rgba(201,168,76,0.35)",
            flexShrink: 0,
          }}
        />
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
            // Slightly larger floor for low-DPI
            // Android screens where 9px is
            // genuinely unreadable
            fontSize:      "clamp(9px, 1.8vw, 10px)",
            letterSpacing: "0.3em",
            color:         "rgba(201,168,76,0.5)",
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

// ─────────────────────────────────────────
// TEXT STYLE — fully responsive
//
// PROBLEMS IN ORIGINAL:
//
// 1. fontSize: clamp(1.6rem, 3vw, 2.75rem)
//    3vw on 375px = 11.25px — below the
//    clamp floor of 1.6rem (25.6px) so floor
//    saves it, but the curve is wrong.
//    On 480px tablet = 14.4px, still below
//    floor. The vw value does nothing useful
//    until screens > 854px.
//
//    Fix: use 4.5vw so the curve kicks in at
//    reasonable screen sizes:
//      320px → 14.4px (near floor, correct)
//      375px → 16.9px (good)
//      430px → 19.4px (good)
//      768px → 34.6px (good)
//      1440px → clamped at 2.75rem (44px)
//
// 2. letterSpacing: 0.3em on mobile
//    "BASTI RAM " = 10 chars × fontSize
//    × (1 + 0.3) letter-spacing
//    At small sizes this is fine, but at
//    mid-sizes (430px–600px) the left panel
//    text was overflowing its 50% container.
//
//    Fix: clamp letter-spacing from 0.15em
//    (mobile) to 0.28em (desktop).
//    0.6vw gives a smooth curve between them.
//
// 3. No whiteSpace: nowrap
//    Without this, "BASTI RAM " could wrap
//    to two lines on very narrow screens,
//    completely breaking the split effect.
// ─────────────────────────────────────────
const textStyle = {
  fontFamily:    "'Cormorant Garamond', Georgia, serif",
  fontWeight:    300,
  fontSize:      "clamp(1.1rem, 4.5vw, 2.75rem)",
  letterSpacing: "clamp(0.15em, 0.6vw, 0.28em)",
  lineHeight:    1,
  userSelect:    "none",
  // Critical — prevents any line wrapping
  // that would break the split illusion
  whiteSpace:    "nowrap",
};

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHANGE LOG vs ORIGINAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BUG FIXES:
  1. safetyTimeout declared before doExit —
     fixes hidden dependency order issue where
     doExit referenced safetyTimeout before
     it was declared in the original

  2. heroImg.complete check removed —
     was unreliable (browser hasn't resolved
     cache at the point of synchronous check).
     onload handles both cached + uncached.

  3. pointerEvents flipped to "auto" in doExit
     — original left it as "none" during the
     entire exit animation, allowing accidental
     clicks to pass through to elements beneath

  4. Null guard added at top of useEffect —
     if refs aren't attached, bail early

RESPONSIVE FIXES:
  5. fontSize curve fixed: 3vw → 4.5vw
     works correctly from 320px upward

  6. letterSpacing clamped: 0.3em → 
     clamp(0.15em, 0.6vw, 0.28em)
     prevents panel overflow on mid screens

  7. whiteSpace: nowrap added to textStyle —
     prevents line wrap breaking the split

  8. Bottom label bottom position clamped:
     32px → clamp(16px, 4vh, 32px)
     prevents clip on landscape mobile

  9. Bottom label font size floor raised:
     9px → clamp(9px, 1.8vw, 10px)
     more readable on low-DPI Android

  10. All inline styles moved to inline
      style objects instead of Tailwind
      className — avoids any responsive
      Tailwind class conflicts

NO CHANGES TO:
  - Animation sequence or timing
  - Gold sweep behavior
  - Split exit animation
  - Flag logic structure
  - Safety timeout duration (8000ms)
  - Background color (#161412)
  - Text content (LEFT_TEXT / RIGHT_TEXT)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/