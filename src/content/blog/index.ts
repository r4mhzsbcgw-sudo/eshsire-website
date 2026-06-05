import type { Locale } from "@/i18n/locales";
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
  generatedPostsEn,
  generatedPostsEs,
  generatedPostsZh,
} from "./generated/registry";
import type { BlogPost } from "./types";

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

const blogPostsByLocale = {
  en: sortByDateDesc([
    ...generatedPostsEn,
    spcSupplierManufacturerPostEn,
    chooseReliableSupplierPostEn,
    sevenMistakesPostEn,
  ]),
  zh: sortByDateDesc([
    ...generatedPostsZh,
    spcSupplierManufacturerPostZh,
    chooseReliableSupplierPostZh,
    sevenMistakesPostZh,
  ]),
  es: sortByDateDesc([
    ...generatedPostsEs,
    spcSupplierManufacturerPostEs,
    chooseReliableSupplierPostEs,
    sevenMistakesPostEs,
  ]),
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
  return getBlogSlugs();
}

export { blogSlugs } from "./slugs";

/** @deprecated Use getBlogPosts(locale) */
export const blogPosts = blogPostsByLocale.en;
