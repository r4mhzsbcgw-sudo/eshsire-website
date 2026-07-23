export type LandingPageSlug =
  | "spc-flooring-oem-manufacturer"
  | "spc-flooring-for-distributors"
  | "spc-flooring-container-loading"
  | "wall-panel-supplier-china"
  | "mixed-container-spc-flooring-wall-panels";

export type LandingPageContent = {
  slug: LandingPageSlug;
  title: string;
  description: string;
  image: string;
  sections: Array<{ title: string; items: string[] }>;
  faq: Array<{ q: string; a: string }>;
  cta: string;
};

const commonWorkflow = [
  "Confirm product specification and target market",
  "Prepare samples, colors and packaging details",
  "Share production and quality check updates",
  "Plan packing, loading and export documents",
];

export const landingPages: Record<LandingPageSlug, LandingPageContent> = {
  "spc-flooring-oem-manufacturer": {
    slug: "spc-flooring-oem-manufacturer",
    title: "SPC Flooring OEM Manufacturer in China",
    description: "OEM / ODM SPC flooring supply for distributors, importers and private-label buyers.",
    image: "/images/content-library/spc-flooring/spc-flooring-04-stock-211e96fe.webp",
    sections: [
      { title: "Buyer pain points", items: ["Unclear specifications", "Packaging mismatch", "Unstable batch communication"] },
      { title: "Product options", items: ["4mm, 5mm and 6mm SPC flooring", "Wear layer and surface texture options", "Wood and stone-look colors"] },
      { title: "Eshsire solution", items: ["Factory-based supply", "OEM packaging support", "Export coordination for bulk orders"] },
      { title: "Quality control workflow", items: commonWorkflow },
      { title: "OEM / Packaging support", items: ["Private-label cartons", "Labels and barcodes", "Sample boards and catalog support"] },
      { title: "Container or shipment planning", items: ["20GP / 40HQ planning", "Pallet and carton checks", "Mixed loading with compatible products"] },
    ],
    faq: [
      { q: "Can you make private-label SPC flooring?", a: "Yes, after specifications, packaging and order quantities are confirmed." },
      { q: "Do you support sample confirmation?", a: "Yes, samples and approved color references are used before bulk production." },
    ],
    cta: "Request SPC Factory Quote",
  },
  "spc-flooring-for-distributors": {
    slug: "spc-flooring-for-distributors",
    title: "SPC Flooring for Distributors and Importers",
    description: "SPC flooring supply support for wholesale channels, flooring shops and import programs.",
    image: "/images/content-library/spc-flooring/spc-flooring-04-stock-211e96fe.webp",
    sections: [
      { title: "Buyer pain points", items: ["Price-positioning pressure", "Slow-moving inventory risk", "Need for stable reorder colors"] },
      { title: "Product options", items: ["Entry-level, balanced and premium thickness options", "Residential and commercial wear layers", "Private-label packaging"] },
      { title: "Eshsire solution", items: ["Specification comparison", "Catalog and color selection", "Factory quotation by order quantity"] },
      { title: "Quality control workflow", items: commonWorkflow },
      { title: "OEM / Packaging support", items: ["Distributor labels", "Barcode support", "Market-specific carton planning"] },
      { title: "Container or shipment planning", items: ["Container quantity planning", "Weight control", "Accessories and mixed product options"] },
    ],
    faq: [
      { q: "Which thickness should a distributor start with?", a: "5mm is often a balanced starting point, while 4mm and 6mm fit specific market positions." },
      { q: "Can I mix colors in one order?", a: "Mixed color planning can be discussed based on MOQ and production schedule." },
    ],
    cta: "Get SPC Flooring Catalog",
  },
  "spc-flooring-container-loading": {
    slug: "spc-flooring-container-loading",
    title: "SPC Flooring Container Loading and Mixed Shipment Support",
    description: "Loading plan support for SPC flooring, wall panels, PVC ceiling panels and accessories.",
    image: "/images/content-library/factory-process/factory-process-05-factory-00bf4033.webp",
    sections: [
      { title: "Buyer pain points", items: ["SPC flooring is heavy cargo", "Volume and weight limits differ", "Mixed products need loading sequence control"] },
      { title: "Product options", items: ["SPC flooring cartons", "Wall panels and PVC ceiling panels", "Accessories and trims"] },
      { title: "Eshsire solution", items: ["Loading quantity review", "Cargo weight planning", "Factory loading coordination"] },
      { title: "Quality control workflow", items: commonWorkflow },
      { title: "OEM / Packaging support", items: ["Carton markings", "Pallet labels", "Export packing checks"] },
      { title: "Container or shipment planning", items: ["20GP / 40HQ selection", "Heavy and light cargo mix", "Destination and port details"] },
    ],
    faq: [
      { q: "Can SPC flooring be mixed with lighter products?", a: "Yes, mixed planning can improve container utilization when weight is controlled." },
      { q: "What details are needed for a loading plan?", a: "Quantity, thickness, carton weight, pallet size, container type and destination details." },
    ],
    cta: "Ask for Container Loading Plan",
  },
  "wall-panel-supplier-china": {
    slug: "wall-panel-supplier-china",
    title: "Wall Panel Supplier in China",
    description: "Interior wall panel supply for distributors, builders and project buyers.",
    image: "/images/content-library/wall-panels/wall-panels-1784364374-8e7869af.webp",
    sections: [
      { title: "Buyer pain points", items: ["Different panel systems need matching accessories", "Colors and profiles must fit project style", "Mixed shipment planning is often required"] },
      { title: "Product options", items: ["SPC wall panels", "WPC and grille panels", "Decorative profiles and accessories"] },
      { title: "Eshsire solution", items: ["Panel specification support", "Accessory matching", "Export packing and shipment coordination"] },
      { title: "Quality control workflow", items: commonWorkflow },
      { title: "OEM / Packaging support", items: ["Private-label packaging", "Color catalog support", "Profile and accessory matching"] },
      { title: "Container or shipment planning", items: ["Wall panels with accessories", "Mixed load with SPC flooring", "Packing and handling checks"] },
    ],
    faq: [
      { q: "What wall panel types are available?", a: "SPC, WPC, grille and decorative wall panel options can be discussed by project need." },
      { q: "Can wall panels ship with SPC flooring?", a: "Yes, mixed-container planning is available when loading details are confirmed." },
    ],
    cta: "Get Wall Panel Color Catalog",
  },
  "mixed-container-spc-flooring-wall-panels": {
    slug: "mixed-container-spc-flooring-wall-panels",
    title: "Mixed Container Supply: SPC Flooring, Wall Panels and PVC Ceiling Panels",
    description: "Mixed product supply planning for buyers who need flooring, panels, ceiling panels and accessories together.",
    image: "/images/project-applications/mixed-container.webp",
    sections: [
      { title: "Buyer pain points", items: ["Multiple product lines from one shipment", "Heavy and light cargo balance", "Need for compatible packaging and documents"] },
      { title: "Product options", items: ["SPC flooring", "Wall panels", "PVC ceiling panels", "Trims and accessories"] },
      { title: "Eshsire solution", items: ["Mixed product list review", "Container utilization planning", "Factory communication and loading support"] },
      { title: "Quality control workflow", items: commonWorkflow },
      { title: "OEM / Packaging support", items: ["Coordinated labels", "Product-specific cartons", "Shipment marking support"] },
      { title: "Container or shipment planning", items: ["Cargo sequence planning", "Weight risk review", "Export delivery coordination"] },
    ],
    faq: [
      { q: "Why mix SPC flooring with wall panels?", a: "SPC uses weight capacity while lighter products can help improve space utilization." },
      { q: "Can accessories be included?", a: "Yes, accessories can be planned with the main product order." },
    ],
    cta: "Ask for Mixed Container Plan",
  },
};

export const landingPageSlugs = Object.keys(landingPages) as LandingPageSlug[];
