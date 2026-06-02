import type { Locale } from "./locales";
import { en } from "./dictionaries/en";
import { zh } from "./dictionaries/zh";
import { es } from "./dictionaries/es";
import type { Dictionary } from "./dictionaries/en";
import { buildLocaleDictionary } from "./build-locale-dict";
import { localePacks } from "./packs";

const built: Partial<Record<Locale, Dictionary>> = {};

function getBuilt(locale: Locale): Dictionary {
  if (!built[locale]) {
    const pack = localePacks[locale];
    if (!pack) return en;
    built[locale] = buildLocaleDictionary(pack);
  }
  return built[locale]!;
}

const dictionaries: Record<Locale, Dictionary> = {
  en,
  zh,
  es,
  ar: getBuilt("ar"),
  de: getBuilt("de"),
  fr: getBuilt("fr"),
  he: getBuilt("he"),
  id: getBuilt("id"),
  it: getBuilt("it"),
  ja: getBuilt("ja"),
  ko: getBuilt("ko"),
  pt: getBuilt("pt"),
  ru: getBuilt("ru"),
  th: getBuilt("th"),
  tr: getBuilt("tr"),
  vi: getBuilt("vi"),
};

export function getDictionarySync(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return getDictionarySync(locale);
}
