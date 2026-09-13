import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Mirrors `PropertyCard` block for block so the grid does not jump on load. */
export function PropertyCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_1px_2px_rgba(27,35,24,0.04),0_8px_24px_-8px_rgba(75,128,45,0.12)]",
        className,
      )}
    >
      {/* Photo */}
      <Skeleton className="aspect-4/3 w-full rounded-none" />

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 px-5 pt-4 pb-4">
        <Skeleton className="h-7 w-32" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="mt-1 h-4 w-1/2" />
        </div>
        <div className="mt-auto grid grid-cols-4 gap-1.5 pt-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-14 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border/70 px-5 py-3">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="size-7 rounded-full" />
      </div>
    </div>
  );
}

export function PropertyGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <PropertyCardSkeleton key={i} />
      ))}
    </div>
  );
}
