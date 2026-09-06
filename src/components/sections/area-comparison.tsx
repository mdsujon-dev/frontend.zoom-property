import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Reveal } from "@/components/motion/reveal";
import { areas } from "@/data/areas";
import { getDictionary } from "@/i18n/dictionaries";
import { formatBdt, numberFormatter } from "@/lib/format";

/**
 * /areas — the comparison table.
 *
 * A table, not cards. The whole point of this page is reading one column down
 * across six neighbourhoods, and cards make that impossible. The tiles above it
 * sell the place; this tells you whether you can afford it.
 *
 * The table scrolls inside its own container so the page body never scrolls
 * sideways on a phone.
 */
export async function AreaComparisonSection() {
  const dict = await getDictionary();
  const { comparison } = dict.pages;
  const col = comparison.columns;

  // Highest price per sq ft anchors the bar widths.
  const peak = Math.max(...areas.map((area) => area.pricePerSqft));

  return (
    <Section className="border-t border-border bg-muted/30">
      <SectionHeading
        eyebrow={comparison.eyebrow}
        title={comparison.title}
        description={comparison.description}
      />

      <Reveal delay={0.1} className="mt-10">
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th scope="col" className="px-5 py-4 font-medium text-muted-foreground">
                  {col.area}
                </th>
                <th scope="col" className="px-5 py-4 text-right font-medium text-muted-foreground">
                  {col.listings}
                </th>
                <th scope="col" className="px-5 py-4 text-right font-medium text-muted-foreground">
                  {col.median}
                </th>
                <th scope="col" className="px-5 py-4 font-medium text-muted-foreground">
                  {col.perSqft}
                </th>
                <th scope="col" className="px-5 py-4 text-right font-medium text-muted-foreground">
                  {col.yield}
                </th>
                <th scope="col" className="px-5 py-4 font-medium text-muted-foreground">
                  {col.security}
                </th>
              </tr>
            </thead>
            <tbody>
              {areas.map((area) => (
                <tr
                  key={area.id}
                  className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
                >
                  <th scope="row" className="px-5 py-4 text-left font-semibold text-foreground">
                    {area.name}
                    <span className="block text-xs font-normal text-muted-foreground">
                      {area.city}
                    </span>
                  </th>
                  <td className="px-5 py-4 text-right tabular-nums text-muted-foreground">
                    {numberFormatter.format(area.listings)}
                  </td>
                  <td className="px-5 py-4 text-right font-medium tabular-nums text-foreground">
                    {formatBdt(area.medianPrice)}
                  </td>
                  {/* Inline bar: the relative gap between areas is the story,
                      and it reads faster than six four-digit numbers.

                      Fixed-width track with a proportional fill inside — a
                      percentage width on a flex *item* resolves against the
                      row and then gets shrunk, so every bar comes out the
                      same length. */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-20 shrink-0 tabular-nums text-foreground">
                        ৳{numberFormatter.format(area.pricePerSqft)}
                      </span>
                      <span
                        aria-hidden
                        className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-border"
                      >
                        <span
                          className="block h-full rounded-full bg-primary"
                          style={{
                            width: `${Math.round((area.pricePerSqft / peak) * 100)}%`,
                          }}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right tabular-nums text-foreground">
                    {area.rentalYield}
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground">
                    {area.securityTier}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Text size="xs" className="mt-3 text-muted-foreground">
          {comparison.note}
        </Text>
      </Reveal>
    </Section>
  );
}
