import type { BlogBlock, BlogPost, BlogPublishSlot } from "./types";

export type BlogImage = {
  src: string;
  alt: string;
  caption: string;
};

export type BlogImageAssignment = {
  featuredImage: BlogImage;
  inlineImages: [BlogImage, BlogImage];
};

type ImageAsset = BlogImage;

const spcProduct: ImageAsset[] = [
  { src: "/images/blog/spc-flooring-thickness-guide-cover.webp", alt: "SPC flooring plank samples in different thicknesses", caption: "SPC plank samples help buyers compare thickness, finish and edge quality." },
  { src: "/images/blog/spc-flooring-thickness-comparison-day2.webp", alt: "4mm 5mm and 6mm SPC flooring thickness comparison", caption: "Side-by-side samples make specification differences easier to confirm before ordering." },
  { src: "/images/blog/floor/spc-plank-showcase.jpg", alt: "SPC flooring plank collection for wholesale selection", caption: "A coordinated plank range gives distributors options for different market positions." },
  { src: "/images/blog/floor/floor-texture-closeup.jpg", alt: "Close view of SPC flooring surface texture", caption: "Surface texture and color should be checked under consistent lighting before approval." },
  { src: "/images/products/spc/gallery/01.jpg", alt: "SPC flooring product sample for importer review", caption: "Physical samples allow buyers to review the finish, locking profile and overall construction." },
  { src: "/images/products/spc/gallery/03.jpg", alt: "Wood look SPC flooring color sample", caption: "Wood-look SPC designs can be selected to match local retail and project demand." },
  { src: "/images/products/spc/gallery/05.jpg", alt: "SPC flooring plank detail and surface finish", caption: "Product details should be confirmed together with thickness and wear-layer requirements." },
  { src: "/images/products/spc/gallery/07.jpg", alt: "SPC flooring sample set for specification selection", caption: "A structured sample set supports clearer comparison before a trial or container order." },
];

const factoryQuality: ImageAsset[] = [
  { src: "/images/home/factory/01-production.jpg", alt: "SPC flooring production equipment in the factory", caption: "Stable production control is essential for consistent dimensions and repeat orders." },
  { src: "/images/home/factory/02-quality.jpg", alt: "Quality inspection during flooring production", caption: "Inspection during production helps identify specification or surface issues early." },
  { src: "/images/home/quality/01.jpg", alt: "SPC flooring quality control check", caption: "Quality checks should follow the approved sample and purchase specification." },
  { src: "/images/home/quality/03.jpg", alt: "Factory inspection of finished building materials", caption: "Finished products should be checked before packing and shipment release." },
  { src: "/images/blog/editorial/02-factory-machinery-operator.jpg", alt: "Production operator working with factory machinery", caption: "Experienced operators and documented settings support repeatable manufacturing." },
  { src: "/images/blog/editorial/03-production-quality-station.jpg", alt: "Production quality control station", caption: "A defined quality station gives buyers a clearer inspection checkpoint." },
  { src: "/images/content-library/factory-process/factory-process-05-factory-00bf4033.webp", alt: "Factory production process for flooring and wall panels", caption: "Factory capability should be evaluated through equipment, process control and records." },
];

const logistics: ImageAsset[] = [
  { src: "/images/cases/scenario-container-loading-export.jpg", alt: "Export container loading for flooring orders", caption: "A practical loading plan protects cartons and uses container space efficiently." },
  { src: "/images/cases/scenario-mixed-container-solution.jpg", alt: "Mixed container solution for flooring and wall panels", caption: "Mixed loading requires weight balance, carton protection and a clear unloading sequence." },
  { src: "/images/cases/scenario-warehouse-order-preparation.jpg", alt: "Warehouse order preparation before export", caption: "Warehouse preparation helps verify quantities, labels and loading readiness." },
  { src: "/images/home/factory/03-warehouse.jpg", alt: "Finished product warehouse for export orders", caption: "Organized storage reduces handling mistakes before container loading." },
  { src: "/images/home/factory/04-loading.jpg", alt: "Building materials prepared for container loading", caption: "Packing and loading should be planned together for safer international transport." },
  { src: "/images/blog/editorial/06-container-port-logistics.jpg", alt: "Container logistics for international flooring shipments", caption: "Import cost planning should include the route, container choice and destination charges." },
  { src: "/images/blog/editorial/04-warehouse-pallet-racks.jpg", alt: "Palletized products stored in a warehouse", caption: "Pallet and carton planning supports safer handling through the supply chain." },
];

