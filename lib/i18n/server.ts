import { cookies } from "next/headers";
import { createTranslator, getDictionary } from "./get-dictionary";
import { defaultLocale, isValidLocale, LOCALE_COOKIE, type Locale } from "./types";

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(LOCALE_COOKIE)?.value;
  return isValidLocale(value) ? value : defaultLocale;
}

export async function getServerTranslations() {
  const locale = await getServerLocale();
  const dictionary = getDictionary(locale);
  return { locale, dictionary, t: createTranslator(dictionary) };
}
