"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { formatCompact, formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface CounterProps {
  to: number;
  from?: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  /** 12.5K instead of 12,500. */
  compact?: boolean;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/** Counts up once the number scrolls into view. */
export function Counter({
  to,
  from = 0,
  duration = 1.6,
  delay = 0,
  decimals = 0,
  compact = false,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const value = useMotionValue(from);
  const display = useTransform(value, (latest) =>
    compact
      ? `${prefix}${formatCompact(latest)}${suffix}`
      : `${prefix}${formatNumber(latest, decimals)}${suffix}`,
  );

  useEffect(() => {
    if (!inView) return;

    if (prefersReducedMotion) {
      value.set(to);
      return;
    }

    const controls = animate(value, to, {
      duration: duration || DURATION.slow,
      delay,
      ease: EASE_OUT_EXPO,
    });

    return () => controls.stop();
  }, [inView, prefersReducedMotion, to, duration, delay, value]);

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  );
}