const oemDistributor: ImageAsset[] = [
  { src: "/images/applications/private-label-spc-flooring-supply/private-label-spc-packaging-hero.webp", alt: "Private label SPC flooring packaging for distributors", caption: "Private-label orders require approved artwork, labels and carton specifications." },
  { src: "/images/project-applications/private-label-spc-packaging-card.webp", alt: "OEM SPC flooring cartons prepared for distribution", caption: "OEM cartons should balance brand presentation with export packing strength." },
  { src: "/images/cases/scenario-oem-packaging-labeling.jpg", alt: "OEM packaging and product labeling process", caption: "Label details should be checked before mass printing and final packing." },
  { src: "/images/cases/scenario-sample-color-selection.jpg", alt: "SPC flooring sample and color selection", caption: "A focused color range is easier for distributors to present and replenish." },
  { src: "/images/home/factory/05-oem.jpg", alt: "OEM product preparation for private label orders", caption: "OEM support connects product specifications, packaging and repeat-order control." },
  { src: "/images/blog/floor/spc-plank-showcase.jpg", alt: "SPC flooring collection for distributor product lines", caption: "A balanced collection can cover entry, mainstream and project-focused price levels." },
];

const wallPanels: ImageAsset[] = [
  { src: "/images/products/wall-panels/hero.jpg", alt: "Wall panel product range for wholesale buyers", caption: "Wall panel selection should consider material, size, finish and installation method." },
  { src: "/images/products/wall-panels/gallery/01.jpg", alt: "Decorative wall panel surface and profile", caption: "Buyers should review both the decorative face and the panel profile." },
  { src: "/images/products/wall-panels/gallery/03.jpg", alt: "Wall panel color and finish sample", caption: "Color samples help confirm how a finish works with the intended interior." },
  { src: "/images/blog/wall-panel/living-room-wall-panel.jpg", alt: "Wall panels installed in a living room interior", caption: "Installed references show the scale, joint lines and overall visual effect." },
  { src: "/images/blog/wall-panel/bedroom-wall-panel.jpg", alt: "Decorative wall panels in a bedroom project", caption: "Residential applications often prioritize coordinated color and easy maintenance." },
  { src: "/images/project-applications/wall-panels.webp", alt: "Wall panel application for interior projects", caption: "Project selection should connect panel performance with the installation environment." },
];

const installationAccessories: ImageAsset[] = [
  { src: "/images/cases/scenario-wall-panel-accessories.jpg", alt: "Wall panel trims corners and installation accessories", caption: "Matching trims and corners give wall panel installations a cleaner finish." },
  { src: "/images/home/accessories/spc-accessories-grid.png", alt: "Flooring and wall panel accessory range", caption: "Accessory quantities should be estimated alongside the main products." },
  { src: "/images/blog/wall-panel/wall-install-detail.jpg", alt: "Wall panel installation detail", caption: "Installation details should be confirmed before finalizing panel and trim quantities." },
  { src: "/images/products/wall-panels/line-decor.jpg", alt: "Decorative wall panel profile for installation planning", caption: "Panel profiles affect joint treatment, finishing and accessory selection." },
  { src: "/images/products/wall-panels/line-spc.jpg", alt: "SPC wall panel construction and edge profile", caption: "Edge structure and panel thickness influence the recommended installation method." },
  { src: "/images/home/wall-panels/wpc-wall-panel-stack.png", alt: "Stacked WPC wall panels for project supply", caption: "Panel bundles should be protected and counted before project delivery." },
];

