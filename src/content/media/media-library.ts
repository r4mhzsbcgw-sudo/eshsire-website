export const MEDIA_CATEGORIES = [
  "factory-production",
  "warehouse-loading",
  "packaging-oem",
  "spc-details",
  "wall-panel-accessories",
  "samples",
  "inspection",
  "videos",
] as const;

export type MediaCategory = (typeof MEDIA_CATEGORIES)[number];

export type MediaAsset = {
  id: string;
  category: MediaCategory;
  src: string;
  altZh: string;
  altEn: string;
  usage: string[];
  isRealFactoryImage: boolean;
  notes: string;
};

/** Canonical media registry — select assets by id or category only. No random stock paths. */
export const MEDIA_LIBRARY: MediaAsset[] = [
  {
    id: "factory-production-line",
    category: "factory-production",
    src: "/images/home/factory/01-production.jpg",
    altEn: "Eshsire SPC flooring production line in China factory",
    altZh: "Eshsire 中国工厂 SPC 地板生产线",
    usage: ["home-factory-strength", "factory-page-hero", "about-gallery"],
    isRealFactoryImage: true,
    notes: "On-site production area — primary factory hero",
  },
  {
    id: "factory-quality-station",
    category: "inspection",
    src: "/images/home/factory/02-quality.jpg",
    altEn: "Quality inspection station for SPC flooring export orders",
    altZh: "SPC 地板出口订单质检工位",
    usage: ["home-factory-strength", "faq-og", "certifications-og"],
    isRealFactoryImage: true,
    notes: "QC area — use for inspection / pre-shipment context only",
  },
  {
    id: "factory-warehouse",
    category: "warehouse-loading",
    src: "/images/home/factory/03-warehouse.jpg",
    altEn: "Finished goods warehouse with palletized cartons",
    altZh: "成品仓库托盘纸箱备货",
    usage: ["home-factory-strength", "about-gallery"],
    isRealFactoryImage: true,
    notes: "Warehouse staging — not a generic stock warehouse",
  },
  {
    id: "factory-container-loading",
    category: "warehouse-loading",
    src: "/images/home/factory/04-loading.jpg",
    altEn: "Container loading of SPC flooring export cartons",
    altZh: "SPC 地板出口纸箱装柜",
    usage: ["home-factory-strength", "about-gallery"],
    isRealFactoryImage: true,
    notes: "Loading / export delivery visuals",
  },
  {
    id: "factory-oem-packaging",
    category: "packaging-oem",
    src: "/images/home/factory/05-oem.jpg",
    altEn: "OEM branded cartons and packaging for export flooring",
    altZh: "OEM 品牌纸箱与出口包装",
    usage: ["home-factory-strength", "oem-page-hero"],
    isRealFactoryImage: true,
    notes: "OEM packaging line or finished cartons",
  },
  {
    id: "factory-export-docs",
    category: "warehouse-loading",
    src: "/images/home/factory/06-export.jpg",
    altEn: "Export shipment preparation and documentation area",
    altZh: "出口发货准备与单证区域",
    usage: ["home-factory-strength", "about-hero-fallback"],
    isRealFactoryImage: true,
    notes: "Export / logistics context",
  },
  {
    id: "spc-plank-showcase",
    category: "spc-details",
    src: "/images/blog/floor/spc-plank-showcase.jpg",
    altEn: "SPC flooring plank structure and wear layer detail",
    altZh: "SPC 地板 plank 结构与耐磨层细节",
    usage: ["spc-featured", "spc-gallery", "blog-spc"],
    isRealFactoryImage: true,
    notes: "Product macro — not a room render",
  },
  {
    id: "spc-lock-detail",
    category: "spc-details",
    src: "/images/blog/floor/install-detail-floor.jpg",
    altEn: "SPC click-lock joint and plank edge detail",
    altZh: "SPC 锁扣与板材边缘细节",
    usage: ["spc-gallery", "blog-spc"],
    isRealFactoryImage: true,
    notes: "Lock / edge close-up only",
  },
  {
    id: "spc-product-featured",
    category: "spc-details",
    src: "/images/products/spc/featured.jpg",
    altEn: "Eshsire SPC flooring product range for export",
    altZh: "Eshsire 出口 SPC 地板产品",
    usage: ["spc-page-hero", "spc-featured", "home-spc-category"],
    isRealFactoryImage: true,
    notes: "Primary SPC product hero",
  },
  {
    id: "wall-panel-hero",
    category: "wall-panel-accessories",
    src: "/images/products/wall-panels/hero.jpg",
    altEn: "SPC and decorative wall panel export products",
    altZh: "SPC 与装饰墙板出口产品",
    usage: ["wall-panel-page-hero", "home-wall-category"],
    isRealFactoryImage: true,
    notes: "Wall panel product hero",
  },
  {
    id: "wall-install-detail",
    category: "wall-panel-accessories",
    src: "/images/blog/wall-panel/wall-install-detail.jpg",
    altEn: "Wall panel trim and installation accessory detail",
    altZh: "墙板收边与安装配件细节",
    usage: ["wall-panel-gallery", "blog-wall-panel"],
    isRealFactoryImage: true,
    notes: "Panel + trim detail — not interior staging",
  },
  {
    id: "sample-plank-board",
    category: "samples",
    src: "/images/blog/floor/spc-plank-showcase.jpg",
    altEn: "SPC flooring sample planks for overseas buyer confirmation",
    altZh: "供海外客户确认的 SPC 地板样品",
    usage: ["samples", "follow-up-flow"],
    isRealFactoryImage: true,
    notes: "Reuse spc-plank-showcase for sample context",
  },
  {
    id: "home-hero-banner",
    category: "factory-production",
    src: "/images/home/hero-banner.jpg",
    altEn: "Eshsire Group factory and export manufacturing capability",
    altZh: "Eshsire Group 工厂与出口制造能力",
    usage: ["home-hero", "site-og-default"],
    isRealFactoryImage: true,
    notes: "Homepage hero banner",
  },
  {
    id: "home-hero-factory",
    category: "factory-production",
    src: "/images/home/hero.jpg",
    altEn: "Eshsire manufacturing facility exterior and production strength",
    altZh: "Eshsire 制造工厂与生产实力",
    usage: ["home-hero-fallback"],
    isRealFactoryImage: true,
    notes: "Alternate home hero",
  },
  {
    id: "home-spc-category",
    category: "spc-details",
    src: "/images/home/spc-flooring.jpg",
    altEn: "SPC flooring category for global distributors",
    altZh: "面向全球经销商的 SPC 地板品类",
    usage: ["home-product-spc", "contact-hero"],
    isRealFactoryImage: true,
    notes: "Home category card + contact hero",
  },
  {
    id: "home-wall-category",
    category: "wall-panel-accessories",
    src: "/images/home/wall-panels.jpg",
    altEn: "Wall panel category for export buyers",
    altZh: "出口墙板品类展示",
    usage: ["home-product-wall"],
    isRealFactoryImage: true,
    notes: "Home category card",
  },
  {
    id: "home-accessories-category",
    category: "wall-panel-accessories",
    src: "/images/home/accessories.jpg",
    altEn: "Flooring and wall panel installation accessories",
    altZh: "地板与墙板安装配件",
    usage: ["home-product-accessories", "accessories-page-hero"],
    isRealFactoryImage: true,
    notes: "Skirting / profiles category",
  },
  {
    id: "factory-video-bg",
    category: "videos",
    src: "/images/home/factory-video-bg.jpg",
    altEn: "Factory video section background — production overview",
    altZh: "工厂视频板块背景 — 生产概览",
    usage: ["home-factory-video-poster"],
    isRealFactoryImage: true,
    notes: "Poster for factory video section; pair with /images/home/hero.mp4",
  },
  {
    id: "factory-hero-video",
    category: "videos",
    src: "/images/home/hero.mp4",
    altEn: "Eshsire factory production overview video",
    altZh: "Eshsire 工厂生产概览视频",
    usage: ["home-hero-video"],
    isRealFactoryImage: true,
    notes: "MP4 — real factory footage only",
  },
  {
    id: "carousel-factory-01",
    category: "factory-production",
    src: "/images/home/carousel/slide-01.jpg",
    altEn: "Eshsire factory building and manufacturing history",
    altZh: "Eshsire 工厂厂房与制造实力",
    usage: ["home-carousel"],
    isRealFactoryImage: true,
    notes: "Carousel slide 1",
  },
  {
    id: "carousel-products-02",
    category: "spc-details",
    src: "/images/home/carousel/slide-02.jpg",
    altEn: "SPC flooring and wall panel export manufacturing",
    altZh: "SPC 地板与墙板出口制造",
    usage: ["home-carousel"],
    isRealFactoryImage: true,
    notes: "Carousel slide 2",
  },
  {
    id: "carousel-export-03",
    category: "warehouse-loading",
    src: "/images/home/carousel/slide-03.jpg",
    altEn: "Global export and buyer support from China factory",
    altZh: "中国工厂全球出口与客户支持",
    usage: ["home-carousel"],
    isRealFactoryImage: true,
    notes: "Carousel slide 3",
  },
  {
    id: "about-hero",
    category: "factory-production",
    src: "/images/about/hero.jpg",
    altEn: "About Eshsire Group — SPC flooring manufacturer in China",
    altZh: "关于 Eshsire Group — 中国 SPC 地板制造商",
    usage: ["about-page-hero"],
    isRealFactoryImage: true,
    notes: "About page hero",
  },
  {
    id: "blog-editorial-qc",
    category: "inspection",
    src: "/images/blog/editorial/03-production-quality-station.jpg",
    altEn: "Production quality control for export flooring orders",
    altZh: "出口地板订单生产质量控制",
    usage: ["blog-editorial"],
    isRealFactoryImage: true,
    notes: "Blog editorial — QC only",
  },
];

