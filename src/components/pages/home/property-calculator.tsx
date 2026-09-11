"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";

import { Icon, type IconName } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { areas as fallbackAreas, type Area } from "@/data/areas";
import {
  properties as fallbackProperties,
  propertyTypes as fallbackTypes,
  type Property,
} from "@/data/properties";
import type { Locale } from "@/i18n/config";
import { localeHref } from "@/i18n/href";
import { formatBdt } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface PropertyCalculatorDict {
  title: string;
  searchPlaceholder: string;
  /** Headings inside the suggestion panel. */
  categoriesLabel: string;
  areasLabel: string;
  propertiesLabel: string;
  type: string;
  anyType: string;
  priceRange: string;
  minimum: string;
  maximum: string;
  submit: string;
}

/** Sentinel for "no type chosen" — a Radix select item cannot hold "". */
const ANY_TYPE = "any";

/** How many rows each section of the dropdown offers at once. */
const MAX_AREAS = 4;
const MAX_LISTINGS = 3;

/**
 * One row of the panel, whatever section it came from. Keeping them in a single
 * flat list is what lets the arrow keys walk the whole dropdown rather than one
 * section of it.
 */
type Suggestion =
  | { kind: "type"; id: string; label: string; note?: undefined }
  | { kind: "area"; id: string; label: string; note: string }
  | { kind: "listing"; id: string; label: string; note: string };

const PRICE_MIN = 0;

/** Used only when the catalogue is empty, so the slider still has a range. */
const PRICE_CEILING = 200_000_000;

/** ৳5 lakh per notch — fine enough to aim with, coarse enough to drag. */
const PRICE_STEP = 500_000;

/**
 * The slider's ceiling, taken from the listings themselves rather than typed
 * in: a hand-written ceiling silently hides every property above it the day
 * somebody adds a more expensive one.
 *
 * Rounded up to the next notch so the dearest listing is reachable — landing
 * exactly on the maximum is fiddly with a drag, and a property you cannot
 * include in a search may as well not be listed.
 */
const ceilingFor = (list: Property[]) => {
  const prices = list
    .filter((property) => property.purpose === "sale")
    .map((property) => property.price)
    .filter((price) => Number.isFinite(price) && price > 0);

  if (!prices.length) return PRICE_CEILING;
  return Math.ceil(Math.max(...prices) / PRICE_STEP) * PRICE_STEP;
};

/**
 * The property calculator on the hero.
 *
 * An area, a type and a price band — then it hands the whole thing to
 * `/properties` as a query string rather than filtering in place. The results
 * page already knows how to render and page a filtered list, and a URL is
 * something a visitor can bookmark, share and go back to; client state on the
 * home page is none of those.
 *
 * The one field opens a panel with three ways to answer it: a category, one of
 * the areas we cover, or a listing by name. That is the difference between a
 * search box and a search box that knows the catalogue — typing "gul" and
 * getting nothing because the listing says "Gulshan 2" is the usual failure
 * here. Picking an area sends its id, which the results page matches against
 * each listing's neighbourhood. Free text still works; it is the fallback
 * rather than the only path.
 *
 * **Sale only.** Every search it sends carries `purpose=sale`, so rentals never
 * come back through it. Adding rent later is a `purpose` in state here — the
 * results page already filters on it.
 */
