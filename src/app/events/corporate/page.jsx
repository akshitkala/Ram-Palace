import EventPageTemplate from "@/components/events/EventPageTemplate";

export const metadata = {
  title: "Corporate Events — Basti Ram Palace",
  description: "Corporate conferences, product launches, and team events at Basti Ram Palace, Manesar. Professional setup, AV systems, and in-house catering.",
  openGraph: {
    title: "Corporate Events — Basti Ram Palace, Gurugram",
    description: "From boardroom to ballroom — corporate events done right in Manesar, NCR.",
    url: "https://www.bastirampalace.in/events/corporate",
  },
};

export default function CorporatePage() {
  const props = {
    eventType: "corporate",
    hero: {
      cloudinaryTag: "corporate-hero",
      badge: "Corporate Events",
      titleLine1: "Where business meets",
      titleLine2: "exceptional hospitality.",
      sub: "Conferences · Launches · Awards · Off-sites",
    },
    intro: {
      eyebrow: "The venue",
      headingLine1: "A professional",
      headingLine2: "setting without",
      headingLine3: "compromise",
      para1: "Basti Ram Palace offers 15,000 sq ft of configurable banquet space — theatre-style, classroom, U-shape, or banquet rounds. High-speed Wi-Fi, integrated AV, and dedicated breakout areas make it a complete corporate event venue.",
      para2: "We've hosted annual days, product launches, dealer conferences, and leadership off-sites for companies across NCR. Every event gets a dedicated coordinator and a catering team briefed on your requirements.",
    },
    stats: [
      { num: "200+", numRaw: 200, suffix: "+", label: "Corporate events", barPct: 72 },
      { num: "15k",  numRaw: 15,  suffix: "k", label: "Sq ft configurable", barPct: 70 },
      { num: "800",  numRaw: 800, suffix: "",  label: "Theatre capacity", barPct: 88 },
      { num: "4",    numRaw: 4,   suffix: "",  label: "Breakout rooms", barPct: 45 },
    ],
    features: [
      {
        icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        title: "AV & LED wall",
        desc: "20-ft LED backdrop, 4K projectors, confidence monitors, and wireless microphones.",
      },
      {
        icon: "M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
        title: "High-speed Wi-Fi",
        desc: "Dedicated fibre connection for event use — not shared with the venue network.",
      },
      {
        icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
        title: "Flexible layouts",
        desc: "Theatre, classroom, U-shape, banquet rounds — we set up and reset between sessions.",
      },
      {
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0",
        title: "Breakout spaces",
        desc: "Four air-conditioned breakout rooms for parallel sessions, interviews, and green rooms.",
      },
      {
        icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7",
        title: "Corporate catering",
        desc: "Working lunches, gala dinners, high-tea setups — menus curated for corporate guests.",
      },
      {
        icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
        title: "Valet & parking",
        desc: "300+ vehicle covered parking. Valet service for award nights and leadership events.",
      },
    ],
    intro2: {
      eyebrow: "Corporate dining",
      heading: "Catering that impresses your stakeholders",
      para: "From working lunches to gala dinners, our culinary team builds menus around your event format and guest profile. Continental, Indian, fusion — we cater to dietary requirements without making a fuss about it.",
    },
    galleryTag: "corporate",
    cta: {
      headingLine: "Let's plan an event your team will talk about.",
      sub: "Site visits welcome. Packages starting at ₹75,000.",
    },
  };

  return <EventPageTemplate {...props} />;
}