const mediaById = new Map(MEDIA_LIBRARY.map((item) => [item.id, item]));

export function getMediaAsset(id: string): MediaAsset | undefined {
  return mediaById.get(id);
}

export function getMediaSrc(id: string): string {
  const asset = getMediaAsset(id);
  if (!asset) {
    throw new Error(`[media-library] Unknown media id: ${id}`);
  }
  return asset.src;
}

export function getMediaAlt(id: string, locale: "en" | "zh"): string {
  const asset = getMediaAsset(id);
  if (!asset) return "";
  return locale === "zh" ? asset.altZh : asset.altEn;
}

export function getMediaByCategory(category: MediaCategory): MediaAsset[] {
  return MEDIA_LIBRARY.filter((item) => item.category === category);
}

export function getMediaByUsage(usageKey: string): MediaAsset[] {
  return MEDIA_LIBRARY.filter((item) => item.usage.includes(usageKey));
}

export function getMediaGalleryIds(prefix: string, count: number, fallbackId: string): string[] {
  const matches = MEDIA_LIBRARY.filter((item) => item.id.startsWith(prefix)).slice(0, count);
  if (matches.length >= count) return matches.map((m) => m.id);
  return Array.from({ length: count }, () => fallbackId);
}

/** Resolve numbered gallery paths under a folder — registers pattern for future assets. */
export function gallerySrcFromMediaIds(ids: string[]): string[] {
  return ids.map(getMediaSrc);
}
