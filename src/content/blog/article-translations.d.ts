declare module "../../../scripts/seo/article-translations.mjs" {
  import type { Locale } from "@/i18n/locales";
  import type { BlogBlock, BlogPost } from "./types";

  export const translatedLocales: readonly Locale[];

  export function getArticleTranslation(
    slug: string,
    locale: Locale
  ): Pick<BlogPost, "title" | "metaTitle" | "description" | "blocks"> | null;

  export function getTemplateTranslation(
    slot: NonNullable<BlogPost["slot"]>,
    locale: Locale,
    title: string
  ): {
    introText: string;
    h2Supply: string;
    pSupply: string;
    captionProduction: string;
    h2Pricing: string;
    pPricing: string;
    captionLoading: string;
    h3Cost: string;
    costItems: string[];
    captionQc: string;
    ctaDefault: string;
  } | null;
}
