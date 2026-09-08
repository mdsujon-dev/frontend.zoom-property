"use client";

import { motion, useReducedMotion } from "motion/react";

import { DURATION, EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The rule that closes a centred section heading.
 *
 * Stands in for a description: it gives the title something to sit on without
 * adding another sentence to read. Built rather than borrowed so the shape is
 * the brand's own — a small jewel of a mark, sparks stepping away from it, and
 * a highlight that sweeps outward along the hairlines.
 *
 * Restraint is the whole design here. The mark is deliberately *smaller* than
 * the space around it and its corners are nearly sharp: a big soft-cornered
 * badge with a glow behind it reads as a sticker, a fine one that leaves air
 * around itself reads as an engraving. Two strokes, not three.
 *
 * The diamonds are also deliberately *static*. An earlier version rotated the
 * outer ring, but a rounded square caught at an arbitrary angle reads as a
 * wobble rather than a rotation; the sweep carries the movement instead, and
 * the mark itself stays crisp.
 *
 * Purely decorative, so the whole thing is `aria-hidden` and every moving part
 * stops when the visitor has asked for reduced motion.
 */

/** Distance from the centre → size and opacity. Nearest spark is first. */
const SPARKS = [
  { size: 6, opacity: 0.65 },
  { size: 4, opacity: 0.38 },
  { size: 3, opacity: 0.2 },
];

/**
 * Colourways. `inverse` is for the dark photographic bands — over a black scrim
 * the `border` token and a mid-blue mark both sink into the image, so the
 * hairlines and the sparks go white and only the sweep keeps the accent.
 */
const TONES = {
  default: {
    ruleLeft: "bg-linear-to-r from-transparent via-border to-primary/50",
    ruleRight: "bg-linear-to-l from-transparent via-border to-primary/50",
    sweep: "bg-linear-to-r from-transparent via-primary to-transparent",
    spark: "bg-primary",
    ring: "border-primary/30",
    core: "bg-linear-to-br from-primary to-primary/60",
  },
  inverse: {
    ruleLeft: "bg-linear-to-r from-transparent via-white/45 to-white/85",
    ruleRight: "bg-linear-to-l from-transparent via-white/45 to-white/85",
    sweep: "bg-linear-to-r from-transparent via-white to-transparent",
    spark: "bg-white",
    ring: "border-white/45",
    core: "bg-linear-to-br from-white to-white/70",
  },
} as const;

export interface OrnamentDividerProps {
  className?: string;
  /** `inverse` on dark backdrops, where the default hairline disappears. */
  tone?: keyof typeof TONES;
}

export function OrnamentDivider({
  className,
  tone = "default",
}: OrnamentDividerProps) {
  const prefersReducedMotion = useReducedMotion();
  const animated = !prefersReducedMotion;
  const c = TONES[tone];

  const rule = (side: "left" | "right") => (
    <motion.span
      className={cn(
        "relative h-px w-16 shrink-0 overflow-hidden sm:w-36 lg:w-52",
        side === "left"
          ? cn("origin-right", c.ruleLeft)
          : cn("origin-left", c.ruleRight),
      )}
      initial={animated ? { scaleX: 0 } : false}
      whileInView={animated ? { scaleX: 1 } : undefined}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: DURATION.slow, ease: EASE_OUT_EXPO }}
    >
      {animated ? (
        // Travels away from the medallion on both sides, so the pair reads as
        // one movement spreading outward rather than two lines scrolling.
        <motion.span
          className={cn("absolute inset-y-0 w-1/3", c.sweep)}
          animate={{ x: side === "left" ? ["320%", "-140%"] : ["-140%", "320%"] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            repeatDelay: 1.4,
            ease: "easeInOut",
          }}
        />
      ) : null}
    </motion.span>
  );

  const sparks = (side: "left" | "right") => {
    // Nearest-to-centre first, so the left column has to run outward.
    const ordered = side === "left" ? [...SPARKS].reverse() : SPARKS;

    return ordered.map((spark, index) => (
      <motion.span
        key={`${side}-${spark.size}`}
        className={cn("shrink-0 rotate-45 rounded-[1px]", c.spark)}
        style={{ width: spark.size, height: spark.size, opacity: spark.opacity }}
        initial={animated ? { scale: 0 } : false}
        whileInView={animated ? { scale: 1 } : undefined}
        viewport={{ once: true, amount: 0.6 }}
        transition={{
          duration: DURATION.fast,
          delay: 0.28 + (side === "left" ? ordered.length - 1 - index : index) * 0.07,
          ease: EASE_OUT_EXPO,
        }}
      />
    ));
  };

  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-center gap-2.5 sm:gap-3", className)}
    >
      {rule("left")}
      {sparks("left")}

      {/* The mark: one fine outline, one small solid core, and air between. */}
      <motion.span
        className="relative flex size-8 shrink-0 items-center justify-center sm:size-9"
        initial={animated ? { scale: 0.6, opacity: 0 } : false}
        whileInView={animated ? { scale: 1, opacity: 1 } : undefined}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: DURATION.base, ease: EASE_OUT_EXPO }}
      >
        <span
          className={cn("absolute inset-0 rotate-45 rounded-[2px] border", c.ring)}
        />

        {/* No `rotate-45` class here: motion writes `transform`, Tailwind writes
            `rotate`, and the browser composes both — the diamond would land at 90°. */}
        <motion.span
          className={cn("absolute inset-[10px] rounded-[1px]", c.core)}
          initial={animated ? { rotate: 45, scale: 0 } : { rotate: 45 }}
          whileInView={animated ? { rotate: 45, scale: 1 } : undefined}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: DURATION.base, delay: 0.18, ease: EASE_OUT_EXPO }}
        />
      </motion.span>

      {sparks("right")}
      {rule("right")}
    </div>
  );
}
