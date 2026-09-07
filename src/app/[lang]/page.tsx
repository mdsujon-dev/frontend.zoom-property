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
import { FaqSection } from "@/components/pages/shared/faq-section";
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
      <StatsBanner />
      <FaqSection />
    </>
  );
}
