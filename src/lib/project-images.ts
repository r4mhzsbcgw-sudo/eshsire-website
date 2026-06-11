/**
 * @deprecated Supply flow cards no longer use case images.
 * Kept for legacy scripts that still import this module.
 */
import { PROJECT_SLUGS, type ProjectSlug } from "@/content/projects/slugs";

const FACTORY_OG = "/images/home/factory/01-production.jpg";

/** @deprecated */
export function getCaseImage(_slug: ProjectSlug): string {
  return FACTORY_OG;
}

/** @deprecated */
export function getCaseImageAlt(_slug: ProjectSlug, _locale: "en" | "zh"): string {
  return "Eshsire Group factory";
}

/** @deprecated */
export function getCaseImagePending(_slug: ProjectSlug, locale: "en" | "zh"): string {
  return locale === "zh" ? "图片已停用" : "Images retired";
}

/** @deprecated */
export const CASE_IMAGES = Object.fromEntries(
  PROJECT_SLUGS.map((slug) => [
    slug,
    {
      image: FACTORY_OG,
      altEn: "Eshsire Group factory",
      altZh: "Eshsire Group 工厂",
      pendingEn: "Images retired",
      pendingZh: "图片已停用",
      sourcePage: "N/A",
      sourceNote: "Supply flow cards use SVG icons",
    },
  ])
) as Record<
  ProjectSlug,
  {
    image: string;
    altEn: string;
    altZh: string;
    pendingEn: string;
    pendingZh: string;
    sourcePage: string;
    sourceNote: string;
  }
>;

/** @deprecated */
export const caseImagePaths = PROJECT_SLUGS.map(() => FACTORY_OG) as readonly string[];

/** @deprecated Use getProjectThumbnail */
export function getProjectThumbnail(slug: ProjectSlug): string {
  return getCaseImage(slug);
}

/** @deprecated */
export const projectImages = caseImagePaths;

/** @deprecated */
export function getProjectImageSet(slug: ProjectSlug) {
  const image = getCaseImage(slug);
  const entry = CASE_IMAGES[slug];
  return {
    slug,
    name: entry.altEn,
    thumb: image,
    banner: image,
    content: [image, image, image] as [string, string, string],
    ending: image,
    detailImages: [image, image, image, image, image] as [string, string, string, string, string],
    meta: [{ role: "thumb" as const, file: image, imageId: slug, provider: "local" as const, sourcePage: image, altEn: entry.altEn }],
  };
}

/** @deprecated */
export function getAllProjectImageSets() {
  return PROJECT_SLUGS.map((slug) => getProjectImageSet(slug));
}

export { CASE_IMAGES as default };
