"use client";

import { useCallback } from "react";
import { useLenis } from "lenis/react";

type ScrollTarget = string | number | HTMLElement;

/**
 * Scroll helpers bound to the global Lenis instance (see SmoothScrollProvider).
 * Falls back to the native API when Lenis is disabled (reduced motion).
 */
export function useSmoothScroll() {
  const lenis = useLenis();

  const scrollTo = useCallback(
    (target: ScrollTarget, offset = 0) => {
      if (lenis) {
        lenis.scrollTo(target, { offset, duration: 1.1 });
        return;
      }

      const element =
        typeof target === "string" ? document.querySelector(target) : target;

      if (typeof element === "number") {
        window.scrollTo({ top: element + offset, behavior: "smooth" });
      } else if (element instanceof HTMLElement) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY + offset,
          behavior: "smooth",
        });
      }
    },
    [lenis],
  );

  const scrollToTop = useCallback(() => scrollTo(0), [scrollTo]);

  return { lenis, scrollTo, scrollToTop };
}
