import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function PropertyCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn("h-full overflow-hidden p-0 border border-border bg-card", className)}>
      {/* Image Frame */}
      <Skeleton className="aspect-[4/3] w-full rounded-none" />

      {/* Content */}
      <CardContent className="flex flex-col gap-3 px-5 pt-5 pb-2">
        {/* Price and Purpose */}
        <div className="flex items-baseline justify-between gap-3">
          <Skeleton className="h-7 w-28" />
          <Skeleton className="h-5 w-16 rounded-md" />
        </div>

        {/* Title and Location */}
        <div className="flex flex-col gap-2 mt-1">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-4/5 mt-1" />
        </div>
      </CardContent>

      {/* Footer / Specs */}
      <CardFooter className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-border bg-muted/30 px-5 py-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </CardFooter>
    </Card>
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
