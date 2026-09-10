import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { getDictionary } from "@/i18n/dictionaries";

export async function VettingSection() {
  const dict = await getDictionary();
  const { vetting } = dict.pages;

  return (
    <Section className="border-t border-border bg-background">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            title={vetting.title}
            className="lg:flex-col lg:items-start"
          />
          <Reveal delay={0.2} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border mt-auto hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80" 
              alt="Vetting Process" 
              className="absolute inset-0 h-full w-full object-cover"
            />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <ol className="flex flex-col divide-y divide-border rounded-xl border border-border bg-card">
            {vetting.checks.map((check, index) => (
              <li key={check} className="flex items-start gap-4 p-5">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon name="check" size="xs" />
                </span>
                <span className="flex-1 text-sm text-foreground">{check}</span>
                <span className="font-heading text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
