"use client";

import { useEffect, useRef, useState } from "react";

import { Icon } from "@/components/common/icon";
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
 * The play button sits in the middle of the tile and blinks — a ring that
 * expands out of it and fades — so a shelf of stopped video still reads as
 * something to press. It stops blinking on hover, where the button's own scale
 * already answers, and never starts for a visitor who asked for less motion.
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

        {/* One play affordance, ours, centred on the tile. It covers the parked
            player's own button rather than sitting beside it, so there is still
            only one thing to press — ours, and bigger. */}
        <span
          aria-hidden
          className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
        >
          {/* The blink: a ring pushed out of the button and faded away. */}
          <span className="absolute inset-0 animate-ping rounded-full bg-secondary/50 group-hover:animate-none motion-reduce:animate-none" />

          <span className="relative flex size-14 items-center justify-center rounded-full border border-secondary/60 bg-secondary/85 text-secondary-foreground shadow-lg shadow-black/25 backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-secondary">
            <Icon
              name="play"
              size="md"
              className="ml-0.5 fill-secondary-foreground text-secondary-foreground"
            />
          </span>
        </span>

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
