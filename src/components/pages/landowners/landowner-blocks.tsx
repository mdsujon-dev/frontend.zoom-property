import { Heading } from "@/components/common/heading";
import { RichText } from "@/components/common/rich-text";
import { Section } from "@/components/common/section";
import { ImageFrame } from "@/components/media/image-frame";
import { Reveal } from "@/components/motion/reveal";
import { getLocale } from "@/i18n/dictionaries";
import { getLandownerBlocks } from "@/server/features/landowners";
import { cn } from "@/lib/utils";

/**
 * The landowner blocks: a photograph, a heading, a passage.
 *
 * Written and ordered in the panel. The sides alternate as the list runs —
 * picture left, then picture right — because a column of identical rows reads
 * as a table, and the desk should not have to think about layout to get a page
 * that looks composed.
 *
 * The whole section removes itself when nothing is published rather than
 * leaving a gap between the benefits and the steps.
 */
export async function LandownerBlocks() {
  const [locale, blocks] = await Promise.all([
    getLocale(),
    getLandownerBlocks(),
  ]);

  if (!blocks.length) return null;

  const isBn = locale === "bn";

  return (
    <Section className="border-t border-border bg-background">
      <div className="flex flex-col gap-16 lg:gap-24">
        {blocks.map((block, index) => {
          const flipped = index % 2 === 1;

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
    </Section>
  );
}

export default LandownerBlocks;
