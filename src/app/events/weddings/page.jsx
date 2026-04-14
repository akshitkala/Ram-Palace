import EventPageTemplate from "@/components/events/EventPageTemplate";

export const metadata = {
  title: "Weddings & Receptions — Basti Ram Palace",
  description: "Host your wedding at Basti Ram Palace, Manesar. Grand banquet halls, open lawns, and in-house catering for 50 to 1,000 guests.",
  openGraph: {
    title: "Weddings — Basti Ram Palace, Gurugram",
    description: "Grand weddings and intimate receptions in Manesar, NCR.",
    url: "https://www.bastirampalace.in/events/weddings",
  },
};

export default function WeddingsPage() {
  const props = {
    eventType: "weddings",
    hero: {
      cloudinaryTag: "weddings-hero",
      badge: "Weddings & Receptions",
      titleLine1: "Your wedding deserves",
      titleLine2: "a hall this grand.",
      sub: "Manesar, Gurugram · Est. 2008 · 500+ weddings hosted",
    },
    intro: {
      eyebrow: "The setting",
      headingLine1: "A hall built",
      headingLine2: "for the grandest",
      headingLine3: "celebrations",
      para1: "The banquet hall at Basti Ram Palace spans over 15,000 square feet of pillar-free space — giving you the freedom to design your wedding exactly as you've imagined it. Whether you picture an intimate gathering of 200 or a grand celebration for 1,000 guests, the hall adapts to your vision without compromise.",
      para2: "Our in-house décor team works from scratch — no off-the-shelf packages. Every arrangement, every lighting choice, every floral detail is built around you.",
    },
    stats: [
      { num: "500+", numRaw: 500, suffix: "+", label: "Weddings hosted", barPct: 85 },
      { num: "15k",  numRaw: 15,  suffix: "k", label: "Sq ft of hall space", barPct: 70 },
      { num: "1000", numRaw: 1000, suffix: "", label: "Guest capacity", barPct: 95 },
      { num: "15+",  numRaw: 15,  suffix: "+", label: "Years of celebrations", barPct: 60 },
    ],
    features: [
      {
        icon: "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
        title: "Grand pillar-free hall",
        desc: "15,000 sq ft of unobstructed space — set up exactly as your vision demands.",
      },
      {
        icon: "M5 3v4M3 5h4M6 17v4M4 19h4M13 3l4 4M17 3h-4v4M13 21l4-4M17 21h-4v-4",
        title: "Outdoor mandap lawns",
        desc: "3 acres of manicured lawns — perfect for pheras, baraat arrivals, and sangeet evenings.",
      },
      {
        icon: "M18 8h1a4 4 0 010 8h-1 M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z M6 1v3M10 1v3M14 1v3",
        title: "In-house catering",
        desc: "Traditional Indian thalis, live chaat stations, multi-cuisine menus — all managed in-house.",
      },
      {
        icon: "M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18",
        title: "Décor coordination",
        desc: "Floral mandaps, draping, entrance décor, and stage setup — custom from the ground up.",
      },
      {
        icon: "M15 10l4.553-2.069A1 1 0 0121 8.82V18a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h8",
        title: "AV & sound",
        desc: "Professional DJ setup, GOBO projections, stage lighting, and crisp PA systems included.",
      },
      {
        icon: "M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z",
        title: "Dedicated coordinator",
        desc: "One person owns your event from first call to final goodbye — no handoffs, no confusion.",
      },
    ],
    intro2: {
      eyebrow: "Food & hospitality",
      heading: "Every plate tells the story of your celebration",
      para: "From traditional thalis and live chaat stations to continental spreads and custom dessert bars — our culinary team builds menus around your guest list. Tastings are arranged for all confirmed bookings.",
    },
    galleryTag: "weddings",
    cta: {
      headingLine: "Your perfect wedding begins with one conversation.",
      sub: "Our team is available 7 days a week — no obligation, just clarity.",
    },
  };

  return <EventPageTemplate {...props} />;
}
