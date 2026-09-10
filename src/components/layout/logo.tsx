import Image from "@/components/common/image";

import { cn } from "@/lib/utils";

/**
 * The brand lockup.
 *
 * The site is light-only, so `auto` is simply the standard lockup. `onDark`
 * swaps in `logo-dark.png` for the one place a dark ground exists — the header
 * while it sits over the home page's photographic hero.
 *
 * Two files rather than a CSS filter: the wordmark is charcoal and the arch is
 * green, and a filter that lightens the wordmark would drag the arch with it.
 * Only the wordmark is recoloured in `logo-dark.png` — which is exactly the
 * reversed lockup the brand guideline shows.
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

  return (
    <div
      className={cn(
        "relative inline-flex shrink-0 items-center aspect-[900/303]",
        className,
      )}
    >
      <Image
        src="/logo-dark.png"
        alt="Zoom Property"
        {...dimensions}
        priority={priority}
        className={cn(
          "h-full w-auto object-contain transition-opacity duration-300",
          variant === "onDark"
            ? "opacity-100"
            : "pointer-events-none absolute inset-0 opacity-0",
        )}
      />
      <Image
        src="/logo.png"
        alt="Zoom Property"
        {...dimensions}
        priority={priority}
        className={cn(
          "h-full w-auto object-contain transition-opacity duration-300",
          variant === "onDark"
            ? "pointer-events-none absolute inset-0 opacity-0"
            : "opacity-100",
        )}
      />
    </div>
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
