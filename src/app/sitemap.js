export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bastirampalace.com";

  // Public routes for indexing
  const routes = [
    "",
    "/catering",
    "/events",
    "/events/weddings",
    "/events/corporate-events",
    "/events/private-parties",
    "/gallery",
    "/menu",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}