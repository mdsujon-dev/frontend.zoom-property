"use client";

import { useEffect, useState } from "react";

export interface ScrollState {
  direction: "up" | "down";
  /** Within a few pixels of the top — used for the transparent-over-hero style. */
  atTop: boolean;
  /** Scrolled far enough that hiding the header is not disorienting. */
  scrolledPast: boolean;
}

export interface ScrollDirectionOptions {
  /** Travel in one direction before the direction flips. */
  threshold?: number;
  /** Header stays pinned until the page has scrolled at least this far. */
  hideAfter?: number;
}

/**
 * Drives sticky headers that hide on scroll-down and reappear on scroll-up.
 *
 * The direction is decided from *accumulated* travel, not from a single frame's
 * delta. With smooth scrolling the page eases to a stop, and the last frames of
 * that easing can register a pixel or two the other way; comparing frame to
 * frame flips the direction on that noise and the header twitches mid-scroll.
 * Accumulating — and resetting the total whenever the sign changes — means the
 * header only reacts once you have genuinely moved `threshold` pixels one way.
 *
 * `scrolledPast` keeps the header pinned near the top of the page, so a short
 * flick does not pull the navigation off screen before you have gone anywhere.
 */
export function useScrollDirection({
  threshold = 14,
  hideAfter = 120,
}: ScrollDirectionOptions = {}): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: "up",
    atTop: true,
    scrolledPast: false,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let travelled = 0;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      // A change of sign starts a new run rather than adding to the old one.
      if (delta !== 0 && Math.sign(delta) !== Math.sign(travelled)) {
        travelled = 0;
      }
      travelled += delta;

      const atTop = y < 24;
      const scrolledPast = y > hideAfter;
      const flipped = Math.abs(travelled) >= threshold;
      const direction: ScrollState["direction"] = travelled > 0 ? "down" : "up";

      setState((prev) => {
        const next: ScrollState = {
          direction: flipped ? direction : prev.direction,
          atTop,
          scrolledPast,
        };
        if (flipped) travelled = 0;

        // Skip the render when nothing actually changed.
        return prev.direction === next.direction &&
          prev.atTop === next.atTop &&
          prev.scrolledPast === next.scrolledPast
          ? prev
          : next;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold, hideAfter]);

  return state;
}
