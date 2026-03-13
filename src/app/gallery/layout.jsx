export const metadata = {
  title: "Venue Gallery | Basti Ram Palace Manesar Gurugram",
  description:
    "See real photos of weddings, corporate events and private celebrations at Basti Ram Palace — the best banquet hall in Manesar, Gurugram, Haryana.",
  keywords: [
    "banquet hall photos Manesar",
    "wedding venue photos Gurugram",
    "Basti Ram Palace gallery",
    "event venue images Haryana",
  ],
  openGraph: {
    title: "Venue Gallery | Basti Ram Palace Manesar Gurugram",
    description:
      "Real photos of weddings & events at Basti Ram Palace, Manesar Gurugram.",
    images: [{ url: "/images/hero/hero.webp", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://ram-palace.vercel.app/gallery" },
};

export default function Layout({ children }) {
  return children;
}
