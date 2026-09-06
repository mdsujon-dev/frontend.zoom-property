/**
 * Hero photograph per inner page.
 *
 * One place to swap them, and it keeps the images out of the page files — a
 * page should read as a list of sections, not a list of asset URLs. The home
 * page is absent on purpose: it has its own full-height hero.
 *
 * Wide crops (2000px) because these render full-bleed.
 */
const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

export const pageBanners = {
  properties: photo("photo-1560448204-e02f11c3d0e2"),
  projects: photo("photo-1541888946425-d81bb19240f5"),
  areas: photo("photo-1493809842364-78817add7ffb"),
  agents: photo("photo-1600880292203-757bb62b4baf"),
  about: photo("photo-1497366754035-f200968a6e72"),
  contact: photo("photo-1497366811353-6870744d04b2"),
  landowners: photo("photo-1503387762-592deb58ef4e"),
  blog: photo("photo-1450101499163-c8848c66ca85"),
} as const;

export type BannerKey = keyof typeof pageBanners;
