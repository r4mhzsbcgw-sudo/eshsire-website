export const locales = [
  "en",
  "zh",
  "ar",
  "de",
  "es",
  "fr",
  "he",
  "id",
  "it",
  "ja",
  "ko",
  "pt",
  "ru",
  "th",
  "tr",
  "vi",
] as const;

export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** Locales with complete copy — indexed in Google */
export const indexableLocales = ["en", "zh", "es"] as const satisfies readonly Locale[];

export function isIndexableLocale(locale: Locale): boolean {
  return (indexableLocales as readonly Locale[]).includes(locale);
}

export const rtlLocales: Locale[] = ["ar", "he"];

export const cjkLocales: Locale[] = ["zh", "ja", "ko"];

export const localeLabels: Record<
  Locale,
  { short: string; name: string; nativeName: string }
> = {
  en: { short: "EN", name: "English", nativeName: "English" },
  zh: { short: "中文", name: "Chinese", nativeName: "简体中文" },
  ar: { short: "AR", name: "Arabic", nativeName: "العربية" },
  de: { short: "DE", name: "German", nativeName: "Deutsch" },
  es: { short: "ES", name: "Spanish", nativeName: "Español" },
  fr: { short: "FR", name: "French", nativeName: "Français" },
  he: { short: "HE", name: "Hebrew", nativeName: "עברית" },
  id: { short: "ID", name: "Indonesian", nativeName: "Bahasa Indonesia" },
  it: { short: "IT", name: "Italian", nativeName: "Italiano" },
  ja: { short: "JA", name: "Japanese", nativeName: "日本語" },
  ko: { short: "KO", name: "Korean", nativeName: "한국어" },
  pt: { short: "PT", name: "Portuguese", nativeName: "Português" },
  ru: { short: "RU", name: "Russian", nativeName: "Русский" },
  th: { short: "TH", name: "Thai", nativeName: "ไทย" },
  tr: { short: "TR", name: "Turkish", nativeName: "Türkçe" },
  vi: { short: "VI", name: "Vietnamese", nativeName: "Tiếng Việt" },
};

const acceptLanguageMap: [RegExp, Locale][] = [
  [/^zh|zh-/i, "zh"],
  [/^ar|ar-/i, "ar"],
  [/^de|de-/i, "de"],
  [/^es|es-/i, "es"],
  [/^fr|fr-/i, "fr"],
  [/^he|he-|iw/i, "he"],
  [/^id|id-|in/i, "id"],
  [/^it|it-/i, "it"],
  [/^ja|ja-/i, "ja"],
  [/^ko|ko-/i, "ko"],
  [/^pt|pt-/i, "pt"],
  [/^ru|ru-/i, "ru"],
  [/^th|th-/i, "th"],
  [/^tr|tr-/i, "tr"],
  [/^vi|vi-/i, "vi"],
];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isRtlLocale(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function detectLocaleFromAcceptLanguage(header: string): Locale {
  const parts = header.split(",").map((p) => p.trim().split(";")[0]);
  for (const part of parts) {
    for (const [pattern, locale] of acceptLanguageMap) {
      if (pattern.test(part)) return locale;
    }
  }
  return defaultLocale;
}

export const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  zh: "zh_CN",
  ar: "ar_SA",
  de: "de_DE",
  es: "es_ES",
  fr: "fr_FR",
  he: "he_IL",
  id: "id_ID",
  it: "it_IT",
  ja: "ja_JP",
  ko: "ko_KR",
  pt: "pt_PT",
  ru: "ru_RU",
  th: "th_TH",
  tr: "tr_TR",
  vi: "vi_VN",
};

export const htmlLangMap: Record<Locale, string> = {
  en: "en",
  zh: "zh-CN",
  ar: "ar",
  de: "de",
  es: "es",
  fr: "fr",
  he: "he",
  id: "id",
  it: "it",
  ja: "ja",
  ko: "ko",
  pt: "pt",
  ru: "ru",
  th: "th",
  tr: "tr",
  vi: "vi",
};
