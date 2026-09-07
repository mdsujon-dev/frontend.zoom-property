import type { Locale } from "@/i18n/config";

export interface BlogCategoryConfig {
  slug: string;
  category: string;
  section: string;
  titleKey: "architecture" | "lifestyle" | "advisory" | "economy" | "realEstate" | "technology";
  relatedSlug: string;
}

export const BLOG_CATEGORIES: BlogCategoryConfig[] = [
  {
    slug: "architecture",
    category: "Architecture",
    section: "architecture",
    titleKey: "architecture",
    relatedSlug: "lifestyle",
  },
  {
    slug: "lifestyle",
    category: "Lifestyle",
    section: "lifestyle",
    titleKey: "lifestyle",
    relatedSlug: "architecture",
  },
  {
    slug: "advisory",
    category: "Legal",
    section: "advisory",
    titleKey: "advisory",
    relatedSlug: "real-estate",
  },
  {
    slug: "economy",
    category: "Economy",
    section: "economy",
    titleKey: "economy",
    relatedSlug: "technology",
  },
  {
    slug: "real-estate",
    category: "Real Estate",
    section: "real-estate",
    titleKey: "realEstate",
    relatedSlug: "architecture",
  },
  {
    slug: "technology",
    category: "Technology",
    section: "technology",
    titleKey: "technology",
    relatedSlug: "lifestyle",
  },
];

export function getCategoryConfig(slug: string): BlogCategoryConfig | undefined {
  const normalized = slug.toLowerCase().trim();
  return (
    BLOG_CATEGORIES.find((c) => c.slug === normalized) ||
    BLOG_CATEGORIES.find((c) => c.category.toLowerCase() === normalized)
  );
}
