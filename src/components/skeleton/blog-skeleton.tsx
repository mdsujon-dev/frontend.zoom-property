import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function BlogGridSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full flex-col gap-4", className)}>
      <div className="relative">
        <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
        
        {/* Byline bar skeleton */}
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl border border-white/15 bg-black/20 px-3 py-2 backdrop-blur-md">
          <Skeleton className="h-3 w-20 bg-white/40" />
          <span aria-hidden className="size-1 shrink-0 rounded-full bg-white/50" />
          <Skeleton className="ml-auto h-3 w-16 bg-white/40" />
        </div>
      </div>
      
      {/* Title skeleton */}
      <div className="flex flex-col gap-2 pt-1">
        <Skeleton className="h-6 w-[85%]" />
        <Skeleton className="h-6 w-[60%]" />
      </div>

      {/* Excerpt skeleton */}
      <div className="flex flex-col gap-1.5 mt-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[90%]" />
      </div>

      {/* Read more skeleton */}
      <Skeleton className="h-4 w-24 mt-auto" />
    </div>
  );
}
