"use client";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { CurrencySwitcher } from "@/components/marketing/CurrencySwitcher";

export function LocaleCurrencyBar() {
  return (
    <div className="flex items-center gap-0 rounded-card bg-white border border-surface-border p-1 shadow-neu-extruded-sm">
      <CurrencySwitcher />
      <div className="h-8 w-px bg-surface-border" />
      <LanguageSwitcher className="bg-white shadow-none" />
    </div>
  );
}
