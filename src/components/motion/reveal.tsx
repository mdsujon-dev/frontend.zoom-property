"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import {
  DURATION,
  EASE_OUT_EXPO,
  VIEWPORT,
  offsetFor,
  type RevealDirection,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const elements = {
  div: motion.div,
  span: motion.span,
  li: motion.li,
  section: motion.section,
  article: motion.article,
} as const;

export interface RevealProps {
  children: ReactNode;
  /** Where the element travels from. */
  direction?: RevealDirection;
  /** Travel distance in px. */
  distance?: number;
  delay?: number;
  duration?: number;
  /** Replay every time it enters the viewport. */
  repeat?: boolean;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
  blur?: boolean;
  as?: keyof typeof elements;
  className?: string;
}

/**
 * Scroll-triggered entrance animation. The default building block for
 * "fade the block in as it comes into view" — no bespoke variants needed.
 */
export function Reveal({
  children,
  direction = "up",
  distance = 24,
  delay = 0,
  duration = DURATION.base,
  repeat = false,
  amount = VIEWPORT.amount,
  blur = false,
  as = "div",
  className,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = elements[as];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Component
      className={cn(className)}
      initial={{
        opacity: 0,
        ...offsetFor(direction, distance),
        ...(blur ? { filter: "blur(8px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={{ once: !repeat, amount }}
      transition={{ duration, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </Component>
  );
}
