"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

export interface ParallaxProps {
  children: ReactNode;
  /** Positive moves slower than the page, negative moves against it. */
  speed?: number;
  axis?: "y" | "x";
  /** Adds a gentle scale so edges never show on image parallax. */
  zoom?: boolean;
  className?: string;
}

/**
 * Scroll-linked parallax. Pair with `overflow-hidden` on the parent and give
 * the moving layer some slack (e.g. `scale-110`) so no gap appears at the edges.
 */
export function Parallax({
  children,
  speed = 0.2,
  axis = "y",
  zoom = false,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  const distance = prefersReducedMotion ? 0 : speed * 100;
  const offset = useTransform(smooth, [0, 1], [`${-distance}px`, `${distance}px`]);
  const scale = useTransform(smooth, [0, 0.5, 1], zoom ? [1.08, 1.14, 1.08] : [1, 1, 1]);

  return (
    <motion.div
      ref={ref}
      style={axis === "y" ? { y: offset, scale } : { x: offset, scale }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}
