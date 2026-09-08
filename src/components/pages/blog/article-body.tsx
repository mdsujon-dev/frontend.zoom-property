import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import type { ArticleBlock } from "@/data/insight-article";

/**
 * The rendered article.
 *
 * Blocks rather than an HTML string: the copy stays typed, nothing has to be
 * dangerously set, and each block gets the app's own type scale instead of a
 * prose plugin's opinion of it.
 *
 * Measure is capped at `max-w-[68ch]` — beyond roughly seventy characters the
 * eye loses the start of the next line, which is the single biggest thing that
 * makes a long read feel like work.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="flex max-w-[68ch] flex-col gap-6">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "lead":
            return (
              <Text
                key={index}
                size="lead"
                tone="default"
                className="leading-relaxed font-medium"
              >
                {block.text}
              </Text>
            );

          case "heading":
            return (
              <Heading key={index} as="h2" size="h4" className="mt-4">
                {block.text}
              </Heading>
            );

          case "paragraph":
            return (
              <Text key={index} size="base" className="leading-relaxed">
                {block.text}
              </Text>
            );

          case "list":
            return (
              <div
                key={index}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-muted/40 p-6"
              >
                <Heading as="h2" size="h6">
                  {block.title}
                </Heading>
                <ul className="flex flex-col gap-2.5">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Icon
                        name="check"
                        size="xs"
                        className="mt-1 shrink-0 text-primary"
                      />
                      <Text size="sm" className="leading-relaxed">
                        {item}
                      </Text>
                    </li>
                  ))}
                </ul>
              </div>
            );

          case "quote":
            return (
              <figure
                key={index}
                className="my-2 flex flex-col gap-4 border-l-2 border-primary py-1 pl-6"
              >
                <blockquote>
                  <Text size="lead" tone="default" className="leading-relaxed italic">
                    {block.text}
                  </Text>
                </blockquote>
                <figcaption className="text-sm font-semibold text-muted-foreground">
                  — {block.attribution}
                </figcaption>
              </figure>
            );
        }
      })}
    </div>
  );
}
