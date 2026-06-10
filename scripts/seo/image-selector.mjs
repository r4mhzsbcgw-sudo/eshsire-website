/**
 * V2 image selection 鈥?Eshsire Group floor/wall libraries, semantic matching, usage tracking.
 */
import { readFileSync, writeFileSync, existsSync, appendFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { classifyTopic, topicImageCategory } from "./topic-classifier.mjs";
import { selectImagesForArticle, isRemoteImageUrl, isAllowedBlogImageUrl } from "./blog-image-catalog.mjs";
import { classifyArticleImageType } from "./blog-image-engine.mjs";

const USED_PATH = join(process.cwd(), "content/image-used.json");
const LIB_PATH = join(process.cwd(), "content/image-library.json");
const ARTICLES_DIR = join(process.cwd(), "content/blog/articles");
const PREVIEW_PATH = join(process.cwd(), "image-replacement-preview.md");

function loadUsed() {
  if (!existsSync(USED_PATH)) return { records: [], blogRecords: [] };
  const data = JSON.parse(readFileSync(USED_PATH, "utf8"));
  if (!data.blogRecords) data.blogRecords = data.records?.filter((r) => r.domain === "blog") ?? [];
  return data;
}

function saveUsed(data) {
  writeFileSync(USED_PATH, JSON.stringify(data, null, 2), "utf8");
}

function loadLib() {
  if (!existsSync(LIB_PATH)) return { usedImages: [] };
  return JSON.parse(readFileSync(LIB_PATH, "utf8"));
}

function saveLib(lib) {
  writeFileSync(LIB_PATH, JSON.stringify(lib, null, 2), "utf8");
}

function globalUsedSet() {
  const used = new Set();
  const file = loadUsed();
  for (const r of file.blogRecords ?? []) used.add(r.imageUrl);
  for (const r of file.records ?? []) {
    if (r.domain === "blog" || r.articleSlug) used.add(r.imageUrl);
  }
  for (const r of loadLib().usedImages ?? []) used.add(r.imageUrl);
  return used;
}

function fmtTime(d = new Date()) {
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
}

function writeArticleJson(topic, imgs, locale) {
  mkdirSync(ARTICLES_DIR, { recursive: true });
  const urls = [imgs.banner, ...imgs.sections, imgs.ending];
  const payload = {
    title: topic.title,
    slug: topic.slug,
    locale,
    imageType: imgs.imageType ?? classifyArticleImageType(topic),
    imageCount: imgs.imageCount ?? urls.length,
    images: imgs.meta?.sourceUrls ?? urls,
    reasoning: imgs.meta?.reasoning ?? [],
    timestamp: fmtTime(),
  };
  writeFileSync(join(ARTICLES_DIR, `${topic.slug}.json`), JSON.stringify(payload, null, 2), "utf8");
}

function writePreviewDoc(topic, imgs, locale) {
  const localPaths = [imgs.banner, ...imgs.sections, imgs.ending];
  const sourceUrls = imgs.meta?.sourceUrls ?? localPaths;
  const positions = ["Banner", ...imgs.sections.map((_, i) => `Scene ${i + 1}`), "Ending"];
  const lines = [
    "",
    `### Article: ${topic.title}`,
    "",
    `- **Locale:** ${locale}`,
    `- **Category:** ${imgs.imageType ?? classifyArticleImageType(topic)}`,
    `- **Timestamp:** ${fmtTime()}`,
    "",
    "| 浣嶇疆 | Local path | Source URL |",
    "|------|------------|------------|",
  ];
  localPaths.forEach((local, i) => {
    lines.push(`| ${positions[i] ?? i} | ${local} | ${sourceUrls[i] ?? local} |`);
  });
  if (!existsSync(PREVIEW_PATH)) {
    writeFileSync(
      PREVIEW_PATH,
      "# Eshsire Group Blog Auto Image Match 鈥?Preview Log\n\nRules: fixed Pexels SPC + Protex wall panel libraries only\n",
      "utf8"
    );
  }
  appendFileSync(PREVIEW_PATH, lines.join("\n") + "\n", "utf8");
}

function appendBlogLog(topic, imgs, locale) {
  writePreviewDoc(topic, imgs, locale);
}

/**
 * @param {object} topic - calendar meta with title, slug, slot, topicType, productTag
 * @param {string} locale
 * @param {{ dryRun?: boolean }} opts
 */
export function imageSelector(topic, locale, opts = {}) {
  const pk = topic.primaryKeyword ?? "SPC flooring";
  const globalUsed = globalUsedSet();
  const imgs = selectImagesForArticle(topic.slug, locale, pk, { ...topic, globalUsed });
  const timestamp = new Date().toISOString();
  const topicType = topic.topicType ?? classifyTopic(topic.title);
  const primaryCat = topicImageCategory(topicType, topic.slot ?? "morning");

  const urls = [imgs.banner, ...imgs.sections, imgs.ending];
  const roles = ["banner", ...imgs.sections.map((_, i) => `section-${i + 1}`), "ending"];
  const themes = imgs.meta.themes;

  const records = urls.map((url, i) => ({
    domain: "blog",
    imageUrl: url,
    articleSlug: topic.slug,
    topic: topic.title,
    locale,
    category: primaryCat,
    imageType: imgs.imageType,
    theme: themes[i],
    role: roles[i],
    reasoningTag: imgs.meta.reasoning?.[i]?.reason ?? "semantic_match",
    timestamp,
  }));

  if (!opts.dryRun) {
    const usedFile = loadUsed();
    if (!usedFile.blogRecords) usedFile.blogRecords = [];
    usedFile.blogRecords.push(...records);
    saveUsed(usedFile);

    const lib = loadLib();
    for (const r of records) {
      lib.usedImages.push({
        articleTitle: topic.title,
        imageUrl: r.imageUrl,
        imageKeywords: r.theme,
        imageType: r.imageType,
        role: r.role,
        publishedAt: timestamp.slice(0, 10),
        locale,
      });
    }
    saveLib(lib);

    writeArticleJson(topic, imgs, locale === "all" ? "all" : locale);
    appendBlogLog(topic, imgs, locale === "all" ? "all" : locale);
  }

  return {
    banner: imgs.banner,
    sections: imgs.sections,
    ending: imgs.ending,
    imageType: imgs.imageType,
    imageCount: imgs.imageCount,
    themes: imgs.meta.themes,
    captions: imgs.meta.captions,
    alts: imgs.meta.alts,
    records,
  };
}

export function isImageUsed(url) {
  return globalUsedSet().has(url);
}

export function assertLocalImages(urls) {
  for (const u of urls) {
    if (isRemoteImageUrl(u)) throw new Error(`Remote image not allowed: ${u}`);
    if (!isAllowedBlogImageUrl(u)) throw new Error(`Blog image must be under allowed blog paths: ${u}`);
  }
}
