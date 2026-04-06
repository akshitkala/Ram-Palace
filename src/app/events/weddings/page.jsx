"use client";

import { useEffect, useState } from "react";
import EventLayout from "@/components/EventLayout";
import { eventDetails } from "@/Data/events";

export default function WeddingsPage() {
  const [data, setData] = useState(eventDetails.weddings);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    let isMounted = true;
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/images/events/weddings');
        if (!res.ok) throw new Error("HTTP error " + res.status);
        const json = await res.json();
        
        if (isMounted && json.images && json.images.length > 0) {
          const imgs = json.images;
          const newData = JSON.parse(JSON.stringify(eventDetails.weddings)); // deep copy
          
          if (imgs[0]) newData.hero.image = imgs[0].secure_url;
          
          for (let i = 0; i < newData.storySections.length; i++) {
            if (imgs[i + 1]) {
              newData.storySections[i].image = imgs[i + 1].secure_url;
            }
          }
          setData(newData);
        }
      } catch (error) {
        console.error("Failed to load wedding images", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    fetchImages();
    return () => { isMounted = false; };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-[#C9A84C] font-body tracking-[0.3em] uppercase text-[10px] animate-pulse">
           Crafting Perfection...
        </div>
      </div>
    );
  }

  return (
    <EventLayout
      hero={data.hero}
      intro={data.intro}
      storySections={data.storySections}
      cta={data.cta}
    />
  );
}

