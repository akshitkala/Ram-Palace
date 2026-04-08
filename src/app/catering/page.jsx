"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
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

gsap.registerPlugin(ScrollTrigger);

export default function CateringPage() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal").forEach((el) => {
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

      gsap.utils.toArray(".stat-num").forEach((el) => {
        const target = parseInt(el.dataset.target, 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate() {
            el.textContent = Math.round(obj.val) + "+";
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-[#FAF7F2] overflow-x-hidden">
      <CateringHero data={cateringHero} />
      <CateringStats />
      <CulinaryPhilosophy data={culinaryPhilosophy} />
      <EventsWeCater data={eventsWeCater} />
      <ServiceExcellence data={serviceExcellence} />
      <CateringGallery />
      <TrustedClients data={trustedClients} />
      <CateringCTA />
      <Footer />
    </div>
  );
}