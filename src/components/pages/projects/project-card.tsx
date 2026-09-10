import Link from "next/link";

import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { formatBdt } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  locale = "en",
  className,
}: {
  project: Project;
  /** Needed for the link. Defaults to English, the default locale. */
  locale?: Locale;
  className?: string;
}) {
  const sold = project.units - project.unitsLeft;
  const soldPercent = Math.round((sold / project.units) * 100);

  return (
    <Link
      href={localeHref(locale, `/projects/${project.slug}`)}
      aria-label={`${project.name}, ${project.area}`}
      className="block h-full"
    >
      <Card
        // Anchor target for the footer's project line — the cards are the only
        // page a project has, so `/projects#<id>` is its address.
        id={project.id}
        className={cn(
          "scroll-mt-24",
          "group h-full overflow-hidden p-0 border border-border bg-card transition-all duration-500 ease-out-expo hover:border-primary/60 hover:shadow-xl",
          className,
        )}
      >
        <ImageFrame
          src={project.image}
          alt={`${project.name}, ${project.area}`}
          ratio="3/2"
          rounded="none"
          sizes="third"
        >
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 z-10">
            <Badge
              className={cn(
                "font-semibold px-2.5 py-1 text-xs shadow-md border-0 gap-1.5",
                project.status?.toLowerCase() === "completed" || project.status?.toLowerCase() === "done"
                  ? "bg-emerald-600 text-white"
                  : project.status?.toLowerCase() === "processing" || project.status?.toLowerCase() === "under construction"
                  ? "bg-amber-600 text-white"
                  : "bg-indigo-600 text-white",
              )}
            >
              <Icon
                name={
                  project.status?.toLowerCase() === "completed" || project.status?.toLowerCase() === "done"
                    ? "check"
                    : project.status?.toLowerCase() === "processing"
                    ? "construction"
                    : "building"
                }
                size="xs"
              />
              {project.status}
            </Badge>

            {project.cctvStreamActive ? (
              <span className="flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live CCTV
              </span>
            ) : null}
          </div>

          <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white/85 border border-white/15 backdrop-blur-md">
            Inspected: {project.lastInspected}
          </span>
        </ImageFrame>

        <CardContent className="flex flex-col gap-4 px-5 pt-5 pb-5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Heading
                as="h3"
                size="h5"
                className="text-foreground group-hover:text-primary transition-colors"
              >
                {project.name}
              </Heading>
            </div>
            <Text
              size="sm"
              className="flex items-center gap-1.5 text-muted-foreground"
            >
              <Icon name="location" size="xs" className="text-primary/70" />
              {project.area}, {project.city}
            </Text>
          </div>

          {/* Progress Bar in Warm Gold */}
          <div className="flex flex-col gap-2 rounded-xl bg-secondary p-3 border border-border">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-semibold text-primary flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-primary" />
                Progress: {project.progress}% Complete
              </span>
              <span className="text-xs text-muted-foreground">
                Handover:{" "}
                <strong className="text-foreground">{project.handover}</strong>
              </span>
            </div>

            <div
              className="h-2 w-full overflow-hidden rounded-full bg-background"
              role="img"
              aria-label={`${project.progress} percent complete`}
            >
              <div
                className="h-full rounded-full bg-linear-to-r from-primary to-primary/60 transition-all duration-1000"
                style={{ width: `${project.progress}%` }}
              />
            </div>

            {/* Sub-milestones */}
            <div className="grid grid-cols-2 gap-1.5 pt-1.5 border-t border-primary/10">
              {project.milestones.slice(0, 2).map((m) => (
                <div
                  key={m.label}
                  className="flex items-center justify-between text-[11px]"
                >
                  <span className="text-muted-foreground truncate">
                    {m.label}
                  </span>
                  <span
                    className={cn(
                      "font-medium",
                      m.completed ? "text-primary" : "text-foreground/70",
                    )}
                  >
                    {m.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-3">
            <Stat
              label="Starting From"
              value={formatBdt(project.startingPrice)}
              isHighlight
            />
            <Stat label="Floor Sizes" value={project.sizeRange} />
            <Stat
              label="Availability"
              value={`${project.unitsLeft} of ${project.units} Units Left`}
            />
            <Stat label="Reserved / Sold" value={`${soldPercent}% Booked`} />
          </dl>
        </CardContent>
      </Card>
    </Link>
  );
}

function Stat({
  label,
  value,
  isHighlight = false,
}: {
  label: string;
  value: string;
  isHighlight?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd
        className={cn(
          "text-sm font-semibold",
          isHighlight ? "text-primary font-bold text-base" : "text-foreground",
        )}
      >
        {value}
      </dd>
    </div>
  );
}
