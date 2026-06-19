"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createTranslator, getDictionary } from "@/lib/i18n/get-dictionary";
import type { Dictionary, Locale } from "@/lib/i18n/types";

const defaultDictionary = getDictionary("en");
const defaultTranslator = createTranslator(defaultDictionary);

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? "en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (saved === "en" || saved === "fr") {
      setLocaleState(saved);
    }
  }, []);

  const dictionary = useMemo(() => getDictionary(locale), [locale]);
  const t = useMemo(() => createTranslator(dictionary), [dictionary]);

  const setLocale = (locale: Locale) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", locale);
    }
    setLocaleState(locale);
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t, dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextType {
  const ctx = useContext(LocaleContext);
  return ctx ?? {
    locale: "en",
    setLocale: () => {},
    t: defaultTranslator,
    dictionary: defaultDictionary,
  };
}

export default LocaleProvider;
