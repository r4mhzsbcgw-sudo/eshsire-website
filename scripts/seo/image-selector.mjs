/**
 * V2 image selection — local BJFLOOR assets, theme-matched to article slug.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { classifyTopic, topicImageCategory } from "./topic-classifier.mjs";
import { selectImagesForArticle, isRemoteImageUrl, isAllowedBlogImageUrl } from "./blog-image-catalog.mjs";

const USED_PATH = join(process.cwd(), "content/image-used.json");
const LIB_PATH = join(process.cwd(), "content/image-library.json");

function loadUsed() {
  if (!existsSync(USED_PATH)) return { records: [] };
  return JSON.parse(readFileSync(USED_PATH, "utf8"));
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
  for (const r of loadUsed().records) used.add(r.imageUrl);
  for (const r of loadLib().usedImages ?? []) used.add(r.imageUrl);
  return used;
}

/**
 * @param {object} topic - calendar meta with title, slug, slot, topicType
 * @param {string} locale
 * @param {{ dryRun?: boolean }} opts
 */
export function imageSelector(topic, locale, opts = {}) {
  const pk = topic.primaryKeyword ?? "SPC flooring";
  const imgs = selectImagesForArticle(topic.slug, locale, pk);
  const timestamp = new Date().toISOString();
  const topicType = topic.topicType ?? classifyTopic(topic.title);
  const primaryCat = topicImageCategory(topicType, topic.slot ?? "morning");

  const urls = [imgs.banner, ...imgs.sections, imgs.ending];
  const roles = ["banner", "section-1", "section-2", "section-3", "ending"];
  const themes = imgs.meta.themes;

  const records = urls.map((url, i) => ({
    imageUrl: url,
    articleSlug: topic.slug,
    topic: topic.title,
    locale,
    category: primaryCat,
    theme: themes[i],
    role: roles[i],
    timestamp,
  }));

  if (!opts.dryRun) {
    const usedFile = loadUsed();
    usedFile.records.push(...records);
    saveUsed(usedFile);

    const lib = loadLib();
    for (const r of records) {
      lib.usedImages.push({
        articleTitle: topic.title,
        imageUrl: r.imageUrl,
        imageKeywords: r.theme,
        role: r.role,
        publishedAt: timestamp.slice(0, 10),
        locale,
      });
    }
    saveLib(lib);
  }

  return {
    banner: imgs.banner,
    sections: imgs.sections,
    ending: imgs.ending,
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
    if (!isAllowedBlogImageUrl(u)) throw new Error(`Blog image must be under /images/blog/editorial/: ${u}`);
  }
}
