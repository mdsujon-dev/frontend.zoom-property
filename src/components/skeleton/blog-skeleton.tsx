import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/** Mirrors `BlogStandardCard` block for block so the grid does not jump on load. */
export function BlogGridSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border border-border/60 bg-card shadow-[0_1px_2px_rgba(27,35,24,0.04),0_8px_24px_-8px_rgba(75,128,45,0.12)]",
        className,
      )}
    >
      {/* Photo */}
      <Skeleton className="aspect-3/2 w-full rounded-none" />

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2.5 px-5 pt-4 pb-4">
        <Skeleton className="h-3 w-24" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-[90%]" />
          <Skeleton className="h-5 w-[65%]" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[85%]" />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border/70 px-5 py-3">
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="size-7 rounded-full" />
      </div>
    </div>
  );
}
