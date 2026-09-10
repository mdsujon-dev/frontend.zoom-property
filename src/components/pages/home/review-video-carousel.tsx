"use client";

import { useCallback, useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Review } from "@/data/people";
import { cn } from "@/lib/utils";

import { ReviewVideoCard } from "./review-video-card";

export interface ReviewVideoCarouselLabels {
  play?: string;
  close?: string;
}

/** Long enough to watch a face, short enough that the shelf reads as moving. */
const AUTOPLAY_MS = 4000;

/**
 * The filmed reviews, as a slider.
 *
 * Four portrait tiles at a time on desktop with the rest a swipe away — the
 * same shelf a Shorts row uses, which is the shape people already read as
 * "short video" without being told.
 *
 * It advances on its own, so there are no arrows: the dots stay as the position
 * readout and as the way to jump. Movement stops while a pointer is over the
 * shelf or focus is inside it — otherwise the tile someone is reaching for
 * slides out from under them — and never starts at all for a visitor who asked
 * for reduced motion.
 *
 * The first click or keypress stops it permanently: once someone has opened a
 * review, a shelf that kept reshuffling underneath the player is worse than one
 * that simply stopped moving. Dragging works throughout.
 */
export function ReviewVideoCarousel({
  reviews,
  labels,
  cardClassName,
}: {
  reviews: Review[];
  labels?: ReviewVideoCarouselLabels;
  cardClassName?: string;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api || paused || engaged || prefersReducedMotion) return;

    const timer = setInterval(() => api.scrollNext(), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [api, paused, engaged, prefersReducedMotion]);

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onPointerDownCapture={() => setEngaged(true)}
      onKeyDownCapture={() => setEngaged(true)}
    >
      <Carousel setApi={setApi} opts={{ align: "start", loop: true }}>
        <CarouselContent className="-ml-4">
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className="basis-2/3 pl-4 sm:basis-1/3 lg:basis-1/4"
            >
              <ReviewVideoCard
                review={review}
                playLabel={labels?.play}
                closeLabel={labels?.close}
                className={cardClassName}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {count > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => api?.scrollTo(index)}
              aria-label={`${index + 1}`}
              className={cn(
                "h-1.5 cursor-pointer rounded-full transition-all duration-300",
                current === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-primary/25 hover:bg-primary/50",
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
