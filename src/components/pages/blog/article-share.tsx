"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Icon, type IconName } from "@/components/common/icon";
import { cn } from "@/lib/utils";

/**
 * Share row.
 *
 * The network links are plain `<a href>` share intents rather than SDK widgets:
 * no third-party script, no tracking pixel, and they work with JavaScript
 * disabled. Only the copy button needs the client.
 *
 * `url` is passed in already absolute — the component cannot build it, because
 * on the server there is no origin and on the client `window.location` is not
 * available during the first render.
 */
const NETWORKS: { key: string; icon: IconName; href: (u: string, t: string) => string }[] = [
  {
    key: "facebook",
    icon: "facebook",
    href: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}`,
  },
  {
    key: "x",
    icon: "x",
    href: (u, t) => `https://x.com/intent/tweet?url=${u}&text=${t}`,
  },
  {
    key: "linkedin",
    icon: "linkedin",
    href: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  },
  {
    key: "whatsapp",
    icon: "whatsapp",
    href: (u, t) => `https://wa.me/?text=${t}%20${u}`,
  },
];

export function ArticleShare({
  url,
  title,
  label,
  copyLabel,
  copiedLabel,
  className,
}: {
  url: string;
  title: string;
  label: string;
  copyLabel: string;
  copiedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(copiedLabel);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is blocked in insecure contexts and by some permission
      // policies. Falling back to a prompt would be worse than saying nothing.
      toast.error(copyLabel);
    }
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-muted/40 px-5 py-4",
        className,
      )}
    >
      <span className="text-sm font-semibold text-foreground">{label}</span>

      <div className="flex items-center gap-2">
        {NETWORKS.map((network) => (
          <a
            key={network.key}
            href={network.href(encodedUrl, encodedTitle)}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={network.key}
            className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Icon name={network.icon} size="sm" />
          </a>
        ))}

        <button
          type="button"
          onClick={copy}
          className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-3 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
        >
          <Icon name={copied ? "check" : "share"} size="xs" />
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
    </div>
  );
}
