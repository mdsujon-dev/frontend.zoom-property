import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { AgentCard } from "./agent-card";
import { getAgents } from "@/server";
import { getDictionary } from "@/i18n/dictionaries";

export async function AgentsSection() {
  const [dict, agents] = await Promise.all([getDictionary(), getAgents()]);

  return (
    <Section id="agents" className="border-t border-border bg-background">
      <SectionHeading
        title={dict.agentsSection.title}
      />

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {agents.map((agent) => (
          <StaggerItem key={agent.id}>
            <AgentCard agent={agent} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
