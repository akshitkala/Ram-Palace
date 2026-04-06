export const metadata = {
  title: "Private Party Venue Manesar Gurugram | Basti Ram Palace",
  description:
    "Book Basti Ram Palace for birthdays, anniversaries, engagements & private celebrations in Manesar, Gurugram. Flexible capacity, themed décor, live food stations. Call +91-8800190003.",
  keywords: [
    "private party venue Manesar",
    "birthday party hall Gurugram",
    "anniversary venue Gurugram",
    "engagement venue Manesar",
    "private celebration hall Haryana",
    "kitty party venue Gurugram",
    "party hall near Delhi",
  ],
  openGraph: {
    title: "Private Party Venue Manesar Gurugram | Basti Ram Palace",
    description:
      "Birthdays, anniversaries & private celebrations at Basti Ram Palace, Manesar Gurugram.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/events/private-parties`, // BRP-FIX: D-1
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero.webp`, width: 1200, height: 630 }], // BRP-FIX: D-1
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/events/private-parties`, // BRP-FIX: D-1
  },
};

export default function Layout({ children }) {
  return children;
}
