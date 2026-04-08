"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { label: "Weddings", path: "/events/weddings" },
  { label: "Corporate", path: "/events/corporate" },
  { label: "Private parties", path: "/events/private-parties" },
];

export const EventNavTabs = () => {
  const pathname = usePathname();
  const tabsRef = useRef([]);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeIndex = TABS.findIndex((t) => pathname === t.path);
    if (activeIndex !== -1 && tabsRef.current[activeIndex]) {
      const el = tabsRef.current[activeIndex];
      setSliderStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [pathname]);

  return (
    <div className="event-nav-wrap">
      <div className="event-nav-inner">
        {TABS.map((tab, i) => (
          <Link
            key={tab.path}
            href={tab.path}
            ref={(el) => (tabsRef.current[i] = el)}
            className={`event-nav-tab ${pathname === tab.path ? "active" : ""}`}
          >
            {tab.label}
          </Link>
        ))}
        <div 
          className="event-tab-slider" 
          style={{ 
            left: sliderStyle.left, 
            width: sliderStyle.width 
          }} 
        />
      </div>
    </div>
  );
};
