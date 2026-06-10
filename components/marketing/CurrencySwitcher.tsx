"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { createContext, useContext, useState } from "react";

export type CurrencyCode = "GHS" | "USD" | "NGN" | "KES" | "EUR" | "GBP";

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  flag: string;
  /** Base price in GHS for the Pro plan */
  rate: number;
  /** Formatted Pro price */
  proPrice: string;
}

export const CURRENCIES: Currency[] = [
  { code: "GHS", symbol: "GH₵", flag: "🇬🇭", rate: 1,      proPrice: "GH₵1,999"  },
  { code: "USD", symbol: "$",   flag: "🇺🇸", rate: 0.052,  proPrice: "$49"        },
  { code: "NGN", symbol: "₦",   flag: "🇳🇬", rate: 62,     proPrice: "₦49,999"   },
  { code: "KES", symbol: "KSh", flag: "🇰🇪", rate: 7.2,    proPrice: "KSh5,499"  },
  { code: "EUR", symbol: "€",   flag: "🇪🇺", rate: 0.048,  proPrice: "€45"        },
  { code: "GBP", symbol: "£",   flag: "🇬🇧", rate: 0.042,  proPrice: "£39"        },
];

/* ── Context ─────────────────────────────────────────────────────── */
interface CurrencyCtx {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const CurrencyContext = createContext<CurrencyCtx>({
  currency: CURRENCIES[0],
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

/* ── Dropdown UI ─────────────────────────────────────────────────── */
export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={t("landing.currency.label")}
        className="flex h-9 items-center gap-1.5 rounded-btn bg-background px-3 font-body text-sm font-semibold text-foreground shadow-neu-extruded-sm transition-all duration-200 hover:shadow-neu-extruded focus-neu active:shadow-neu-inset-sm"
      >
        <span className="text-base leading-none">{currency.flag}</span>
        <span className="hidden sm:inline">{currency.symbol}</span>
        <svg
          className={`h-3 w-3 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Backdrop */}
      {open && (
        <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
      )}

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[200px] rounded-[20px] bg-background p-2 shadow-neu-extruded">
          {CURRENCIES.map((c) => {
            const nameKey = `landing.currency.names.${c.code}` as const;
            const isActive = currency.code === c.code;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => { setCurrency(c); setOpen(false); }}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 font-body text-sm transition-all duration-200 focus-neu ${
                  isActive
                    ? "shadow-neu-inset text-accent font-semibold"
                    : "text-foreground hover:shadow-neu-extruded-sm"
                }`}
              >
                <span className="text-base">{c.flag}</span>
                <span className="flex-1 text-left">{t(nameKey)}</span>
                <span className="text-xs text-muted font-normal">{c.symbol}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
