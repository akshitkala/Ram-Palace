"use client";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const LEFT_TEXT      = "BASTI RAM ";
const RIGHT_TEXT     = "PALACE";
const MIN_MS         = 1600;
const SAFETY_MS      = 4000;

const textStyle = {
  fontFamily:    "var(--font-heading)",
  fontWeight:    300,
  fontSize:      "clamp(1.5rem, 6vw, 3rem)",
  letterSpacing: "clamp(0.12em, 0.6vw, 0.28em)",
  lineHeight:    1,
  userSelect:    "none",
  whiteSpace:    "nowrap",
  color:         "#F5F1EC",
};

export default function Preloader({ onExiting, onComplete }) {
  const containerRef  = useRef(null);
  const panelLeftRef  = useRef(null);
  const panelRightRef = useRef(null);
  const [isSkipped]   = useState(false);
  const charsRef      = useRef([]);

  useGSAP(
    (context) => {
      const allChars  = charsRef.current.filter(Boolean);
      const container = containerRef.current;
      if (!container) return;

      const flags = {
        minTime:    false,
        windowLoad: false,
        goldDone:   false,
      };

      let exitFired = false;

      // 1. Safety Timeout (Fallback)
      const safetyTimeout = setTimeout(() => {
        if (!exitFired) {
          console.warn("Preloader: Safety timeout reached. Forcing exit.");
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
        if (onExiting) onExiting();

        // Scope the exit animation to the context
        context.add(() => {
          gsap.timeline({
            defaults: {
              duration: 0.8,
              ease:     "power4.inOut",
            },
            onComplete: () => {
              if (container) container.style.display = "none";
              if (onComplete) onComplete();
            },
          })
          .to(panelLeftRef.current,  { xPercent: -100 })
          .to(panelRightRef.current, { xPercent:  100 }, "<");
        });
      }

      // 2. Minimum Display Time
      const minTimer = setTimeout(() => {
        flags.minTime = true;
        tryExit();
      }, MIN_MS);

      // 3. Window/Asset Load Check
      const checkLoad = () => {
        flags.windowLoad = true;
        tryExit();
      };

      if (document.readyState === "complete" || document.readyState === "interactive") {
        checkLoad();
      } else {
        window.addEventListener("load", checkLoad, { once: true });
      }

      // 4. Gold Sweep Animation
      gsap.set(container, { opacity: 1 });
      const goldTl = gsap.timeline({ delay: 0.2 });
      
      if (allChars.length > 0) {
        goldTl.to(allChars, {
          color:    "#C9A84C",
          duration: 0.25,
          stagger:  0.03,
          ease:     "none",
        });
      }

      goldTl.call(() => {
        flags.goldDone = true;
        tryExit();
      });

      // Cleanup
      return () => {
        clearTimeout(safetyTimeout);
        clearTimeout(minTimer);
        window.removeEventListener("load", checkLoad);
      };
    },
    { scope: containerRef, dependencies: [onExiting, onComplete] }
  );

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

  if (isSkipped) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        9999,
        overflow:      "hidden",
        background:    "transparent",
        pointerEvents: "auto", // Block clicks until gone
      }}
    >
      {/* LEFT PANEL */}
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

      {/* RIGHT PANEL */}
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
          fontFamily:    "var(--font-heading)",
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