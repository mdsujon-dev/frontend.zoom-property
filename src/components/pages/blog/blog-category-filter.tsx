"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder: string;
  /** Labels for the two scroll arrows. */
  scrollPrevLabel: string;
  scrollNextLabel: string;
}

/** One press moves the row by roughly two pills. */
const SCROLL_STEP = 240;

/** Slack at each end, so a browser's sub-pixel scroll position is not an edge. */
const EDGE_SLACK = 4;

/**
 * Category pills and the article search.
 *
 * The pills are wider than the row on every screen, so the row scrolls. Touch
 * and trackpad can already swipe it, but a mouse cannot — there is no gesture
 * for horizontal scroll and the scrollbar is hidden — which left the categories
 * past the right edge unreachable. Hence the two arrows: each appears only when
 * there is something to reach on that side, and it sits over a fade so the
 * pills slide under it rather than colliding with it.
 *
 * The row also needed `min-w-0`: as a flex item it would not shrink below its
 * content, so instead of scrolling it grew under the search box.
 */
export function BlogCategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery = "",
  onSearchChange,
  searchPlaceholder,
  scrollPrevLabel,
  scrollNextLabel,
}: CategoryFilterProps) {
  const [isFocused, setIsFocused] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: false, end: false });

  const measure = useCallback(() => {
    const el = scroller.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    setEdges({
      start: el.scrollLeft > EDGE_SLACK,
      end: el.scrollLeft < max - EDGE_SLACK,
    });
  }, []);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    measure();
    el.addEventListener("scroll", measure, { passive: true });

    // The row's width changes with the viewport, and the pills' width with the
    // font once it loads — both change what is reachable.
    const observer = new ResizeObserver(measure);
    observer.observe(el);

    return () => {
      el.removeEventListener("scroll", measure);
      observer.disconnect();
    };
  }, [measure]);

  // Keep the selected pill visible: a category can also be chosen elsewhere on
  // the page, and it should not stay off-screen here.
  useEffect(() => {
    const active = scroller.current?.querySelector<HTMLElement>(
      '[data-active="true"]',
    );

    // `block: nearest` so centring the pill never scrolls the page vertically.
    active?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeCategory]);

  const nudge = (direction: 1 | -1) =>
    scroller.current?.scrollBy({
      left: direction * SCROLL_STEP,
      behavior: "smooth",
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Pills Scroller */}
        <div className="relative flex min-w-0 flex-1 items-center">
          <ScrollArrow
            side="start"
            label={scrollPrevLabel}
            shown={edges.start}
            onClick={() => nudge(-1)}
          />

          <div
            ref={scroller}
            className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  data-active={isActive}
                  onClick={() => onSelectCategory(cat.id)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2 font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-700/30"
                      : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60",
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <ScrollArrow
            side="end"
            label={scrollNextLabel}
            shown={edges.end}
            onClick={() => nudge(1)}
          />
        </div>

        {/* Search Box */}
        {onSearchChange && (
          <div
            className={cn(
              "relative flex shrink-0 items-center rounded-full border bg-background px-3.5 py-1.5 transition-all duration-200 lg:w-72",
              isFocused
                ? "border-primary ring-2 ring-primary/20"
                : "border-border/80 hover:border-border",
            )}
          >
            <Icon name="trend" size="xs" className="mr-2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * One end of the pill row: a fade the pills disappear into, and the button.
 *
 * Both are removed — not merely hidden — once that end is reached, so a
 * keyboard never lands on an arrow that does nothing.
 */
function ScrollArrow({
  side,
  label,
  shown,
  onClick,
}: {
  side: "start" | "end";
  label: string;
  shown: boolean;
  onClick: () => void;
}) {
  if (!shown) return null;

  const isStart = side === "start";

  return (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-y-0 z-10 w-16",
          isStart
            ? "left-0 bg-linear-to-r from-background to-transparent"
            : "right-0 bg-linear-to-l from-background to-transparent",
        )}
      />

      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={cn(
          "absolute top-1/2 z-20 flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary",
          isStart ? "left-0" : "right-0",
        )}
      >
        <Icon name={isStart ? "chevronLeft" : "chevronRight"} size="sm" />
      </button>
    </>
  );
}
