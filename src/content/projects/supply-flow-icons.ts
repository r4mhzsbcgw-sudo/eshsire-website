import type { ProjectSlug } from "./slugs";

export type SupplyFlowIconId =
  | "video-sample"
  | "checklist"
  | "calendar-schedule"
  | "factory-video"
  | "packaging-box"
  | "magnifier-check"
  | "container-camera"
  | "after-sales-support";

export const SUPPLY_FLOW_ICONS: Record<ProjectSlug, SupplyFlowIconId> = {
  "sample-video-confirmation": "video-sample",
  "specification-order-checklist": "checklist",
  "production-schedule-updates": "calendar-schedule",
  "production-process-video-updates": "factory-video",
  "packaging-label-checking": "packaging-box",
  "pre-shipment-quality-confirmation": "magnifier-check",
  "loading-photos-video-records": "container-camera",
  "after-sales-reorder-follow-up": "after-sales-support",
};

export function getSupplyFlowIconId(slug: ProjectSlug): SupplyFlowIconId {
  return SUPPLY_FLOW_ICONS[slug];
}
