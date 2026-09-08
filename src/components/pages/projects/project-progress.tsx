import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export interface ProjectProgressDict {
  heading: string;
  lead: string;
  complete: string;
  handover: string;
  lastInspected: string;
  permit: string;
  liveCctv: string;
  done: string;
  inProgress: string;
  notStarted: string;
}

/**
 * Where the building actually is.
 *
 * This is the page: on an under-construction sale a buyer is paying for years
 * against a promise, and the only thing that makes the promise checkable is the
 * stage, who last stood on the site, and the permit it is being built under.
 * So those three sit together, above the render and above the price.
 *
 * The bars are drawn from the same `percent` the milestone carries — no second
 * source, and nothing rounded up for the look of it. A stage at zero still gets
 * its row: leaving it out would make a project that has not started look like
 * one that is halfway through.
 */
export function ProjectProgress({
  project,
  dict,
}: {
  project: Project;
  dict: ProjectProgressDict;
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Heading as="h2" size="h4">
          {dict.heading}
        </Heading>
        <Text className="max-w-2xl leading-relaxed">{dict.lead}</Text>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <span className="flex items-baseline gap-2">
            <span className="font-heading text-h2 font-bold text-primary tabular-nums">
              {project.progress}%
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {dict.complete}
            </span>
          </span>

          <span className="flex flex-col text-sm sm:items-end">
            <span className="text-xs text-muted-foreground">
              {dict.handover}
            </span>
            <span className="font-heading font-bold text-foreground">
              {project.handover}
            </span>
          </span>
        </div>

        <div
          className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
          role="img"
          aria-label={`${project.progress}% ${dict.complete}`}
        >
          <div
            className="h-full rounded-full bg-linear-to-r from-primary to-brand-blue"
            style={{ width: `${project.progress}%` }}
          />
        </div>

        <ul className="flex flex-col divide-y divide-border/70">
          {project.milestones.map((milestone) => {
            const state = milestone.completed
              ? dict.done
              : milestone.percent > 0
                ? dict.inProgress
                : dict.notStarted;

            return (
              <li
                key={milestone.label}
                className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="flex min-w-0 items-center gap-2 text-sm font-medium text-foreground">
                    <Icon
                      name={milestone.completed ? "check" : "construction"}
                      size="xs"
                      className={cn(
                        "shrink-0",
                        milestone.completed
                          ? "text-primary"
                          : "text-muted-foreground",
                      )}
                    />
                    <span className="truncate">{milestone.label}</span>
                  </span>

                  <span className="flex shrink-0 items-baseline gap-2">
                    <span className="text-[11px] text-muted-foreground">
                      {state}
                    </span>
                    <span className="font-heading text-sm font-bold text-foreground tabular-nums">
                      {milestone.percent}%
                    </span>
                  </span>
                </div>

                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      milestone.completed ? "bg-primary" : "bg-primary/50",
                    )}
                    style={{ width: `${milestone.percent}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <Chip icon="approved">
            {dict.lastInspected}: {project.lastInspected}
          </Chip>

          <Chip icon="shield">
            {dict.permit}: {project.rajukPermitNo}
          </Chip>

          {project.cctvStreamActive ? (
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-600 motion-reduce:animate-none" />
              {dict.liveCctv}
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function Chip({
  icon,
  children,
}: {
  icon: "approved" | "shield";
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5 rounded-full border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
      <Icon name={icon} size="xs" className="text-primary" />
      {children}
    </span>
  );
}
