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
  generatedPostsEn,
  generatedPostsEs,
  generatedPostsZh,
} from "./generated/registry";
import { localizeGeneratedPost } from "./generated/resolve-locale";
import { localizeManualPost } from "./localize-manual-post";
import type { BlogBlock, BlogPost } from "./types";
import {
  getArticleTranslation,
  getTemplateTranslation,
  translatedLocales,
} from "../../../scripts/seo/article-translations.mjs";
import { blogFactoryImages as img } from "@/lib/blog-images";

const PACK_LOCALES = translatedLocales as readonly Locale[];

const manualNative = {
  en: [spcSupplierManufacturerPostEn, chooseReliableSupplierPostEn, sevenMistakesPostEn],
  zh: [spcSupplierManufacturerPostZh, chooseReliableSupplierPostZh, sevenMistakesPostZh],
  es: [spcSupplierManufacturerPostEs, chooseReliableSupplierPostEs, sevenMistakesPostEs],
} as const;

function sortByDateDesc(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date));
}

function buildTemplateBlocks(slot: NonNullable<BlogPost["slot"]>, locale: Locale, title: string): BlogBlock[] {
  const t = getTemplateTranslation(slot, locale, title);
  if (!t) return [];

  const heroImg =
    slot === "afternoon" ? img.production : slot === "evening" ? img.quality : img.production;
  const loadImg = img.loading;

  const blocks: BlogBlock[] = [
    { type: "p", text: t.introText },
    { type: "h2", text: t.h2Supply },
    { type: "p", text: t.pSupply },
    { type: "img", src: heroImg, alt: t.captionProduction, caption: t.captionProduction },
    { type: "h2", text: t.h2Pricing },
    { type: "p", text: t.pPricing },
    { type: "img", src: loadImg, alt: t.captionLoading, caption: t.captionLoading },
  ];

  if (slot === "afternoon" && t.h3Cost && t.costItems?.length) {
    blocks.push({ type: "h3", text: t.h3Cost });
    blocks.push({ type: "ul", items: t.costItems });
  }
  if (slot === "evening" && t.captionQc) {
    blocks.push({ type: "img", src: img.quality, alt: t.captionQc, caption: t.captionQc });
  }

  return blocks;
}

function resolveGeneratedForLocale(locale: Locale): BlogPost[] {
  if (locale === "en") return generatedPostsEn;

  const dedicatedZhEs =
    locale === "zh" && generatedPostsZh.length > 0
      ? generatedPostsZh
      : locale === "es" && generatedPostsEs.length > 0
        ? generatedPostsEs
        : null;

  const sourceEn = generatedPostsEn;

  const resolveOne = (enPost: BlogPost): BlogPost => {
    if (dedicatedZhEs) {
      const hit = dedicatedZhEs.find((p) => p.slug === enPost.slug);
      if (hit) return hit;
    }

    let translation = getArticleTranslation(enPost.slug, locale) as
      | Pick<BlogPost, "title" | "metaTitle" | "description" | "blocks">
      | null;

    if (!translation && enPost.slot) {
      const template = getTemplateTranslation(enPost.slot, locale, enPost.title);
      if (template) {
        translation = {
          title: enPost.title,
          metaTitle: enPost.metaTitle ?? enPost.title,
          description: enPost.description,
          blocks: buildTemplateBlocks(enPost.slot, locale, enPost.title),
        };
      }
    }

    if (!translation) return enPost;
    const template =
      enPost.slot && !getArticleTranslation(enPost.slug, locale)
        ? getTemplateTranslation(enPost.slot, locale, enPost.title)
        : null;
    return localizeGeneratedPost(enPost, locale, translation, template?.ctaDefault);
  };

  if (dedicatedZhEs && dedicatedZhEs.length === sourceEn.length) {
    return dedicatedZhEs;
  }

  return sourceEn.map(resolveOne);
}

function resolveManualForLocale(locale: Locale): BlogPost[] {
  if (locale === "en" || locale === "zh" || locale === "es") {
    return [...manualNative[locale]];
  }
  return manualNative.en.map((post) => localizeManualPost(post, locale));
}

function buildPostsForLocale(locale: Locale): BlogPost[] {
  return sortByDateDesc([...resolveGeneratedForLocale(locale), ...resolveManualForLocale(locale)]);
}

const blogPostsByLocale = Object.fromEntries(
  locales.map((locale) => [locale, buildPostsForLocale(locale)])
) as Record<Locale, BlogPost[]>;

export function getBlogPosts(locale: Locale): BlogPost[] {
  return blogPostsByLocale[locale] ?? blogPostsByLocale.en;
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
