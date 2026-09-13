import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { ImageFrame } from "@/components/media/image-frame";
import { Button } from "@/components/ui/button";
import type { Agent } from "@/data/people";
import { telHref, whatsappHref } from "@/lib/contact";
import { cn } from "@/lib/utils";

export interface AgentCardDict {
  call: string;
  whatsapp: string;
  dealsLabel: string;
  repliesLabel: string;
}

/**
 * Agents get a response time, not a job title alone.
 *
 * "Replies in ~8 min" is the single most useful thing you can tell someone
 * deciding whether to call — and it is a promise the business has to keep,
 * which is the point. It sits in its own pill under the stats so it is the
 * last thing read before the buttons.
 *
 * Rating rides on the portrait as a small badge: it is the one number people
 * look for first, and next to the face is where the eye already is.
 */
export function AgentCard({
  agent,
  dict,
  locale = "en",
  className,
}: {
  agent: Agent;
  dict: AgentCardDict;
  locale?: string;
  className?: string;
}) {
  const name = locale === "bn" && agent.nameBn ? agent.nameBn : agent.name;
  const role = locale === "bn" && agent.roleBn ? agent.roleBn : agent.role;

  return (
    <article
      className={cn(
        // Soft brand-tinted shadow: two layers, a tight one for the edge and
        // a wide diffuse one underneath, so the card lifts off the page
        // without a hard grey drop. Hover deepens both and lifts the card.
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border/60 bg-card transition-all duration-300 ease-out",
        "shadow-[0_1px_2px_rgba(27,35,24,0.04),0_8px_24px_-8px_rgba(75,128,45,0.18)]",
        "hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_2px_4px_rgba(27,35,24,0.06),0_20px_40px_-12px_rgba(75,128,45,0.32)]",
        className,
      )}
    >
      {/* Brand band behind the portrait so the card has a top and the face
          does not float on white. */}
      <div aria-hidden className="h-20 bg-linear-to-br from-primary to-brand-green" />

      <div className="-mt-12 flex flex-1 flex-col items-center px-5 pb-5 text-center">
        <div className="relative">
          <ImageFrame
            src={agent.image}
            alt={name}
            ratio="square"
            rounded="full"
            sizes="96px"
            className="size-24 ring-4 ring-card shadow-[0_6px_16px_-4px_rgba(27,35,24,0.25)]"
          />
          <span className="absolute -bottom-1 -right-1 flex items-center gap-0.5 rounded-full border border-card bg-card px-2 py-0.5 text-xs font-bold text-foreground shadow-[0_2px_8px_-2px_rgba(27,35,24,0.2)]">
            <Icon name="star" size="xs" className="text-brand" />
            {agent.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-0.5">
          <Heading as="h3" size="h6" weight="bold">
            {name}
          </Heading>
          <span className="text-sm text-muted-foreground">{role}</span>
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {agent.patch.map((place) => (
            <span
              key={place}
              className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
            >
              <Icon name="location" size="xs" className="size-3" />
              {place}
            </span>
          ))}
        </div>

        <dl className="mt-4 grid w-full grid-cols-2 gap-2">
          <Metric icon="check" value={String(agent.deals)} label={dict.dealsLabel} />
          <Metric
            icon="clock"
            value={`~${agent.respondsIn}m`}
            label={dict.repliesLabel}
          />
        </dl>

        <div className="mt-auto flex w-full gap-2 pt-5">
          <Button
            asChild
            size="lg"
            className="flex-1 gap-2 shadow-[0_4px_12px_-4px_rgba(75,128,45,0.45)] transition-shadow group-hover:shadow-[0_6px_16px_-4px_rgba(75,128,45,0.55)]"
          >
            <a href={telHref(agent.phone)}>
              <Icon name="phone" size="xs" />
              {dict.call}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="icon-lg"
            aria-label={dict.whatsapp}
            title={dict.whatsapp}
            className="shrink-0 border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#1da851]"
          >
            <a href={whatsappHref(agent.phone)} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" size="sm" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

function Metric({
  icon,
  value,
  label,
}: {
  icon: "check" | "clock";
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-md bg-muted/70 px-2 py-2.5">
      <dd className="flex items-center gap-1 font-heading text-base font-bold text-foreground">
        <Icon name={icon} size="xs" className="text-primary" />
        {value}
      </dd>
      <dt className="text-[11px] leading-tight text-muted-foreground">{label}</dt>
    </div>
  );
}
