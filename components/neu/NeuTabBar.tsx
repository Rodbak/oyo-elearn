"use client";

import { cn } from "@/lib/utils";

export interface Tab {
  id: string;
  label: string;
}

export function NeuTabBar({
  tabs,
  activeId,
  onChange,
  className,
}: {
  tabs: Tab[];
  activeId: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-2 rounded-2xl bg-background p-2 shadow-neu-inset-sm",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              "min-h-[44px] flex-1 rounded-btn px-4 py-2 font-body text-sm font-medium transition-all duration-200 focus-neu",
              active
                ? "bg-background text-accent shadow-neu-inset"
                : "text-muted shadow-neu-extruded-sm hover:shadow-neu-extruded"
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
