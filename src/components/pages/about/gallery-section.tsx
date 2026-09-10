import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Gallery } from "@/components/media/gallery";
import { getDictionary } from "@/i18n/dictionaries";

export async function GallerySection() {
  const dict = await getDictionary();

  // ensure valid images format
  const images = (dict.gallery.images || []).map((img) => ({
    src: img.src,
    alt: img.alt,
    caption: img.caption,
    width: 1600,
    height: 1067,
  }));

  return (
    <Section id="gallery" className="border-t border-border bg-background">
      <SectionHeading
        title={dict.gallery.title}
        align="center"
      />
      <div className="mt-12">
        <Gallery images={images} columns={3} ratio="4/3" />
      </div>
    </Section>
  );
}
