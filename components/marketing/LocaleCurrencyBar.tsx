"use client";

import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { CurrencySwitcher } from "@/components/marketing/CurrencySwitcher";

export function LocaleCurrencyBar() {
  return (
    <div className="flex items-center gap-2 rounded-card bg-white border border-surface-border p-2 shadow-neu-extruded-sm">
      <CurrencySwitcher />
      <div className="h-6 w-px bg-surface-border" />
      <LanguageSwitcher className="bg-white shadow-none" />
    </div>
  );
}
