"use client";

import { useState } from "react";
import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  searchPlaceholder: string;
}

export function BlogCategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery = "",
  onSearchChange,
  searchPlaceholder,
}: CategoryFilterProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category Pills Scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-700/30"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/60",
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        {onSearchChange && (
          <div
            className={cn(
              "relative flex items-center rounded-full border bg-background px-3.5 py-1.5 transition-all duration-200 lg:w-72",
              isFocused
                ? "border-primary ring-2 ring-primary/20"
                : "border-border/80 hover:border-border",
            )}
          >
            <Icon name="trend" size="xs" className="mr-2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={searchPlaceholder}
              className="w-full bg-transparent text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
