# Zoom Property

Next.js 16 (App Router, Turbopack) + React 19 + Tailwind CSS v4 + shadcn/ui.

```bash
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

## Project structure

```
src/
  app/                 routes, root layout, globals.css (design tokens)
  components/
    ui/                shadcn/ui primitives — vendored, keep close to the registry
    common/            Heading, Text, Eyebrow, Container, Section, SectionHeading, Icon
    motion/            Reveal, Stagger, Parallax, Marquee, Counter, AnimatedText, ScrollProgress, ScrollToTop
    media/             ImageFrame, Gallery, MediaCarousel, VideoPlayer, VideoEmbed
    layout/            SiteHeader, SiteFooter, ThemeToggle
    property/          PropertyCard (domain component — copy this pattern)
    providers/         theme + Lenis smooth scroll + tooltip + toaster
  hooks/               useMediaQuery, useSmoothScroll, useScrollDirection
  lib/                 cn, motion tokens, image + video helpers, formatters
  data/                site config, nav, demo content
```

## The rules that keep it consistent

**1. One type scale.** Sizes live in `src/app/globals.css` as `--text-display`
… `--text-h6`, `--text-eyebrow`, `--text-lead`. Never write `text-4xl` on a
title:

```tsx
<Heading as="h1" size="display">…</Heading>   // semantics and size are separate
<Heading as="h3" size="h5">…</Heading>        // h3 in the outline, h5 on screen
<Text size="lead">…</Text>
```

Changing a heading size anywhere in the app = editing one token.

> Custom sizes must also be listed in `src/lib/utils.ts`, otherwise
> tailwind-merge mistakes `text-h2` for a colour and drops it.

**2. One section shell.** `Section` owns vertical rhythm and background tone,
`Container` owns max-width and gutters, `SectionHeading` owns the
eyebrow → title → description block:

```tsx
<Section id="listings" tone="muted" spacing="lg">
  <SectionHeading eyebrow="Featured" title="…" description="…" action={<Button …/>} />
</Section>
```

**3. One icon surface.** `src/components/common/icon.tsx` registers UI icons
from `lucide-react` and brand icons from `react-icons/fa6`, with a locked size
scale (`xs → xl`). Add an icon to the registry, then `<Icon name="bed" />`.

**4. One motion vocabulary.** Durations and easings live in `src/lib/motion.ts`;
components never hard-code them.

```tsx
<Reveal delay={0.1}>…</Reveal>                      // scroll-triggered entrance
<Stagger><StaggerItem>…</StaggerItem></Stagger>     // lists and grids
<Parallax speed={0.2} zoom>…</Parallax>             // scroll-linked layers
<Counter to={12500} compact suffix="+" />
<Marquee speed={40}>…</Marquee>
```

Everything degrades to a static render under `prefers-reduced-motion`, and
Lenis smooth scrolling turns itself off for those users too.

**5. Media always goes through a component.** `ImageFrame` wraps `next/image`
with an aspect-ratio scale, `sizes` presets and a shimmer blur placeholder;
`Gallery` adds the lightbox; `VideoEmbed` keeps YouTube/Vimeo off the page until
someone presses play; `VideoPlayer` handles self-hosted files.

Remote image hosts must be allowed in `next.config.ts` → `images.remotePatterns`.

## Stack

| Concern | Package |
| --- | --- |
| UI primitives | `shadcn/ui` (radix-nova style, Radix UI) |
| Smooth scroll | `lenis` |
| Animation | `motion` (Framer Motion) |
| Icons | `lucide-react`, `react-icons/fa6` |
| Lightbox | `yet-another-react-lightbox` |
| Carousel | `embla-carousel-react` |
| Theming | `next-themes` |
| Toasts | `sonner` |

Add more primitives with `pnpm dlx shadcn@latest add <component>`.
