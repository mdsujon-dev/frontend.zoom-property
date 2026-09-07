import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** Body copy counterpart to <Heading />. Same idea: one locked scale. */
const textVariants = cva("text-pretty", {
  variants: {
    size: {
      lead: "text-lead",
      base: "text-base leading-7",
      sm: "text-sm leading-6",
      xs: "text-xs leading-5",
    },
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      primary: "text-primary",
      inverse: "text-white/80",
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
    },
  },
  defaultVariants: {
    size: "base",
    tone: "muted",
    align: "left",
  },
});

export interface TextProps
  extends Omit<ComponentPropsWithoutRef<"p">, "color">,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div" | "li";
  /** Caps the measure for comfortable reading. */
  measure?: boolean;
}

export function Text({
  as = "p",
  size,
  tone,
  align,
  weight,
  measure = false,
  className,
  ...props
}: TextProps) {
  const Tag = as as ElementType;

  return (
    <Tag
      className={cn(
        textVariants({ size, tone, align, weight }),
        measure && "max-w-prose",
        className,
      )}
      {...props}
    />
  );
}

export { textVariants };
