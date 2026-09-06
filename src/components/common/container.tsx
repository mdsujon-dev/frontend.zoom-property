import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** Horizontal rhythm: one max-width scale and one gutter for the whole site. */
const containerVariants = cva("mx-auto w-full px-5 sm:px-6 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-none",
    },
  },
  defaultVariants: { size: "xl" },
});

export interface ContainerProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof containerVariants> {
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
}

export function Container({
  as = "div",
  size,
  className,
  ...props
}: ContainerProps) {
  const Tag = as as ElementType;
  return (
    <Tag className={cn(containerVariants({ size }), className)} {...props} />
  );
}

export { containerVariants };
