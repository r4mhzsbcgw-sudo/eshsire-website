import type { BlogPost } from "../types";
import { b2bCtaBlock, imgBlock, internalLinksBlock } from "../b2b-blocks";
import { blogFactoryImages as img } from "@/lib/blog-images";

export const post: BlogPost = {
  slug: "spc-flooring-supply-hotel-project-africa",
  slot: "evening",
  title: "SPC Flooring Supply for Hotel Project in Africa — Factory Case Study",
  metaTitle: "SPC Flooring Hotel Project Supply | Africa Case Study",
  description: "How a China SPC flooring factory supports hotel renovation projects in Africa: SKU selection, OEM packaging, QC and container delivery.",
  date: "2026-06-05",
  readMinutes: 7,
  heroImage: img.loading,
  ogImage: "/images/home/factory/04-loading.jpg",
  blocks: [
    { type: "p", text: "SPC Flooring Supply for Hotel Project in Africa — Factory Case Study. Distributors evaluating an SPC flooring supplier in China need visibility into production QC, warehouse staging and container loading — not only unit price." },
    { type: "h2", text: "Pre-loading: production and QC" },
    { type: "p", text: "Every export batch passes inline QC during extrusion and pre-pack inspection before cartons enter warehouse staging. Only released pallets are eligible for container loading." },
    imgBlock("/images/home/factory/01-production.jpg", "SPC flooring factory production line China", "Production line before export batch release"),
    { type: "h2", text: "Warehouse staging and container planning" },
    { type: "p", text: "Warehouse teams stack cartons by SKU sequence to match the importer unloading plan. Mixed-color containers load heavier cartons first to reduce shifting during ocean transit." },
    imgBlock("/images/home/factory/04-loading.jpg", "SPC flooring container loading 40HQ", "40HQ container loading process"),
    imgBlock("/images/home/factory/02-quality.jpg", "SPC flooring QC inspection China factory", "QC before shipment"),
    internalLinksBlock("en"),
    b2bCtaBlock("en", "Planning a 40HQ SPC flooring shipment? Get container quotation, loading schedule and factory price list."),
  ],
};
