import Image from "@/components/common/image";
import { AppContainer } from "@/components/common/app-container";
import { Heading } from "@/components/common/heading";
import { Icon, type IconName } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { PropertySearch } from "@/components/pages/properties/property-search";
import { Badge } from "@/components/ui/badge";
import { getDictionary } from "@/i18n/dictionaries";
import { shimmerDataUrl } from "@/lib/image";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80";

const TRUST_ICONS: IconName[] = ["approved", "clock", "gallery", "check"];

export async function HeroSection() {
  const dict = await getDictionary();
  const trust = [
    dict.hero.trust.rajuk,
    dict.hero.trust.reply,
    dict.hero.trust.photos,
    dict.hero.trust.fees,
  ];

  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
      <Parallax speed={0.18} zoom className="absolute inset-0 -z-10">
        <div className="relative size-full">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={shimmerDataUrl()}
            className="object-cover object-center"
          />
        </div>
      </Parallax>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-black via-black/70 to-black/40"
      />

      <AppContainer className="pb-16 pt-36">
        <div className="flex max-w-4xl flex-col gap-6">
          <Reveal>
            <Badge className="w-fit gap-1.5 px-3 py-1 text-xs font-semibold">
              <Icon name="approved" size="xs" />
              {dict.hero.badge}
            </Badge>
          </Reveal>

          <Heading as="h1" size="display" className="text-white">
            {dict.hero.title}
          </Heading>

          <Reveal delay={0.12}>
            <Text size="lead" className="max-w-2xl leading-relaxed text-white/80">
              {dict.hero.lead}
            </Text>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-10">
          <PropertySearch dict={dict.search} />
        </Reveal>

        <Reveal delay={0.3}>
          <ul className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
            {trust.map((label, index) => (
              <li
                key={label}
                className="flex items-center gap-2 text-xs font-medium text-white/75 md:text-sm"
              >
                <Icon name={TRUST_ICONS[index]} size="xs" />
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </AppContainer>
    </section>
  );
}
