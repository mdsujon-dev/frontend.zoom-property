import { Heading } from "@/components/common/heading";
import { OrnamentDivider } from "@/components/common/ornament-divider";
import { Reveal } from "@/components/motion/reveal";

/**
 * Two-tone title, then the ornament rule. Shared with `/areas` so the two pages
 * open the same way.
 *
 * No eyebrow and no lead paragraph: the title says where we work, and the
 * divider closes it off — which is what that mark is for, standing in for a
 * sentence rather than adding one.
 *
 * The title is three dictionary strings rather than one with markup in it:
 * translators need to move the accent to a different position in the sentence,
 * and Bangla does exactly that.
 */
export function AreasHeading({
  t,
}: {
  t: {
    titleLead: string;
    titleAccent: string;
    titleTail: string;
  };
}) {
  return (
    <Reveal>
      <div className="flex flex-col items-center gap-4 text-center">
        <Heading as="h2" size="h2" align="center" className="max-w-4xl">
          {t.titleLead ? `${t.titleLead.trimEnd()} ` : ""}
          <span className="text-brand-green-dark">{t.titleAccent?.trim()}</span>
          {t.titleTail ? ` ${t.titleTail.trimStart()}` : ""}
        </Heading>

        <OrnamentDivider className="mt-3" />
      </div>
    </Reveal>
  );
}
