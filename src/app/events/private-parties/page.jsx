import EventPageTemplate from "@/components/events/EventPageTemplate";

export const metadata = {
  title: "Private Parties — Basti Ram Palace",
  description: "Birthday parties, anniversaries, engagements, and private celebrations at Basti Ram Palace, Manesar. Intimate to large-scale, fully customised.",
  openGraph: {
    title: "Private Parties — Basti Ram Palace, Gurugram",
    description: "Celebrate your milestone in style at Basti Ram Palace, Manesar NCR.",
    url: "https://www.bastirampalace.in/events/private-parties",
  },
};

export default function PrivatePartiesPage() {
  const props = {
    eventType: "private-parties",
    hero: {
      cloudinaryTag: "private-hero",
      badge: "Private Parties & Celebrations",
      titleLine1: "Every milestone",
      titleLine2: "deserves this setting.",
      sub: "Birthdays · Anniversaries · Engagements · Family gatherings",
    },
    intro: {
      eyebrow: "The experience",
      headingLine1: "Intimate or grand",
      headingLine2: "— we make",
      headingLine3: "it memorable",
      para1: "Basti Ram Palace scales to your celebration. A 50-person birthday dinner in our private dining hall or a 500-person anniversary bash under our chandeliers — both get the same attention to detail and the same personal coordinator.",
      para2: "We don't do generic party packages. Every private event at Basti Ram Palace is discussed, planned, and executed around your specific vision — the music, the menu, the décor, all of it.",
    },
    stats: [
      { num: "150+", numRaw: 150, suffix: "+", label: "Private parties", barPct: 65 },
      { num: "50",   numRaw: 50,  suffix: "",  label: "Min. guest count", barPct: 30 },
      { num: "500",  numRaw: 500, suffix: "",  label: "Max. capacity", barPct: 80 },
      { num: "15+",  numRaw: 15,  suffix: "+", label: "Years of memories", barPct: 60 },
    ],
    features: [
      {
        icon: "M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.704 2.704 0 003 15.546M21 4h-3.5a.5.5 0 01-.5-.5v-1a.5.5 0 00-.5-.5h-11a.5.5 0 00-.5.5v1a.5.5 0 01-.5.5H3m18 0v11a2 2 0 01-2 2H5a2 2 0 01-2-2V4",
        title: "Custom themes",
        desc: "Bollywood nights, rooftop lounges, pastel birthdays — tell us the vision, we'll build it.",
      },
      {
        icon: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3",
        title: "Entertainment setup",
        desc: "DJ consoles, live band stages, photo booths, fog machines — all coordinated in-house.",
      },
      {
        icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z",
        title: "Photography corners",
        desc: "Dedicated photo-op areas with custom backdrop, ring lights, and prop arrangement.",
      },
      {
        icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        title: "Personalized menus",
        desc: "Birthday cakes, custom platters, mocktail bars — we build the menu around your guests.",
      },
      {
        icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
        title: "Flexible timings",
        desc: "Day parties, evening events, late-night celebrations — we accommodate your schedule.",
      },
      {
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        title: "CCTV-monitored",
        desc: "Full premises covered. Valet parking available. Your guests arrive and leave safely.",
      },
    ],
    intro2: {
      eyebrow: "Food & celebration",
      heading: "The food should be as memorable as the occasion",
      para: "Birthday cakes crafted in-house, live counter stations, signature mocktail bars — our team treats every private party menu like a personal project. No set menus, no fixed packages.",
    },
    galleryTag: "private-parties",
    cta: {
      headingLine: "Every celebration deserves to be unforgettable.",
      sub: "Enquire for availability — we'll get back within 2 hours.",
    },
  };

  return <EventPageTemplate {...props} />;
}
