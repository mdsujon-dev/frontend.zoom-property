"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/common/icon";
import { PropertyCard } from "./property-card";
import { areas as fallbackAreas, type Area } from "@/data/areas";
import type { Locale } from "@/i18n/config";
import { properties as fallbackProperties, type Property, type Purpose } from "@/data/properties";
import { formatBdt } from "@/lib/format";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

type CategoryTab = "all" | "sale" | "rent" | "penthouse" | "ready" | "commercial";
/** Cards per page when the caller does not say. */
const DEFAULT_PAGE_SIZE = 12;

export interface ListingFilters {
  purpose?: Purpose;
  area?: string;
  q?: string;
  type?: string;
  min?: number;
  max?: number;
}

function normalizeTerm(str: string) {
  return str.replace(/-/g, " ").toLowerCase().trim();
}

export function InteractiveListings({
  locale = "en",
  filters,
  clearHref,
  properties = fallbackProperties,
  areas = fallbackAreas,
  types,
  pageSize = DEFAULT_PAGE_SIZE,
}: {
  locale?: Locale;
  filters?: ListingFilters;
  clearHref?: string;
  properties?: Property[];
  areas?: Area[];
  types?: { value: string; label: string }[];
  /** How many cards a page holds. The page that owns the list decides. */
  pageSize?: number;
} = {}) {
  // Guarded rather than trusted: a zero or a negative would divide the list
  // into an infinite number of pages and hang the render.
  const perPage = Math.max(1, Math.floor(pageSize) || DEFAULT_PAGE_SIZE);
  const [selectedArea, setSelectedArea] = useState<string>(filters?.area || "all");
  const [activeCategory, setActiveCategory] = useState<CategoryTab>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState(1);

  const isBn = locale === "bn";

  // Compute dynamic area list with property counts
  const areaOptions = useMemo(() => {
    const list: { id: string; name: string; nameBn?: string; count: number }[] = [];

    // Map through configured areas
    for (const area of areas) {
      const term = normalizeTerm(area.id);
      const nameTerm = normalizeTerm(area.name);
      const count = properties.filter((p) => {
        const propArea = normalizeTerm(p.area);
        const propCity = normalizeTerm(p.city);
        return propArea.includes(term) || propArea.includes(nameTerm) || propCity.includes(term);
      }).length;

      if (count > 0 || list.length < 8) {
        list.push({
          id: area.id,
          name: area.name,
          nameBn: area.nameBn,
          count,
        });
      }
    }

    return list;
  }, [areas, properties]);

  // Combined search and query-string filters
  const searched = useMemo(() => {
    return properties.filter((property) => {
      // Calculator / Query-string filters
      if (filters?.purpose && property.purpose !== filters.purpose) return false;
      if (filters?.type && property.type !== filters.type) return false;
      if (filters?.min !== undefined && property.price < filters.min) return false;
      if (filters?.max !== undefined && property.price > filters.max) return false;

      // Query param search
      if (filters?.q) {
        const queryTerm = filters.q.toLowerCase().trim();
        const haystack = `${property.title} ${property.area} ${property.city}`.toLowerCase();
        if (!haystack.includes(queryTerm)) return false;
      }

      // Inline search box
      if (searchQuery.trim()) {
        const search = searchQuery.toLowerCase().trim();
        const haystack = `${property.title} ${property.area} ${property.city} ${property.type}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }

      // Dynamic Area selection
      if (selectedArea !== "all") {
        const selectedAreaObj = areas.find((a) => a.id === selectedArea);
        const term = normalizeTerm(selectedArea);
        const nameTerm = selectedAreaObj ? normalizeTerm(selectedAreaObj.name) : term;
        const propArea = normalizeTerm(property.area);
        const propCity = normalizeTerm(property.city);

        if (!propArea.includes(term) && !propArea.includes(nameTerm) && !propCity.includes(term)) {
          return false;
        }
      }

      // Category / Type filter
      if (activeCategory === "sale") {
        if (property.purpose !== "sale") return false;
      } else if (activeCategory === "rent") {
        if (property.purpose !== "rent") return false;
      } else if (activeCategory === "penthouse") {
        if (property.type !== "duplex" && !property.title.toLowerCase().includes("penthouse")) return false;
      } else if (activeCategory === "ready") {
        const handover = (property.handover || "").toLowerCase();
        if (!handover.includes("ready") && !handover.includes("available")) return false;
      } else if (activeCategory === "commercial") {
        if (property.type !== "commercial") return false;
      }

      return true;
    });
  }, [properties, filters, searchQuery, selectedArea, activeCategory, areas]);

  const activeChips = useMemo(() => {
    if (!filters) return [];

    const chips: string[] = [];
    if (filters.area) {
      chips.push(
        areas.find((area) => area.id === filters.area)?.name ?? filters.area,
      );
    }
    if (filters.q) chips.push(`“${filters.q}”`);
    if (filters.type) {
      chips.push(
        types?.find((type) => type.value === filters.type)?.label ??
          filters.type,
      );
    }
    if (filters.min !== undefined || filters.max !== undefined) {
      chips.push(
        `${formatBdt(filters.min ?? 0)} – ${filters.max !== undefined ? formatBdt(filters.max) : "∞"}`,
      );
    }
    if (filters.purpose) {
      chips.push(filters.purpose === "rent" ? (isBn ? "ভাড়া" : "For rent") : (isBn ? "বিক্রয়" : "For sale"));
    }

    return chips;
  }, [filters, areas, isBn]);

  const totalPages = Math.max(1, Math.ceil(searched.length / perPage));
  const currentPage = Math.min(page, totalPages);
  const paginatedProperties = useMemo(
    () => searched.slice((currentPage - 1) * perPage, currentPage * perPage),
    [currentPage, perPage, searched],
  );
  const pageStart = searched.length === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const pageEnd = Math.min(currentPage * perPage, searched.length);

  const handleAreaChange = (areaId: string) => {
    setSelectedArea(areaId);
    setPage(1);
  };

  const handleCategoryChange = (cat: CategoryTab) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const goToPage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(nextPage, totalPages)));
  };

  const CATEGORY_TABS: { id: CategoryTab; labelEn: string; labelBn: string }[] = [
    { id: "all", labelEn: "All Types", labelBn: "সকল ক্যাটাগরি" },
    { id: "sale", labelEn: "For Sale", labelBn: "বিক্রয়ের জন্য" },
    { id: "rent", labelEn: "For Rent", labelBn: "ভাড়ার জন্য" },
    { id: "ready", labelEn: "Ready to Move", labelBn: "রেডি ফ্ল্যাট" },
    { id: "penthouse", labelEn: "Penthouse & Duplex", labelBn: "পেন্টহাউজ ও ডুপ্লেক্স" },
    { id: "commercial", labelEn: "Commercial", labelBn: "বাণিজ্যিক" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* What arrived from the property calculator */}
      {activeChips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
          <span className="text-sm font-semibold text-foreground">
            {isBn ? "আপনার সার্চ:" : "Your search:"}
          </span>

          {activeChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-primary/25 bg-card px-3 py-1 text-xs font-medium text-primary"
            >
              {chip}
            </span>
          ))}

          {clearHref ? (
            <Link
              href={clearHref}
              className="ml-auto text-xs font-semibold uppercase tracking-wider text-primary hover:underline"
            >
              {isBn ? "ক্লিয়ার করুন" : "Clear"}
            </Link>
          ) : null}
        </div>
      ) : null}

      {/* Filter Section: Area Filter & Category Filter */}
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card/60 p-4 sm:p-6 backdrop-blur-sm shadow-xs">
        {/* Top: Area-wise Filter Bar */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Icon name="location" size="xs" />
              {isBn ? "এলাকা অনুযায়ী ফিল্টার (Area Filter)" : "Filter by Area"}
            </span>
            <span className="text-xs text-muted-foreground">
              {searched.length} {isBn ? "টি প্রপার্টি উপলব্ধ" : "properties found"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleAreaChange("all")}
              className={cn(
                "flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
                selectedArea === "all"
                  ? "border-primary bg-primary text-primary-foreground font-semibold shadow-sm scale-105"
                  : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground hover:bg-primary/5",
              )}
            >
              <span>{isBn ? "সব এলাকা" : "All Areas"}</span>
              <span className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                selectedArea === "all" ? "bg-primary-foreground/25 text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {properties.length}
              </span>
            </button>

            {areaOptions.map((area) => {
              const isSelected = selectedArea === area.id;
              const label = isBn && area.nameBn ? area.nameBn : area.name;

              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => handleAreaChange(area.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground font-semibold shadow-sm scale-105"
                      : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground hover:bg-primary/5",
                  )}
                >
                  <span>{label}</span>
                  {area.count > 0 && (
                    <span className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                      isSelected ? "bg-primary-foreground/25 text-primary-foreground" : "bg-muted text-muted-foreground"
                    )}>
                      {area.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-border/60" />

        {/* Bottom: Category Tabs & Search input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORY_TABS.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? "border-primary bg-primary/10 text-primary font-semibold border-primary/40"
                      : "border-border/60 bg-card text-muted-foreground hover:border-border hover:text-foreground hover:bg-muted/40",
                  )}
                >
                  {isBn ? cat.labelBn : cat.labelEn}
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <input
              type="text"
              placeholder={isBn ? "প্রপার্টি বা কিওয়ার্ড খুঁজুন..." : "Search properties..."}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-border bg-background px-3 py-1.5 pl-8 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <Icon name="search" size="xs" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Property Count Info */}
      <div className="flex items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
        <span>
          {isBn
            ? `${searched.length}টির মধ্যে ${pageStart}-${pageEnd} দেখানো হচ্ছে`
            : `Showing ${pageStart}-${pageEnd} of ${searched.length} properties`}
        </span>
        <span className="hidden sm:inline">
          {isBn ? `প্রতি পাতায় ${perPage}টি` : `${perPage} per page`}
        </span>
      </div>

      {/* Property Cards Grid */}
      <Stagger key={`${selectedArea}-${activeCategory}-${currentPage}-${searchQuery}`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProperties.map((property) => (
          <StaggerItem key={property.id}>
            <PropertyCard property={property} locale={locale} />
          </StaggerItem>
        ))}
      </Stagger>

      {/* Empty State */}
      {searched.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary/30 p-12 text-center text-muted-foreground bg-muted/10">
          <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon name="location" size="md" />
          </div>
          <h3 className="font-heading text-lg font-semibold text-foreground">
            {isBn ? "কোনো প্রপার্টি পাওয়া যায়নি" : "No listings matched this criteria"}
          </h3>
          <p className="mt-1 max-w-md text-xs sm:text-sm text-muted-foreground">
            {isBn
              ? "আপনার ফিল্টার পরিবর্তন করে দেখুন অথবা আমাদের কনসিয়ার্জ টিমের সাথে যোগাযোগ করুন।"
              : "Try adjusting your area or category filters, or contact our concierge for off-market inventory."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedArea("all");
              setActiveCategory("all");
              setSearchQuery("");
            }}
            className="mt-4 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {isBn ? "সব ফিল্টার রিসেট করুন" : "Reset all filters"}
          </button>
        </div>
      ) : null}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <nav aria-label="Property pagination" className="flex flex-wrap items-center justify-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
          >
            <Icon name="chevronLeft" size="xs" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => goToPage(pageNumber)}
              aria-current={pageNumber === currentPage ? "page" : undefined}
              className={cn(
                "flex size-9 items-center justify-center rounded-full border text-sm font-semibold transition-all cursor-pointer",
                pageNumber === currentPage
                  ? "border-primary bg-primary text-primary-foreground shadow-xs scale-105"
                  : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary",
              )}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40 cursor-pointer"
          >
            <Icon name="chevronRight" size="xs" />
          </button>
        </nav>
      )}
    </div>
  );
}
