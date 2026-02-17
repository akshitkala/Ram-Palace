import React from "react";
import EventLayout from "../../components/EventLayout";
import { eventDetails } from "../../Data/events";

const Weddings = () => {
  const data = eventDetails.weddings;

  return (
    <EventLayout
      hero={data.hero}
      intro={data.intro}
      storySections={data.storySections}
      cta={data.cta}
    />
  );
};

export default Weddings;
