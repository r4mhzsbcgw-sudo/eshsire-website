/**
 * Eshsire Group Blog Auto Image Match 鈥?fixed libraries only.
 *
 * Allowed source pages (no free search elsewhere):
 * - Pexels SPC flooring:     https://www.pexels.com/search/spc%20flooring/
 * - Pexels SPC installation: https://www.pexels.com/search/SPC%20flooring%20installation/
 * - Pexels SPC texture:      https://www.pexels.com/search/spc%20vinyl%20flooring/
 * - Protex wall panels ref:  https://www.protexflooring.com/wall-panels/
 *
 * Each asset maps to a curated Pexels URL from those categories, stored locally.
 */
import { editorialSrc } from "./blog-editorial-sources.mjs";

export const ALLOWED_SOURCE_PAGES = {
  PEXELS_SPC_FLOORING: "https://www.pexels.com/search/spc%20flooring/",
  PEXELS_SPC_INSTALLATION: "https://www.pexels.com/search/SPC%20flooring%20installation/",
  PEXELS_SPC_TEXTURE: "https://www.pexels.com/search/spc%20vinyl%20flooring/",
  PROTEX_WALL_PANEL: "https://www.protexflooring.com/wall-panels/",
};

export const BLOG_IMAGE_PREFIXES = [
  "/images/blog/floor/",
  "/images/blog/wall-panel/",
  "/images/blog/editorial/",
];

export const IMAGE_TYPES = {
  SPC_FLOOR: "SPC_FLOOR",
  WALL_PANEL: "WALL_PANEL",
};

/** Tags that must never appear in auto-published blog images */
export const BLOG_FORBIDDEN_TAGS = [
  "logistics_export",
  "warehouse_pallet",
  "sports_court",
  "abstract_scenery",
  "tile_floor",
  "bare_concrete",
];

export const FLOOR_FORBIDDEN_TAGS = ["interior_wall", ...BLOG_FORBIDDEN_TAGS];
export const WALL_FORBIDDEN_TAGS = ["interior_flooring", "factory_production", ...BLOG_FORBIDDEN_TAGS];

