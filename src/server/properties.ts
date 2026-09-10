import "server-only";

import { properties as fallback, type Property } from "@/data/properties";
import { apiGet, apiList } from "@/lib/api";

import { gallery, paragraphs, type ApiMedia } from "./shared";

/**
 * Listings, from the panel.
 *
 * `/properties/public` answers only for listings that are actually on the
 * market — the API forces that, rather than trusting a query parameter — so
 * nothing here has to filter drafts out again.
 */

/** A listing as `/properties/public` returns it. */
interface ApiProperty {
  _id: string;
  slug: string;
  referenceNo?: string;
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
  // The site knows two states. Everything not on the market reads as sold,
  // because "reserved" and "archived" are the panel's business, not a buyer's.
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

/**
 * Listings for the home page.
 *
 * The ticked ones if there are any, the newest otherwise — a home page with an
 * empty listings strip is worse than one showing whatever is currently on the
 * market.
 */
export async function getHomeProperties(limit = 6): Promise<Property[]> {
  const picked = await apiList<ApiProperty>("properties/public", {
    isHome: true,
    limit,
  });
  if (picked?.rows.length) return picked.rows.map(toProperty);

  const latest = await apiList<ApiProperty>("properties/public", { limit });
  if (!latest?.rows.length) return fallback.slice(0, limit);
  return latest.rows.map(toProperty);
}

/** Every listing on the market, for `/properties`. */
export async function getProperties(limit = 60): Promise<Property[]> {
  const res = await apiList<ApiProperty>("properties/public", { limit });
  if (!res?.rows.length) return fallback;
  return res.rows.map(toProperty);
}

/**
 * One listing by its slug, or `null` when there is none.
 *
 * This is the read that counts a view, so it must not be called to test
 * whether a listing exists.
 */
export async function getPropertyBySlug(slug: string): Promise<Property | null> {
  const res = await apiGet<ApiProperty>(
    `properties/public/${encodeURIComponent(slug)}`,
  );
  if (res?.data?.slug) return toProperty(res.data);
  return fallback.find((p) => p.slug === slug) ?? null;
}
