/**
 * Archived stock images from the previous scenario-card layout.
 * Dev-only reference — homepage supply flow cards no longer use these files.
 */
export type LegacyCaseImageEntry = {
  slug: string;
  image: string;
  altEn: string;
  altZh: string;
  sourcePage: string;
  sourceNote: string;
};

export const LEGACY_CASE_IMAGES: LegacyCaseImageEntry[] = [
  {
    slug: "sample-color-selection",
    image: "/images/cases/scenario-sample-color-selection.jpg",
    altEn: "Archived scenario image — sample selection",
    altZh: "已归档场景图 — 样品选择",
    sourcePage: "https://unsplash.com/photos/silver-and-brown-steel-frame-L7V4rwETDb0",
    sourceNote: "Retired — homepage now uses SVG flow icons",
  },
  {
    slug: "spc-flooring-details",
    image: "/images/cases/scenario-spc-flooring-details.jpg",
    altEn: "Archived scenario image — SPC detail",
    altZh: "已归档场景图 — SPC 细节",
    sourcePage: "https://unsplash.com/photos/a-close-up-of-a-wood-grain-surface-RiwLW247fpU",
    sourceNote: "Retired — homepage now uses SVG flow icons",
  },
  {
    slug: "wall-panel-accessories",
    image: "/images/cases/scenario-wall-panel-accessories.jpg",
    altEn: "Archived scenario image — wall panel accessories",
    altZh: "已归档场景图 — 墙板配件",
    sourcePage: "https://unsplash.com/photos/a-close-up-of-a-white-object-on-a-table-3Os1Z_tGzuo",
    sourceNote: "Retired — homepage now uses SVG flow icons",
  },
  {
    slug: "oem-packaging-labeling",
    image: "/images/cases/scenario-oem-packaging-labeling.jpg",
    altEn: "Archived scenario image — OEM packaging",
    altZh: "已归档场景图 — OEM 包装",
    sourcePage: "https://www.pexels.com/photo/7857539/",
    sourceNote: "Retired — homepage now uses SVG flow icons",
  },
  {
    slug: "warehouse-order-preparation",
    image: "/images/cases/scenario-warehouse-order-preparation.jpg",
    altEn: "Archived scenario image — warehouse preparation",
    altZh: "已归档场景图 — 仓库备货",
    sourcePage: "Pexels editorial asset",
    sourceNote: "Retired — homepage now uses SVG flow icons",
  },
  {
    slug: "mixed-container-solution",
    image: "/images/cases/scenario-mixed-container-solution.jpg",
    altEn: "Archived scenario image — mixed container",
    altZh: "已归档场景图 — 混装采购",
    sourcePage: "https://www.pexels.com/photo/4483610/",
    sourceNote: "Retired — homepage now uses SVG flow icons",
  },
  {
    slug: "quality-check-before-shipment",
    image: "/images/cases/scenario-quality-check.jpg",
    altEn: "Archived scenario image — quality check",
    altZh: "已归档场景图 — 质检",
    sourcePage: "https://www.pexels.com/photo/hands-with-metal-tape-measure-5689439/",
    sourceNote: "Retired — homepage now uses SVG flow icons",
  },
  {
    slug: "container-loading-export",
    image: "/images/cases/scenario-container-loading-export.jpg",
    altEn: "Archived scenario image — container loading",
    altZh: "已归档场景图 — 装柜出口",
    sourcePage: "https://www.pexels.com/photo/15016531/",
    sourceNote: "Retired — homepage now uses SVG flow icons",
  },
];

export function getLegacyCaseImageEntries(): LegacyCaseImageEntry[] {
  return LEGACY_CASE_IMAGES;
}
