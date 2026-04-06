export const metadata = {
  title: "Professional Corporate Events Venue in Gurugram | Basti Ram Palace",
  description: "Modern banquet halls, professional service staff, and high-end catering for corporate conferences, seminars, and gala dinners in Manesar, Gurugram.",
  openGraph: {
    title: "Corporate Events Venue in Gurugram | Basti Ram Palace",
    description: "Modern banquet halls and professional service for corporate conferences in Manesar.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/events/corporate-events`, // BRP-FIX: D-1
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero.webp`, width: 1200, height: 630 }], // BRP-FIX: D-1
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/events/corporate-events`, // BRP-FIX: D-1
  },
};

export default function Layout({ children }) {
  return children;
}