/** @type {Record<string, object>} */
export const SPC_FLOOR_LIBRARY = {
  hotelLobbyFinished: {
    key: "hotelLobbyFinished",
    src: "/images/blog/floor/hotel-lobby-finished.jpg",
    sourceUrl: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["interior_flooring", "finished_project"],
    roles: ["banner", "finished", "application"],
    keywords: ["hotel", "commercial", "living", "home", "flooring"],
    altEn: "Hotel lobby with installed SPC vinyl flooring",
    blogAllowed: true,
  },
  officeCommercialFloor: {
    key: "officeCommercialFloor",
    src: "/images/blog/floor/office-commercial-floor.jpg",
    sourceUrl: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["interior_flooring", "finished_project"],
    roles: ["application", "finished", "banner"],
    keywords: ["office", "commercial", "flooring"],
    altEn: "Modern office with SPC floor installation",
    blogAllowed: true,
  },
  apartmentLivingFloor: {
    key: "apartmentLivingFloor",
    src: "/images/blog/floor/apartment-living-floor.jpg",
    sourceUrl: "https://images.pexels.com/photos/271631/pexels-photo-271631.jpeg",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["interior_flooring", "finished_project"],
    roles: ["application", "finished", "banner"],
    keywords: ["apartment", "home", "living", "flooring"],
    altEn: "Living room with wood-look SPC flooring installed",
    blogAllowed: true,
  },
  finishedBedroomFloor: {
    key: "finishedBedroomFloor",
    src: "/images/blog/floor/finished-bedroom-floor.jpg",
    sourceUrl: "https://images.pexels.com/photos/714258/pexels-photo-714258.jpeg",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["interior_flooring", "finished_project"],
    roles: ["finished", "application"],
    keywords: ["home", "living", "flooring"],
    altEn: "Bedroom interior showcasing finished SPC floor",
    blogAllowed: true,
  },
  schoolCorridorFloor: {
    key: "schoolCorridorFloor",
    src: "/images/blog/floor/school-corridor-floor.jpg",
    sourceUrl: "https://images.pexels.com/photos/1645090/pexels-photo-1645090.jpeg",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["interior_flooring", "finished_project"],
    roles: ["application", "finished"],
    keywords: ["commercial", "office", "flooring"],
    altEn: "Commercial corridor with SPC floor installed",
    blogAllowed: true,
  },
  editorialHotelInterior: {
    key: "editorialHotelInterior",
    src: editorialSrc("commercialShowroom"),
    sourceUrl: "https://www.pexels.com/search/spc%20flooring/",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["interior_flooring", "finished_project"],
    roles: ["application", "finished"],
    keywords: ["hotel", "commercial", "flooring"],
    altEn: "Hospitality interior with hard-surface flooring",
    blogAllowed: true,
  },
  editorialOfficeInterior: {
    key: "editorialOfficeInterior",
    src: editorialSrc("productRange"),
    sourceUrl: "https://www.pexels.com/search/spc%20flooring/",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["interior_flooring", "finished_project"],
    roles: ["application"],
    keywords: ["office", "commercial"],
    altEn: "Office interior with commercial flooring",
    blogAllowed: true,
  },
  editorialApartmentFloor: {
    key: "editorialApartmentFloor",
    src: editorialSrc("scratchTest"),
    sourceUrl: "https://www.pexels.com/search/spc%20flooring/",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["interior_flooring", "finished_project"],
    roles: ["finished"],
    keywords: ["home", "living", "flooring"],
    altEn: "Residential SPC wood-look floor installation",
    blogAllowed: true,
  },
  editorialModernInterior: {
    key: "editorialModernInterior",
    src: editorialSrc("stainTest"),
    sourceUrl: "https://www.pexels.com/search/spc%20flooring/",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["interior_flooring", "finished_project"],
    roles: ["finished", "application"],
    keywords: ["home", "living", "flooring"],
    altEn: "Modern interior with installed vinyl flooring",
    blogAllowed: true,
  },
  installDetailFloor: {
    key: "installDetailFloor",
    src: "/images/blog/floor/install-detail-floor.jpg",
    sourceUrl: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg",
    librarySource: "PEXELS_SPC_INSTALLATION",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["installation_process"],
    roles: ["detail"],
    keywords: ["installation", "鏂藉伐", "factory", "supplier"],
    altEn: "SPC floor installation 鈥?plank alignment and seam",
    blogAllowed: true,
  },
  spcPlankShowcase: {
    key: "spcPlankShowcase",
    src: "/images/blog/floor/spc-plank-showcase.jpg",
    sourceUrl: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    librarySource: "PEXELS_SPC_TEXTURE",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["close_up_texture", "interior_flooring"],
    roles: ["detail", "application"],
    keywords: ["texture", "supplier", "flooring"],
    altEn: "SPC vinyl planks 鈥?texture and color reference",
    blogAllowed: true,
  },
  floorTextureCloseUp: {
    key: "floorTextureCloseUp",
    src: "/images/blog/floor/floor-texture-closeup.jpg",
    sourceUrl: "https://images.pexels.com/photos/776622/pexels-photo-776622.jpeg",
    librarySource: "PEXELS_SPC_TEXTURE",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["close_up_texture"],
    roles: ["detail"],
    keywords: ["texture", "flooring"],
    altEn: "SPC floor plank texture and joint close-up",
    blogAllowed: true,
  },
  factoryProduction: {
    key: "factoryProduction",
    src: editorialSrc("factoryProduction"),
    sourceUrl: "https://www.pexels.com/search/spc%20flooring/",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["factory_production"],
    roles: ["factory"],
    keywords: ["factory", "supplier", "manufacturer", "oem"],
    altEn: "SPC flooring factory production line",
    blogAllowed: true,
    factoryOnly: true,
  },
  productionLine: {
    key: "productionLine",
    src: editorialSrc("productionLine"),
    sourceUrl: "https://www.pexels.com/search/spc%20flooring/",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["factory_production"],
    roles: ["factory"],
    keywords: ["factory", "manufacturer", "production"],
    altEn: "Factory operator at SPC production machinery",
    blogAllowed: true,
    factoryOnly: true,
  },
  qcInline: {
    key: "qcInline",
    src: editorialSrc("qcInline"),
    sourceUrl: "https://www.pexels.com/search/spc%20flooring/",
    librarySource: "PEXELS_SPC_FLOORING",
    imageType: IMAGE_TYPES.SPC_FLOOR,
    tags: ["factory_production", "close_up_texture"],
    roles: ["factory", "detail"],
    keywords: ["quality", "factory", "supplier"],
    altEn: "QC station on SPC flooring production line",
    blogAllowed: true,
    factoryOnly: true,
  },
};

