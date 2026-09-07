import { JsonLd } from "@/components/common/json-ld";
import { CinematicShowcase } from "@/components/sections/cinematic-showcase";
import { AreasSection } from "@/components/sections/areas-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ListingsSection } from "@/components/sections/listings-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { RoomsSection } from "@/components/sections/rooms-section";
import { ServicesShowcase } from "@/components/sections/services-showcase";
import { TestimonialsBento } from "@/components/sections/testimonials-bento";
import {
  FaqSection,
} from "@/components/sections/shared-sections";
import { showcase } from "@/data/services";
import { getDictionary } from "@/i18n/dictionaries";
import { faqSchema, listingsSchema } from "@/lib/seo";

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
      <JsonLd schema={await faqSchema()} />
      <JsonLd schema={listingsSchema()} />

      <HeroSection />

      {/* <StatsSection /> */}
      <ListingsSection variant="preview" limit={6} />

      <CinematicShowcase
        poster={showcase.poster}
        video={showcase.video}
        dict={dict.showcase}
      />

      <RoomsSection />
      <AreasSection />
      <ProjectsSection />
      <ServicesShowcase />
      <TestimonialsBento />
      <FaqSection />
    </>
  );
}
