import "server-only";

import { areas as staticAreas, type Area } from "@/data/areas";
import { projects as staticProjects, type Project } from "@/data/projects";
import { properties as staticProperties, type Property } from "@/data/properties";
import { apiList } from "@/lib/api";

/**
 * The catalogue, from the panel.
 *
 * Every function here returns the same shape the components already consume
 * (`Area`, `Project`, `Property` from `src/data`), so connecting the site to
 * the API is a change of source, not a rewrite of the pages. The mapping lives
 * here rather than in the components for the same reason: a card should not
 * know whether its photograph arrived as an object key or a URL.
 *
 * When the API cannot be reached the built-in demo data is returned instead.
 * That is deliberate. The alternative — an empty home page — is worse than a
 * stale one, and it keeps the site working before the API is deployed.
 */

/* ── Shared bits of an API record ──────────────────────────────────────── */

interface ApiMedia {
  _id?: string;
  key?: string;
  url?: string;
}

/** Media documents carry an absolute `url`; `key` is only its path in the bucket. */
const mediaUrl = (m?: ApiMedia | null) => m?.url ?? "";

const mediaUrls = (list?: ApiMedia[] | null) =>
  (list ?? []).map(mediaUrl).filter(Boolean);

/** A gallery that always opens on the cover, with no blanks and no repeats. */
const gallery = (cover?: ApiMedia | null, rest?: ApiMedia[] | null) => {
  const all = [mediaUrl(cover), ...mediaUrls(rest)].filter(Boolean);
  return Array.from(new Set(all));
};

const paragraphs = (value?: string[] | string | null): string[] => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value];
  return [];
};

/* ── Areas ─────────────────────────────────────────────────────────────── */

interface ApiArea {
  _id: string;
  slug?: string;
  name: string;
  nameBn?: string;
  city?: string;
  tagline?: string;
  taglineBn?: string;
  medianPrice?: number;
  pricePerSqft?: number;
  rentalYield?: string;
  image?: ApiMedia;
  note?: string;
  securityTier?: string;
  metroConnectivity?: string;
  /** Live listing count, counted by the API over the whole page in one query. */
  listings?: number;
}

const toArea = (a: ApiArea): Area => ({
  id: a.slug || a._id,
  name: a.name,
  nameBn: a.nameBn || a.name,
  city: a.city || "Dhaka",
  tagline: a.tagline || "",
  taglineBn: a.taglineBn || a.tagline || "",
  listings: a.listings ?? 0,
  medianPrice: a.medianPrice ?? 0,
  pricePerSqft: a.pricePerSqft ?? 0,
  rentalYield: a.rentalYield || "—",
  image: mediaUrl(a.image),
  note: a.note || "",
  securityTier: a.securityTier || "",
  metroConnectivity: a.metroConnectivity,
});

/**
 * Areas for the home page: the ones the desk ticked `isHome` on.
 *
 * `limit` is a ceiling, not a target — if nobody has ticked any, the caller
 * gets the built-in list rather than an empty grid.
 */
export async function getHomeAreas(limit = 10): Promise<Area[]> {
  const res = await apiList<ApiArea>("areas/public", {
    isHome: true,
    limit,
    sort: "order",
  });
  if (!res?.rows.length) return staticAreas.slice(0, limit);
  return res.rows.map(toArea);
}

/** Every service area, for `/areas`. */
export async function getAreas(limit = 60): Promise<Area[]> {
  const res = await apiList<ApiArea>("areas/public", { limit, sort: "order" });
  if (!res?.rows.length) return staticAreas;
  return res.rows.map(toArea);
}

/* ── Projects ──────────────────────────────────────────────────────────── */

interface ApiProject {
  _id: string;
  slug: string;
  name: string;
  nameBn?: string;
  area?: { name?: string } | null;
  city?: string;
  progress?: number;
  stage?: string;
  handover?: string;
  units?: number;
  unitsLeft?: number;
  sizeRange?: string;
  startingPrice?: number;
  coverImage?: ApiMedia;
  images?: ApiMedia[];
  description?: string[];
  video?: {
    title?: string;
    titleBn?: string;
    youtubeUrl?: string;
    poster?: ApiMedia;
    duration?: string;
  } | null;
  lastInspected?: string;
  cctvStreamActive?: boolean;
  rajukPermitNo?: string;
  milestones?: { label: string; percent: number; completed: boolean }[];
}

