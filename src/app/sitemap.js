// BRP-FIX: D-3
export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bastirampalace.com";

  // Public routes for indexing
  const routes = [
    "",
    "/catering",
    // "/events" removed as it is a redirect — BRP-FIX: D-3
    "/events/weddings",
    "/events/corporate-events",
    "/events/private-parties",
    "/gallery",
    "/menu",
    "/contact",
    "/about", // Added missing route
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}