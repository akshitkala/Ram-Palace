"use client";
import { useState, useCallback } from "react";
import Preloader from "@/components/Preloader";

export default function RootLayoutClient({ children }) {
  const [phase, setPhase] = useState("loading");
  // phase: "loading" | "revealing" | "done"

  const handleExiting = useCallback(() => {
    // Called the moment panels START sliding
    // Page becomes visible so user sees hero
    // through the gap as doors open
    setPhase("revealing");
  }, []);

  const handleComplete = useCallback(() => {
    // Called when panels fully off screen
    setPhase("done");
  }, []);

  return (
    <>
      <Preloader
        onExiting={handleExiting}
        onComplete={handleComplete}
      />

      <div
        style={{
          opacity: phase === "loading" ? 0 : 1,
          // Instant reveal — no fade
          // Hero appears the moment doors start opening
          transition: "none",
        }}
      >
        {children}
      </div>
    </>
  );
}