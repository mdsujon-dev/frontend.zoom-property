import { ImageResponse } from "next/og";

import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The share card. Generated at build time, so it always matches the copy in
 * `siteConfig` instead of a stale exported PNG.
 *
 * Satori (what renders this) supports flexbox only — no grid — and every
 * element needs an explicit `display`. Colours are hex rather than the app's
 * `oklch` tokens because Satori does not parse `oklch`; these are the dark
 * theme's `--background` / `--foreground` converted.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#fafafa",
            }}
          />
          <div style={{ display: "flex", fontSize: 32, letterSpacing: -0.5 }}>
            {siteConfig.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 76,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          {siteConfig.tagline}
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#a1a1a1" }}>
          {siteConfig.url.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    size,
  );
}
