export const metadata = {
  title: "Corporate Events & Conferences | Basti Ram Palace",
  description: "Gurugram's trusted venue for corporate conferences, product launches, and gala dinners. Professional setting in IMT Manesar with GD Foods India catering.",
  openGraph: {
    title: "Corporate Events & Conferences | Basti Ram Palace",
    description: "Gurugram's trusted venue for corporate conferences, product launches, and gala dinners.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/events/corporate`,
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero.webp`, width: 1200, height: 630 }],
  },
};

export default function Layout({ children }) {
  return children;
}
