import { cn } from "@/lib/utils";

export function LandownerBlockSkeleton({ flipped }: { flipped?: boolean }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14 animate-pulse">
      <div
        className={cn(
          "h-56 sm:h-72 lg:h-[26rem] w-full rounded-2xl bg-muted shadow-lg",
          flipped && "lg:order-2"
        )}
      />

      <div
        className={cn(
          "flex flex-col gap-4",
          flipped && "lg:order-1"
        )}
      >
        <div className="h-10 w-3/4 rounded bg-muted" />
        <div className="h-10 w-1/2 rounded bg-muted" />

        <div className="mt-4 flex flex-col gap-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-11/12 rounded bg-muted" />
          <div className="h-4 w-10/12 rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
