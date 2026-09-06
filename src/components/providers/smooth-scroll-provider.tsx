"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Global Lenis smooth scroll.
 *
 * Mounted once in the root layout. It drives the real window scroll position,
 * so `useScroll` from Motion, scroll-linked animations, anchors and the browser
 * scrollbar all stay in sync. Automatically disabled for users who ask for
 * reduced motion — they get native scrolling instead.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        // Native scrolling on touch devices feels better than an emulated one.
        syncTouch: false,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
