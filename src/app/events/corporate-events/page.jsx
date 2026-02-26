"use client";

import EventLayout from "@/components/EventLayout";
import { eventDetails } from "@/Data/events";

export default function CorporateEventsPage() {
  const data = eventDetails.corporateEvents;

  return (
    <EventLayout
      hero={data.hero}
      intro={data.intro}
      storySections={data.storySections}
      cta={data.cta}
    />
  );
}
