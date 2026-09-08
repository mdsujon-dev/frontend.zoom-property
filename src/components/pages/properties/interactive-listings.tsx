"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Icon } from "@/components/common/icon";
import { PropertyCard } from "./property-card";
import { areas } from "@/data/areas";
import { properties, propertyTypes, type Property, type Purpose } from "@/data/properties";
import { formatBdt } from "@/lib/format";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "gulshan" | "penthouse" | "ready" | "commercial" | "rent";
const PAGE_SIZE = 12;

/**
 * What the hero's property calculator sends over in the query string. Every
 * field is optional: the page is reachable with none of them.
 */
export interface ListingFilters {
  purpose?: Purpose;
  /**
   * An area id from `src/data/areas.ts`, picked from the calculator's
   * suggestions. Ids are the neighbourhood itself — `gulshan`, `mirpur-dohs` —
   * and a listing's `area` is that name plus its block or sector ("Gulshan 2"),
   * so the id matched as a prefix word is what ties the two lists together.
   */
  area?: string;
  /** Free text, matched against the title, the area and the city. */
  q?: string;
  type?: string;
  min?: number;
  max?: number;
}

/** "mirpur-dohs" → "mirpur dohs", the shape listing areas are written in. */
function areaTerm(areaId: string) {
  return areaId.replace(/-/g, " ").toLowerCase();
}

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Curated" },
  { id: "gulshan", label: "Gulshan & Baridhara" },
  { id: "penthouse", label: "Penthouses & Duplexes" },
  { id: "ready", label: "Ready to Move" },
  { id: "rent", label: "Diplomatic Rentals" },
  { id: "commercial", label: "Commercial Floors" },
];

export function InteractiveListings({
  filters,
  clearHref,
}: {
  /** Applied before the tabs — the tabs narrow the search, never widen it. */
  filters?: ListingFilters;
  /** Where "clear" goes: the same page without the query string. */
  clearHref?: string;
} = {}) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [page, setPage] = useState(1);

  const searched = useMemo(() => {
    if (!filters) return properties;

    const query = filters.q?.toLowerCase().trim();

    const area = filters.area ? areaTerm(filters.area) : undefined;

    return properties.filter((property) => {
      if (filters.purpose && property.purpose !== filters.purpose) return false;
      if (area && !property.area.toLowerCase().includes(area)) return false;
      if (filters.type && property.type !== filters.type) return false;
      if (filters.min !== undefined && property.price < filters.min) return false;
      if (filters.max !== undefined && property.price > filters.max) return false;

      if (query) {
        const haystack =
          `${property.title} ${property.area} ${property.city}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }

      return true;
    });
  }, [filters]);

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
        propertyTypes.find((type) => type.value === filters.type)?.label ??
          filters.type,
      );
    }
    if (filters.min !== undefined || filters.max !== undefined) {
      chips.push(
        `${formatBdt(filters.min ?? 0)} – ${filters.max !== undefined ? formatBdt(filters.max) : "∞"}`,
      );
    }
    if (filters.purpose) {
      chips.push(filters.purpose === "rent" ? "For rent" : "For sale");
    }

    return chips;
  }, [filters]);

  const filteredProperties = searched.filter((prop: Property) => {
    if (activeTab === "all") return true;
    if (activeTab === "gulshan") {
      return prop.area.toLowerCase().includes("gulshan") || prop.area.toLowerCase().includes("baridhara");
    }
    if (activeTab === "penthouse") {
      return prop.type === "duplex" || prop.title.toLowerCase().includes("penthouse");
    }
    if (activeTab === "ready") {
      return prop.handover.toLowerCase().includes("ready") || prop.handover.toLowerCase().includes("available");
    }
    if (activeTab === "rent") {
      return prop.purpose === "rent";
    }
    if (activeTab === "commercial") {
      return prop.type === "commercial";
    }
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filteredProperties.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedProperties = useMemo(
    () => filteredProperties.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [currentPage, filteredProperties],
  );
  const pageStart = filteredProperties.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const pageEnd = Math.min(currentPage * PAGE_SIZE, filteredProperties.length);

  const changeTab = (tab: FilterTab) => {
    setActiveTab(tab);
    setPage(1);
  };

  const goToPage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(nextPage, totalPages)));
  };

  return (
    <div className="flex flex-col gap-8">
      {/* What arrived from the property calculator, and the way back out. */}
      {activeChips.length > 0 ? (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3">
          <span className="text-sm font-semibold text-foreground">
            Your search:
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
              Clear
            </Link>
          ) : null}
        </div>
      ) : null}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {FILTER_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => changeTab(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-2 text-xs md:text-sm font-medium transition-all duration-300",
                isActive
                  ? "border-primary bg-primary text-primary-foreground font-semibold shadow-md scale-105"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-primary/10",
              )}
            >
              <span>{tab.label}</span>
              {isActive ? (
                <span className="rounded-full bg-primary-foreground/20 px-1.5 py-0.2 text-[10px] font-bold">
                  {filteredProperties.length}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Property Cards Grid */}
      <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
        <span>Showing {pageStart}-{pageEnd} of {filteredProperties.length} properties</span>
        <span className="hidden sm:inline">12 per page</span>
      </div>

      <Stagger key={`${activeTab}-${currentPage}`} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedProperties.map((property) => (
          <StaggerItem key={property.id}>
            <PropertyCard property={property} />
          </StaggerItem>
        ))}
      </Stagger>

      {/* Empty State */}
      {filteredProperties.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-primary/30 p-12 text-center text-muted-foreground">
          <p>No listings matched this criteria. Contact our concierge for off-market inventory.</p>
        </div>
      ) : null}

      <nav aria-label="Property pagination" className="flex flex-wrap items-center justify-center gap-2 pt-2">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
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
              "flex size-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
              pageNumber === currentPage
                ? "border-primary bg-primary text-primary-foreground"
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
          className="flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
        >
          <Icon name="chevronRight" size="xs" />
        </button>
      </nav>
    </div>
  );
}
