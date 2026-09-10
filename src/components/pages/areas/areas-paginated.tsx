import Link from "next/link";

import { Section } from "@/components/common/section";
import { Icon } from "@/components/common/icon";
import { Text } from "@/components/common/text";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { areas as fallbackAreas, type Area } from "@/data/areas";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localeHref } from "@/i18n/href";
import { cn } from "@/lib/utils";

import { AreaServiceCard } from "./area-service-card";
import { AreasHeading } from "./areas-section";

const PER_PAGE = 10;

/**
 * The full service-area list, paginated.
 *
 * Pagination is server-side and lives in the URL rather than in client state.
 * Two reasons: every page of results is in the server-rendered HTML where a
 * crawler can reach it, and `/areas?page=2` is a link someone can send.
 */
export function AreasPaginated({
  page,
  locale,
  t,
  areas: areasProp,
}: {
  page: number;
  locale: Locale;
  t: Dictionary["areas"]["service"];
  areas?: Area[];
}) {
  const areaList = areasProp && areasProp.length > 0 ? areasProp : fallbackAreas;
  const totalPages = Math.max(1, Math.ceil(areaList.length / PER_PAGE));
  // Clamp rather than 404: `?page=99` is a URL someone edited, not a broken link.
  const current = Math.min(Math.max(1, page), totalPages);

  const start = (current - 1) * PER_PAGE;
  const shown = areaList.slice(start, start + PER_PAGE);

  const href = (target: number) =>
    target <= 1
      ? localeHref(locale, "/areas")
      : `${localeHref(locale, "/areas")}?page=${target}`;

  return (
    <Section id="areas" className="border-t border-border bg-background">
      <AreasHeading t={t} />

      <Stagger className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {shown.map((area) => (
          <StaggerItem key={area.id}>
            <AreaServiceCard
              area={area}
              locale={locale}
              inAreaLabel={t.inArea.replace(
                "{name}",
                locale === "bn" && area.nameBn ? area.nameBn : area.name,
              )}
            />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal
        delay={0.1}
        className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row"
      >
        <Text size="sm">
          {t.showing
            .replace("{from}", String(start + 1))
            .replace("{to}", String(start + shown.length))
            .replace("{total}", String(areaList.length))}
        </Text>

        <nav className="flex items-center gap-2" aria-label={t.eyebrow}>
          <Step
            href={href(current - 1)}
            label={t.prev}
            icon="chevronLeft"
            disabled={current === 1}
          />

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <Link
              key={number}
              href={href(number)}
              aria-current={number === current ? "page" : undefined}
              aria-label={t.page.replace("{page}", String(number))}
              className={cn(
                "flex size-9 items-center justify-center rounded-lg border text-sm font-semibold transition-colors",
                number === current
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
              )}
            >
              {number}
            </Link>
          ))}

          <Step
            href={href(current + 1)}
            label={t.next}
            icon="chevronRight"
            disabled={current === totalPages}
          />
        </nav>
      </Reveal>
    </Section>
  );
}

/**
 * Previous / next. Rendered as a `<span>` when there is nowhere to go — a
 * disabled anchor is still focusable and still followable by a crawler.
 */
function Step({
  href,
  label,
  icon,
  disabled,
}: {
  href: string;
  label: string;
  icon: "chevronLeft" | "chevronRight";
  disabled: boolean;
}) {
  const className = cn(
    "flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-semibold transition-colors",
    disabled
      ? "cursor-not-allowed border-border bg-muted/40 text-muted-foreground/50"
      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
  );

  const content = (
    <>
      {icon === "chevronLeft" ? <Icon name="chevronLeft" size="xs" /> : null}
      <span className="hidden sm:inline">{label}</span>
      {icon === "chevronRight" ? <Icon name="chevronRight" size="xs" /> : null}
    </>
  );

  if (disabled) {
    return (
      <span aria-disabled className={className}>
        {content}
      </span>
    );
  }

  return (
    <Link href={href} rel={icon === "chevronLeft" ? "prev" : "next"} className={className}>
      {content}
    </Link>
  );
}
