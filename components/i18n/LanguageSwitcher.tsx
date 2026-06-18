"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const options: { id: Locale; label: string; flag: string }[] = [
  { id: "en", label: "English", flag: "🇬🇧" },
  { id: "fr", label: "Français", flag: "🇫🇷" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);

  const current = options.find(opt => opt.id === locale);

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-inner bg-background px-3 py-2 text-sm font-medium shadow-neu-extruded-sm hover:shadow-neu-extruded focus-neu transition-all"
      >
        <span className="text-base">{current?.flag}</span>
        <span>{current?.label}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-background p-1 shadow-neu-extruded z-50">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                setLocale(opt.id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-accent/5 transition-all",
                locale === opt.id && "bg-accent/10"
              )}
            >
              <span className="text-lg">{opt.flag}</span>
              <span className="font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
