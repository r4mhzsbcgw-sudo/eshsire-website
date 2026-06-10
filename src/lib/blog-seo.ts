import type { BlogPost } from "@/content/blog/types";

const BRAND_SUFFIX = " | Eshsire Group";
const MAX_TITLE_LENGTH = 60;
const MAX_BASE_LENGTH = MAX_TITLE_LENGTH - BRAND_SUFFIX.length;

const englishDescriptions: Record<string, string> = {
  "load-40hq-container-spc-flooring-export":
    "SPC flooring container loading for importers: why 20GP is often enough for heavy flooring, weight limits, mixed loading with wall panels, and overweight risk.",
  "spc-flooring-container-loading-strategies-that-reduce-import-costs":
    "How to mix SPC flooring with wall panels and PVC ceiling panels in one shipment — weight-based loading, mixed loading, and freight cost per category.",
  "spc-flooring-factory-price-bulk-container-orders":
    "Why cheap SPC flooring can become expensive after shipment — packaging, loading, QC, and weight-based container planning mistakes importers pay for.",
  "factory-pricing-vs-trading-company-pricing-what-importers-need-to-know":
    "SPC flooring factory vs trading company: what importers find too late about margins, QC control, weight-based container planning, and supplier risk.",
  "spc-flooring-supply-hotel-project-africa":
    "What African building materials distributors should verify before importing SPC flooring: specs, OEM packaging, daily production updates, and shipment discipline.",
  "what-is-spc-flooring-commercial-projects":
    "SPC flooring supplier guide for commercial project importers: wear layer specs, weight-based container planning, QC, and factory-direct supply risk control.",
  "spc-flooring-supplier-manufacturer-china":
    "SPC flooring supplier in China: how importers avoid costly supplier mistakes with daily production updates, QC inspection, and weight-based loading plans.",
  "choose-reliable-spc-flooring-supplier-china-2026":
    "Choose an SPC flooring supplier in China without hidden shipment risk: factory verification, MOQ, quality inspection, and container loading discipline.",
  "7-mistakes-importing-spc-flooring-from-china":
    "Seven SPC flooring import mistakes that destroy distributor margins: low FOB traps, missing QC, wrong container advice, and production visibility gaps.",
  "spc-flooring-quality-control-before-shipment":
    "SPC flooring quality inspection before container loading: batch checks, packaging verification, and pre-shipment QC importers must require.",
  "the-real-cost-of-delayed-flooring-shipments":
    "Why daily production updates matter more than a low price — shipment delay cost for SPC flooring distributors and importers.",
  "how-flooring-distributors-can-increase-profit-margins-without-raising-prices":
    "How flooring distributors increase SPC margins through factory sourcing, weight-based loading, OEM planning, and lower import risk.",
  "how-successful-flooring-importers-reduce-sourcing-risks":
    "How successful SPC importers reduce sourcing risk before the container ships — supplier checks, production visibility, and loading discipline.",
  "how-to-evaluate-an-spc-flooring-supplier-before-your-first-order":
    "Evaluate an SPC flooring supplier before your first container order: MOQ, samples, factory verification, QC, and weight-based loading plans.",
  "spc-flooring-factory-audit-checklist-for-importers":
    "SPC flooring factory audit checklist for importers: production lines, QC systems, certificates, packaging, and export capability.",
  "what-makes-a-reliable-spc-flooring-manufacturer":
    "What makes a reliable SPC flooring manufacturer beyond the sample room: factory capacity, QC process, and shipment documentation.",
};

function cleanText(value: string): string {
  return value
    .replace(/\s*\|\s*Eshsire Group\s*$/g, "")
    .replace(/\s*\|\s*spc flooring[^|]+/gi, "")
    .replace(/\s*\|\s*SPC[^|]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function shortenAtWord(value: string, maxLength: number): string {
  const cleaned = cleanText(value);
  if (cleaned.length <= maxLength) return cleaned;
  const sliced = cleaned.slice(0, maxLength + 1);
  const lastSpace = sliced.lastIndexOf(" ");
  return (lastSpace > 24 ? sliced.slice(0, lastSpace) : sliced.slice(0, maxLength)).trim();
}

export function buildBlogMetaTitle(post: BlogPost): string {
  return `${shortenAtWord(post.title, MAX_BASE_LENGTH)}${BRAND_SUFFIX}`;
}

export function buildBlogMetaDescription(post: BlogPost): string {
  return englishDescriptions[post.slug] ?? shortenAtWord(post.description, 155);
}
