import { Montserrat, Noto_Sans_Bengali, Quicksand } from "next/font/google";

/**
 * Brand typefaces, and why these files.
 *
 * The guideline specifies **Bryant Bold Alternate** (primary) and **Proxima
 * Nova Alt Bold** (secondary). Both are licensed commercial faces and are not
 * on Google Fonts, so they cannot be self-hosted from here. The closest free
 * stand-ins are used instead:
 *
 *   Bryant Bold Alternate  →  Quicksand   (rounded geometric, single-storey a)
 *   Proxima Nova Alt Bold  →  Montserrat  (the usual free substitute)
 *
 * To ship the real thing: drop the licensed .woff2 files in `src/fonts/`, swap
 * these for `next/font/local`, and keep the same CSS variable names — nothing
 * else in the app needs to change.
 *
 * Noto Sans Bengali covers the `bn` locale. Latin faces have no Bengali glyphs,
 * so without it the browser falls back to whatever the OS has and the Bangla
 * site looks unrelated to the English one.
 *
 * They live in their own module rather than in the layout because
 * `global-not-found.tsx` renders *outside* every layout and has to attach the
 * same variables itself. Declaring a face twice would emit two font loaders for
 * the same file.
 */
export const display = Quicksand({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  display: "swap",
});

/** The class every `<html>` in the app carries. */
export const fontVariables = `${display.variable} ${sans.variable} ${bengali.variable}`;
