import { locales, type Locale } from "@/i18n/locales";
import { getAllBlogSlugs as getBlogSlugs } from "./slugs";
import { chooseReliableSupplierPostEn } from "./choose-reliable-supplier.en";
import { sevenMistakesPostEn } from "./seven-mistakes.en";
import { spcSupplierManufacturerPostEn } from "./spc-supplier-manufacturer.en";
import { generatedPostsEn } from "./generated/registry";
import { localizeManualPost } from "./localize-manual-post";
import { sprint1ApprovedBlogPosts } from "./approved-sprint-1";
import type { BlogPost } from "./types";

const manualNative = {
  en: [
    ...sprint1ApprovedBlogPosts,
    spcSupplierManufacturerPostEn,
    chooseReliableSupplierPostEn,
    sevenMistakesPostEn,
  ],
} as const;

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

function getBeijingDate(): string {
  return new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function blockTextLength(block: BlogPost["blocks"][number]): number {
  if ("text" in block && block.text) return block.text.trim().length;
  if ("items" in block) return block.items.join(" ").trim().length;
  if ("segments" in block) {
    return block.segments
      .map((segment) => (typeof segment === "string" ? segment : segment.link))
      .join(" ")
      .trim().length;
  }
  return 0;
}

function hasApprovedBody(post: BlogPost): boolean {
  if (post.isPlaceholder) return false;
  if (!post.blocks.length) return false;
  const bodyTextLength = post.blocks.reduce((total, block) => total + blockTextLength(block), 0);
  return bodyTextLength >= 500 && !post.description.toLowerCase().includes("scheduled placeholder");
}

export function isBlogPostVisible(post: BlogPost, today = getBeijingDate()): boolean {
  const status = post.status ?? "published";
  const publishDate = post.publishDate ?? post.date;
  if (publishDate > today) return false;
  if (status === "draft") return false;
  if (!hasApprovedBody(post)) return false;
  if (status === "published") return true;
  return status === "scheduled" && post.approvedForPublish === true;
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
  return sortByDateDesc(
    [...resolveGeneratedForLocale(locale), ...resolveManualForLocale(locale)].filter((post) => isBlogPostVisible(post))
  );
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
