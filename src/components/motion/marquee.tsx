"use client";

import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface MarqueeProps {
  children: ReactNode;
  /** One full loop in seconds. Higher = slower. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  /** Gap between items, any CSS length. */
  gap?: string;
  fade?: boolean;
  className?: string;
}

/**
 * Infinite horizontal marquee. CSS-driven (no JS on the scroll thread), the
 * track is duplicated once and translated by exactly its own width + gap, so
 * the loop is seamless. Respects `prefers-reduced-motion` via globals.css.
 */
export function Marquee({
  children,
  speed = 40,
  reverse = false,
  pauseOnHover = true,
  gap = "3rem",
  fade = true,
  className,
}: MarqueeProps) {
  const style = {
    "--marquee-gap": gap,
    gap,
  } as CSSProperties;

  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden",
        fade && "mask-fade-x",
        className,
      )}
      style={style}
    >
      {[0, 1].map((index) => (
        <div
          key={index}
          aria-hidden={index === 1}
          className={cn(
            "flex w-max shrink-0 animate-marquee items-center justify-around",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
          style={{
            gap,
            animationDuration: `${speed}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
