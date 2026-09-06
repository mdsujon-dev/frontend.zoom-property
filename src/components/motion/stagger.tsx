"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { STAGGER, VIEWPORT, fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export interface StaggerProps {
  children: ReactNode;
  /** Delay between children, in seconds. */
  stagger?: number;
  delay?: number;
  amount?: number;
  repeat?: boolean;
  as?: "div" | "ul" | "ol";
  className?: string;
}

/** Parent for lists/grids: children reveal one after another. */
export function Stagger({
  children,
  stagger = STAGGER.base,
  delay = 0,
  amount = 0.15,
  repeat = false,
  as = "div",
  className,
}: StaggerProps) {
  const prefersReducedMotion = useReducedMotion();
  const Component = as === "ul" ? motion.ul : as === "ol" ? motion.ol : motion.div;

  if (prefersReducedMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Component
      className={cn(className)}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount }}
    >
      {children}
    </Component>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  as?: "div" | "li";
  className?: string;
}

/** Direct child of <Stagger />. */
export function StaggerItem({
  children,
  as = "div",
  className,
}: StaggerItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  const Component = as === "li" ? motion.li : motion.div;

  return (
    <Component className={cn(className)} variants={fadeUp}>
      {children}
    </Component>
  );
}

export { VIEWPORT };
