"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";

import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

/** Floating "back to top" control, wired to the Lenis instance. */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const { scrollToTop } = useSmoothScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 600);
  });

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Button
            size="icon"
            onClick={scrollToTop}
            aria-label="Back to top"
            // Primary, not the secondary wash: it floats over whatever the page
            // happens to be showing, and a pale button on a pale listing card
            // disappears exactly where it is most wanted.
            className="size-11 rounded-full shadow-lg"
          >
            <Icon name="chevronDown" size="md" className="rotate-180" />
          </Button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
