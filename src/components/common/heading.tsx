import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * The one heading in the app.
 *
 * Sizes are locked to the type scale defined in `globals.css` (`--text-h1` …
 * `--text-display`). Never write `text-4xl` on a title — pick a `size` here so
 * every heading on every page stays on the same scale. Semantics (`as`) and
 * visual size (`size`) are separate: an `h2` can look like an `h4` without
 * breaking the document outline.
 */
const headingVariants = cva("font-heading text-balance", {
  variants: {
    size: {
      display: "text-display",
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      h6: "text-h6",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      inverse: "text-white drop-shadow-sm",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    tone: "default",
    align: "left",
  },
});

const HEADING_TAGS = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

type HeadingTag = (typeof HEADING_TAGS)[number];
type HeadingElement = HeadingTag | "p" | "span" | "div";

export type HeadingSize = NonNullable<
  VariantProps<typeof headingVariants>["size"]
>;

export interface HeadingProps
  extends Omit<ComponentPropsWithoutRef<"h2">, "color">,
    VariantProps<typeof headingVariants> {
  /** Semantic tag. Defaults to `h2`. */
  as?: HeadingElement;
}

const isHeadingTag = (tag: HeadingElement): tag is HeadingTag =>
  (HEADING_TAGS as readonly string[]).includes(tag);

export function Heading({
  as = "h2",
  size,
  tone,
  align,
  weight,
  className,
  ...props
}: HeadingProps) {
  const Tag = as as ElementType;
  const resolvedSize = size ?? (isHeadingTag(as) ? as : "h2");

  return (
    <Tag
      className={cn(
        headingVariants({ size: resolvedSize, tone, align, weight }),
        className,
      )}
      {...props}
    />
  );
}

/** Small uppercase label that sits above a heading. */
const eyebrowVariants = cva(
  "inline-flex items-center gap-2 text-eyebrow uppercase",
  {
    variants: {
      tone: {
        default: "text-muted-foreground",
        primary: "text-primary",
        inverse: "text-background/70",
      },
    },
    defaultVariants: { tone: "default" },
  },
);

export interface EyebrowProps
  extends ComponentPropsWithoutRef<"p">,
    VariantProps<typeof eyebrowVariants> {}

export function Eyebrow({ className, tone, ...props }: EyebrowProps) {
  return <p className={cn(eyebrowVariants({ tone }), className)} {...props} />;
}

export { headingVariants };
