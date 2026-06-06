/**
 * V2 article validation — fail triggers rewrite in generateArticle
 */
import { isImageUsed } from "./image-selector.mjs";

const FORBIDDEN = /\b(cheap|lowest price|best price|super cheap|cheapest)\b/i;
const EN_RESIDUE =
  /\b(this article is written|your primary sourcing lens|procurement deep-dive|distributors who run this analysis|factory partners willing to share)\b/i;

function wordCount(text, locale) {
  if (locale === "zh" || locale === "ja" || locale === "ko") {
    const cjk = (text.match(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g) || []).length;
    const latin = text.replace(/[\u4e00-\u9fff\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/g, " ").split(/\s+/).filter(Boolean).length;
    return cjk + latin;
  }
  if (locale === "ar" || locale === "he") return Math.ceil(text.replace(/\s/g, "").length / 4);
  return text.split(/\s+/).filter(Boolean).length;
}

function allText(article) {
  const parts = [article.title, article.metaTitle ?? "", article.description ?? ""];
  for (const b of article.blocks ?? []) {
    if (b.type === "p") parts.push(b.text);
    if (b.type === "h2" || b.type === "h3") parts.push(b.text);
    if (b.type === "ul") parts.push(b.items.join(" "));
    if (b.type === "rich-p")
      parts.push(b.segments.map((s) => (typeof s === "string" ? s : s.link)).join(" "));
  }
  return parts.join("\n");
}

function countKeyword(text, kw) {
  if (!kw) return 0;
  const re = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  return (text.match(re) || []).length;
}

function countRichLinks(blocks) {
  let n = 0;
  for (const b of blocks) {
    if (b.type === "rich-p") {
      for (const s of b.segments) {
        if (typeof s !== "string" && s.href) n++;
      }
    }
  }
  return n;
}

function hasProductLink(blocks) {
  return blocks.some(
    (b) => b.type === "rich-p" && b.segments.some((s) => typeof s !== "string" && s.href === "/spc-flooring")
  );
}

function hasCta(blocks) {
  return blocks.some((b) => b.type === "cta");
}

function collectImages(blocks, hero, og) {
  const urls = [];
  if (hero) urls.push(hero);
  if (og && og !== hero) urls.push(og);
  for (const b of blocks) if (b.type === "img") urls.push(b.src);
  return urls;
}

function hasDuplicateImages(urls) {
  return new Set(urls).size !== urls.length;
}

/**
 * @returns {{ pass: boolean, errors: string[], warnings: string[] }}
 */
export function validateArticle(article, locale = "en") {
  const errors = [];
  const warnings = [];
  const text = allText(article);
  const pk = article.primaryKeyword ?? "";
  const blocks = article.blocks ?? [];

  if (!article.title?.trim()) errors.push("missing title");
  if (!article.slug?.trim()) errors.push("missing slug");
  if (!article.description?.trim()) errors.push("missing description");
  if (!article.metaTitle?.trim()) warnings.push("missing metaTitle");

  const h2Count = blocks.filter((b) => b.type === "h2").length;
  if (h2Count < 4) errors.push(`insufficient h2 sections (${h2Count})`);

  const wc = wordCount(text, locale);
  if (wc < 1800) errors.push(`word count ${wc} < 1800`);

  if (FORBIDDEN.test(text)) errors.push("forbidden price hype keywords");

  if (locale !== "en" && EN_RESIDUE.test(text)) errors.push("english residue detected");

  if (pk) {
    if (!article.title.toLowerCase().includes(pk.toLowerCase().slice(0, 8)) && locale === "en")
      warnings.push("primary keyword weak in title");
    const pkCount = countKeyword(text, pk);
    if (pkCount < 3) warnings.push(`primary keyword "${pk}" only ${pkCount} times`);
    const firstP = blocks.find((b) => b.type === "p");
    if (firstP && countKeyword(firstP.text, pk) < 1) warnings.push("primary keyword missing in first paragraph");
  }

  const sk = article.secondaryKeywords ?? [];
  for (const kw of sk.slice(0, 3)) {
    if (countKeyword(text, kw) < 1) warnings.push(`secondary keyword missing: ${kw}`);
  }

  const linkCount = countRichLinks(blocks);
  if (linkCount < 3) errors.push(`internal links ${linkCount} < 3`);

  if (!hasProductLink(blocks)) warnings.push("missing /spc-flooring product link");

  const imgs = collectImages(blocks, article.heroImage, article.ogImage);
  if (imgs.length < 5) errors.push(`images ${imgs.length} < 5`);
  if (hasDuplicateImages(imgs)) errors.push("duplicate images in article");

  for (const url of imgs) {
    // allow reuse within same article; cross-article dup checked at selection time
  }

  if (!hasCta(blocks)) warnings.push("no CTA block — appended at publish time");

  return { pass: errors.length === 0, errors, warnings };
}

export function validateArticleStrict(article, locale) {
  const r = validateArticle(article, locale);
  if (r.warnings.length) r.pass = r.pass && r.warnings.length === 0;
  return r;
}
