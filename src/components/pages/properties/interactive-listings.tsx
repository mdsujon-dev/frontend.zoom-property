"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/common/icon";
import { PropertyCard } from "./property-card";
import { properties, type Property } from "@/data/properties";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "gulshan" | "penthouse" | "ready" | "commercial" | "rent";
const PAGE_SIZE = 12;

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All Curated" },
  { id: "gulshan", label: "Gulshan & Baridhara" },
  { id: "penthouse", label: "Penthouses & Duplexes" },
  { id: "ready", label: "Ready to Move" },
  { id: "rent", label: "Diplomatic Rentals" },
  { id: "commercial", label: "Commercial Floors" },
];

export function InteractiveListings() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [page, setPage] = useState(1);

  const filteredProperties = properties.filter((prop: Property) => {
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
