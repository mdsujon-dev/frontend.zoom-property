export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm animate-pulse">
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted" />

      <div className="flex flex-col gap-3 p-1">
        {/* Title placeholder */}
        <div className="h-6 w-3/4 rounded-md bg-muted" />

        {/* Details row placeholder */}
        <div className="flex items-center gap-4">
          <div className="h-4 w-1/3 rounded-md bg-muted" />
          <div className="h-4 w-1/4 rounded-md bg-muted" />
        </div>

        {/* Location placeholder */}
        <div className="mt-2 h-4 w-2/3 rounded-md bg-muted" />

        {/* Footer info placeholder */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="h-4 w-1/4 rounded-md bg-muted" />
          <div className="h-8 w-8 rounded-full bg-muted" />
        </div>
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
