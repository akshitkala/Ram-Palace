export const metadata = {
  title: "A Magnificent Wedding Venue in Manesar | Basti Ram Palace",
  description: "Exquisite wedding lawn and banquet hall in Manesar. Every detail designed for a perfect celebration.",
  openGraph: {
    title: "A Magnificent Wedding Venue | Basti Ram Palace",
    description: "Exquisite wedding lawn and banquet hall in Manesar. Every detail designed for a perfect celebration.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/events/weddings`, // BRP-FIX: D-1
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero.webp`, width: 1200, height: 630 }], // BRP-FIX: D-1
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/events/weddings`, // BRP-FIX: D-1
  },
};

export default function Layout({ children }) {
  return children;
}
