# Brand typefaces

The guideline specifies two commercial faces:

| Role | Guideline | Currently substituted with |
|---|---|---|
| Primary (display, headings, wordmark) | **Bryant Bold Alternate** | Quicksand |
| Secondary (body) | **Proxima Nova Alt Bold** | Montserrat |

Neither is on Google Fonts, so neither can be fetched at build time. The
substitutes are chosen for shape, not convenience — Bryant is a rounded
geometric with a single-storey `a`, which Quicksand matches closely; Montserrat
is the usual free stand-in for Proxima Nova.

## Shipping the licensed fonts

Drop the `.woff2` files in this folder, then in `src/app/fonts.ts` swap the two
`next/font/google` calls for `next/font/local`:

```ts
import localFont from "next/font/local";

export const display = localFont({
  variable: "--font-display",          // keep the variable name
  src: [
    { path: "../fonts/BryantAlt-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/BryantAlt-Medium.woff2",  weight: "500", style: "normal" },
    { path: "../fonts/BryantAlt-Bold.woff2",    weight: "700", style: "normal" },
  ],
  display: "swap",
});
```

Keep `--font-display` and `--font-sans` exactly as they are: every heading and
body rule in `globals.css` resolves through those two variables, so nothing
else in the app has to change.

The admin panel pulls the same pair from Google Fonts at the top of
`admin.zoom-property/src/styles/index.css`. Replace those `@import` lines with
`@font-face` rules pointing at the same files to keep the two in step.

Bengali is unaffected — `Noto Sans Bengali` carries the `bn` locale, and the
Latin faces have no Bengali glyphs either way.
