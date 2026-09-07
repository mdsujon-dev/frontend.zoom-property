import { AppContainer } from "@/components/common/app-container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { showcase } from "@/data/services";

// Since we are using an iframe, we extract the video ID
// We'll use the showcase video ID repeatedly as a placeholder for multiple videos.
// The user asked for "youtube link zoomit", we use the existing showcase video as the default.
const videos = [
  {
    id: "ScMzIvxBSi4",
    title: "Discover Zoom Property - A Seamless Experience",
  },
  {
    id: "ScMzIvxBSi4",
    title: "Premium Real Estate Market Insights",
  },
  {
    id: "ScMzIvxBSi4",
    title: "Why Choose Us for Your Next Home",
  },
  {
    id: "ScMzIvxBSi4",
    title: "Expert Guidance & Management",
  },
];

export function VideoCarouselSection() {
  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Image with elegant overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${showcase.poster})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      </div>

      <AppContainer className="relative z-10">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
            Experience Zoom Property
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
            Watch our curated videos to see why we are the preferred choice for premium real estate.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {videos.map((video, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="group relative aspect-video overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10 shadow-2xl transition-transform duration-300 hover:-translate-y-1">
                    <iframe
                      className="absolute top-0 left-0 h-full w-full border-0"
                      src={`https://www.youtube.com/embed/${video.id}?rel=0&modestbranding=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-white/90 line-clamp-2 leading-tight">
                    {video.title}
                  </h3>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-white/10 text-white hover:bg-white hover:text-black border-white/20 backdrop-blur-md" />
              <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white/10 text-white hover:bg-white hover:text-black border-white/20 backdrop-blur-md" />
            </div>
          </Carousel>
        </div>
      </AppContainer>
    </section>
  );
}
