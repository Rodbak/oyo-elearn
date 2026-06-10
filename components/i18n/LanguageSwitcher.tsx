"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/types";

const options: { id: Locale; labelKey: string }[] = [
  { id: "en", labelKey: "common.english" },
  { id: "fr", labelKey: "common.french" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-2xl bg-background p-1 shadow-neu-inset-sm",
        className
      )}
      role="group"
      aria-label={t("common.language")}
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setLocale(opt.id)}
          className={cn(
            "min-h-[36px] rounded-btn px-3 py-1.5 font-body text-xs font-semibold transition-all focus-neu",
            locale === opt.id
              ? "bg-background text-accent shadow-neu-inset"
              : "text-muted shadow-neu-extruded-sm hover:shadow-neu-extruded"
          )}
          aria-pressed={locale === opt.id}
        >
          {t(opt.labelKey)}
        </button>
      ))}
    </div>
  );
}
