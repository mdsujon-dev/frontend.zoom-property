"use client";

import { motion, useReducedMotion } from "motion/react";

import { DURATION, EASE_OUT_EXPO, STAGGER } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface AnimatedTextProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
}

/**
 * Word-by-word entrance for headlines. Renders plain inline words, so it can be
 * dropped inside <Heading /> without changing the type scale.
 */
export function AnimatedText({
  text,
  delay = 0,
  stagger = STAGGER.tight,
  className,
}: AnimatedTextProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden py-[0.1em]">
          <motion.span
            aria-hidden
            className="inline-block"
            variants={{
              hidden: { y: "110%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
              },
            }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
