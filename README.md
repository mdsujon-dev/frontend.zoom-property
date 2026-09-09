# Zoom Property — Public Web Storefront

The public web application for **Zoom Property**, built with **Next.js 16 (App Router, Turbopack)**, **React 19**, **Tailwind CSS v4**, and **Motion**.

```bash
pnpm dev      # http://localhost:3000
pnpm build
pnpm lint
```

---

## Project Structure

```
src/
├── app/                 # Next.js App Router pages, root layout, globals.css (design tokens)
├── components/
│   ├── ui/              # Primitive components (Radix UI / shadcn)
│   ├── common/          # Heading, Text, Eyebrow, Container, Section, SectionHeading, Icon
│   ├── motion/          # Reveal, Stagger, Parallax, Marquee, Counter, AnimatedText, ScrollProgress
│   ├── media/           # ImageFrame, Gallery, MediaCarousel, VideoPlayer, VideoEmbed
│   ├── layout/          # SiteHeader, SiteFooter, ThemeToggle
│   ├── property/        # PropertyCard, PropertyFilter, PropertyGrid (Domain components)
│   └── providers/       # ThemeProvider, Lenis smooth scroll, Toaster
├── hooks/               # useMediaQuery, useSmoothScroll, useScrollDirection
├── lib/                 # Class merging (cn), motion tokens, formatters, image helpers
└── data/                # Site configuration, navigation, demo content
```

---

## Design System & Architecture Rules

1. **Structured Typography Scale**: Font sizes are managed via `src/app/globals.css` design tokens (`--text-display`, `--text-h1` … `--text-lead`).
2. **Unified Layout Shell**: Use `<Section>` for vertical rhythm and `<Container>` for layout max-widths.
3. **Icon Registry**: Icons are centralized in `src/components/common/icon.tsx` using `lucide-react` and `react-icons/fa6`.
4. **Motion Vocabulary**: Entrance animations and micro-interactions use motion tokens defined in `src/lib/motion.ts`.
5. **Optimized Media**: Images and videos use standard frames (`ImageFrame`, `Gallery`, `VideoEmbed`) with blurred placeholders and lightboxes.

---

## Tech Stack

| Concern | Choice |
|---------|--------|
| Framework | **Next.js 16** (App Router + Turbopack) |
| UI Library | **React 19** + `shadcn/ui` |
| Styling | **Tailwind CSS v4** |
| Animation | **Motion** (Framer Motion) + **Lenis** smooth scroll |
| Icons | `lucide-react`, `react-icons/fa6` |
| Lightbox & Carousel | `yet-another-react-lightbox`, `embla-carousel-react` |
