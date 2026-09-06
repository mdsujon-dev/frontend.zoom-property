import { createCn } from "cn/config";

/**
 * `cn` = clsx + tailwind-merge (via the `cn` package).
 *
 * The custom `text-display` … `text-h6` / `text-eyebrow` / `text-lead` sizes
 * from `globals.css` have to be registered as font sizes, otherwise
 * tailwind-merge reads them as *colour* utilities and silently drops them when
 * a class like `text-muted-foreground` follows. Keep this list in sync with the
 * `--text-*` tokens in `src/app/globals.css`.
 */
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "eyebrow",
            "lead",
          ],
        },
      ],
    },
  },
});
