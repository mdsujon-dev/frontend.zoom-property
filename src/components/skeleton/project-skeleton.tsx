import { Skeleton } from "@/components/ui/skeleton";

/** Mirrors `ProjectCard` block for block so the grid does not jump on load. */
export function ProjectCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_1px_2px_rgba(27,35,24,0.04),0_8px_24px_-8px_rgba(75,128,45,0.12)]">
      {/* Photo with title overlay */}
      <Skeleton className="aspect-3/2 w-full rounded-none" />

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 px-5 pt-4 pb-4">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-7 w-32" />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="mt-auto h-4 w-1/2" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-border/70 px-5 py-3">
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="size-7 rounded-full" />
      </div>
    </div>
  );
}

export function ProjectGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </>
  );
}
