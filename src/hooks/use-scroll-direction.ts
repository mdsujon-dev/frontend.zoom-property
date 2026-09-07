"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

export interface ScrollState {
  direction: "up" | "down";
  /** Within a few pixels of the top — used for the transparent-over-hero style. */
  atTop: boolean;
  /** Scrolled far enough that hiding the header is not disorienting. */
  scrolledPast: boolean;
}

export interface ScrollDirectionOptions {
  /** Travel in one direction before the direction flips downwards. */
  threshold?: number;
  /** Header stays pinned until the page has scrolled at least this far. */
  hideAfter?: number;
}

/**
 * Drives sticky headers that smoothly hide on scroll-down and reappear on scroll-up.
 *
 * Integrates directly with Lenis smooth-scroll when active for frame-perfect 60/120fps
 * updates without scroll chatter, and falls back to passive window scroll events.
 *
 * Upward scrolling uses a hair-trigger threshold (~4px) so the navigation returns
 * the instant the visitor nudges back up, while downward hiding waits until passing
 * `hideAfter` to avoid jarring hides near the top.
 */
export function useScrollDirection({
  threshold = 8,
  hideAfter = 60,
}: ScrollDirectionOptions = {}): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: "up",
    atTop: true,
    scrolledPast: false,
  });

  const lastYRef = useRef(0);
  const accumulatedRef = useRef(0);

  const updateScroll = (rawY: number) => {
    const currentY = Math.max(0, rawY);
    const delta = currentY - lastYRef.current;
    lastYRef.current = currentY;

    const atTop = currentY <= 24;
    const scrolledPast = currentY > hideAfter;

    // Pin header and reset at the very top
    if (atTop) {
      accumulatedRef.current = 0;
      setState((prev) =>
        prev.direction === "up" && prev.atTop && !prev.scrolledPast
          ? prev
          : { direction: "up", atTop: true, scrolledPast: false },
      );
      return;
    }

    // Accumulate travel in the active direction
    if (delta !== 0) {
      if (Math.sign(delta) !== Math.sign(accumulatedRef.current)) {
        accumulatedRef.current = 0;
      }
      accumulatedRef.current += delta;
    }

    // Scrolling up: reveal immediately with high sensitivity (4px upward nudge)
    if (accumulatedRef.current <= -Math.min(threshold, 4)) {
      accumulatedRef.current = 0;
      setState((prev) =>
        prev.direction === "up" && prev.atTop === atTop && prev.scrolledPast === scrolledPast
          ? prev
          : { direction: "up", atTop, scrolledPast },
      );
    }
    // Scrolling down: hide once scrolled past header distance
    else if (accumulatedRef.current >= threshold && scrolledPast) {
      accumulatedRef.current = 0;
      setState((prev) =>
        prev.direction === "down" && prev.atTop === atTop && prev.scrolledPast === scrolledPast
          ? prev
          : { direction: "down", atTop, scrolledPast },
      );
    } else {
      // Update position flags without flipping direction
      setState((prev) =>
        prev.atTop === atTop && prev.scrolledPast === scrolledPast
          ? prev
          : { ...prev, atTop, scrolledPast },
      );
    }
  };

  // Lenis hook fires every RAF with smooth scroll coordinates
  const lenis = useLenis((lenisInstance) => {
    updateScroll(lenisInstance.scroll);
  });

  // Passive native scroll fallback for when Lenis is inactive or reduced-motion
  useEffect(() => {
    if (lenis) return;

    let frame = 0;
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          updateScroll(window.scrollY);
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [lenis, threshold, hideAfter]);

  return state;
}
