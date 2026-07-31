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
    image: getMediaSrc("homepage-hero-01-factory"),
    fallback: "/images/home/carousel/homepage-hero-01-factory.png",
    altEn: "ESHSIRE professional manufacturer and production base in Linyi, Shandong",
    altZh: "ESHSIRE 山东临沂生产基地与专业制造能力",
  },
  {
    image: getMediaSrc("homepage-hero-02-production-qc"),
    fallback: "/images/home/carousel/homepage-hero-02-production-qc.png",
    altEn: "ESHSIRE advanced production and strict quality control",
    altZh: "ESHSIRE 先进生产与严格品质管控",
  },
  {
    image: getMediaSrc("homepage-hero-03-products"),
    fallback: "/images/home/carousel/homepage-hero-03-products.png",
    altEn: "ESHSIRE SPC flooring, integrated wall panels and PVC ceiling product range",
    altZh: "ESHSIRE SPC地板、集成墙板和PVC天花板产品范围",
  },
  {
    image: getMediaSrc("homepage-hero-04-global-service"),
    fallback: "/images/home/carousel/homepage-hero-04-global-service.png",
    altEn: "ESHSIRE flexible supply and global export service",
    altZh: "ESHSIRE 灵活供应与全球出口服务",
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
