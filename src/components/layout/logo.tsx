import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * The brand lockup.
 *
 * The site is light-only, so `auto` is simply the navy lockup. `onDark` swaps
 * in `logo-dark.png` for the one place a dark ground exists — the header while
 * it sits over the home page's photographic hero.
 *
 * Two files rather than a CSS filter: the wordmark is navy and the arch is red,
 * and a filter that lightens the navy would drag the red with it. Only the navy
 * is recoloured in `logo-dark.png`.
 */
export function Logo({
  className,
  variant = "auto",
  priority = false,
}: {
  className?: string;
  variant?: "auto" | "onDark";
  priority?: boolean;
}) {
  const dimensions = { width: 900, height: 303 };

  if (variant === "onDark") {
    return (
      <Image
        src="/logo-dark.png"
        alt="Zoom Property"
        {...dimensions}
        priority={priority}
        className={cn("h-auto w-auto", className)}
      />
    );
  }

  return (
    <Image
      src="/logo.png"
      alt="Zoom Property"
      {...dimensions}
      priority={priority}
      className={cn("h-auto w-auto", className)}
    />
  );
}

/** Square arch mark, for tight spots where the full lockup will not fit. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/mark.png"
      alt="Zoom Property"
      width={512}
      height={512}
      className={cn("size-8", className)}
    />
  );
}
