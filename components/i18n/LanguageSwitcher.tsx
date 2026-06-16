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
        "flex items-center gap-1 rounded-inner bg-transparent p-0",
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
            "h-9 rounded-btn px-3 py-1.5 font-body text-xs font-semibold transition-all focus-neu",
            locale === opt.id
              ? "bg-accent text-white"
              : "text-foreground hover:bg-neutral-50"
          )}
          aria-pressed={locale === opt.id}
        >
          {t(opt.labelKey)}
        </button>
      ))}
    </div>
  );
}
