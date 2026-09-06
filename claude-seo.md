# SEO rules for this project

Next.js 16 App Router. Every API below is checked against the docs bundled in
`node_modules/next/dist/docs/` — read those before writing metadata code, not
your memory of an older Next.

Part A applies to the code as it stands today. Part B is for routes that do
not exist yet — don't copy from it until they do.

## What is wired

| Concern | Where |
| --- | --- |
| Title template, description, canonical, robots, OG, Twitter | `src/app/layout.tsx` |
| `themeColor` | `viewport` export in `src/app/layout.tsx` |
| Share card (1200×630, generated) | `src/app/opengraph-image.tsx` |
| `robots.txt` | `src/app/robots.ts` |
| `sitemap.xml` | `src/app/sitemap.ts` |
| Structured data builders | `src/lib/seo.ts` |
| The `<script type="application/ld+json">` wrapper | `src/components/common/json-ld.tsx` |
| Origin for all of the above | `NEXT_PUBLIC_SITE_URL` → `siteUrl` in `src/data/site.ts` |

**The one thing still to do:** set `NEXT_PUBLIC_SITE_URL` to the real origin in
the deploy environment. Unset, everything falls back to `http://localhost:3000`
and every canonical, OG URL and sitemap entry points at localhost. It is inlined
at **build** time, so changing it needs a rebuild, not just a restart.

---

# Part A — rules for the site as it is

The app is **one route** (`/`). `#listings`, `#gallery`, `#tour` and `#faq` in
`mainNav` are anchors on that page.

## 1. Metadata is a server-side export, never a `<head>` tag

`metadata` / `generateMetadata` are **only supported in Server Components**.
Never hand-write `<title>`, `<meta>` or `<link rel="canonical">` in JSX, and
never reach for a client-side head library.

```tsx
// src/app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",                        // → "About · Zoom Property"
  description: "…",
  alternates: { canonical: "/about" },
};
```

The `%s · Zoom Property` suffix comes from `title.template` in the root layout.
It applies to **child** segments only — a `title` in the same file as the
template is not wrapped.

## 2. Hash links are not URLs

Never put `/#listings` in a sitemap entry or a `canonical`. They are one page.
The only canonical this site has today is `/`.

## 3. Relative URLs below the root layout

`metadataBase` is set once in the root layout. Every URL field below it takes a
**relative path**. A relative URL with no `metadataBase` is a build error; an
absolute URL silently ignores `metadataBase` and will point at the wrong host on
preview deploys.

## 4. Structured data goes through `src/lib/seo.ts`

Add a builder there, render it with `<JsonLd schema={…} />`. Never inline a
schema object in a page and never use `next/script` for it — JSON-LD is data,
not executable code.

`JsonLd` replaces every `<` with `\u003c`. That is not cosmetic:
`JSON.stringify` does not escape markup, so an unescaped `</script>` inside a
listing description would break out of the tag and inject HTML.

Currently emitted:

| Schema | Rendered in |
| --- | --- |
| `RealEstateAgent` (`#organization`) | root layout |
| `WebSite` (`#website`) | root layout |
| `FAQPage` | `src/app/page.tsx`, built from `faqs` |
| `ItemList` of `Residence` | `src/app/page.tsx`, built from `listings` |

