/**
 * Blog-only editorial images — downloaded to /public/images/blog/editorial/.
 * NOT reused from homepage, factory page, or legacy blog folders.
 */
export const EDITORIAL_DIR = "/images/blog/editorial";

/** Verified Unsplash IDs → local filename (one-time download via seo:download:editorial) */
export const EDITORIAL_DOWNLOADS = [
  { key: "factoryProduction", file: "01-industrial-factory-floor.jpg", id: "photo-1581092160562-40aa08e78837" },
  { key: "productionLine", file: "02-factory-machinery-operator.jpg", id: "photo-1581091226825-a6a2a5aee158" },
  { key: "qcInline", file: "03-production-quality-station.jpg", id: "photo-1581092580497-e0d23cbdf1dc" },
  { key: "warehouseStock", file: "04-warehouse-pallet-racks.jpg", id: "photo-1553413077-190dd305871c" },
  { key: "warehouseAisle", file: "05-warehouse-inventory-aisle.jpg", id: "photo-1570129477492-45c003edd2be" },
  { key: "containerExport", file: "06-container-port-logistics.jpg", id: "photo-1586528116311-ad8dd3c8310d" },
  { key: "forkliftLoading", file: "07-freight-yard-shipping.jpg", id: "photo-1541888946425-d81bb19240f5" },
  { key: "commercialShowroom", file: "08-hotel-commercial-interior.jpg", id: "photo-1566073771259-6a8506099945" },
  { key: "productRange", file: "09-office-commercial-space.jpg", id: "photo-1497366216548-37526070297c" },
  { key: "scratchTest", file: "10-apartment-wood-floor.jpg", id: "photo-1505693416388-ac5ce068fe85" },
  { key: "stainTest", file: "11-modern-interior-flooring.jpg", id: "photo-1600210492486-724fe5c67fb0" },
  { key: "brandOverview", file: "12-interior-design-showroom.jpg", id: "photo-1586023492125-27b2c045efd7" },
  { key: "containerLoading", file: "13-distribution-center.jpg", id: "photo-1563986768609-322da13575f3" },
];

export function editorialPath(file) {
  return `${EDITORIAL_DIR}/${file}`;
}

export function editorialSrc(key) {
  const row = EDITORIAL_DOWNLOADS.find((r) => r.key === key);
  if (!row) return editorialPath(EDITORIAL_DOWNLOADS[0].file);
  return editorialPath(row.file);
}
