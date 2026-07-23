/**
 * Site images — all paths resolved via src/content/media/media-library.ts
 * See public/images/README.md
 */
import { getMediaSrc, gallerySrcFromMediaIds } from "@/content/media";

export const USE_LOCAL_IMAGES = true;

function localPath(...parts: string[]) {
  return `/images/${parts.join("/")}`;
}

function galleryLocal(folder: string, count: number) {
  return Array.from({ length: count }, (_, i) =>
    localPath(folder, `${String(i + 1).padStart(2, "0")}.jpg`)
  );
}

/** Homepage hero carousel — media-library ids */
export const homeCarouselSlides = [
  {
    image: getMediaSrc("carousel-factory-01"),
    altEn: "Eshsire factory building and 30 years manufacturing",
    altZh: "Eshsire Group 工厂厂房与 30 年制造实力",
  },
  {
    image: getMediaSrc("carousel-products-02"),
    altEn: "SPC flooring and WPC wall panel manufacturer",
    altZh: "SPC 地板与 WPC 墙板制造商",
  },
  {
    image: getMediaSrc("carousel-export-03"),
    altEn: "Manufacturing capability and global buyer services",
    altZh: "制造能力与全球客户服务",
  },
] as const;

const FACTORY_STRENGTH_IDS = [
  "factory-production-line",
  "factory-quality-station",
  "factory-warehouse",
  "factory-container-loading",
  "factory-oem-packaging",
  "factory-export-docs",
] as const;

export const homeImages = {
  get hero() {
    return getMediaSrc("home-hero-factory");
  },
  get heroVideo() {
    return getMediaSrc("factory-hero-video");
  },
  get heroBanner() {
    return getMediaSrc("home-hero-banner");
  },
  get spcFlooring() {
    return getMediaSrc("home-spc-category");
  },
  get wallPanels() {
    return getMediaSrc("home-wall-category");
  },
  get accessories() {
    return "/images/home/accessories/spc-accessories-grid.png";
  },
  get factoryVideoBg() {
    return getMediaSrc("factory-video-bg");
  },
  get factoryStrength() {
    return gallerySrcFromMediaIds([...FACTORY_STRENGTH_IDS]);
  },
};

/** @deprecated Use getCaseImage from @/content/projects/case-images */
export {
  projectImages,
  getProjectImageSet,
  getProjectThumbnail,
  getAllProjectImageSets,
} from "./project-images";

export const aboutImages = {
  get hero() {
    return getMediaSrc("about-hero");
  },
  get story() {
    return getMediaSrc("factory-production-line");
  },
  get gallery() {
    return gallerySrcFromMediaIds([
      "factory-production-line",
      "factory-quality-station",
      "factory-warehouse",
      "factory-container-loading",
      "factory-oem-packaging",
      "factory-export-docs",
    ]);
  },
};

export const spcFlooringImages = {
  get hero() {
    return localPath("products", "spc", "featured.jpg");
  },
  get featured() {
    return localPath("products", "spc", "featured.jpg");
  },
  get gallery() {
    return galleryLocal("products/spc/gallery", 8);
  },
  get applications() {
    return [
      localPath("blog", "7-mistakes", "05.jpg"),
      localPath("blog", "7-mistakes", "03.jpg"),
      localPath("blog", "7-mistakes", "01.jpg"),
      localPath("blog", "7-mistakes", "02.jpg"),
      localPath("blog", "7-mistakes", "06.jpg"),
      localPath("blog", "7-mistakes", "04.jpg"),
    ];
  },
};

export const factoryPageImages = {
  get hero() {
    return getMediaSrc("factory-production-line");
  },
};

export const oemImages = {
  get hero() {
    return getMediaSrc("factory-oem-packaging");
  },
};

export const contactImages = {
  get hero() {
    return getMediaSrc("home-spc-category");
  },
};

export const accessoriesImages = {
  get hero() {
    return getMediaSrc("home-accessories-category");
  },
};

export const wallPanelImages = {
  get hero() {
    return localPath("products", "wall-panels", "hero.jpg");
  },
  get gallery() {
    return galleryLocal("products/wall-panels/gallery", 8);
  },
  get productLines() {
    return [
      localPath("products", "wall-panels", "line-spc.jpg"),
      "/images/home/wall-panels/wpc-wall-panel-stack.png",
      localPath("products", "wall-panels", "line-decor.jpg"),
    ];
  },
};
