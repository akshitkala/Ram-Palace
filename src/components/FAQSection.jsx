"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IconChevronDown } from "@tabler/icons-react";

const faqData = [
  {
    question: "Do you provide catering services?",
    answer: "Yes, Basti Ram Palace offers exclusive in-house catering through our culinary partner GD Foods India. Every menu is planned with care, prepared fresh on-site, and executed with strict hygiene standards. From intimate gatherings to large-scale celebrations, we deliver a complete and memorable dining experience."
  },
  {
    question: "Will you help us with decoration arrangements?",
    answer: "Yes, we offer décor coordination as part of our event services. Whether you have a theme in mind or need guidance, our team will help bring your vision to life. Basic décor is included with every booking, and custom themes can be arranged on request."
  },
  {
    question: "How to reach Basti Ram Palace?",
    answer: "We are located at 16G, Kankrola, IMT Manesar, Gurugram, Haryana 122505. You can reach us by calling +91-88001 90003, +91-96502 11469, or +91-98106 79550. You can also write to us at info@bastirampalace.in or send us a message on WhatsApp."
  },
  {
    question: "What all cuisines & catering options do you have?",
    answer: "Our catering partner GD Foods India offers an extensive multi-cuisine menu including Indian Vegetarian Mains, Live Stations (The Savoury House, Stone-fired Pizzeria, Chinese Tadka, South Indian, Italian Live), Soups & Salads, Dim Sum, Chandni Chowk Specials, Agra ke Paranthe, a wide Desserts counter, Shakes & Mocktails, Hot Drinks, and a Coffee Parlour. Custom menus can be curated based on your guest list and preferences."
  },
  {
    question: "What arrangements can you help us with?",
    answer: "Basti Ram Palace is a complete event destination. We assist with venue setup, décor coordination, in-house catering, AV and sound, power backup, valet parking, and a dedicated event coordinator — all under one roof. For corporate events we also provide Wi-Fi, breakout spaces, and stage arrangements."
  },
  {
    question: "What kind of events do you host?",
    answer: "We host a wide range of events including Weddings, Receptions, Pre-Wedding Functions, Engagements, Ring Ceremonies, Corporate Events, Conferences, Leadership Off-sites, Birthdays, Anniversaries, Kitty Parties, Private Parties, Sundowner Parties, Cocktail Parties, Festive Events, Theme-based Events, and Social Gatherings."
  },
  {
    question: "What are the top amenities available at Basti Ram Palace?",
    answer: "Basti Ram Palace offers a fully air-conditioned banquet hall, ample parking, power backup, professional service staff, basic décor, in-house catering by GD Foods India, AV and sound systems, dedicated Wi-Fi for corporate events, outdoor lawn spaces, and a single-point event coordinator to manage every detail of your celebration."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  const answerRef = useRef(null);

  useGSAP(
    () => {
      if (!answerRef.current) return;
      if (isOpen) {
        gsap.to(answerRef.current, {
          height: "auto",
          duration: 0.5,
          ease: "power3.out",
          opacity: 1,
        });
      } else {
        gsap.to(answerRef.current, {
          height: 0,
          duration: 0.4,
          ease: "power3.inOut",
          opacity: 0,
        });
      }
    },
    { dependencies: [isOpen], scope: answerRef }
  );

  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl border border-[#E8E0D0] bg-white transition-all duration-500 hover:border-gold/60 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(201,168,76,0.1)] ${isOpen ? 'border-gold/40 shadow-[0_10px_30px_rgba(201,168,76,0.05)]' : 'shadow-sm'}`}
    >
      <button
        onClick={onClick}
        className="relative z-10 flex w-full items-center justify-between p-7 md:p-8 text-left outline-none"
      >
        <span className={`font-body text-base md:text-lg font-medium tracking-wide transition-colors duration-300 pr-8 ${isOpen ? 'text-gold' : 'text-[#1C1C1E] group-hover:text-gold'}`}>
          {question}
        </span>
        <div className={`flex-shrink-0 transition-all duration-500 transform ${isOpen ? 'rotate-180 scale-110' : ''}`}>
          <div className={`p-2 rounded-full border transition-all duration-500 ${isOpen ? 'border-gold/50 bg-gold/5' : 'border-[#E8E0D0] group-hover:border-gold/30'}`}>
            <IconChevronDown className={`h-5 w-5 transition-colors duration-500 ${isOpen ? 'text-gold' : 'text-[#A99686] group-hover:text-gold/70'}`} />
          </div>
        </div>
      </button>
      
      <div
        ref={answerRef}
        className="relative z-10 h-0 overflow-hidden px-7 md:px-8 opacity-0"
      >
        <div className="pb-8 pt-0 font-body text-sm md:text-base text-[#4A3728]/80 leading-relaxed max-w-4xl border-t border-[#F2EDE4] pt-6">
          {answer}
        </div>
      </div>
    </div>
  );
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="relative bg-[#FAF7F2] py-24 md:py-32 px-6 overflow-hidden">
      {/* Subtle ambient light patterns */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/[0.05] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gold/[0.03] blur-[130px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20 md:mb-24">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-gold/20 bg-gold/5">
             <span className="font-body text-[10px] md:text-11px tracking-[0.2em] uppercase text-gold font-semibold">
               Expert Guidance
             </span>
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-[#1C1C1E] mb-6 tracking-tight">
            Frequently Asked <span className="text-gold">Questions</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-gold/40" />
            <p className="font-body text-[#A99686] text-xs md:text-sm tracking-[0.15em] uppercase opacity-90">
              Everything you need to know about Basti Ram Palace
            </p>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-gold/40" />
          </div>
        </div>

        <div className="grid gap-5">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-20 text-center">
            <p className="font-body text-[#6B5E4E]/60 text-sm mb-6 italic">
                Still have questions? We're here to help you plan your perfect event.
            </p>
            <a 
                href="tel:+918800190003" 
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gold/30 text-gold font-body text-xs md:text-sm tracking-widest uppercase hover:bg-gold hover:text-white transition-all duration-500 group"
            >
                Contact Concierge
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