const commercialProjects: ImageAsset[] = [
  { src: "/images/blog/floor/hotel-lobby-finished.jpg", alt: "Finished SPC flooring in a hotel lobby", caption: "Hotel flooring needs a practical balance of appearance, durability and maintenance." },
  { src: "/images/blog/floor/office-commercial-floor.jpg", alt: "SPC flooring in an office and commercial interior", caption: "Commercial areas require specifications matched to traffic and cleaning routines." },
  { src: "/images/blog/floor/school-corridor-floor.jpg", alt: "SPC flooring in a school corridor", caption: "High-traffic public areas benefit from durable surfaces and straightforward maintenance." },
  { src: "/images/blog/floor/apartment-living-floor.jpg", alt: "SPC flooring in an apartment living space", caption: "Apartment projects often prioritize waterproof performance and efficient installation." },
  { src: "/images/project-applications/hospitality-commercial.webp", alt: "Hospitality and commercial flooring application", caption: "Application requirements should guide thickness, wear layer and surface selection." },
  { src: "/images/project-applications/office-retail.webp", alt: "Flooring and wall panels in an office retail project", caption: "Coordinated materials can simplify sourcing for multi-area commercial projects." },
  { src: "/images/projects/school-flooring/content-2.jpg", alt: "Flooring application in an education project", caption: "Education projects need durable materials suited to frequent daily use." },
];

const inquiryConversion: ImageAsset[] = [
  ...oemDistributor,
  { src: "/images/cases/scenario-spc-flooring-details.jpg", alt: "SPC flooring product details for quotation review", caption: "Clear product details make quotations easier to compare on the same basis." },
  { src: "/images/home/factory/06-export.jpg", alt: "Export service for flooring and wall panel buyers", caption: "A useful inquiry includes the product, specification, quantity and destination." },
];

function poolForDay(dayNumber: number): ImageAsset[] {
  if (dayNumber <= 12) return spcProduct;
  if (dayNumber <= 22) return factoryQuality;
  if (dayNumber <= 32) return logistics;
  if (dayNumber <= 42) return oemDistributor;
  if (dayNumber <= 52) return wallPanels;
  if (dayNumber <= 62) return installationAccessories;
  if (dayNumber <= 72) return commercialProjects;
  if (dayNumber <= 82) return logistics;
  if (dayNumber <= 92) return factoryQuality;
  return inquiryConversion;
}

const flooringTrack = [...spcProduct, ...factoryQuality, ...logistics, ...oemDistributor, ...commercialProjects];
const wallPanelTrack = [...wallPanels, ...installationAccessories, ...factoryQuality, ...logistics];

export function getBlogImageAssignment(dayNumber: number, publishSlot?: BlogPublishSlot): BlogImageAssignment {
  const pool = publishSlot === "flooring"
    ? flooringTrack
    : publishSlot === "wall-panel"
      ? wallPanelTrack
      : poolForDay(dayNumber);
  const featuredIndex = (dayNumber - 1) % pool.length;
  return {
    featuredImage: pool[featuredIndex],
    inlineImages: [pool[(featuredIndex + 2) % pool.length], pool[(featuredIndex + 4) % pool.length]],
  };
}

function insertInlineImages(blocks: BlogBlock[], images: [BlogImage, BlogImage]): BlogBlock[] {
  const existing = blocks.filter((block) => block.type === "img").length;
  if (existing >= 2) return blocks;

  const result = [...blocks];
  const firstIndex = Math.min(3, result.length);
  result.splice(firstIndex, 0, { type: "img", ...images[0] });

  const finalHeading = result.findIndex(
    (block, index) => index > firstIndex && block.type === "h2" && /final|recommend|need help/i.test(block.text)
  );
  const secondIndex = finalHeading >= 0 ? finalHeading : Math.max(firstIndex + 2, Math.floor(result.length * 0.68));
  result.splice(secondIndex, 0, { type: "img", ...images[1] });
  return result;
}

export function applyBlogImageAssignment(post: BlogPost, dayNumber: number, publishSlot?: BlogPublishSlot): BlogPost {
  const assignment = getBlogImageAssignment(dayNumber, publishSlot);
  return {
    ...post,
    heroImage: assignment.featuredImage.src,
    ogImage: assignment.featuredImage.src,
    imageAlt: assignment.featuredImage.alt,
    blocks: insertInlineImages(post.blocks, assignment.inlineImages),
  };
}

export const blogImageAuditPools = {
  spcProduct,
  factoryQuality,
  logistics,
  oemDistributor,
  wallPanels,
  installationAccessories,
  commercialProjects,
  inquiryConversion,
  flooringTrack,
  wallPanelTrack,
} as const;
