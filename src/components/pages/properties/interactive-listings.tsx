"use client";

import { useState } from "react";
import { PropertyCard } from "./property-card";
import { properties, type Property } from "@/data/properties";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";

type FilterTab = "all" | "gulshan" | "penthouse" | "ready" | "commercial" | "rent";

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
              onClick={() => setActiveTab(tab.id)}
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
      <Stagger key={activeTab} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProperties.map((property) => (
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
    </div>
  );
}
