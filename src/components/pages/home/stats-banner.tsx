import Image from "@/components/common/image";
import { Container } from "@/components/common/container";
import { Counter } from "@/components/motion/counter";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getDictionary } from "@/i18n/dictionaries";

export interface StatsBannerProps {
  backgroundImage?: string;
  watermark?: string;
  className?: string;
}

export interface StatItem {
  value: number;
  suffix?: string;
  label: string;
}

/**
 * Panoramic luxury estate background with lawn and dusk lighting,
 * matching the user's reference image.
 */
const DEFAULT_BG =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=85";

export async function StatsBanner({
  backgroundImage = DEFAULT_BG,
  watermark = "SINGLE PROPERTY",
  className = "",
}: StatsBannerProps = {}) {
  const dict = await getDictionary();

  const stats: StatItem[] = dict.statsBanner?.stats ?? [
    { value: 8, suffix: "k+", label: "Projects completed" },
    { value: 3, suffix: "k+", label: "Global customers" },
    { value: 20, suffix: "+", label: "Years of experience" },
    { value: 95, suffix: "+", label: "Team engineers" },
  ];

  const displayWatermark = dict.statsBanner?.watermark ?? watermark;

  return (
    <section
      className={`relative w-full overflow-hidden py-10 sm:py-16 lg:py-20 ${className}`}
    >
      {/* Background Image Layer (z-0) - clearly visible with semi-dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
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

      {/* Giant "SINGLE PROPERTY" Watermark Layer (z-10) */}
      <div
        className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="whitespace-nowrap font-serif text-5xl font-bold uppercase tracking-[0.25em] text-white/[0.08] sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem]">
          {displayWatermark}
        </span>
      </div>

      {/* Foreground Stats Content Layer (z-20) */}
      <Container size="lg" className="relative z-20">
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
              <p className="mt-2 text-xs font-medium tracking-wide text-zinc-200 drop-shadow-md sm:text-sm">
                {item.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
