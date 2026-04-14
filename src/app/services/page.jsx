import React from "react";
import ServicesHero from "@/components/Services/ServicesHero";
import VenueStats from "@/components/Services/VenueStats";
import EventTypesGrid from "@/components/Services/EventTypesGrid";
import WhatsIncluded from "@/components/Services/WhatsIncluded";
import HowToBook from "@/components/Services/HowToBook";
import ServicesCTA from "@/components/Services/ServicesCTA";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Services — Weddings, Corporate & Private Events",
  description:
    "Discover the wide range of services offered at Basti Ram Palace. From grand wedding planning to corporate seminars and private parties, we provide complete event solutions in Manesar.",
  keywords: [
    "event management Manesar",
    "wedding planning service",
    "corporate event services Gurugram",
    "banquet hall facilities",
    "Basti Ram Palace services",
  ],
};

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
