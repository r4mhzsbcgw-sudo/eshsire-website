import { locales, type Locale } from "@/i18n/locales";
import { getAllBlogSlugs as getBlogSlugs } from "./slugs";
import { chooseReliableSupplierPostEn } from "./choose-reliable-supplier.en";
import { sevenMistakesPostEn } from "./seven-mistakes.en";
import { spcSupplierManufacturerPostEn } from "./spc-supplier-manufacturer.en";
import { generatedPostsEn } from "./generated/registry";
import { localizeManualPost } from "./localize-manual-post";
import type { BlogPost } from "./types";

const manualNative = {
  en: [spcSupplierManufacturerPostEn, chooseReliableSupplierPostEn, sevenMistakesPostEn],
} as const;

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

function resolveGeneratedForLocale(locale: Locale): BlogPost[] {
  if (locale === "en") return [...generatedPostsEn];
  return generatedPostsEn.map((post) => localizeManualPost(post, locale));
}

function resolveManualForLocale(locale: Locale): BlogPost[] {
  if (locale === "en") return [...manualNative.en];
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
