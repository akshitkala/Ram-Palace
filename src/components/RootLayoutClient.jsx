"use client";
import { useState } from "react";
import Preloader from "@/components/Preloader";

export default function RootLayoutClient({ children }) {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <div
        className={`transition-opacity duration-500 ease-out delay-100 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
