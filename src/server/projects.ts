import "server-only";

import { projects as fallback, type Project } from "@/data/projects";
import { apiGet, apiList } from "@/lib/api";

import { gallery, isoDate, mediaUrl, paragraphs, type ApiMedia } from "./shared";

/**
 * Developments, from the panel.
 *
 * `progress` is never mapped from anything the desk typed — the API computes
 * it from the ticked milestones, which is why a project cannot claim 60% while
 * its programme adds up to 40.
 */

/** A project as `/projects/public` returns it. */
interface ApiProject {
  _id: string;
  slug: string;
  name: string;
  nameBn?: string;
  area?: { name?: string } | null;
  city?: string;
  progress?: number;
  /** "Planning" | "Processing" | "Completed", as the panel names it. */
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

/** The developments picked for the home page. */
export async function getHomeProjects(limit = 6): Promise<Project[]> {
  const res = await apiList<ApiProject>("projects/public", {
    isHome: true,
    limit,
    sort: "order",
  });
  if (!res?.rows.length) return fallback.slice(0, limit);
  return res.rows.map(toProject);
}

/** Every live development, for `/projects`. */
export async function getProjects(limit = 60): Promise<Project[]> {
  const res = await apiList<ApiProject>("projects/public", { limit });
  if (!res?.rows.length) return fallback;
  return res.rows.map(toProject);
}

/**
 * One development and the listings inside it.
 *
 * A project switched off in the panel is not found rather than rendered empty,
 * so `/projects/[slug]` can 404 properly.
 */
export async function getProjectBySlug(
  slug: string,
): Promise<{ project: Project; listingSlugs: string[] } | null> {
  const res = await apiGet<{
    project: ApiProject;
    listings?: { slug: string }[];
  }>(`projects/public/${encodeURIComponent(slug)}`);

  if (res?.data?.project) {
    return {
      project: toProject(res.data.project),
      listingSlugs: (res.data.listings ?? []).map((l) => l.slug).filter(Boolean),
    };
  }

  const local = fallback.find((p) => p.slug === slug);
  return local ? { project: local, listingSlugs: [] } : null;
}
