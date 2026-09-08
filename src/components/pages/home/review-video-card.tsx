"use client";

import { useState } from "react";

import { Icon } from "@/components/common/icon";
import Image from "@/components/common/image";
import { VideoLightbox } from "@/components/media/video-lightbox";
import type { Review } from "@/data/people";
import { shimmerDataUrl } from "@/lib/image";
import { cn } from "@/lib/utils";

/**
 * A filmed client review, shaped like a Shorts tile.
 *
 * 9:16 and wordless: the still is a frame of the person talking, so the
 * thumbnail already says who this is and there is nothing for a caption to add
 * that pressing play does not answer better. The name and the written quote
 * still reach assistive tech through the trigger's label, and both are on
 * `/reviews` in full.
 *
 * Each card owns its own dialog. Only one can be open at a time anyway, and a
 * lifted `activeId` would drag the whole section into a client component.
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

  if (!review.video) return null;

  return (
    <>
      <figure
        className={cn(
          "group relative isolate aspect-9/16 w-full overflow-hidden rounded-xl bg-neutral-900",
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
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Just enough scrim to hold the controls, top and bottom. */}
        <span
          aria-hidden
          className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/25"
        />

        {/* Play affordance — decorative; the whole tile is the button. */}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex size-14 items-center justify-center rounded-full border border-white/40 bg-black/35 text-white backdrop-blur-md transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-primary group-hover:bg-primary">
            <Icon name="play" size="md" className="ml-0.5 fill-white text-white" />
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
