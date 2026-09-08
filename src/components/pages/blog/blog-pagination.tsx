"use client";

import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";

export interface BlogPaginationLabels {
  prev: string;
  next: string;
  /** "Page {page}" — the accessible name of a numbered button. */
  page: string;
  /** "Page {page} of {total}" — the compact readout shown on small screens. */
  pageOf: string;
}

/** Numbers either side of the current page before an ellipsis takes over. */
const WINDOW = 1;

/**
 * Page numbers for the article grid, and where the row breaks down by width.
 *
 * Below `sm` the numbers are replaced by a "Page 2 of 4" readout: eight tap
 * targets do not fit next to two arrows on a phone, and shrinking them until
 * they do makes each one too small to hit. From `sm` up the numbers appear,
 * with first and last always present and an ellipsis standing in for the run
 * between — so the row is a fixed width no matter how many pages there are.
 *
 * The list is state, not a URL: the grid it pages through is filtered in the
 * browser, so there is no address that would restore a page anyway.
 */
export function BlogPagination({
  current,
  total,
  onSelect,
  labels,
  className,
}: {
  current: number;
  total: number;
  onSelect: (page: number) => void;
  labels: BlogPaginationLabels;
  className?: string;
}) {
  if (total <= 1) return null;

  return (
    <nav
      // Names the landmark with where you are: "Page 2 of 4".
      aria-label={labels.pageOf
        .replace("{page}", String(current))
        .replace("{total}", String(total))}
      className={cn(
        "flex items-center justify-center gap-2 border-t border-border/60 pt-8",
        className,
      )}
    >
      <Step
        label={labels.prev}
        icon="chevronLeft"
        disabled={current === 1}
        onClick={() => onSelect(current - 1)}
      />

      {/* Phones: one line of text instead of a row of targets. */}
      <span className="px-2 text-sm font-medium text-muted-foreground sm:hidden">
        {labels.pageOf
          .replace("{page}", String(current))
          .replace("{total}", String(total))}
      </span>

      <ul className="hidden items-center gap-1.5 sm:flex">
        {pageItems(current, total).map((item, index) =>
          item === "gap" ? (
            <li
              key={`gap-${index}`}
              aria-hidden
              className="flex size-9 items-end justify-center text-sm text-muted-foreground"
            >
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onSelect(item)}
                aria-current={item === current ? "page" : undefined}
                aria-label={labels.page.replace("{page}", String(item))}
                className={cn(
                  "flex size-9 cursor-pointer items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
                  item === current
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}
      </ul>

      <Step
        label={labels.next}
        icon="chevronRight"
        disabled={current === total}
        onClick={() => onSelect(current + 1)}
      />
    </nav>
  );
}

/**
 * The numbers to draw: first, last, the current page with its neighbours, and
 * a `gap` wherever a run was left out.
 */
function pageItems(current: number, total: number): (number | "gap")[] {
  const numbers = new Set<number>([1, total]);

  for (let page = current - WINDOW; page <= current + WINDOW; page += 1) {
    if (page > 1 && page < total) numbers.add(page);
  }

  const sorted = [...numbers].sort((a, b) => a - b);
  const items: (number | "gap")[] = [];

  sorted.forEach((page, index) => {
    // A single missing number is drawn rather than hidden: an ellipsis takes
    // the same room as the number it replaces.
    if (index > 0 && page - sorted[index - 1] > 1) {
      items.push(page - sorted[index - 1] === 2 ? page - 1 : "gap");
    }
    items.push(page);
  });

  return items;
}

/** Previous / next. Disabled rather than hidden, so the row never reflows. */
function Step({
  label,
  icon,
  disabled,
  onClick,
}: {
  label: string;
  icon: "chevronLeft" | "chevronRight";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-semibold transition-colors",
        disabled
          ? "cursor-not-allowed border-border bg-muted/40 text-muted-foreground/50"
          : "cursor-pointer border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
      )}
    >
      {icon === "chevronLeft" ? <Icon name="chevronLeft" size="xs" /> : null}
      <span className="hidden md:inline">{label}</span>
      {icon === "chevronRight" ? <Icon name="chevronRight" size="xs" /> : null}
    </button>
  );
}
