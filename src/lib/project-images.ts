/**
 * Eshsire Group project portfolio images 鈥?dedicated /images/projects/{slug}/ assets.
 * Sourced from Pexels (user-specified scenes); not reused from homepage or blog.
 */
import { PROJECT_SLUGS, type ProjectSlug } from "@/content/projects/slugs";

export type ProjectImageRole = "thumb" | "banner" | "content-1" | "content-2" | "content-3" | "ending";

export type ProjectImageMeta = {
  role: ProjectImageRole;
  file: string;
  provider: ImageProvider;
  imageId: string;
  /** @deprecated use imageId */
  pexelsId?: number;
  sourcePage: string;
  altEn: string;
};

export type ImageProvider = "pexels" | "unsplash";

export type ProjectImageSet = {
  slug: ProjectSlug;
  name: string;
  thumb: string;
  banner: string;
  content: [string, string, string];
  ending: string;
  /** Ordered: banner, content-1..3, ending (detail page gallery) */
  detailImages: [string, string, string, string, string];
  meta: ProjectImageMeta[];
};

const BASE = "/images/projects";

/** Unique filename per Pexels ID 鈥?avoids Next.js / browser cache on banner.jpg reuse */
export function projectAssetFilename(
  role: "thumb" | "banner" | "content1" | "content2" | "content3" | "ending",
  imageId: string
) {
  const stem = {
    thumb: "thumb",
    banner: "banner",
    content1: "content-1",
    content2: "content-2",
    content3: "content-3",
    ending: "ending",
  }[role];
  return `${stem}-${imageId}.jpg`;
}

function assetPath(slug: ProjectSlug, role: Parameters<typeof projectAssetFilename>[0], imageId: string) {
  return `${BASE}/${slug}/${projectAssetFilename(role, imageId)}`;
}

import { PROJECT_IMAGE_SOURCES } from "./project-image-sources";

function buildSet(slug: ProjectSlug): ProjectImageSet {
  const src = PROJECT_IMAGE_SOURCES[slug];
  const thumb = assetPath(slug, "thumb", src.thumb.imageId);
  const banner = assetPath(slug, "banner", src.banner.imageId);
  const c1 = assetPath(slug, "content1", src.content1.imageId);
  const c2 = assetPath(slug, "content2", src.content2.imageId);
  const c3 = assetPath(slug, "content3", src.content3.imageId);
  const ending = assetPath(slug, "ending", src.ending.imageId);
  return {
    slug,
    name: src.name,
    thumb,
    banner,
    content: [c1, c2, c3],
    ending,
    detailImages: [banner, c1, c2, c3, ending],
    meta: [
      { role: "thumb", file: thumb, imageId: src.thumb.imageId, provider: src.thumb.provider, sourcePage: src.thumb.sourcePage, altEn: src.thumb.altEn },
      { role: "banner", file: banner, imageId: src.banner.imageId, provider: src.banner.provider, sourcePage: src.banner.sourcePage, altEn: src.banner.altEn },
      { role: "content-1", file: c1, imageId: src.content1.imageId, provider: src.content1.provider, sourcePage: src.content1.sourcePage, altEn: src.content1.altEn },
      { role: "content-2", file: c2, imageId: src.content2.imageId, provider: src.content2.provider, sourcePage: src.content2.sourcePage, altEn: src.content2.altEn },
      { role: "content-3", file: c3, imageId: src.content3.imageId, provider: src.content3.provider, sourcePage: src.content3.sourcePage, altEn: src.content3.altEn },
      { role: "ending", file: ending, imageId: src.ending.imageId, provider: src.ending.provider, sourcePage: src.ending.sourcePage, altEn: src.ending.altEn },
    ],
  };
}

const cache = new Map<ProjectSlug, ProjectImageSet>();

export function getProjectImageSet(slug: ProjectSlug): ProjectImageSet {
  if (!cache.has(slug)) cache.set(slug, buildSet(slug));
  return cache.get(slug)!;
}

export function getProjectThumbnail(slug: ProjectSlug): string {
  return getProjectImageSet(slug).thumb;
}

/** Homepage grid 鈥?one thumbnail per project slug order */
export const projectImages = PROJECT_SLUGS.map((slug) => getProjectThumbnail(slug)) as readonly string[];

export function getAllProjectImageSets(): ProjectImageSet[] {
  return PROJECT_SLUGS.map((slug) => getProjectImageSet(slug));
}
