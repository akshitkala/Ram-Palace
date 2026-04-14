// BRP-FIX: D-3
export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.bastirampalace.com";

  // Public routes for indexing with specific priorities
  const routes = [
    { path: "", priority: 1.0 },
    { path: "/catering", priority: 0.8 },
    { path: "/events/weddings", priority: 0.9 },
    { path: "/events/corporate", priority: 0.8 },
    { path: "/events/private-parties", priority: 0.8 },
    { path: "/gallery", priority: 0.8 },
    { path: "/menu", priority: 0.7 },
    { path: "/contact", priority: 0.8 },

  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route.priority,
  }));
}