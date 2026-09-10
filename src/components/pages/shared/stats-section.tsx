import { Section } from "@/components/common/section";
import { Text } from "@/components/common/text";
import { Counter } from "@/components/motion/counter";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getDictionary } from "@/i18n/dictionaries";

export async function StatsSection() {
  const dict = await getDictionary();

  return (
    <Section spacing="md" className="border-b border-border bg-background">
      <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {dict.about.stats?.map((stat, index) => (
          <StaggerItem
            key={index}
            className="flex flex-col gap-1.5 rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <span className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
              <Counter
                to={Number(stat.value)}
                compact={stat.compact === "true"}
                suffix={stat.suffix || ""}
              />
            </span>
            <Text size="sm" className="font-medium text-muted-foreground">
              {stat.label}
            </Text>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
