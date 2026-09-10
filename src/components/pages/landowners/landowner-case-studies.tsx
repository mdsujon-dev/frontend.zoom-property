import { Heading } from "@/components/common/heading";
import { ImageFrame } from "@/components/media/image-frame";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { getLandownerProjects } from "@/server/features/landowners";

/**
 * Completed joint ventures, as evidence.
 *
 * A landowner is being asked to hand over the one asset they cannot replace,
 * so the page has to show finished buildings rather than promises: what the
 * plot was, how tall it went, what share the owner kept, and the year it was
 * actually handed over.
 *
 * The records come from the Landowners module in the panel. When the API
 * cannot be reached the built-in examples stand in, and when the desk has
 * published none the section takes itself off the page rather than printing an
 * empty grid under a heading about a track record.
 */
export async function LandownerCaseStudies() {
  const [dict, locale, projects] = await Promise.all([
    getDictionary(),
    getLocale(),
    getLandownerProjects(),
  ]);

  if (!projects.length) return null;

  const t = dict.landowners;
  const c = t.columns;
  const isBn = locale === "bn";

  return (
    <Section className="border-t border-border bg-background">
      <SectionHeading eyebrow={t.eyebrow} title={t.builtTitle} />
      <Text size="sm" className="mt-2 max-w-2xl text-muted-foreground">
        {t.builtLead}
      </Text>

      <Stagger className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((jv) => (
          <StaggerItem key={jv.name}>
            <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/50 sm:flex-row">
              <div className="w-full shrink-0 overflow-hidden rounded-xl sm:w-44">
                <ImageFrame
                  src={jv.image}
                  alt={jv.name}
                  ratio="4/3"
                  rounded="xl"
                  sizes="thumb"
                />
              </div>

              <div className="flex flex-col justify-center gap-1.5 py-1">
                {jv.completedYear ? (
                  <span className="text-[11px] font-bold uppercase text-primary">
                    {c.completed} {jv.completedYear}
                  </span>
                ) : null}

                <Heading as="h3" size="h6" className="text-foreground">
                  {jv.name}
                </Heading>

                {jv.location ? (
                  <Text size="xs" className="text-muted-foreground">
                    {jv.location}
                  </Text>
                ) : null}

                {/* The three numbers a landowner reads first. Each is dropped
                    rather than printed as a zero when the desk has not filled
                    it in — "0 Katha" is worse than nothing. */}
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-2 text-xs font-medium text-foreground/80">
                  {jv.landSizeKatha ? (
                    <span>
                      {jv.landSizeKatha} {isBn ? "কাঠা" : "Katha"}
                    </span>
                  ) : null}
                  {jv.floors ? (
                    <>
                      <span aria-hidden>·</span>
                      <span>
                        {jv.floors} {c.floors}
                      </span>
                    </>
                  ) : null}
                  {jv.ownerSharePercent ? (
                    <>
                      <span aria-hidden>·</span>
                      <span className="font-bold text-primary">
                        {jv.ownerSharePercent}% {c.share}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

export default LandownerCaseStudies;
