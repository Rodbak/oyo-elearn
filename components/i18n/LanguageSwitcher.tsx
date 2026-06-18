"use client";

import { useMemo, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/types";

const options: { id: Locale; labelKey: string }[] = [
  { id: "en", labelKey: "common.english" },
  { id: "fr", labelKey: "common.french" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);

  const selected = useMemo(
    () => options.find((o) => o.id === locale) ?? options[0],
    [locale]
  );

  return (
    <div className={cn("relative", className)} role="group">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "h-9 rounded-btn px-3 py-1.5 font-body text-xs font-semibold transition-all focus-neu",
          "bg-transparent text-foreground hover:bg-neutral-50"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {t(selected.labelKey)}
      </button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute right-0 z-50 mt-2 w-44 rounded-inner bg-white p-1 shadow-lg",
            "dark:bg-neutral-900"
          )}
        >
          {options.map((opt) => {
            const isActive = locale === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  setLocale(opt.id);
                  setOpen(false);
                }}
                className={cn(
                  "w-full rounded-btn px-3 py-2 text-left text-xs font-semibold transition-all focus-neu",
                  isActive
                    ? "bg-accent text-white"
                    : "text-foreground hover:bg-neutral-50 dark:hover:bg-neutral-800"
                )}
              >
                {t(opt.labelKey)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
