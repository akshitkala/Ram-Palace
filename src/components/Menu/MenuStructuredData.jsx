import { menuCategories } from "@/Data/menu";

export default function MenuStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "Gourmet Menu — Basti Ram Palace",
    "description": "Exquisite catering menu featuring Authentic Indian, Continental, and Oriental cuisines curated by GD Foods India.",
    "publisher": {
      "@type": "Organization",
      "name": "Basti Ram Palace",
      "url": "https://www.bastirampalace.in"
    },
    "hasMenuSection": menuCategories.map((category) => ({
      "@type": "MenuSection",
      "name": category.label,
      "hasMenuItem": category.subcategories.flatMap((sub) => 
        sub.items.map((item) => ({
          "@type": "MenuItem",
          "name": item,
          "description": `${item} served as part of our ${sub.title} selection in ${category.label}.`
        }))
      )
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
