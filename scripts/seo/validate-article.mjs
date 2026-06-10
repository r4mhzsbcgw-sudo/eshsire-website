/**
 * V3 article validation — fail triggers rewrite in generateArticle
 */
import { isBlockedImageUrl } from "./verified-image-ids.mjs";
import { isAllowedBlogImageUrl } from "./blog-image-catalog.mjs";
import { minImageCountForTopic } from "./article-image-blocks.mjs";
import { classifyArticleImageType } from "./blog-image-engine.mjs";
import {
  FORBIDDEN_CONTAINER_PHRASES,
  GENERIC_OPENINGS,
  STRUCTURE_H2,
  ESHSIRE_DIFFERENTIATORS,
  hasForbiddenContainerText,
  isLogisticsTopic,
  isQualityTopic,
} from "./blog-content-rules.mjs";

const DECOR_FLOOR_RE = /\/blog\/floor\/(hotel-lobby|office-commercial|apartment-living|finished-bedroom|school-corridor)/;
const STRONG_CTA_RE =
  /SPC flooring quotation|OEM packaging support|daily production updates|container loading plan|quality inspection photos/i;

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
    if (b.type === "cta") {
      parts.push(b.title ?? "");
      parts.push(b.text ?? "");
    }
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

function hasStrongEnCta(blocks) {
  const cta = blocks.find((b) => b.type === "cta");
  if (!cta) return false;
  const text = `${cta.title ?? ""} ${cta.text ?? ""}`;
  return STRONG_CTA_RE.test(text);
}

function collectImages(blocks, hero, og) {
  const urls = [];
  if (hero) urls.push(hero);
  if (og && og !== hero) urls.push(og);
  for (const b of blocks) if (b.type === "img") urls.push(b.src);
  return urls;
}

export function validateArticle(article, locale = "en") {
  const errors = [];
  const warnings = [];
  const text = allText(article);
  const pk = article.primaryKeyword ?? "";
  const blocks = article.blocks ?? [];

  if (!article.title?.trim()) errors.push("missing title");
  if (!article.slug?.trim()) errors.push("missing slug");
  if (!article.description?.trim()) errors.push("missing description");

  const h2s = blocks.filter((b) => b.type === "h2").map((b) => b.text);
  if (h2s.length < 6) errors.push(`insufficient h2 sections (${h2s.length})`);

  if (locale === "en") {
    for (const req of Object.values(STRUCTURE_H2)) {
      if (!h2s.some((h) => h.includes(req))) errors.push(`missing required H2: ${req}`);
    }
  }

  const wc = wordCount(text, locale);
  if (wc < 1800) errors.push(`word count ${wc} < 1800`);

  if (FORBIDDEN.test(text)) errors.push("forbidden price hype keywords");
  if (hasForbiddenContainerText(text)) errors.push("forbidden container loading phrase");

  if (locale !== "en" && EN_RESIDUE.test(text)) errors.push("english residue detected");

  const intro = blocks.find((b) => b.type === "p")?.text ?? "";
  if (locale === "en") {
    for (const re of GENERIC_OPENINGS) {
      if (re.test(intro)) errors.push("generic opening detected");
    }
  }

  if (pk && countKeyword(text, pk) < 3) warnings.push(`primary keyword "${pk}" only ${countKeyword(text, pk)} times`);

  if (locale === "en") {
    const diffCount = ESHSIRE_DIFFERENTIATORS.filter((d) => text.includes(d)).length;
    if (diffCount < 4) errors.push(`Eshsire differentiators only ${diffCount}/9`);
  }

  if (countRichLinks(blocks) < 3) errors.push("internal links < 3");
  if (!hasProductLink(blocks)) warnings.push("missing /spc-flooring link");

  const imgs = collectImages(blocks, article.heroImage, article.ogImage);
  if (imgs.length < minImageCountForTopic(article)) errors.push(`images ${imgs.length} below minimum`);
  if (new Set(imgs).size !== imgs.length) errors.push("duplicate images");

  const imageType = article.imageType ?? classifyArticleImageType(article);
  const logistics = isLogisticsTopic(article);
  const quality = isQualityTopic(article);
  for (const url of imgs) {
    if (isBlockedImageUrl(url)) errors.push(`blocked image: ${url.slice(0, 60)}`);
    if (!isAllowedBlogImageUrl(url)) errors.push(`disallowed image path: ${url}`);
    if (imageType === "WALL_PANEL" && url.includes("/blog/floor/")) errors.push("wall article uses floor image");
    if (imageType === "SPC_FLOOR" && url.includes("/blog/wall-panel/")) errors.push("floor article uses wall image");
    if (locale === "en" && logistics && DECOR_FLOOR_RE.test(url)) {
      errors.push(`logistics article uses decoration floor image: ${url.split("/").pop()}`);
    }
    if (locale === "en" && logistics && !url.includes("/blog/editorial/") && !url.includes("/blog/choose-supplier/") && !url.includes("/blog/7-mistakes/") && url.includes("/blog/floor/")) {
      errors.push(`logistics article must use warehouse/container editorial images: ${url.split("/").pop()}`);
    }
    if (locale === "en" && quality && DECOR_FLOOR_RE.test(url)) {
      errors.push(`quality article uses decoration floor image: ${url.split("/").pop()}`);
    }
  }

  if (locale === "en") {
    if (!hasStrongEnCta(blocks)) errors.push("insufficient CTA — missing quotation, OEM packaging, updates, or loading plan");
  } else if (!blocks.some((b) => b.type === "cta")) {
    warnings.push("no CTA block");
  }

  return { pass: errors.length === 0, errors, warnings };
}

export function validateArticleStrict(article, locale) {
  const r = validateArticle(article, locale);
  if (r.warnings.length) r.pass = false;
  return r;
}
