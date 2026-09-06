import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

import { Eyebrow, Heading, type HeadingProps, type HeadingSize } from "./heading";
import { Text } from "./text";

export interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Semantic level. Visual size stays on the shared scale. */
  as?: HeadingProps["as"];
  size?: HeadingSize;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  /** Right-hand slot (e.g. a "View all" button) — desktop only alignment. */
  action?: ReactNode;
  className?: string;
  animate?: boolean;
}

/**
 * The standard block that opens a section: eyebrow → title → description.
 * Use this instead of composing raw headings so spacing and animation match.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as = "h2",
  size,
  align = "left",
  tone = "default",
  action,
  className,
  animate = true,
}: SectionHeadingProps) {
  const inverse = tone === "inverse";

  const content = (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
      )}
    >
      {eyebrow ? (
        <Eyebrow tone={inverse ? "inverse" : "primary"}>{eyebrow}</Eyebrow>
      ) : null}

      <Heading
        as={as}
        size={size}
        align={align}
        tone={inverse ? "inverse" : "default"}
        className="max-w-2xl"
      >
        {title}
      </Heading>

      {description ? (
        <Text
          size="lead"
          align={align}
          tone={inverse ? "inverse" : "muted"}
          className="max-w-2xl"
        >
          {description}
        </Text>
      ) : null}
    </div>
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center",
        className,
      )}
    >
      {animate ? <Reveal>{content}</Reveal> : content}
      {action ? (
        <div className={cn("shrink-0", align === "center" && "sm:mt-2")}>
          {animate ? <Reveal delay={0.1}>{action}</Reveal> : action}
        </div>
      ) : null}
    </div>
  );
}
