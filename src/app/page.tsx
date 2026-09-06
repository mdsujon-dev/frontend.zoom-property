import Image from "next/image";

import { Container } from "@/components/common/container";
import { Eyebrow, Heading } from "@/components/common/heading";
import { Icon } from "@/components/common/icon";
import { Section } from "@/components/common/section";
import { SectionHeading } from "@/components/common/section-heading";
import { Text } from "@/components/common/text";
import { Gallery } from "@/components/media/gallery";
import { MediaCarousel } from "@/components/media/media-carousel";
import { VideoEmbed } from "@/components/media/video-embed";
import { VideoPlayer } from "@/components/media/video-player";
import { AnimatedText } from "@/components/motion/animated-text";
import { Counter } from "@/components/motion/counter";
import { Marquee } from "@/components/motion/marquee";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { PropertyCard } from "@/components/property/property-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  faqs,
  features,
  galleryImages,
  listings,
  partners,
  siteConfig,
  stats,
} from "@/data/site";
import { shimmerDataUrl } from "@/lib/image";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80";

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
        <Parallax speed={0.18} zoom className="absolute inset-0 -z-10">
          <div className="relative size-full">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              preload
              sizes="100vw"
              placeholder="blur"
              blurDataURL={shimmerDataUrl()}
              className="object-cover"
            />
          </div>
        </Parallax>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-t from-black/85 via-black/45 to-black/60"
        />

        <Container className="pb-20 pt-32 sm:pb-28">
          <div className="flex max-w-3xl flex-col gap-6">
            <Reveal>
              <Badge variant="secondary" className="w-fit gap-1.5">
                <Icon name="sparkles" size="xs" />
                New listings every Thursday
              </Badge>
            </Reveal>

            <Heading as="h1" size="display" className="text-white">
              <AnimatedText text={siteConfig.tagline} />
            </Heading>

            <Reveal delay={0.15}>
              <Text size="lead" className="max-w-xl text-white/80">
                {siteConfig.description}
              </Text>
            </Reveal>

            <Reveal delay={0.25} className="flex flex-wrap gap-3 pt-2">
              <Button size="lg">
                Browse listings
                <Icon name="arrowRight" size="xs" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                <Icon name="play" size="xs" className="fill-current" />
                Watch the tour
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ Partners */}
      <Section spacing="sm" container={false} className="border-y border-border">
        <Marquee speed={45} gap="4rem">
          {partners.map((partner) => (
            <span
              key={partner}
              className="font-heading text-h5 whitespace-nowrap text-muted-foreground/70"
            >
              {partner}
            </span>
          ))}
        </Marquee>
      </Section>

      {/* --------------------------------------------------------------- Stats */}
      <Section spacing="md">
        <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label} className="flex flex-col gap-1">
              <span className="font-heading text-h2">
                <Counter
                  to={stat.value}
                  compact={"compact" in stat ? stat.compact : false}
                  suffix={"suffix" in stat ? stat.suffix : ""}
                />
              </span>
              <Text size="sm">{stat.label}</Text>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------------------ Features */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Why Zoom Property"
          title="Everything you need before you sign"
          description="Search, tour, compare and book — without juggling six tabs and three agents."
          action={
            <Button variant="outline" size="lg">
              About us
              <Icon name="arrowUpRight" size="xs" />
            </Button>
          }
        />

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <Card className="h-full transition-colors duration-300 hover:border-foreground/20">
                <CardContent className="flex flex-col gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon name={feature.icon} size="md" />
                  </span>
                  <Heading as="h3" size="h5">
                    {feature.title}
                  </Heading>
                  <Text size="sm">{feature.description}</Text>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* ------------------------------------------------------------ Listings */}
      <Section id="listings">
        <SectionHeading
          eyebrow="Featured"
          title="Homes on the market this week"
          description="Hand-picked by our agents, priced against the last 90 days of local sales."
          action={
            <Button variant="outline" size="lg">
              All listings
              <Icon name="arrowRight" size="xs" />
            </Button>
          }
        />

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <StaggerItem key={listing.id}>
              <PropertyCard {...listing} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12" delay={0.1}>
          <MediaCarousel
            items={galleryImages.map((image) => ({
              src: image.src,
              alt: image.alt,
              caption: image.caption,
            }))}
            perView={3}
            ratio="4/3"
          />
        </Reveal>
      </Section>

      {/* ------------------------------------------------------------- Gallery */}
      <Section id="gallery" tone="muted">
        <SectionHeading
          eyebrow="Gallery"
          title="Look around before you drive over"
          description="Click any photo for the full-screen viewer — pinch, zoom and swipe included."
          align="center"
        />
        <div className="mt-12">
          <Gallery images={galleryImages} columns={3} ratio="4/3" />
        </div>
      </Section>

      {/* ---------------------------------------------------------------- Tour */}
      <Section id="tour">
        <SectionHeading
          eyebrow="Virtual tour"
          title="Two ways to watch"
          description="Hosted footage plays inline with our own controls; platform videos load only when you press play."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex flex-col gap-3">
              <VideoPlayer
                src="https://mdn.github.io/shared-assets/videos/flower.mp4"
                poster="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                title="Cedar Hill House walkthrough"
              />
              <Text size="sm">Self-hosted file · custom player</Text>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-col gap-3">
              <VideoEmbed
                url="https://www.youtube.com/watch?v=ScMzIvxBSi4"
                title="Neighbourhood tour"
              />
              <Text size="sm">YouTube · loads on click, no tracking before that</Text>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section id="faq" tone="muted">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions we get every week"
            description="Still stuck? Our team replies within one business hour."
            className="lg:flex-col lg:items-start"
          />

          <Reveal delay={0.1}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <Text size="sm">{faq.answer}</Text>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Section>

      {/* ----------------------------------------------------------------- CTA */}
      <Section tone="inverse" spacing="lg">
        <div className="flex flex-col items-center gap-6 text-center">
          <Eyebrow tone="inverse">Ready when you are</Eyebrow>
          <Heading as="h2" size="h1" align="center" tone="inverse" className="max-w-3xl">
            Book a viewing this week
          </Heading>
          <Text size="lead" tone="inverse" align="center" className="max-w-xl">
            Tell us the shortlist. We will line up the visits, the paperwork and
            the numbers.
          </Text>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Button size="lg" variant="secondary">
              Talk to an agent
              <Icon name="phone" size="xs" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-background/30 bg-transparent text-background hover:bg-background/10 hover:text-background"
            >
              Send an email
              <Icon name="mail" size="xs" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
