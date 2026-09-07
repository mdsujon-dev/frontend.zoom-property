import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Gallery } from "@/components/media/gallery";
import { galleryImages } from "@/data/site";
import { getDictionary } from "@/i18n/dictionaries";

export async function GallerySection() {
  const dict = await getDictionary();

  return (
    <Section id="gallery" className="border-t border-border bg-background">
      <SectionHeading
        title={dict.gallery.title}
        align="center"
      />
      <div className="mt-12">
        <Gallery images={galleryImages} columns={3} ratio="4/3" />
      </div>
    </Section>
  );
}
