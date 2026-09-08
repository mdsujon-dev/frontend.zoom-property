import { AppContainer } from "@/components/common/app-container";
import { Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { HeroBackdrop } from "@/components/pages/home/hero-backdrop";
import { PropertyCalculator } from "@/components/pages/home/property-calculator";
import { Badge } from "@/components/ui/badge";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`;

/**
 * The backdrop rotation. Four addresses rather than four angles on one
 * building: the hero is the first claim the site makes about what it sells, and
 * a penthouse, a lakefront block and a lit facade at dusk make that claim
 * wider than four views of the same villa.
 */
const HERO_IMAGES = [
  photo("photo-1600596542815-ffad4c1539a9"),
  photo("photo-1600607687939-ce8a6c25118c"),
  photo("photo-1613977257363-707ba9348227"),
  photo("photo-1512917774080-9991f1c4c750"),
];

export async function HeroSection() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
      <Parallax speed={0.18} zoom className="absolute inset-0 -z-10">
        <HeroBackdrop images={HERO_IMAGES} />
      </Parallax>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/70 to-black/40"
      />

      <AppContainer className="pb-16 pt-36">
        {/* Copy left, calculator right. They stack under `lg`, where two
            columns would leave the search box too narrow to type an area into. */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-14">
          <div className="flex flex-col gap-6">
            <Reveal>
              <Badge className="w-fit gap-1.5 px-3 py-1 text-xs font-semibold">
                <Icon name="approved" size="xs" />
                {dict.hero.badge}
              </Badge>
            </Reveal>

            <Heading as="h1" size="h1" className="text-white">
              {dict.hero.title}
            </Heading>

            <Reveal delay={0.12}>
              <Text size="lead" className="max-w-2xl leading-relaxed text-white/80">
                {dict.hero.lead}
              </Text>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <PropertyCalculator dict={dict.calculator} locale={locale} />
          </Reveal>
        </div>
      </AppContainer>
    </section>
  );
}
