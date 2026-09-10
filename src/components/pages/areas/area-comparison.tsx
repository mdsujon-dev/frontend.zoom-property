import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Reveal } from "@/components/motion/reveal";
import { areas as fallbackAreas, type Area } from "@/data/areas";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { formatBdt, numberFormatter } from "@/lib/format";

export async function AreaComparisonSection({
  areas: areasProp,
}: {
  areas?: Area[];
} = {}) {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const { comparison } = dict.pages;
  const col = comparison.columns;

  const areaList = areasProp && areasProp.length > 0 ? areasProp : fallbackAreas;
  const peak = Math.max(...areaList.map((area) => area.pricePerSqft || 0), 1);

  return (
    <Section className="border-t border-border bg-muted/30">
      <SectionHeading
        eyebrow={comparison.eyebrow}
        title={comparison.title}
        description={comparison.description}
      />

      <Reveal delay={0.1} className="mt-10">
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[880px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th scope="col" className="px-5 py-4 font-medium text-muted-foreground whitespace-nowrap">
                  {col.area}
                </th>
                <th scope="col" className="px-5 py-4 text-right font-medium text-muted-foreground whitespace-nowrap">
                  {col.listings}
                </th>
                <th scope="col" className="px-5 py-4 text-right font-medium text-muted-foreground whitespace-nowrap">
                  {col.median}
                </th>
                <th scope="col" className="px-5 py-4 font-medium text-muted-foreground whitespace-nowrap">
                  {col.perSqft}
                </th>
                <th scope="col" className="px-5 py-4 text-right font-medium text-muted-foreground whitespace-nowrap">
                  {col.yield}
                </th>
                <th scope="col" className="px-5 py-4 font-medium text-muted-foreground whitespace-nowrap">
                  {col.security}
                </th>
              </tr>
            </thead>
            <tbody>
              {areaList.map((area) => (
                <tr
                  key={area.id}
                  className="border-b border-border last:border-0 transition-colors hover:bg-muted/50"
                >
                  <th scope="row" className="px-5 py-4 text-left font-semibold text-foreground whitespace-nowrap">
                    {locale === "bn" && area.nameBn ? area.nameBn : area.name}
                    <span className="block text-xs font-normal text-muted-foreground">
                      {area.city}
                    </span>
                  </th>
                  <td className="px-5 py-4 text-right tabular-nums text-muted-foreground whitespace-nowrap">
                    {numberFormatter.format(area.listings || 0)}
                  </td>
                  <td className="px-5 py-4 text-right font-medium tabular-nums text-foreground whitespace-nowrap">
                    {area.medianPrice ? formatBdt(area.medianPrice) : "—"}
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="w-20 shrink-0 tabular-nums text-foreground whitespace-nowrap">
                        {area.pricePerSqft ? `৳${numberFormatter.format(area.pricePerSqft)}` : "—"}
                      </span>
                      <span
                        aria-hidden
                        className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-border"
                      >
                        <span
                          className="block h-full rounded-full bg-primary"
                          style={{
                            width: `${Math.round(((area.pricePerSqft || 0) / peak) * 100)}%`,
                          }}
                        />
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-right tabular-nums text-foreground whitespace-nowrap">
                    {area.rentalYield || "—"}
                  </td>
                  <td className="px-5 py-4 text-xs text-muted-foreground whitespace-nowrap">
                    {area.securityTier || "—"}
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
