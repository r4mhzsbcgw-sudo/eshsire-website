/** Lightweight slug list for sitemap/SSG — updated by generate-daily-seo-articles.mjs */

/** English-only auto-generated SEO articles */
export const blogSlugsEnOnly = [
  "what-is-spc-flooring-commercial-projects",
  "spc-flooring-factory-price-bulk-container-orders",
  "load-40hq-container-spc-flooring-export",
] as const;

/** Manual articles with en/zh/es translations */
export const blogSlugsI18n = [
  "spc-flooring-supplier-manufacturer-china",
  "choose-reliable-spc-flooring-supplier-china-2026",
  "7-mistakes-importing-spc-flooring-from-china",
] as const;

export const blogSlugs = [...blogSlugsEnOnly, ...blogSlugsI18n] as const;

export function getAllBlogSlugs(): string[] {
  return [...blogSlugs];
}

export function getBlogSlugsForLocale(locale: string): string[] {
  if (locale === "en") return [...blogSlugs];
  return [...blogSlugsI18n];
}
