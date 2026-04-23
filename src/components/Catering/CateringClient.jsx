"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer";
import {
  cateringHero,
  culinaryPhilosophy,
  eventsWeCater,
  serviceExcellence,
  cateringGallery,
  trustedClients,
} from "@/Data/catering";

// Sub-components
import CateringHero from "@/components/Catering/CateringHero";
import CateringStats from "@/components/Catering/CateringStats";
import CulinaryPhilosophy from "@/components/Catering/CulinaryPhilosophy";
import EventsWeCater from "@/components/Catering/EventsWeCater";
import ServiceExcellence from "@/components/Catering/ServiceExcellence";
import CateringGallery from "@/components/Catering/CateringGallery";
import TrustedClients from "@/components/Catering/TrustedClients";
import CateringCTA from "@/components/Catering/CateringCTA";
import BrochureSection from "@/components/BrochureSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CateringClient() {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      const reveals = gsap.utils.toArray(".reveal");
      if (reveals.length > 0) {
        reveals.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 55 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }

      if (document.querySelector(".hero-bg") && document.querySelector(".hero-section")) {
        gsap.to(".hero-bg", {
          yPercent: 22,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      if (document.querySelectorAll(".spectrum-card").length > 0 && document.querySelector(".spectrum-grid")) {
        gsap.fromTo(
          ".spectrum-card",
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: ".spectrum-grid", start: "top 82%" },
          }
        );
      }

      if (document.querySelectorAll(".event-tag").length > 0 && document.querySelector(".events-wrap")) {
        gsap.fromTo(
          ".event-tag",
          { opacity: 0, scale: 0.88 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: "back.out(1.4)",
            scrollTrigger: { trigger: ".events-wrap", start: "top 82%" },
          }
        );
      }

      if (document.querySelectorAll(".service-item").length > 0 && document.querySelector(".service-grid")) {
        gsap.fromTo(
          ".service-item",
          { opacity: 0, x: -28 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.09,
            ease: "power2.out",
            scrollTrigger: { trigger: ".service-grid", start: "top 80%" },
          }
        );
      }

      const galleryItems = gsap.utils.toArray(".gallery-item");
      if (galleryItems.length > 0) {
        ScrollTrigger.batch(".gallery-item", {
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.09,
              ease: "power3.out",
              overwrite: true,
            }),
          start: "top 92%",
          once: true,
        });
      }
    },
    { scope: pageRef, dependencies: [] }
  );

  return (
    <div ref={pageRef} className="bg-[#FAF7F2] overflow-x-hidden">
      <CateringHero data={cateringHero} />
      <CateringStats />
      <CulinaryPhilosophy data={culinaryPhilosophy} />
      <EventsWeCater data={eventsWeCater} />
      <ServiceExcellence data={serviceExcellence} />
      <CateringGallery />
      <TrustedClients data={trustedClients} />
      <BrochureSection />
      <CateringCTA />
      <Footer />
    </div>
  );
}
