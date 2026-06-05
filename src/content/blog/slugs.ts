/** Lightweight slug list for sitemap/SSG — updated by generate-daily-seo-articles.mjs */
export const blogSlugs = [
  "load-40hq-container-spc-flooring-export",
  "spc-flooring-factory-price-bulk-container-orders",
  "spc-flooring-supply-hotel-project-africa",
  "what-is-spc-flooring-commercial-projects",
  "spc-flooring-supplier-manufacturer-china",
  "choose-reliable-spc-flooring-supplier-china-2026",
  "7-mistakes-importing-spc-flooring-from-china"
] as const;

export function getAllBlogSlugs(): string[] {
  return [...blogSlugs];
}
