import { locales, type Locale } from "@/i18n/locales";
import { getAllBlogSlugs as getBlogSlugs } from "./slugs";
import { chooseReliableSupplierPostEn } from "./choose-reliable-supplier.en";
import { chooseReliableSupplierPostZh } from "./choose-reliable-supplier.zh";
import { chooseReliableSupplierPostEs } from "./choose-reliable-supplier.es";
import { sevenMistakesPostEn } from "./seven-mistakes.en";
import { sevenMistakesPostZh } from "./seven-mistakes.zh";
import { sevenMistakesPostEs } from "./seven-mistakes.es";
import { spcSupplierManufacturerPostEn } from "./spc-supplier-manufacturer.en";
import { spcSupplierManufacturerPostZh } from "./spc-supplier-manufacturer.zh";
import { spcSupplierManufacturerPostEs } from "./spc-supplier-manufacturer.es";
import {
  generatedPostsByLocale,
  generatedPostsEn,
  generatedPostsEs,
  generatedPostsZh,
} from "./generated/registry";
import { localizeManualPost } from "./localize-manual-post";
import type { BlogPost } from "./types";

const manualNative = {
  en: [spcSupplierManufacturerPostEn, chooseReliableSupplierPostEn, sevenMistakesPostEn],
  zh: [spcSupplierManufacturerPostZh, chooseReliableSupplierPostZh, sevenMistakesPostZh],
  es: [spcSupplierManufacturerPostEs, chooseReliableSupplierPostEs, sevenMistakesPostEs],
} as const;

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

function resolveGeneratedForLocale(locale: Locale): BlogPost[] {
  const posts = generatedPostsByLocale[locale];
  if (posts?.length) return posts;
  return [];
}

function resolveManualForLocale(locale: Locale): BlogPost[] {
  if (locale === "en" || locale === "zh" || locale === "es") {
    return [...manualNative[locale]];
  }
  const pack = manualNative[locale as keyof typeof manualNative];
  if (pack) return [...pack];
  return manualNative.en.map((post) => localizeManualPost(post, locale));
}

function buildPostsForLocale(locale: Locale): BlogPost[] {
  return sortByDateDesc([...resolveGeneratedForLocale(locale), ...resolveManualForLocale(locale)]);
}

const blogPostsByLocale = Object.fromEntries(
  locales.map((locale) => [locale, buildPostsForLocale(locale)])
) as Record<Locale, BlogPost[]>;

export function getBlogPosts(locale: Locale): BlogPost[] {
  return blogPostsByLocale[locale] ?? [];
}

export function getBlogPost(slug: string, locale: Locale): BlogPost | undefined {
  return getBlogPosts(locale).find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return getBlogSlugs();
}

export { blogSlugs } from "./slugs";

/** @deprecated Use getBlogPosts(locale) */
export const blogPosts = blogPostsByLocale.en;
