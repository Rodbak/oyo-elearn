"use client";

import {
  createTranslator,
  getDictionary,
} from "@/lib/i18n/get-dictionary";
import {
  defaultLocale,
  isValidLocale,
  LOCALE_COOKIE,
  type Dictionary,
  type Locale,
} from "@/lib/i18n/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type TFunction = (key: string) => string;

interface LocaleContextValue {
  locale: Locale;
  dictionary: Dictionary;
  t: TFunction;
  setLocale: (locale: Locale) => Promise<void>;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale = defaultLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(
    isValidLocale(initialLocale) ? initialLocale : defaultLocale
  );

  const dictionary = useMemo(() => getDictionary(locale), [locale]);
  const t = useMemo(() => createTranslator(dictionary), [dictionary]);

  const setLocale = useCallback(
    async (next: Locale) => {
      setLocaleState(next);
      document.documentElement.lang = next;
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      router.refresh();
    },
    [router]
  );

  const value = useMemo(
    () => ({ locale, dictionary, t, setLocale }),
    [locale, dictionary, t, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export { LOCALE_COOKIE };
