import "server-only";

import type { Project } from "@/data/projects";

import { gallery, isoDate, mediaUrl, paragraphs } from "../../base-api";
import type { ApiProject } from "./types";

/**
 * An API project to the `Project` the cards consume.
 *
 * `progress` is never mapped from anything the desk typed - the API computes
 * it from the ticked milestones, which is why a project cannot claim 60% while
 * its programme adds up to 40.
 */
export const toProject = (p: ApiProject): Project => ({
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
    // No still of its own falls back to the cover, so the player always has a
    // frame to show before anyone presses play.
    poster: mediaUrl(p.video?.poster) || mediaUrl(p.coverImage),
    duration: p.video?.duration || "",
  },
  status: (p.stage as Project["status"]) || "Planning",
  lastInspected: isoDate(p.lastInspected),
  cctvStreamActive: Boolean(p.cctvStreamActive),
  rajukPermitNo: p.rajukPermitNo || "",
  milestones: (p.milestones ?? []).map((m) => ({
    label: m.label,
    percent: m.percent,
    completed: m.completed,
  })),
});
