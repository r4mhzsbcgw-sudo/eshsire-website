/**
 * @deprecated No longer used at runtime. Case images are fixed in
 * src/content/projects/case-images.ts → public/images/cases/
 * Kept only for legacy replace-project-images.mjs script reference.
 */

export type ImageProvider = "local" | "pexels" | "unsplash";

export type SourceSlot = {
  provider: ImageProvider;
  imageId: string;
  sourcePage: string;
  altEn: string;
  /** When set, use this public path directly (no /images/projects/{slug}/ copy). */
  localPath?: string;
  downloadUrl?: string;
};

export type ProjectSourceConfig = {
  name: string;
  thumb: SourceSlot;
  banner: SourceSlot;
  content1: SourceSlot;
  content2: SourceSlot;
  content3: SourceSlot;
  ending: SourceSlot;
};

const ED = "/images/blog/editorial";
const FLOOR = "/images/blog/floor";
const WALL = "/images/blog/wall-panel";

function local(path: string, altEn: string): SourceSlot {
  const id = path.split("/").pop()?.replace(/\.\w+$/, "") ?? path;
  return {
    provider: "local",
    imageId: id,
    sourcePage: path,
    localPath: path,
    altEn,
  };
}

export const PROJECT_IMAGE_SOURCES: Record<string, ProjectSourceConfig> = {
  "southeast-asia-spc-flooring-distributor": {
    name: "Southeast Asia distributor reorder — warehouse & container supply",
    thumb: local(`${ED}/04-warehouse-pallet-racks.jpg`, "Warehouse pallet racks with cartons — SPC export staging reference"),
    banner: local(`${ED}/04-warehouse-pallet-racks.jpg`, "Pallet racks with finished cartons before container loading"),
    content1: local(`${ED}/06-container-port-logistics.jpg`, "Shipping containers at port — export logistics reference"),
    content2: local(`${ED}/07-freight-yard-shipping.jpg`, "Freight yard cargo handling before export"),
    content3: local(`${ED}/13-distribution-center.jpg`, "Distribution center pallet build-up reference"),
    ending: local(`${ED}/05-warehouse-inventory-aisle.jpg`, "Warehouse inventory aisle — finished goods staging"),
  },
  "middle-east-hotel-apartment-flooring": {
    name: "Middle East hotel apartment — SPC plank supply reference",
    thumb: local(`${FLOOR}/spc-plank-showcase.jpg`, "SPC flooring plank showcase — wood grain supply reference"),
    banner: local(`${FLOOR}/spc-plank-showcase.jpg`, "SPC rigid core planks — commercial supply SKU reference"),
    content1: local(`${FLOOR}/floor-texture-closeup.jpg`, "SPC wear layer and wood grain texture close-up"),
    content2: local(`${FLOOR}/install-detail-floor.jpg`, "SPC click-lock joint detail reference"),
    content3: local(`${ED}/03-production-quality-station.jpg`, "Production QC station before shipment"),
    ending: local(`${ED}/04-warehouse-pallet-racks.jpg`, "Cartons staged on pallets after QC approval"),
  },
  "africa-mixed-container-building-materials": {
    name: "Africa mixed container — multi-SKU export loading",
    thumb: local(`${ED}/06-container-port-logistics.jpg`, "Port container yard — mixed export shipment reference"),
    banner: local(`${ED}/06-container-port-logistics.jpg`, "Container logistics for mixed building materials export"),
    content1: local(`${ED}/04-warehouse-pallet-racks.jpg`, "Warehouse cartons staged for mixed container loading"),
    content2: local(`${ED}/13-distribution-center.jpg`, "Distribution center mixed-SKU pallet staging"),
    content3: local(`${WALL}/living-room-wall-panel.jpg`, "Wall panel SKU reference for mixed export order"),
    ending: local(`${ED}/07-freight-yard-shipping.jpg`, "Freight yard before container seal"),
  },
  "south-america-oem-packaging": {
    name: "South America OEM — carton and packaging supply",
    thumb: local(`${ED}/04-warehouse-pallet-racks.jpg`, "OEM cartons on pallet racks — private label export reference"),
    banner: local(`${ED}/04-warehouse-pallet-racks.jpg`, "Finished cartons staged for OEM export order"),
    content1: local(`${ED}/03-production-quality-station.jpg`, "QC check before OEM cartons release to loading bay"),
    content2: local(`${ED}/05-warehouse-inventory-aisle.jpg`, "Warehouse aisle with labeled export cartons"),
    content3: local(`${ED}/01-industrial-factory-floor.jpg`, "Factory production floor — OEM batch manufacturing"),
    ending: local(`${ED}/06-container-port-logistics.jpg`, "Export container ready for port departure"),
  },
  "europe-distributor-trial-order": {
    name: "Europe trial order — samples and SKU confirmation",
    thumb: local(`${FLOOR}/spc-plank-showcase.jpg`, "SPC color samples and plank showcase for distributor trial"),
    banner: local(`${FLOOR}/spc-plank-showcase.jpg`, "Plank and color board reference for trial order"),
    content1: local(`${FLOOR}/floor-texture-closeup.jpg`, "Surface and wear layer close-up for sample review"),
    content2: local(`${FLOOR}/install-detail-floor.jpg`, "Locking system detail for distributor evaluation"),
    content3: local(`${ED}/03-production-quality-station.jpg`, "Batch QC before trial-order production"),
    ending: local(`${ED}/04-warehouse-pallet-racks.jpg`, "Trial order cartons staged for export"),
  },
  "commercial-office-flooring-supply": {
    name: "Commercial office — SPC supply for renovation buyers",
    thumb: local(`${ED}/09-office-commercial-space.jpg`, "Commercial office floor surface reference — no people"),
    banner: local(`${ED}/09-office-commercial-space.jpg`, "Office commercial space flooring reference for SPC supply"),
    content1: local(`${FLOOR}/install-detail-floor.jpg`, "SPC installation detail — click-lock efficiency reference"),
    content2: local(`${FLOOR}/floor-texture-closeup.jpg`, "Wear layer close-up for commercial traffic class"),
    content3: local(`${ED}/04-warehouse-pallet-racks.jpg`, "Office project order cartons on pallets"),
    ending: local(`${ED}/07-freight-yard-shipping.jpg`, "Export freight staging for commercial supply order"),
  },
  "school-project-material-supply": {
    name: "School / public space — durable SPC material supply",
    thumb: local(`${FLOOR}/school-corridor-floor.jpg`, "Neutral corridor flooring reference for public space supply"),
    banner: local(`${FLOOR}/school-corridor-floor.jpg`, "Public corridor floor surface — durable SPC reference"),
    content1: local(`${FLOOR}/floor-texture-closeup.jpg`, "Neutral color plank texture for public space projects"),
    content2: local(`${ED}/03-production-quality-station.jpg`, "QC inspection before public project shipment"),
    content3: local(`${ED}/04-warehouse-pallet-racks.jpg`, "Public project order pallets in warehouse"),
    ending: local(`${ED}/05-warehouse-inventory-aisle.jpg`, "Finished goods inventory for replenishment orders"),
  },
  "wall-panel-flooring-combined-order": {
    name: "Wall panel + flooring — one-stop export supply",
    thumb: local(`${WALL}/living-room-wall-panel.jpg`, "Wall panel SKU reference for combined export order"),
    banner: local(`${WALL}/living-room-wall-panel.jpg`, "Interior wall panel product reference — supply illustration"),
    content1: local(`${FLOOR}/spc-plank-showcase.jpg`, "SPC flooring planks for combined purchase order"),
    content2: local(`${WALL}/wall-install-detail.jpg`, "Wall panel trim and accessory reference"),
    content3: local(`${ED}/04-warehouse-pallet-racks.jpg`, "Mixed cartons staged for combined container load"),
    ending: local(`${ED}/06-container-port-logistics.jpg`, "Container export for multi-category building materials"),
  },
};

export function pexelsDownloadUrl(id: number, width = 1200, height = 800) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
}

export function stockDownloadUrl(slot: SourceSlot, width = 1200, height = 800): string {
  if (slot.localPath) return slot.localPath;
  if (slot.downloadUrl) {
    const base = slot.downloadUrl.split("?")[0];
    return `${base}?auto=compress&cs=tinysrgb&w=${width}&h=${height}&fit=crop`;
  }
  if (slot.provider === "pexels") {
    return pexelsDownloadUrl(Number(slot.imageId), width, height);
  }
  return `https://images.unsplash.com/${slot.imageId}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
}