export function PropertyCalculator({
  dict,
  locale,
  className,
  areas = fallbackAreas,
  properties = fallbackProperties,
  types = fallbackTypes,
}: {
  dict: PropertyCalculatorDict;
  locale: Locale;
  className?: string;
  /**
   * The live catalogue, handed down by the hero.
   *
   * The built-in copies are the defaults rather than the source, so the box
   * still searches something if the API cannot be reached — a hero with a
   * dead search field is worse than one searching a slightly old list.
   */
  areas?: Area[];
  properties?: Property[];
  types?: { value: string; label: string; count: number }[];
}) {
  const router = useRouter();
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [query, setQuery] = useState("");
  const [areaId, setAreaId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [type, setType] = useState<string>(ANY_TYPE);

  const priceMax = useMemo(() => ceilingFor(properties), [properties]);
  const [min, setMin] = useState(PRICE_MIN);
  const [maxChosen, setMax] = useState(priceMax);

  /**
   * The upper handle, clamped as it is read rather than corrected afterwards.
   *
   * The catalogue can change under a cached page, and a handle left at
   * yesterday's ceiling would quietly exclude anything dearer than it. Doing
   * it here rather than in an effect means the slider is never painted once at
   * the stale value and then again at the right one.
   */
  const max = Math.min(maxChosen, priceMax);

  const isBn = locale === "bn";

  const sections = useMemo(() => {
    const term = query.trim().toLowerCase();
    const matches = (haystack: string) =>
      !term || haystack.toLowerCase().includes(term);

    const typeRows: Suggestion[] = types
      .filter((option) => matches(option.label))
      .map((option) => ({
        kind: "type" as const,
        id: option.value,
        label: option.label,
      }));

    // With nothing typed the data's own order stands in for relevance: it is
    // the editorial order, which is the list of addresses people ask for most.
    const areaRows: Suggestion[] = areas
      .filter((area) => matches(`${area.name} ${area.nameBn} ${area.city}`))
      .slice(0, MAX_AREAS)
      .map((area) => ({
        kind: "area" as const,
        id: area.id,
        label: isBn && area.nameBn ? area.nameBn : area.name,
        note: area.city,
      }));

    // Listings appear only once there is something to match on: an unprompted
    // list of three arbitrary properties is not a suggestion, it is an advert.
    const listings: Suggestion[] = term
      ? properties
          .filter(
            (property) =>
              property.purpose === "sale" &&
              matches(`${property.title} ${property.area} ${property.city}`),
          )
          .slice(0, MAX_LISTINGS)
          .map((property) => ({
            kind: "listing" as const,
            id: property.slug,
            label: property.title,
            note: property.area,
          }))
      : [];

    return { types: typeRows, areaRows, listings };
  }, [query, isBn, areas, properties, types]);

  const suggestions = useMemo(
    () => [...sections.types, ...sections.areaRows, ...sections.listings],
    [sections],
  );

  /** A click on a row blurs the input first; this keeps the panel alive. */
  const cancelBlur = () => {
    if (blurTimer.current) clearTimeout(blurTimer.current);
  };

  const choose = (suggestion: Suggestion) => {
    setOpen(false);

    if (suggestion.kind === "type") {
      setType(suggestion.id);
      return;
    }

    if (suggestion.kind === "area") {
      setQuery(suggestion.label);
      setAreaId(suggestion.id);
      return;
    }

    // A listing goes straight to its own page — the search is over.
    router.push(localeHref(locale, `/properties/${suggestion.id}`));
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open || suggestions.length === 0) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const step = event.key === "ArrowDown" ? 1 : -1;
      setHighlighted(
        (index) => (index + step + suggestions.length) % suggestions.length,
      );
      return;
    }

    if (event.key === "Enter") {
      // Enter takes the highlighted row rather than submitting the form.
      event.preventDefault();
      choose(suggestions[highlighted]);
      return;
    }

    if (event.key === "Escape") setOpen(false);
  };

  // The two handles share a track, so neither may cross the other.
  const setLow = (value: number) => setMin(Math.min(value, max - PRICE_STEP));
  const setHigh = (value: number) => setMax(Math.max(value, min + PRICE_STEP));

  const percent = (value: number) =>
    ((value - PRICE_MIN) / (priceMax - PRICE_MIN)) * 100;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const params = new URLSearchParams({ purpose: "sale" });
    if (areaId) params.set("area", areaId);
    else if (query.trim()) params.set("q", query.trim());
    if (type !== ANY_TYPE) params.set("type", type);
    if (min > PRICE_MIN) params.set("min", String(min));
    if (max < priceMax) params.set("max", String(max));

    router.push(`${localeHref(locale, "/properties")}?${params.toString()}`);
  };

  return (
    <div className={cn("w-full", className)}>
      <form
        onSubmit={submit}
        className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 shadow-2xl sm:p-6"
      >
        <span className="font-heading text-xs font-bold tracking-wider text-muted-foreground uppercase">
          {dict.title}
        </span>

        <div className="relative">
          <input
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls="calculator-suggestions"
            aria-autocomplete="list"
            autoComplete="off"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              // Typing over a chosen area makes it free text again.
              setAreaId(null);
              setHighlighted(0);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            // A click on a row blurs the input first, so closing waits long
            // enough for that click to land.
            onBlur={() => {
              blurTimer.current = setTimeout(() => setOpen(false), 120);
            }}
            onKeyDown={onKeyDown}
            placeholder={dict.searchPlaceholder}
            aria-label={dict.searchPlaceholder}
            className="h-12 w-full rounded-lg border border-border bg-background pr-11 pl-4 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none"
          />

          <Icon
            name="search"
            size="sm"
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground"
          />

          {open && suggestions.length > 0 ? (
            <div
              id="calculator-suggestions"
              role="listbox"
              aria-label={dict.searchPlaceholder}
              className="absolute top-full right-0 left-0 z-30 mt-2 max-h-96 overflow-y-auto rounded-xl border border-border bg-card py-2 shadow-xl"
            >
              {sections.types.length > 0 ? (
                <>
                  <SectionLabel>{dict.categoriesLabel}</SectionLabel>

                  {/* Categories read as chips rather than rows: they are a
                      handful of short words, and a chip says "narrows the
                      search" where a row says "goes somewhere". */}
                  <div className="flex flex-wrap gap-2 px-4 pb-3">
                    {sections.types.map((option) => (
                      <Chip
                        key={option.id}
                        suggestion={option}
                        active={type === option.id}
                        index={suggestions.indexOf(option)}
                        highlighted={highlighted}
                        onHighlight={setHighlighted}
                        onPick={choose}
                        onGuardBlur={cancelBlur}
                      />
                    ))}
                  </div>
                </>
              ) : null}

              {sections.areaRows.length > 0 ? (
                <>
                  <SectionLabel>{dict.areasLabel}</SectionLabel>
                  <ul>
                    {sections.areaRows.map((area) => (
                      <li key={area.id}>
                        <Row
                          suggestion={area}
                          icon="location"
                          index={suggestions.indexOf(area)}
                          highlighted={highlighted}
                          onHighlight={setHighlighted}
                          onPick={choose}
                          onGuardBlur={cancelBlur}
                        />
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {sections.listings.length > 0 ? (
                <>
                  <SectionLabel>{dict.propertiesLabel}</SectionLabel>
                  <ul>
                    {sections.listings.map((listing) => (
                      <li key={listing.id}>
                        <Row
                          suggestion={listing}
                          icon="building"
                          index={suggestions.indexOf(listing)}
                          highlighted={highlighted}
                          onHighlight={setHighlighted}
                          onPick={choose}
                          onGuardBlur={cancelBlur}
                        />
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </div>
          ) : null}
        </div>

        <Select value={type} onValueChange={setType}>
          <SelectTrigger
            aria-label={dict.type}
            className="h-12 w-full border-border bg-background text-sm data-[size=default]:h-12"
          >
            <SelectValue placeholder={dict.type} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ANY_TYPE}>{dict.anyType}</SelectItem>
            {types.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <fieldset className="flex flex-col gap-3">
          <legend className="font-heading text-sm font-semibold text-foreground">
            {dict.priceRange}
          </legend>

          {/* Two range inputs on one track. The inputs themselves are
              transparent and click-through; only their thumbs take a pointer,
              so the lower handle stays grabbable under the upper one. */}
          <div className="relative h-6">
            <span
              aria-hidden
              className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-muted"
            />
            <span
              aria-hidden
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-primary"
              style={{
                left: `${percent(min)}%`,
                right: `${100 - percent(max)}%`,
              }}
            />

            <RangeInput
              value={min}
              onChange={setLow}
              max={priceMax}
              label={dict.minimum}
              formatted={formatBdt(min)}
            />
            <RangeInput
              value={max}
              onChange={setHigh}
              max={priceMax}
              label={dict.maximum}
              formatted={formatBdt(max)}
            />
          </div>

          <div className="flex items-end gap-3">
            <PriceField
              label={dict.minimum}
              value={min}
              onChange={setLow}
              max={priceMax}
              hint={formatBdt(min)}
            />

            <span aria-hidden className="pb-3 text-muted-foreground">
              –
            </span>

            <PriceField
              label={dict.maximum}
              value={max}
              onChange={setHigh}
              max={priceMax}
              hint={formatBdt(max)}
            />
          </div>
        </fieldset>

        <Button type="submit" size="lg" className="h-12 w-full font-semibold">
          <Icon name="search" size="xs" />
          {dict.submit}
        </Button>
      </form>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pt-2 pb-2 font-heading text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
      {children}
    </p>
  );
}

/** Shared props for the two kinds of row in the panel. */
interface OptionProps {
  suggestion: Suggestion;
  index: number;
  highlighted: number;
  onHighlight: (index: number) => void;
  onPick: (suggestion: Suggestion) => void;
  onGuardBlur: () => void;
}

/** A category. Sets the type select and leaves the panel's text alone. */
function Chip({ active, ...props }: OptionProps & { active: boolean }) {
  const { suggestion, index, highlighted, onHighlight, onPick, onGuardBlur } =
    props;

  return (
    <button
      type="button"
      role="option"
      aria-selected={index === highlighted}
      onMouseEnter={() => onHighlight(index)}
      onMouseDown={onGuardBlur}
      onClick={() => onPick(suggestion)}
      className={cn(
        "cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : index === highlighted
            ? "border-primary/40 bg-primary/10 text-foreground"
            : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {suggestion.label}
    </button>
  );
}

/** An area or a listing — one line, with what disambiguates it on the right. */
function Row({
  suggestion,
  icon,
  index,
  highlighted,
  onHighlight,
  onPick,
  onGuardBlur,
}: OptionProps & { icon: IconName }) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={index === highlighted}
      onMouseEnter={() => onHighlight(index)}
      onMouseDown={onGuardBlur}
      onClick={() => onPick(suggestion)}
      className={cn(
        "flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors",
        index === highlighted ? "bg-primary/10" : "hover:bg-muted",
      )}
    >
      <Icon name={icon} size="xs" className="shrink-0 text-primary" />

      <span className="truncate font-medium text-foreground">
        {suggestion.label}
      </span>

      <span className="ml-auto shrink-0 text-xs text-muted-foreground">
        {suggestion.note}
      </span>
    </button>
  );
}

/** One handle of the price slider. */
function RangeInput({
  value,
  onChange,
  label,
  formatted,
  max: ceiling,
}: {
  value: number;
  onChange: (value: number) => void;
  /** The dearest listing, so the track covers the whole catalogue. */
  max: number;
  label: string;
  formatted: string;
}) {
  return (
    <input
      type="range"
      min={PRICE_MIN}
      max={ceiling}
      step={PRICE_STEP}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      aria-label={label}
      aria-valuetext={formatted}
      className={cn(
        "pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 appearance-none bg-transparent focus:outline-none",
        "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-card [&::-webkit-slider-thumb]:shadow-sm",
        "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:cursor-grab [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-card",
        "focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-primary/40",
      )}
    />
  );
}

/**
 * A taka amount, typed. Digits only — a price field that accepts letters just
 * produces a `NaN` nobody sees until the results come back empty.
 */
function PriceField({
  label,
  value,
  onChange,
  hint,
  max: ceiling,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint: string;
  /** Typing a number above the dearest listing is clamped to it. */
  max: number;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>

      <span className="flex h-11 items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:border-primary">
        <span aria-hidden className="text-sm text-muted-foreground">
          ৳
        </span>
        <span aria-hidden className="h-5 w-px bg-border" />

        <input
          inputMode="numeric"
          value={value}
          onChange={(event) => {
            const digits = event.target.value.replace(/\D/g, "");
            onChange(Math.min(Number(digits || 0), ceiling));
          }}
          className="w-full min-w-0 bg-transparent text-sm text-foreground tabular-nums focus:outline-none"
        />
      </span>

      <span className="text-[11px] text-muted-foreground">{hint}</span>
    </label>
  );
}
