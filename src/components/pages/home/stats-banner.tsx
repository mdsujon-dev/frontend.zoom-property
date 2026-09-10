import Image from "@/components/common/image";
import { AppContainer } from "@/components/common/app-container";
import { Counter } from "@/components/motion/counter";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { getDictionary } from "@/i18n/dictionaries";

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

  const stats: StatItem[] = [
    {
      value: banner?.stat1Value !== undefined ? parseInt(String(banner.stat1Value), 10) || 8 : 8,
      suffix: banner?.stat1Suffix ?? "k+",
      label: banner?.stat1Label || "Projects completed",
    },
    {
      value: banner?.stat2Value !== undefined ? parseInt(String(banner.stat2Value), 10) || 3 : 3,
      suffix: banner?.stat2Suffix ?? "k+",
      label: banner?.stat2Label || "Global customers",
    },
    {
      value: banner?.stat3Value !== undefined ? parseInt(String(banner.stat3Value), 10) || 20 : 20,
      suffix: banner?.stat3Suffix ?? "+",
      label: banner?.stat3Label || "Years of experience",
    },
    {
      value: banner?.stat4Value !== undefined ? parseInt(String(banner.stat4Value), 10) || 95 : 95,
      suffix: banner?.stat4Suffix ?? "+",
      label: banner?.stat4Label || "Team engineers",
    },
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
