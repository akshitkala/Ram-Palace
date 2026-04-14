import localFont from "next/font/local";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import RootLayoutClient from "@/components/RootLayoutClient";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import StructuredData from "@/components/StructuredData"; // BRP-FIX: D-2
import "./globals.css";

// ── LOCAL FONT — PLAYFAIR DISPLAY ──
const playfair = localFont({
  src: [
    {
      path: "./fonts/playfair/PlayfairDisplay-VariableFont_wght.ttf",
      style: "normal",
    },
    {
      path: "./fonts/playfair/PlayfairDisplay-Italic-VariableFont_wght.ttf",
      style: "italic",
    },
  ],
  variable: "--font-playfair",
  display: "swap",
});

// ── GOOGLE FONT — POPPINS ──
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// ── GOOGLE FONT — CORMORANT GARAMOND (event headings) ──
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.bastirampalace.in"), // BRP-FIX: D-1
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
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.bastirampalace.in", // BRP-FIX: D-1
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
  /* originals deleted — BRP-FIX: D-1 */
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable} ${cormorant.variable}`}>
      <head><link rel="icon" type="image/png" href="/logo.png" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><StructuredData /></head>
      <body className={poppins.className}>
        <RootLayoutClient>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </RootLayoutClient>
      </body>
    </html>
  );
}
