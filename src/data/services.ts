import type { IconName } from "@/components/common/icon";

/**
 * The in-house units that sit behind a sale.
 *
 * Artwork and icons live here; the names and descriptions are translated, so
 * they live in `dict.content.services` in the same order. Same split as
 * `features` / `featureIcons`.
 */
export interface ServiceCard {
  id: string;
  icon: IconName;
  image: string;
}

const photo = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const services: ServiceCard[] = [
  {
    id: "legal",
    icon: "approved",
    image: photo("photo-1450101499163-c8848c66ca85"),
  },
  {
    id: "construction",
    icon: "construction",
    image: photo("photo-1541888946425-d81bb19240f5"),
  },
  {
    id: "management",
    icon: "shield",
    image: photo("photo-1560518883-ce09059eeffa"),
  },
  {
    id: "interiors",
    icon: "furnishing",
    image: photo("photo-1616486338812-3dadae4b4ace"),
  },
];

/** Background for the services band — a wide, dark, low-detail plate so the
 *  cards and their text stay legible on top of it. */
export const servicesBackdrop =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=2400&q=80";

/** Full-bleed showcase: the still behind the play button. */
export const showcase = {
  poster:
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=80",
  video: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
};
