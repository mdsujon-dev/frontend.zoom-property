"use client";

import { useState } from "react";

import { Icon } from "@/components/common/icon";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { areas } from "@/data/areas";
import { propertyTypes as fallbackTypes } from "@/data/properties";
import { cn } from "@/lib/utils";

const PURPOSES = ["buy", "rent", "projects", "commercial"] as const;

type Purpose = (typeof PURPOSES)[number];

/**
 * Strings arrive as a prop: this is a Client Component, so it cannot read the
 * dictionary itself. Budget bracket labels stay here — they are numbers with a
 * currency symbol, identical in both locales.
 */
export interface SearchDict {
  buy: string;
  rent: string;
  projects: string;
  commercial: string;
  location: string;
  anyLocation: string;
  type: string;
  anyType: string;
  budget: string;
  anyBudget: string;
  submit: string;
}

const BUDGETS: Record<Purpose, { value: string; label: string }[]> = {
  buy: [
    { value: "0-20000000", label: "Up to ৳2.0 Cr" },
    { value: "20000000-40000000", label: "৳2.0 – 4.0 Cr" },
    { value: "40000000-70000000", label: "৳4.0 – 7.0 Cr" },
    { value: "70000000-150000000", label: "৳7.0 – 15.0 Cr" },
    { value: "150000000-0", label: "৳15.0 Cr+ (Penthouse)" },
  ],
  rent: [
    { value: "0-75000", label: "Up to ৳75k/mo" },
    { value: "75000-150000", label: "৳75k – 1.5 Lakh/mo" },
    { value: "150000-300000", label: "৳1.5 – 3.0 Lakh/mo" },
    { value: "300000-0", label: "৳3.0 Lakh+/mo (Diplomatic)" },
  ],
  projects: [
    { value: "0-25000000", label: "Early Piling Phase (< ৳2.5 Cr)" },
    { value: "25000000-50000000", label: "Structural Stage (৳2.5 – 5 Cr)" },
    { value: "50000000-0", label: "Finishing & Handover (৳5 Cr+)" },
  ],
  commercial: [
    { value: "0-200000", label: "Up to ৳2 Lakh/mo" },
    { value: "200000-500000", label: "৳2 – 5 Lakh/mo" },
    { value: "500000-1000000", label: "৳5 – 10 Lakh/mo" },
    { value: "1000000-0", label: "৳10 Lakh+/mo (Full Building)" },
  ],
};

export function PropertySearch({
  dict,
  className,
  types = fallbackTypes,
}: {
  dict: SearchDict;
  className?: string;
  types?: { value: string; label: string }[];
}) {
  const purposeLabel: Record<Purpose, string> = {
    buy: dict.buy,
    rent: dict.rent,
    projects: dict.projects,
    commercial: dict.commercial,
  };
  const [purpose, setPurpose] = useState<Purpose>("buy");
  const [selectedArea, setSelectedArea] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");

  const handleSearch = () => {
    const targetElement = document.getElementById("listings");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={cn(
        "w-full rounded-2xl border border-primary/30 bg-card/95 p-3 shadow-2xl backdrop-blur-xl brand-glow-subtle",
        className,
      )}
    >
      {/* Category Tabs */}
      <div
        role="tablist"
        aria-label={dict.submit}
        className="flex flex-wrap gap-1.5 p-1 border-b border-primary/20 pb-3"
      >
        {PURPOSES.map((value) => {
          const active = value === purpose;
          return (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setPurpose(value);
                setSelectedBudget("");
              }}
              className={cn(
                "rounded-full px-4 py-2 text-xs md:text-sm font-medium transition-all duration-300",
                active
                  ? "bg-primary text-primary-foreground font-semibold shadow-md"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-foreground",
              )}
            >
              {purposeLabel[value]}
            </button>
          );
        })}
      </div>

      {/* Filter Fields */}
      <div className="mt-3 grid gap-2.5 p-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1.1fr_1.1fr_auto]">
        <Field label={dict.location}>
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="h-12 w-full border border-primary/20 bg-secondary text-foreground focus:border-primary">
              <SelectValue placeholder={dict.anyLocation} />
            </SelectTrigger>
            <SelectContent className="border-primary/20 bg-muted text-foreground">
              {areas.map((area) => (
                <SelectItem key={area.id} value={area.id} className="focus:bg-primary/20 focus:text-foreground">
                  {area.name}, {area.city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label={dict.type}>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="h-12 w-full border border-primary/20 bg-secondary text-foreground focus:border-primary">
              <SelectValue placeholder={dict.anyType} />
            </SelectTrigger>
            <SelectContent className="border-primary/20 bg-muted text-foreground">
              {types.map((type) => (
                <SelectItem key={type.value} value={type.value} className="focus:bg-primary/20 focus:text-foreground">
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field label={dict.budget}>
          <Select key={purpose} value={selectedBudget} onValueChange={setSelectedBudget}>
            <SelectTrigger className="h-12 w-full border border-primary/20 bg-secondary text-foreground focus:border-primary">
              <SelectValue placeholder={dict.anyBudget} />
            </SelectTrigger>
            <SelectContent className="border-primary/20 bg-muted text-foreground">
              {BUDGETS[purpose].map((item) => (
                <SelectItem key={item.value} value={item.value} className="focus:bg-primary/20 focus:text-foreground">
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <div className="flex flex-col justify-end">
          <Button
            size="lg"
            onClick={handleSearch}
            className="h-12 w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-medium px-6 flex items-center justify-center gap-2"
          >
            <Icon name="search" size="xs" />
            <span>{dict.submit}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
