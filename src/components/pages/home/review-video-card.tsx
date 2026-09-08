"use client";

import { useEffect, useRef, useState } from "react";

import Image from "@/components/common/image";
import { VideoLightbox } from "@/components/media/video-lightbox";
import type { Review } from "@/data/people";
import { shimmerDataUrl } from "@/lib/image";
import { cardEmbedUrl, parseVideoId } from "@/lib/video";
import { cn } from "@/lib/utils";

/**
 * A filmed client review, shaped like a Shorts tile.
 *
 * The tile holds the video itself — YouTube's own player, parked on its first
 * frame — not a picture of it. Nothing autoplays: the clip stands still until
 * someone clicks, and the click opens the lightbox, which is where it plays
 * properly, with sound, controls and a frame big enough to watch.
 *
 * Two details keep that from being expensive or fragile:
 *
 * - Nothing loads until the card is near the viewport. Five players is a real
 *   cost, and paying it for a section nobody scrolled to is waste.
 * - The player layer is `pointer-events-none` and the still stays behind it, so
 *   the click always belongs to the card — never swallowed by the iframe — and
 *   there is something to look at for the second before YouTube answers.
 *
 * There is no play button of ours on the tile: the parked player draws its own
 * in the middle of the frame, and a second one on top of it was two buttons for
 * one action. The whole card is the trigger, so the click works anywhere.
 *
 * Wordless by design: the still is a frame of the person talking, so a caption
 * adds nothing that pressing play does not answer better. The name and the
 * written quote still reach assistive tech through the trigger's label, and
 * both are on `/reviews` in full.
 */
export function ReviewVideoCard({
  review,
  playLabel,
  closeLabel,
  className,
}: {
  review: Review;
  playLabel: string;
  closeLabel: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [inView, setInView] = useState(false);
  const frame = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = frame.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      // Start loading just before the shelf arrives, so the players are ready
      // by the time the tiles are on screen.
      { rootMargin: "300px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  if (!review.video) return null;

  const videoId = parseVideoId(review.video.youtubeUrl, "youtube");

  return (
    <>
      <figure
        ref={frame}
        className={cn(
          "group relative isolate aspect-9/16 w-full overflow-hidden rounded-xl bg-black",
          className,
        )}
      >
        <Image
          src={review.video.poster}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 66vw"
          placeholder="blur"
          blurDataURL={shimmerDataUrl()}
          className="object-cover object-top"
        />

        {inView ? (
          <iframe
            src={cardEmbedUrl(videoId)}
            title=""
            aria-hidden
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 size-full border-none"
          />
        ) : null}

        {/* Just enough scrim to hold the controls, top and bottom. */}
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/25"
        />

        {/* Runtime, bottom right — the one thing a YouTube thumbnail says. */}
        <span className="absolute right-2.5 bottom-2.5 rounded-md bg-black/75 px-1.5 py-0.5 text-xs font-medium text-white tabular-nums">
          {review.video.duration}
        </span>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute inset-0 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span className="sr-only">{`${playLabel}: ${review.name}, ${review.property}`}</span>
        </button>
      </figure>

      <VideoLightbox
        url={open ? review.video.youtubeUrl : null}
        title={`${review.name} — ${review.property}`}
        closeLabel={closeLabel}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
