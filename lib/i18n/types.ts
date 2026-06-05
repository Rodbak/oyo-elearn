export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const LOCALE_COOKIE = "oyo-locale";

import { dictionary as enDict } from "./dictionaries/en";
import { dictionary as frDict } from "./dictionaries/fr";

export type Dictionary = typeof enDict | typeof frDict;

export function isValidLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "fr";
}
