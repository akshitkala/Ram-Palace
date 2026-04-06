export const metadata = {
  title: "Book your Event | Contact Basti Ram Palace, Manesar",
  description: "Ready to host your dream wedding or corporate gala? Contact Basti Ram Palace for booking and reservations. We're here to help you plan your next celebration.",
  openGraph: {
    title: "Contact Us for Event Bookings | Basti Ram Palace",
    description: "Get in touch for booking and reservations. We're here to help you plan your perfect event.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`, // BRP-FIX: D-1
    images: [{ url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/hero/hero.webp`, width: 1200, height: 630 }], // BRP-FIX: D-1
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`, // BRP-FIX: D-1
  },
};

export default function Layout({ children }) {
  return children;
}
