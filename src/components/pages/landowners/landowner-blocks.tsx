import Link from "next/link";

import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { RichText } from "@/components/common/rich-text";
import { Section } from "@/components/common/section";
import { Text } from "@/components/common/text";
import { ImageFrame } from "@/components/media/image-frame";
import { Reveal } from "@/components/motion/reveal";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import { getLandownerBlockPage } from "@/server/features/landowners";
import { cn } from "@/lib/utils";

/** How many blocks are on one page. */
const PER_PAGE = 4;

/** The anchor a page link lands on, so paging does not jump to the banner. */
const ANCHOR = "landowner-blocks";

/**
 * The landowner blocks: a photograph, a heading, a passage.
 *
 * Written and ordered in the panel. The sides alternate as the list runs —
 * picture left, then picture right — because a column of identical rows reads
 * as a table, and the desk should not have to think about layout to get a page
 * that looks composed.
 *
 * Paged through the URL rather than in the browser: each page is a real
 * address, so it can be linked, shared and indexed, and the page number
 * survives a refresh. The links carry `#landowner-blocks` so paging lands on
 * the section rather than scrolling the reader back to the banner.
 *
 * The whole section removes itself when nothing is published rather than
 * leaving a gap between the benefits and the steps.
 */
export async function LandownerBlocks({ page = 1 }: { page?: number }) {
  const [dict, locale, result] = await Promise.all([
    getDictionary(),
    getLocale(),
    getLandownerBlockPage(page, PER_PAGE),
  ]);

  if (!result.blocks.length) return null;

  const isBn = locale === "bn";
  const t = dict.landowners;
  const base = localeHref(locale, "/landowners");
  const href = (target: number) =>
    target <= 1 ? `${base}#${ANCHOR}` : `${base}?page=${target}#${ANCHOR}`;

  const { blocks, total, totalPages, page: current, from } = result;

  return (
    <Section id={ANCHOR} className="border-t border-border bg-background scroll-mt-24">
      <div className="flex flex-col gap-16 lg:gap-24">
        {blocks.map((block, index) => {
          // Alternate on the block's position in the whole list, not on this
          // page — otherwise every page would open with the picture on the
          // left and the rhythm would restart at each page break.
          const flipped = (from - 1 + index) % 2 === 1;

          return (
            <Reveal key={block.id}>
              <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                {block.image ? (
                  <div className={cn(flipped && "lg:order-2")}>
                    <ImageFrame
                      src={block.image}
                      alt={isBn ? block.titleBn : block.title}
                      ratio="4/3"
                      rounded="2xl"
                      sizes="half"
                      className="shadow-lg"
                    />
                  </div>
                ) : null}

                <div
                  className={cn(
                    "flex flex-col gap-4",
                    flipped && "lg:order-1",
                    // A block with no photograph gets the full width rather
                    // than half a row and an empty column beside it.
                    !block.image && "lg:col-span-2",
                  )}
                >
                  <Heading as="h2" size="h2" className="text-balance">
                    {isBn ? block.titleBn : block.title}
                  </Heading>

                  <RichText html={isBn ? block.descriptionBn : block.description} />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {totalPages > 1 ? (
        <Reveal
          delay={0.1}
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row"
        >
          <Text size="sm">
            {t.showing
              .replace("{from}", String(from))
              .replace("{to}", String(from + blocks.length - 1))
              .replace("{total}", String(total))}
          </Text>

          <nav
            className="flex items-center gap-2"
            // The count is already spelled out in the readout beside this
            // nav, so the landmark only has to name where you are.
            aria-label={t.page.replace("{page}", String(current))}
          >
            <Step
              href={href(current - 1)}
              label={t.prev}
              icon="chevronLeft"
              disabled={current === 1}
            />

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <Link
                key={number}
                href={href(number)}
                aria-current={number === current ? "page" : undefined}
                aria-label={t.page.replace("{page}", String(number))}
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
                  number === current
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
                )}
              >
                {number}
              </Link>
            ))}

            <Step
              href={href(current + 1)}
              label={t.next}
              icon="chevronRight"
              disabled={current === totalPages}
            />
          </nav>
        </Reveal>
      ) : null}
    </Section>
  );
}

/**
 * Previous / next.
 *
 * Disabled at the ends as a `span` rather than a dead link: a link that goes
 * nowhere is still focusable and still announced as a link.
 */
function Step({
  href,
  label,
  icon,
  disabled,
}: {
  href: string;
  label: string;
  icon: "chevronLeft" | "chevronRight";
  disabled: boolean;
}) {
  const shared =
    "flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors";

  if (disabled) {
    return (
      <span aria-hidden className={cn(shared, "opacity-40")}>
        <Icon name={icon} size="xs" />
      </span>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(shared, "bg-card hover:border-primary/40 hover:text-primary")}
    >
      <Icon name={icon} size="xs" />
    </Link>
  );
}

export default LandownerBlocks;
