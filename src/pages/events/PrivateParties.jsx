import React from "react";
import EventLayout from "../../components/EventLayout";
import { eventDetails } from "../../Data/events";

const PrivateParties = () => {
  const data = eventDetails.privateParties;

  return (
    <EventLayout
      hero={data.hero}
      intro={data.intro}
      storySections={data.storySections}
      cta={data.cta}
    />
  );
};

export default PrivateParties;
