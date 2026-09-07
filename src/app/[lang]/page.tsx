import { JsonLd } from "@/components/common/json-ld";
import { CinematicShowcase } from "@/components/pages/home/cinematic-showcase";
import { HeroSection } from "@/components/pages/home/hero-section";
import { RoomsSection } from "@/components/pages/home/rooms-section";
import { ServicesShowcase } from "@/components/pages/home/services-showcase";
import { TestimonialsBento } from "@/components/pages/home/testimonials-bento";
import { StatsBanner } from "@/components/pages/home/stats-banner";
import { ListingsSection } from "@/components/pages/properties/listings-section";
import { ProjectsSection } from "@/components/pages/projects/projects-section";
import { AreasSection } from "@/components/pages/areas/areas-section";
import { VideoSection } from "@/components/pages/home/video-section";
import { HomeBlogSection } from "@/components/pages/home/home-blog-section";
import { showcase } from "@/data/services";
import { getDictionary } from "@/i18n/dictionaries";
import { listingsSchema } from "@/lib/seo";
import { VideoCarouselSection } from "@/components/pages/home/video-carousel-section";

/**
 * Home page.
 *
 * A summary, not a catalogue. Each block previews a section of the site and
 * links onward to the page that owns it.
 */
export default async function Home() {
  const dict = await getDictionary();

  return (
    <>
      <JsonLd schema={listingsSchema()} />

      <HeroSection />

      <ListingsSection variant="preview" limit={6} />

      <CinematicShowcase
        poster={showcase.poster}
        video={showcase.video}
        dict={dict.showcase}
      />

      <RoomsSection />
      <div className="mb-8 md:mb-16 lg:mb-20">
        <StatsBanner />
      </div>
      <AreasSection />
      <ProjectsSection />
      <ServicesShowcase />
      <TestimonialsBento />
      <VideoSection />
      <HomeBlogSection />
    </>
  );
}