**Only mark up what the page actually renders.** If you delete the FAQ
accordion, delete `faqSchema()` from the page in the same commit. Verify with
the [Rich Results Test](https://search.google.com/test/rich-results).

## 5. The OG image is generated, not a PNG in `public/`

`src/app/opengraph-image.tsx` renders from `siteConfig`, so the card can never
drift from the site copy. Constraints, because Satori is not a browser:

- **Flexbox only** — `display: grid` silently does nothing.
- Every element needs an explicit `display`.
- **No `oklch()`** — the app's colour tokens will not parse. Use hex.
- Don't import Tailwind components into it.

`twitter-image` is not needed; Next falls back to the OG image.

## 6. Semantic HTML is half the SEO

The type scale already separates meaning from size — use it.

- **One `<h1>` per page.** `Heading` picks the tag with `as` and the look with
  `size`, so a visually large title is still `as="h1"`:
  `<Heading as="h1" size="display">`. Never skip a level to get a size.
- Section titles are `h2`, nested ones `h3` — `SectionHeading` handles this.
- Real `<a href>` for anything crawlable. A `<button>` with an onClick is
  invisible to crawlers.
- Landmarks come from the layout (`<main id="top">`, `SiteHeader`,
  `SiteFooter`) — don't add a second `<main>`.

## 7. Images

Always `ImageFrame` (or `next/image`), never a bare `<img>` — it enforces
`ratio`, `sizes` and a blur placeholder, which is what protects LCP and CLS.

`alt` is required and is indexed: describe the room, not the file.
`"Open plan living room with floor to ceiling windows"` ✓ —
`"property image"` ✗. Decorative only: `alt=""`.

Any new image host must be added to `remotePatterns` in `next.config.ts`, and
its images should be added to the sitemap's `images` array.

## 8. Text

- `title` ≤ ~60 chars **including** the `· Zoom Property` suffix;
  `description` 120–160 chars, written for a human, unique per page.
- Prices in copy go through `formatCurrency` (`src/lib/format.ts`) so the
  visible text matches any `price` in structured data.
- Content must be in the server-rendered HTML. `Reveal` / `Stagger` animate
  elements that are already in the markup, so they are fine — but never gate
  real copy behind a `useEffect` or a client-only fetch.

## 9. Don't use the deprecated viewport fields

`themeColor`, `colorScheme` and `viewport` inside `metadata` are **deprecated
since Next 14**. They belong in the separate `viewport` export, which the root
layout already has.

---

# Part B — when real routes land

Nothing here compiles today. `PageProps` is generated from the routes that
actually exist (`.next/types/routes.d.ts`), so `PageProps<"/listings/[slug]">`
is a type error until `src/app/listings/[slug]/page.tsx` exists. Create the
route first, then the types appear.

## B1. Data-driven metadata

```tsx
// src/app/listings/[slug]/page.tsx
import type { Metadata } from "next";
import { getListing } from "@/data/listings";

export async function generateMetadata(
  { params }: PageProps<"/listings/[slug]">,
): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListing(slug);

  return {
    title: `${listing.title}, ${listing.location}`,
    description: `${listing.beds} bed · ${listing.baths} bath in ${listing.location}.`,
    alternates: { canonical: `/listings/${slug}` },
  };
}
```

`params` is a Promise — `await` it. Don't hand-write the props interface.

## B2. Fetch once, use twice

`generateMetadata` and the page body both need the listing. Wrap the loader in
React `cache` or it runs twice per request:

```ts
// src/data/listings.ts  — today the data is a static array in src/data/site.ts
import { cache } from "react";

export const getListing = cache(async (slug: string) => { /* … */ });
```

## B3. Per-listing OG images

`src/app/listings/[slug]/opengraph-image.tsx`, same constraints as rule 5. The
deeper file wins over the root one.

## B4. Sitemap entries

Add them to `src/app/sitemap.ts`. Keep omitting `changeFrequency` and
`priority` — Next supports them, but Google ignores both.

```ts
...listings.map((listing) => ({
  url: `${siteConfig.url}/listings/${listing.id}`,
  lastModified: listing.updatedAt,
  images: [listing.image],
})),
```

## B5. Schemas to add

`RealEstateListing` with a nested `Offer` per listing, and `BreadcrumbList` on
any nested route. Point them at `{ "@id": "…#organization" }` rather than
repeating the agency details.

---

## Before shipping

1. `pnpm build` — a relative metadata URL with no `metadataBase` fails here.
2. **View source**, not the devtools DOM: `<title>`, `description`, `og:*` and
   `canonical` must be in the raw HTML.
3. Confirm the URLs in that source are the real domain, not `localhost:3000`.
4. One `<h1>`, headings in order, every image with meaningful `alt`.
5. `/robots.txt`, `/sitemap.xml` and `/opengraph-image` all return correctly.
6. JSON-LD passes the Rich Results Test.

> Metadata streams separately for dynamic pages, but Next disables streaming for
> known crawlers (Googlebot, Bingbot, Twitterbot, Slackbot) so they still get it
> in `<head>`. Prerendered pages never stream. This is automatic — only touch
> `htmlLimitedBots` in `next.config.ts` if a specific crawler is proven to be
> missing tags.
