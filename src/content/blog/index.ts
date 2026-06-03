import type { Locale } from "@/i18n/locales";
import { chooseReliableSupplierPostEn } from "./choose-reliable-supplier.en";
import { chooseReliableSupplierPostZh } from "./choose-reliable-supplier.zh";
import { chooseReliableSupplierPostEs } from "./choose-reliable-supplier.es";
import { sevenMistakesPostEn } from "./seven-mistakes.en";
import { sevenMistakesPostZh } from "./seven-mistakes.zh";
import { sevenMistakesPostEs } from "./seven-mistakes.es";
import type { BlogPost } from "./types";

const blogPostsByLocale = {
  en: [chooseReliableSupplierPostEn, sevenMistakesPostEn],
  zh: [chooseReliableSupplierPostZh, sevenMistakesPostZh],
  es: [chooseReliableSupplierPostEs, sevenMistakesPostEs],
} as const satisfies Record<"en" | "zh" | "es", BlogPost[]>;

export function getBlogPosts(locale: Locale): BlogPost[] {
  if (locale in blogPostsByLocale) {
    return blogPostsByLocale[locale as keyof typeof blogPostsByLocale];
  }
  return blogPostsByLocale.en;
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | undefined {
  return getBlogPosts(locale).find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPostsByLocale.en.map((p) => p.slug);
}

/** @deprecated Use getBlogPosts(locale) */
export const blogPosts = blogPostsByLocale.en;