/** @type {Record<string, object>} */
export const WALL_PANEL_LIBRARY = {
  livingRoomWallBanner: {
    key: "livingRoomWallBanner",
    src: "/images/blog/wall-panel/living-room-wall-panel.jpg",
    sourceUrl: "https://images.pexels.com/photos/9843472/pexels-photo-9843472.jpeg",
    librarySource: "PROTEX_WALL_PANEL",
    imageType: IMAGE_TYPES.WALL_PANEL,
    tags: ["interior_wall", "finished_project"],
    roles: ["banner", "finished", "application"],
    keywords: ["living", "interior", "decoration", "panel", "澧欐澘"],
    altEn: "Living room WPC wall panel feature wall",
    blogAllowed: true,
  },
  bedroomWallPanel: {
    key: "bedroomWallPanel",
    src: "/images/blog/wall-panel/bedroom-wall-panel.jpg",
    sourceUrl: "https://images.pexels.com/photos/1029384/pexels-photo-1029384.jpeg",
    librarySource: "PROTEX_WALL_PANEL",
    imageType: IMAGE_TYPES.WALL_PANEL,
    tags: ["interior_wall", "finished_project"],
    roles: ["application", "finished"],
    keywords: ["home", "interior", "panel", "decoration"],
    altEn: "Bedroom with decorative WPC wall panels",
    blogAllowed: true,
  },
  kitchenWallPanel: {
    key: "kitchenWallPanel",
    src: "/images/blog/wall-panel/kitchen-wall-panel.jpg",
    sourceUrl: "https://images.pexels.com/photos/7382910/pexels-photo-7382910.jpeg",
    librarySource: "PROTEX_WALL_PANEL",
    imageType: IMAGE_TYPES.WALL_PANEL,
    tags: ["interior_wall", "finished_project"],
    roles: ["application", "finished"],
    keywords: ["interior", "panel", "decoration"],
    altEn: "Kitchen interior with WPC wall panel cladding",
    blogAllowed: true,
  },
  studyWallPanel: {
    key: "studyWallPanel",
    src: "/images/blog/wall-panel/study-wall-panel.jpg",
    sourceUrl: "https://images.pexels.com/photos/8245871/pexels-photo-8245871.jpeg",
    librarySource: "PROTEX_WALL_PANEL",
    imageType: IMAGE_TYPES.WALL_PANEL,
    tags: ["interior_wall", "finished_project"],
    roles: ["application", "finished"],
    keywords: ["office", "interior", "panel"],
    altEn: "Study room with WPC wall panel backdrop",
    blogAllowed: true,
  },
  wallInstallDetail: {
    key: "wallInstallDetail",
    src: "/images/blog/wall-panel/wall-install-detail.jpg",
    sourceUrl: "https://images.pexels.com/photos/4829192/pexels-photo-4829192.jpeg",
    librarySource: "PROTEX_WALL_PANEL",
    imageType: IMAGE_TYPES.WALL_PANEL,
    tags: ["installation_process", "close_up_texture"],
    roles: ["detail"],
    keywords: ["installation", "鏂藉伐", "panel", "texture"],
    altEn: "WPC wall panel installation detail",
    blogAllowed: true,
  },
};

export function libraryForType(imageType) {
  return imageType === IMAGE_TYPES.WALL_PANEL ? WALL_PANEL_LIBRARY : SPC_FLOOR_LIBRARY;
}

export function filterBlogPool(pool, imageType, keywords) {
  const forbidden = imageType === IMAGE_TYPES.WALL_PANEL ? WALL_FORBIDDEN_TAGS : FLOOR_FORBIDDEN_TAGS;
  const hasFactoryKw = keywords.some((k) => ["factory", "supplier", "manufacturer", "oem"].includes(k));
  return pool.filter((a) => {
    if (a.blogAllowed === false) return false;
    if (a.tags.some((t) => forbidden.includes(t))) return false;
    if (a.factoryOnly && !hasFactoryKw) return false;
    return true;
  });
}
