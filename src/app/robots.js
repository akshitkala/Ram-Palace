// BRP-FIX: D-3
export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bastirampalace.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/brp-portal-login", "/api"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}