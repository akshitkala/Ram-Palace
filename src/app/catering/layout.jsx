export const metadata = {
  title: "Catering Services Manesar Gurugram | GD Foods India × Basti Ram Palace",
  description:
    "World-class catering by GD Foods India at Basti Ram Palace, Manesar. 200+ dishes, live counters, Indian mains, mocktail bar. Perfect for weddings & corporate events. Call +91-8800190003.",
  keywords: [
    "catering services Manesar",
    "wedding catering Gurugram",
    "event catering Haryana",
    "GD Foods India",
    "live food counter Gurugram",
    "catering banquet hall Manesar",
    "best catering Gurugram",
  ],
  openGraph: {
    title: "Catering Services Manesar Gurugram | GD Foods India",
    description:
      "200+ dishes, live counters & world-class catering by GD Foods India at Basti Ram Palace.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/catering`, // BRP-FIX: D-1
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/Catering.webp`,
        width: 1200,
        height: 630,
        alt: 'Catering by GD Foods India at Basti Ram Palace',
      },
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/catering`, // BRP-FIX: D-1
  },
};

export default function Layout({ children }) {
  return children;
}
