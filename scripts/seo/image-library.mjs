/**
 * Image library — tracks used images across 90-day calendar (no reuse).
 * File: content/image-library.json
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { IMAGE_POOLS, fallbackImage, SECTION_IMAGE_THEMES } from "./image-pools.mjs";

const LIB_PATH = join(process.cwd(), "content/image-library.json");

function loadLibrary() {
  if (!existsSync(LIB_PATH)) {
    return { usedImages: [], poolCursor: {} };
  }
  return JSON.parse(readFileSync(LIB_PATH, "utf8"));
}

function saveLibrary(lib) {
  writeFileSync(LIB_PATH, JSON.stringify(lib, null, 2), "utf8");
}

function usedSet(lib) {
  return new Set(lib.usedImages.map((e) => e.imageUrl));
}

function pickFromPool(pool, used, seed) {
  for (let i = 0; i < pool.length; i++) {
    const url = pool[(seed + i) % pool.length];
    if (!used.has(url)) return url;
  }
  return null;
}

/**
 * Pick 5 unique unused images for an article.
 * Returns { banner, sections: [3], ending, assignments: [...] }
 */
export function assignArticleImages(meta, slot, publishedAt) {
  const lib = loadLibrary();
  const used = usedSet(lib);
  const themes = SECTION_IMAGE_THEMES[slot] ?? SECTION_IMAGE_THEMES.morning;
  const titleLower = meta.title.toLowerCase();

  const categoryHints = [
    titleLower.includes("container") || titleLower.includes("loading") || titleLower.includes("logistics")
      ? "logistics"
      : titleLower.includes("warehouse") || titleLower.includes("inventory")
        ? "warehouse"
        : titleLower.includes("quality") || titleLower.includes("inspection") || titleLower.includes("qc")
          ? "qc"
          : titleLower.includes("factory") || titleLower.includes("production") || titleLower.includes("manufactur")
            ? "factory"
            : titleLower.includes("project") || titleLower.includes("hotel") || titleLower.includes("case")
              ? "project"
              : titleLower.includes("distributor") || titleLower.includes("wholesale") || titleLower.includes("margin")
                ? "distributor"
                : themes[0],
  ];

  const seed = meta.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const categories = [
    categoryHints[0],
    themes[1] ?? "warehouse",
    themes[2] ?? "factory",
    themes[3] ?? "qc",
    themes[4] ?? "logistics",
  ];

  const assignments = [];
  const urls = [];

  for (let i = 0; i < 5; i++) {
    const cat = categories[i];
    const pool = IMAGE_POOLS[cat] ?? IMAGE_POOLS.factory;
    let url = pickFromPool(pool, used, seed + i * 17);
    if (!url) {
      url = fallbackImage(cat, `${meta.slug}-${i}-${Date.now()}`);
      let attempt = 0;
      while (used.has(url) && attempt < 20) {
        url = fallbackImage(cat, `${meta.slug}-${i}-${attempt++}`);
      }
    }
    used.add(url);
    urls.push(url);
    assignments.push({
      articleTitle: meta.title,
      imageUrl: url,
      imageKeywords: cat,
      role: i === 0 ? "banner" : i === 4 ? "ending" : `section-${i}`,
      publishedAt,
    });
  }

  lib.usedImages.push(...assignments);
  saveLibrary(lib);

  return {
    banner: urls[0],
    sections: [urls[1], urls[2], urls[3]],
    ending: urls[4],
    assignments,
  };
}

export function getUsedImageCount() {
  return loadLibrary().usedImages.length;
}
