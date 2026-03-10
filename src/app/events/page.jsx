"use client";

import { useEffect, useState } from "react";
import EventLayout from "@/components/EventLayout";
import { eventDetails } from "@/Data/events";

export default function WeddingsPage() {
  const [data, setData] = useState(eventDetails.weddings);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/images/events/weddings");
        const json = await res.json();

        if (json.images && json.images.length > 0) {
          const imgs = json.images;
          const newData = JSON.parse(JSON.stringify(eventDetails.weddings));

          if (imgs[0]) newData.hero.image = imgs[0].secure_url;
          for (let i = 0; i < newData.storySections.length; i++) {
            if (imgs[i + 1]) newData.storySections[i].image = imgs[i + 1].secure_url;
          }
          setData(newData);
        }
      } catch (err) {
        console.error("Failed to load wedding images", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <EventLayout
      hero={data.hero}
      intro={data.intro}
      storySections={data.storySections}
      cta={data.cta}
    />
  );
}