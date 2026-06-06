import { generateArticle } from "./generate-article.mjs";

const t = {
  title: "Why SPC Flooring Factory Price in China Is Lower for Bulk Container Orders",
  slug: "test-v2-slug",
  productTag: "spc",
  phase: 1,
  day: 99,
  slot: "afternoon",
  primaryKeyword: "spc flooring factory",
  secondaryKeywords: [
    "spc flooring manufacturer china",
    "wholesale flooring supplier china",
    "bulk spc flooring order",
    "flooring for contractor supply",
    "spc flooring price per sqm",
  ],
};

for (const locale of ["en", "de", "zh", "ar"]) {
  const a = generateArticle(locale, t, { publishedSlugs: [] });
  console.log(locale, a.wordCount, a.validation.pass, a.validation.errors.join("|") || "ok");
}
