import { Section } from "@/components/common/section";
import { Text } from "@/components/common/text";
import { Counter } from "@/components/motion/counter";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { stats } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";

export async function StatsSection() {
  const dict = await getDictionary();

  return (
    <Section spacing="md" className="border-b border-border bg-background">
      <Stagger className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StaggerItem
            key={dict.content.stats[index]}
            className="flex flex-col gap-1.5 rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <span className="font-heading text-3xl font-extrabold text-primary sm:text-4xl">
              <Counter
                to={stat.value}
                compact={"compact" in stat ? stat.compact : false}
                suffix={"suffix" in stat ? stat.suffix : ""}
              />
            </span>
            <Text size="sm" className="font-medium text-muted-foreground">
              {dict.content.stats[index]}
            </Text>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
