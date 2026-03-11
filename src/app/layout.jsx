import RootLayoutClient from "@/components/RootLayoutClient";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";
import "./globals.css";

export const metadata = {
  title: "Basti Ram Palace — Premier Wedding & Events Venue in Basti, UP",
  description: "Basti Ram Palace is Basti's finest banquet and events venue. Grand halls, luxury décor, and world-class catering by GD Foods India for weddings, corporate events, and private celebrations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/branding/logo.png" />
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
