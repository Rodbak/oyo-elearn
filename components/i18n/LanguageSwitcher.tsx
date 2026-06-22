"use client";
import { useLocale } from "@/components/i18n/LocaleProvider";
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  return (
    <div className="relative inline-flex items-center">
      <select
        className={className + " appearance-none rounded-inner py-2 pl-3 pr-6 text-sm cursor-pointer"}
        value={locale}
        onChange={e => { setLocale(e.target.value as any); localStorage.setItem("lang", e.target.value); }}
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
      <span className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-muted">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  );
}
