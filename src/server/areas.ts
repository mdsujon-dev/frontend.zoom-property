import "server-only";

import { areas as fallback, type Area } from "@/data/areas";
import { apiList } from "@/lib/api";

import { mediaUrl, type ApiMedia } from "./shared";

/**
 * Neighbourhoods, from the panel.
 *
 * The market figures — median price, price per square foot, rental yield — are
 * held rather than computed, and the desk may not have entered them yet, so
 * every one of them tolerates being missing. A card that reads "—" is honest;
 * a card that reads "৳0" is not.
 */

/** An area as `/areas/public` returns it. */
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
 * The areas picked for the home page.
 *
 * `limit` is a ceiling, not a target. If nobody has ticked "on home page" the
 * caller gets the built-in list rather than an empty grid — an unconfigured
 * site should still look finished.
 */
export async function getHomeAreas(limit = 10): Promise<Area[]> {
  const res = await apiList<ApiArea>("areas/public", {
    isHome: true,
    limit,
    sort: "order",
  });
  if (!res?.rows.length) return fallback.slice(0, limit);
  return res.rows.map(toArea);
}

/** Every service area, in the desk's order, for `/areas`. */
export async function getAreas(limit = 60): Promise<Area[]> {
  const res = await apiList<ApiArea>("areas/public", { limit, sort: "order" });
  if (!res?.rows.length) return fallback;
  return res.rows.map(toArea);
}

/** One area by its slug, or `null` when there is no such area. */
export async function getAreaBySlug(slug: string): Promise<Area | null> {
  const all = await getAreas();
  return all.find((a) => a.id === slug) ?? null;
}
