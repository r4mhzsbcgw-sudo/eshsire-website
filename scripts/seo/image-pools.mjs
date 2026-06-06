/**
 * Legacy re-export — all blog images are local assets from blog-image-catalog.
 */
export { localPoolForCategory as IMAGE_POOLS_WRAPPER } from "./blog-image-catalog.mjs";
export { selectImagesForArticle, getCaption, getAsset } from "./blog-image-catalog.mjs";

import { localPoolForCategory } from "./blog-image-catalog.mjs";

/** @type {Record<string, string[]>} */
export const IMAGE_POOLS = {
  logistics: localPoolForCategory("logistics"),
  warehouse: localPoolForCategory("warehouse"),
  factory: localPoolForCategory("factory"),
  qc: localPoolForCategory("qc"),
  project: localPoolForCategory("project"),
  distributor: localPoolForCategory("distributor"),
};

export function fallbackImage(category, seed) {
  const pool = IMAGE_POOLS[category] ?? IMAGE_POOLS.factory;
  const hash = `${seed}`.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

export const SECTION_IMAGE_THEMES = {
  morning: ["distributor", "warehouse", "factory", "project", "distributor"],
  afternoon: ["logistics", "warehouse", "factory", "qc", "logistics"],
  evening: ["factory", "qc", "project", "logistics", "warehouse"],
};
