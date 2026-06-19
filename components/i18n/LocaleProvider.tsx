"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Locale = "en" | "fr";

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("lang") : null;
    if (saved === "en" || saved === "fr") setLocaleState(saved);
  }, []);

  const setLocale = (locale: Locale) => {
    localStorage.setItem("lang", locale);
    setLocaleState(locale);
  };

  const t = (key: string) => key;

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextType {
  const ctx = useContext(LocaleContext);
  return ctx ?? {
    locale: "en",
    setLocale: () => {},
    t: (key: string) => key,
  };
}

export default LocaleProvider;
