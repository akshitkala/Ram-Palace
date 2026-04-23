export const metadata = {
  title: "Private Parties & Milestone Celebrations | Basti Ram Palace",
  description: "Host unforgettable birthdays, anniversaries, and family gatherings at Basti Ram Palace. Intimate and grand party spaces in Manesar, Gurugram.",
  openGraph: {
    title: "Private Parties & Milestone Celebrations | Basti Ram Palace",
    description: "Host unforgettable birthdays, anniversaries, and family gatherings at Basti Ram Palace.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/events/private-parties`,
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero.webp`, width: 1200, height: 630 }],
  },
};

export default function Layout({ children }) {
  return children;
}
