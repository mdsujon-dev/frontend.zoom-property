import Image from "@/components/common/image";
import { AppContainer } from "@/components/common/app-container";
import { Counter } from "@/components/motion/counter";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getDictionary } from "@/i18n/dictionaries";
import { toLatinDigits } from "@/lib/format";

export interface StatsBannerProps {
  backgroundImage?: string;
  className?: string;
}

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

const DEFAULT_BG =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85";

export async function StatsBanner({
  backgroundImage,
  className = "",
}: StatsBannerProps = {}) {
  const dict = await getDictionary();
  const banner = dict.statsBanner;

  const bgImage = banner?.backgroundImage || backgroundImage || DEFAULT_BG;

  /**
   * One stat, read from the panel.
   *
   * The value arrives as whatever somebody typed, so it is folded to ASCII
   * digits before parsing — otherwise a number entered in Bangla numerals
   * parses to NaN and the banner silently shows the built-in figure instead of
   * the one that was just saved.
   *
   * `suffix` uses `??` rather than `||`: an empty suffix is a real choice (a
   * plain "32" with nothing after it), and `||` would overwrite it.
   */
  const statFrom = (
    value: unknown,
    suffix: string | undefined,
    label: string | undefined,
    fallback: { value: number; suffix: string; label: string },
  ): StatItem => ({
    value:
      value === undefined
        ? fallback.value
        : parseInt(toLatinDigits(String(value)), 10) || fallback.value,
    suffix: suffix ?? fallback.suffix,
    label: label || fallback.label,
  });

  const stats: StatItem[] = [
    statFrom(banner?.stat1Value, banner?.stat1Suffix, banner?.stat1Label, {
      value: 8,
      suffix: "k+",
      label: "Projects completed",
    }),
    statFrom(banner?.stat2Value, banner?.stat2Suffix, banner?.stat2Label, {
      value: 3,
      suffix: "k+",
      label: "Global customers",
    }),
    statFrom(banner?.stat3Value, banner?.stat3Suffix, banner?.stat3Label, {
      value: 20,
      suffix: "+",
      label: "Years of experience",
    }),
    statFrom(banner?.stat4Value, banner?.stat4Suffix, banner?.stat4Label, {
      value: 95,
      suffix: "+",
      label: "Team engineers",
    }),
  ];

  return (
    <section
      className={`relative w-full overflow-hidden py-10 sm:py-16 lg:py-20 ${className}`}
    >
      {/* Background Image Layer (z-0) - clearly visible with semi-dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          fallbackSrc={DEFAULT_BG}
          alt="Luxury property exterior"
          fill
          priority={false}
          className="object-cover object-center"
        />
        {/* Balanced dark overlay to preserve house/lawn details while maintaining text contrast */}
        <div className="absolute inset-0 bg-black/60 sm:bg-black/55" />
        {/* Top and bottom gradient vignette for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      </div>

      {/* Foreground Stats Content Layer (z-20) */}
      <AppContainer size="lg" className="relative z-20">
        <Stagger className="grid grid-cols-2 gap-y-6 gap-x-6 sm:gap-8 md:grid-cols-4 md:gap-8">
          {stats.map((item, index) => (
            <StaggerItem
              key={index}
              className="group flex flex-col items-center justify-center text-center"
            >
              <div className="flex items-baseline justify-center font-serif text-3xl font-light tracking-tight text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-105 sm:text-4xl md:text-5xl lg:text-6xl">
                <Counter
                  to={item.value}
                  suffix={item.suffix}
                  duration={2}
                  className="font-serif text-white"
                />
              </div>
              <p className="mt-2 text-xs font-medium tracking-wide text-white/85 drop-shadow-md sm:text-sm">
                {item.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </AppContainer>
    </section>
  );
}
