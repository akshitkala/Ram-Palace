export const metadata = {
  title: "Galleries: Highlights of our Luxury Banquet Hall in Manesar | Basti Ram Palace",
  description: "Explore photos of our luxury wedding venue, corporate events, and fine dining galleries. Experience our elegant setups and premium catering services.",
  openGraph: {
    title: "Galleries: Luxury Banquet Hall highlights | Basti Ram Palace",
    description: "Experience the elegance of Basti Ram Palace through our highlights gallery. Wedding, corporate, and dining photos.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery`, // BRP-FIX: D-1
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero.webp`, width: 1200, height: 630 }], // BRP-FIX: D-1
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery`, // BRP-FIX: D-1
  },
};

export default function Layout({ children }) {
  return children;
}
