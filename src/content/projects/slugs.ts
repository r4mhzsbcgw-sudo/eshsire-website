export const PROJECT_SLUGS = [
  "sample-video-confirmation",
  "specification-order-checklist",
  "production-schedule-updates",
  "production-process-video-updates",
  "packaging-label-checking",
  "pre-shipment-quality-confirmation",
  "loading-photos-video-records",
  "after-sales-reorder-follow-up",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

/** Legacy URLs → current visual follow-up slugs */
export const LEGACY_PROJECT_SLUG_REDIRECTS: Record<string, ProjectSlug> = {
  // Old /projects/ slugs
  "africa-distributor": "specification-order-checklist",
  "middle-east-hotel": "specification-order-checklist",
  "school-flooring": "pre-shipment-quality-confirmation",
  "europe-apartment": "sample-video-confirmation",
  "commercial-office": "specification-order-checklist",
  "southeast-asia-distributor": "production-schedule-updates",
  "hospital-flooring": "pre-shipment-quality-confirmation",
  "villa-wpc-wall-panel": "specification-order-checklist",
  // Scenario stock-image era
  "sample-color-selection": "sample-video-confirmation",
  "spc-flooring-details": "specification-order-checklist",
  "wall-panel-accessories": "specification-order-checklist",
  "oem-packaging-labeling": "packaging-label-checking",
  "warehouse-order-preparation": "production-schedule-updates",
  "mixed-container-solution": "specification-order-checklist",
  "quality-check-before-shipment": "pre-shipment-quality-confirmation",
  "container-loading-export": "loading-photos-video-records",
  "southeast-asia-spc-flooring-distributor": "production-schedule-updates",
  "middle-east-hotel-apartment-flooring": "specification-order-checklist",
  "africa-mixed-container-building-materials": "specification-order-checklist",
  "south-america-oem-packaging": "packaging-label-checking",
  "europe-distributor-trial-order": "sample-video-confirmation",
  "commercial-office-flooring-supply": "specification-order-checklist",
  "school-project-material-supply": "pre-shipment-quality-confirmation",
  "wall-panel-flooring-combined-order": "specification-order-checklist",
  // Previous flow-card slugs
  "sample-confirmation": "sample-video-confirmation",
  "color-specification-confirmation": "specification-order-checklist",
  "quantity-accessories-calculation": "specification-order-checklist",
  "oem-packaging-confirmation": "packaging-label-checking",
  "production-progress-updates": "production-process-video-updates",
  "quality-packaging-check": "pre-shipment-quality-confirmation",
  "loading-shipment-records": "loading-photos-video-records",
};

export function isProjectSlug(value: string): value is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(value);
}

export function resolveCaseSlug(value: string): ProjectSlug | null {
  if (isProjectSlug(value)) return value;
  return LEGACY_PROJECT_SLUG_REDIRECTS[value] ?? null;
}
