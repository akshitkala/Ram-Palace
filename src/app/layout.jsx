import RootLayoutClient from "@/components/RootLayoutClient";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://ram-palace.vercel.app"),
  title: {
    default: "Basti Ram Palace — Best Banquet Hall in Manesar, Gurugram",
    template: "%s | Basti Ram Palace",
  },
  description:
    "Basti Ram Palace is the premier banquet hall in Manesar, Gurugram for weddings, corporate events & private celebrations. In-house catering by GD Foods India. Book now: +91-8800190003.",
  keywords: [
    "banquet hall Manesar",
    "banquet hall Gurugram",
    "wedding venue Manesar",
    "wedding venue Gurugram",
    "wedding venue Haryana",
    "best banquet hall Manesar",
    "best banquet hall Gurugram",
    "event venue Manesar",
    "corporate event venue Gurugram",
    "party hall Manesar",
    "party hall Gurugram",
    "banquet hall IMT Manesar",
    "Basti Ram Palace",
    "GD Foods India catering",
    "wedding hall near Gurugram",
    "banquet hall near Delhi",
    "reception venue Gurugram",
    "birthday party venue Manesar",
    "corporate venue Haryana",
  ],
  authors: [{ name: "Basti Ram Palace" }],
  creator: "Basti Ram Palace",
  publisher: "Basti Ram Palace",
  formatDetection: { telephone: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://ram-palace.vercel.app",
    siteName: "Basti Ram Palace",
    title: "Basti Ram Palace — Best Banquet Hall in Manesar, Gurugram",
    description:
      "Premium banquet hall in Manesar, Gurugram for weddings, corporate events & private parties. In-house catering by GD Foods India.",
    images: [
      {
        url: "/images/hero/hero.webp",
        width: 1200,
        height: 630,
        alt: "Basti Ram Palace — Banquet Hall in Manesar Gurugram",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Basti Ram Palace — Best Banquet Hall in Manesar, Gurugram",
    description:
      "Premium banquet hall in Manesar, Gurugram for weddings, corporate events & private parties.",
    images: ["/images/hero/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://ram-palace.vercel.app",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <RootLayoutClient>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </RootLayoutClient>
      </body>
    </html>
  );
}
