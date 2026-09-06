import type { Transition, Variants } from "motion/react";

/**
 * Motion design tokens.
 *
 * Every animated component in the app pulls its easing / duration from here so
 * the whole site moves with one rhythm. Do not hard-code durations in features.
 */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_IN_OUT_SOFT: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
} as const;

export const STAGGER = {
  tight: 0.05,
  base: 0.09,
  loose: 0.14,
} as const;

/** Default in-view trigger: animate once, when a quarter of the block is visible. */
export const VIEWPORT = { once: true, amount: 0.25 } as const;

export function transition(
  duration: number = DURATION.base,
  delay = 0,
): Transition {
  return { duration, delay, ease: EASE_OUT_EXPO };
}

export type RevealDirection = "up" | "down" | "left" | "right" | "none";

/** Offset (in px) applied on the hidden state for a given direction. */
export function offsetFor(direction: RevealDirection, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition() },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition() },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: transition() },
};

export function staggerContainer(
  stagger: number = STAGGER.base,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  };
}
