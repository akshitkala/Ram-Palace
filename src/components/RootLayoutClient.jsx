"use client";
import { useState, useCallback } from "react";
import Preloader from "@/components/Preloader";

export default function RootLayoutClient({
  children
}) {
  const [ready, setReady] = useState(false);

  const handleComplete = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handleComplete} />

      <div
        style={{
          opacity:    ready ? 1 : 0,
          transition: "opacity 0.6s ease",
          // Slight delay so transition starts
          // just as panels finish clearing
          transitionDelay: ready ? "0.05s" : "0s",
        }}
      >
        {children}
      </div>
    </>
  );
}
