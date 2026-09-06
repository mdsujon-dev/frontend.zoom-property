"use client";

import { useEffect, useState } from "react";

type ScrollState = { direction: "up" | "down"; atTop: boolean };

/** Drives sticky headers that hide on scroll-down and reappear on scroll-up. */
export function useScrollDirection(threshold = 8) {
  const [state, setState] = useState<ScrollState>({
    direction: "up",
    atTop: true,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) >= threshold) {
        setState({ direction: y > lastY ? "down" : "up", atTop: y < 24 });
        lastY = y;
      } else {
        setState((prev) =>
          prev.atTop === y < 24 ? prev : { ...prev, atTop: y < 24 },
        );
      }
      frame = 0;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}
