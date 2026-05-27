import type { Locale } from "./locales";
import { en } from "./dictionaries/en";
import { zh } from "./dictionaries/zh";
import type { Dictionary } from "./dictionaries/en";

const dictionaries: Record<Locale, Dictionary> = { en, zh };

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
