import "server-only";

import type { Property } from "@/data/properties";

import { gallery, paragraphs } from "../../base-api";
import type { ApiProperty } from "./types";

/** An API listing to the `Property` the cards consume. */
export const toProperty = (p: ApiProperty): Property => ({
  id: p._id,
  slug: p.slug,
  title: p.title,
  titleBn: p.titleBn,
  area: p.area?.name || "",
  areaBn: p.area?.nameBn,
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
  descriptionBn: paragraphs(p.descriptionBn),
});
