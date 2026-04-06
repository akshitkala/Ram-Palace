import React from "react";
import ServicesHero from "@/components/Services/ServicesHero";
import VenueStats from "@/components/Services/VenueStats";
import EventTypesGrid from "@/components/Services/EventTypesGrid";
import WhatsIncluded from "@/components/Services/WhatsIncluded";
import HowToBook from "@/components/Services/HowToBook";
import ServicesCTA from "@/components/Services/ServicesCTA";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <main className="bg-[#0a0a0a]">
      <ServicesHero />
      <VenueStats />
      <EventTypesGrid />
      <WhatsIncluded />
      <HowToBook />
      <ServicesCTA />
      <Footer />
    </main>
  );
}
