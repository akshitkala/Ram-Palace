export const metadata = {
  title: "Our Services | Basti Ram Palace — Banquet Hall Manesar Gurugram",
  description:
    "Complete banquet hall services in Manesar, Gurugram — grand venue, in-house catering by GD Foods India, weddings, corporate events, birthdays, and more. All under one roof.",
  keywords: [
    "banquet hall services Manesar",
    "banquet hall Gurugram services",
    "wedding venue services Manesar",
    "banquet hall with catering Gurugram",
    "event services IMT Manesar",
    "all inclusive wedding venue Gurugram",
    "AC banquet hall Sector 87",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
  },
  openGraph: {
    title: "Our Services | Basti Ram Palace",
    description:
      "Grand venue + in-house catering by GD Foods India. Weddings, corporate events, birthdays and more — all under one roof in Manesar, Gurugram.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/services`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero.webp`,
        width: 1200,
        height: 630,
        alt: "Basti Ram Palace Services",
      },
    ],
  },
};

export default function ServicesLayout({ children }) {
  return <>{children}</>;
}
