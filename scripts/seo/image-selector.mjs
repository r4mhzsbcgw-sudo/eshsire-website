/**
 * V2 image selection — topic-aware, deduplicated, logs to image-used.json
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { classifyTopic, topicImageCategory } from "./topic-classifier.mjs";
import { IMAGE_POOLS, fallbackImage, SECTION_IMAGE_THEMES } from "./image-pools.mjs";

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

function pickFromPool(pool, used, seed) {
  for (let i = 0; i < pool.length; i++) {
    const url = pool[(seed + i) % pool.length];
    if (!used.has(url)) return url;
  }
  return null;
}

/**
 * @param {object} topic - calendar meta with title, slug, slot, topicType
 * @param {string} locale
 */
export function imageSelector(topic, locale) {
  const used = globalUsedSet();
  const slot = topic.slot ?? "morning";
  const topicType = topic.topicType ?? classifyTopic(topic.title);
  const primaryCat = topicImageCategory(topicType, slot);
  const themes = SECTION_IMAGE_THEMES[slot] ?? SECTION_IMAGE_THEMES.morning;
  const seed = `${topic.slug}-${locale}`.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const categories = [primaryCat, themes[1] ?? "warehouse", themes[2] ?? "factory", themes[3] ?? "qc", themes[4] ?? "logistics"];
  const timestamp = new Date().toISOString();
  const urls = [];
  const records = [];

  for (let i = 0; i < 5; i++) {
    const cat = categories[i];
    const pool = IMAGE_POOLS[cat] ?? IMAGE_POOLS.factory;
    let url = pickFromPool(pool, used, seed + i * 17);
    if (!url) {
      url = fallbackImage(cat, `${topic.slug}-${locale}-${i}`);
      let attempt = 0;
      while (used.has(url) && attempt < 20) {
        url = fallbackImage(cat, `${topic.slug}-${locale}-${i}-${attempt++}`);
      }
    }
    used.add(url);
    urls.push(url);
    records.push({
      imageUrl: url,
      articleSlug: topic.slug,
      topic: topic.title,
      locale,
      category: cat,
      role: i === 0 ? "banner" : i === 4 ? "ending" : `section-${i}`,
      timestamp,
    });
  }

  const usedFile = loadUsed();
  usedFile.records.push(...records);
  saveUsed(usedFile);

  const lib = loadLib();
  for (const r of records) {
    lib.usedImages.push({
      articleTitle: topic.title,
      imageUrl: r.imageUrl,
      imageKeywords: r.category,
      role: r.role,
      publishedAt: timestamp.slice(0, 10),
      locale,
    });
  }
  saveLib(lib);

  return {
    banner: urls[0],
    sections: [urls[1], urls[2], urls[3]],
    ending: urls[4],
    records,
  };
}

export function isImageUsed(url) {
  return globalUsedSet().has(url);
}
