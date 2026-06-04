/** Lightweight slug list for sitemap/SSG — avoid importing full blog post bodies */
export const blogSlugs = [
  "spc-flooring-supplier-manufacturer-china",
  "choose-reliable-spc-flooring-supplier-china-2026",
  "7-mistakes-importing-spc-flooring-from-china",
] as const;

export function getAllBlogSlugs(): string[] {
  return [...blogSlugs];
}
