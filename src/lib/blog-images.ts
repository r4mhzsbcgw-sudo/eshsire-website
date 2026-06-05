/** B2B blog imagery — factory, QC, warehouse, container loading (local assets) */
export const blogFactoryImages = {
  production: "/images/home/factory/01-production.jpg",
  quality: "/images/home/factory/02-quality.jpg",
  warehouse: "/images/home/factory/03-warehouse.jpg",
  loading: "/images/home/factory/04-loading.jpg",
  oem: "/images/home/factory/05-oem.jpg",
  export: "/images/home/factory/06-export.jpg",
  spcFeatured: "/images/home/spc-flooring.jpg",
  wallFeatured: "/images/home/wall-panels.jpg",
} as const;

export type BlogFactoryImageKey = keyof typeof blogFactoryImages;
