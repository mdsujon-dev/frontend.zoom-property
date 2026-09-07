import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Agent } from "@/data/people";
import { cn } from "@/lib/utils";

/**
 * Agents get a response time, not a job title alone.
 *
 * "Responds in ~8 min" is the single most useful thing you can tell someone
 * deciding whether to call — and it is a promise the business has to keep,
 * which is the point.
 */
export function AgentCard({
  agent,
  className,
}: {
  agent: Agent;
  className?: string;
}) {
  return (
    <Card className={cn("h-full p-0", className)}>
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
        <ImageFrame
          src={agent.image}
          alt={agent.name}
          ratio="square"
          rounded="full"
          sizes="quarter"
          className="w-24"
        />

        <div className="flex flex-col gap-1">
          <Heading as="h3" size="h6">
            {agent.name}
          </Heading>
          <Text size="sm">{agent.role}</Text>
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          {agent.patch.map((place) => (
            <span
              key={place}
              className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
            >
              {place}
            </span>
          ))}
        </div>

        <dl className="grid w-full grid-cols-3 gap-2 border-y py-3">
          <Metric label="Deals" value={String(agent.deals)} />
          <Metric label="Rating" value={agent.rating.toFixed(1)} />
          <Metric label="Replies" value={`${agent.respondsIn}m`} />
        </dl>

        <Button variant="outline" size="sm" className="w-full gap-2">
          <Icon name="phone" size="xs" />
          Contact {agent.name.split(" ")[0]}
        </Button>
      </CardContent>
    </Card>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <dd className="font-heading text-h6 text-foreground">{value}</dd>
      <dt className="text-xs text-muted-foreground">{label}</dt>
    </div>
  );
}
