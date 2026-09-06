export type VideoProvider = "youtube" | "vimeo";

/** Extracts the video id from the common YouTube / Vimeo URL shapes. */
export function parseVideoId(url: string, provider: VideoProvider) {
  if (provider === "youtube") {
    const match = url.match(
      /(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{6,})/,
    );
    return match?.[1] ?? url;
  }

  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match?.[1] ?? url;
}

export function embedUrl(id: string, provider: VideoProvider) {
  return provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
    : `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0`;
}

/**
 * Zero-request poster for YouTube. `hqdefault` is the only size guaranteed to
 * exist for every video — `maxresdefault` 404s on older or low-res uploads.
 * Pass `poster` to <VideoEmbed /> to override it (Vimeo always needs one).
 */
export function youtubeThumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