const toProject = (p: ApiProject): Project => ({
  id: p._id,
  slug: p.slug,
  name: p.name,
  area: p.area?.name || "",
  city: p.city || "Dhaka",
  progress: p.progress ?? 0,
  handover: p.handover || "",
  units: p.units ?? 0,
  unitsLeft: p.unitsLeft ?? 0,
  sizeRange: p.sizeRange || "",
  startingPrice: p.startingPrice ?? 0,
  image: mediaUrl(p.coverImage),
  images: gallery(p.coverImage, p.images),
  description: paragraphs(p.description),
  video: {
    title: p.video?.title || "",
    titleBn: p.video?.titleBn || "",
    youtubeUrl: p.video?.youtubeUrl || "",
    poster: mediaUrl(p.video?.poster) || mediaUrl(p.coverImage),
    duration: p.video?.duration || "",
  },
  status: (p.stage as Project["status"]) || "Planning",
  lastInspected: p.lastInspected || "",
  cctvStreamActive: Boolean(p.cctvStreamActive),
  rajukPermitNo: p.rajukPermitNo || "",
  milestones: (p.milestones ?? []).map((m) => ({
    label: m.label,
    percent: m.percent,
    completed: m.completed,
  })),
});

/** Developments picked for the home page. */
export async function getHomeProjects(limit = 6): Promise<Project[]> {
  const res = await apiList<ApiProject>("projects/public", {
    isHome: true,
    limit,
    sort: "order",
  });
  if (!res?.rows.length) return staticProjects.slice(0, limit);
  return res.rows.map(toProject);
}

/** Every live development, for `/projects`. */
export async function getProjects(limit = 60): Promise<Project[]> {
  const res = await apiList<ApiProject>("projects/public", { limit });
  if (!res?.rows.length) return staticProjects;
  return res.rows.map(toProject);
}

/* ── Properties ────────────────────────────────────────────────────────── */

interface ApiProperty {
  _id: string;
  slug: string;
  title: string;
  titleBn?: string;
  area?: { name?: string } | null;
  city?: string;
  purpose?: string;
  status?: string;
  type?: string;
  price?: number;
  beds?: number;
  baths?: number;
  size?: number;
  katha?: number;
  floor?: string;
  coverImage?: ApiMedia;
  images?: ApiMedia[];
  badge?: string;
  rajukApproved?: boolean;
  hasVirtualTour?: boolean;
  furnishing?: string;
  handover?: string;
  agent?: { _id?: string } | null;
  amenities?: { name?: string }[];
  description?: string[];
}

const toProperty = (p: ApiProperty): Property => ({
  id: p._id,
  slug: p.slug,
  title: p.title,
  area: p.area?.name || "",
  city: p.city || "Dhaka",
  purpose: (p.purpose as Property["purpose"]) || "sale",
  // The site knows two states; everything not on the market reads as sold.
  status: p.status === "available" ? "available" : "sold",
  type: (p.type as Property["type"]) || "apartment",
  price: p.price ?? 0,
  beds: p.beds ?? 0,
  baths: p.baths ?? 0,
  size: p.size ?? 0,
  katha: p.katha,
  floor: p.floor,
  images: gallery(p.coverImage, p.images),
  badge: p.badge as Property["badge"],
  rajukApproved: Boolean(p.rajukApproved),
  hasVirtualTour: p.hasVirtualTour,
  furnishing: (p.furnishing as Property["furnishing"]) || "Unfurnished",
  handover: p.handover || "",
  agentId: p.agent?._id || "",
  amenities: (p.amenities ?? []).map((a) => a.name || "").filter(Boolean),
  description: paragraphs(p.description),
});

/** Listings picked for the home page, falling back to the newest. */
export async function getHomeProperties(limit = 6): Promise<Property[]> {
  const picked = await apiList<ApiProperty>("properties/public", {
    isHome: true,
    limit,
  });
  if (picked?.rows.length) return picked.rows.map(toProperty);

  const latest = await apiList<ApiProperty>("properties/public", { limit });
  if (!latest?.rows.length) return staticProperties.slice(0, limit);
  return latest.rows.map(toProperty);
}

/** Every listing on the market, for `/properties`. */
export async function getProperties(limit = 60): Promise<Property[]> {
  const res = await apiList<ApiProperty>("properties/public", { limit });
  if (!res?.rows.length) return staticProperties;
  return res.rows.map(toProperty);
}
