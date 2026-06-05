import { dictionary as en } from "./dictionaries/en";
import { dictionary as fr } from "./dictionaries/fr";
import { defaultLocale, isValidLocale, type Dictionary, type Locale } from "./types";

export { isValidLocale };

const dictionaries = { en, fr } as Record<Locale, Dictionary>;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function createTranslator(dict: Dictionary) {
  return function t(key: string): string {
    const parts = key.split(".");
    let current: unknown = dict;
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = (current as Record<string, unknown>)[part];
      } else {
        return key;
      }
    }
    if (typeof current === "string") return current;
    return key;
  };
}
