import type { Locale } from "@/i18n/locales";
import type { BlogBlock, BlogPost } from "../types";
import { b2bCtaBlock, internalLinksBlock } from "../b2b-blocks";

/** Locales with dedicated .ts article files */
export const DEDICATED_BLOG_LOCALES = ["en", "zh", "es"] as const satisfies readonly Locale[];

export type DedicatedBlogLocale = (typeof DEDICATED_BLOG_LOCALES)[number];

export function isDedicatedBlogLocale(locale: Locale): locale is DedicatedBlogLocale {
  return (DEDICATED_BLOG_LOCALES as readonly Locale[]).includes(locale);
}

/** Apply locale-specific blocks + CTA to a canonical EN generated post */
export function localizeGeneratedPost(
  enPost: BlogPost,
  locale: Locale,
  translation: Pick<BlogPost, "title" | "metaTitle" | "description" | "blocks">,
  ctaText?: string
): BlogPost {
  return {
    ...enPost,
    title: translation.title,
    metaTitle: translation.metaTitle,
    description: translation.description,
    blocks: [
      ...translation.blocks,
      internalLinksBlock(locale),
      b2bCtaBlock(locale, ctaText),
    ],
  };
}

/** Strip trailing CTA / internal link blocks when cloning EN for re-localization */
export function stripAutoFooterBlocks(blocks: BlogBlock[]): BlogBlock[] {
  return blocks.filter((block) => {
    if (block.type === "cta") return false;
    if (block.type === "rich-p" && block.segments.some((s) => typeof s !== "string" && s.href === "/spc-flooring")) {
      return false;
    }
    return true;
  });
}
