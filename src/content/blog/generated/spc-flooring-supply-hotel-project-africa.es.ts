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
    { type: "p", text: "SPC Flooring Supply for Hotel Project in Africa — Factory Case Study. Los distribuidores que evalúan un proveedor de suelos SPC en China necesitan visibilidad de QC de producción, preparación en almacén y carga de contenedor — no solo precio unitario." },
    { type: "h2", text: "Pre-carga: producción y QC" },
    { type: "p", text: "Cada lote de exportación pasa QC en línea durante extrusión e inspección pre-embalaje antes del almacén. Solo pallets liberados son elegibles para carga en contenedor." },
    imgBlock("/images/home/factory/01-production.jpg", "Línea de producción de suelos SPC en fábrica China", "Línea de producción antes de liberar lote de exportación"),
    { type: "h2", text: "Preparación en almacén y planificación de contenedor" },
    { type: "p", text: "Los equipos apilan cartones por secuencia SKU según el plan de descarga del importador. En contenedores multicolor, los cartones más pesados cargan primero para reducir movimiento en tránsito." },
    imgBlock("/images/home/factory/04-loading.jpg", "Carga de contenedor 40HQ suelos SPC", "Proceso de carga en contenedor 40HQ"),
    imgBlock("/images/home/factory/02-quality.jpg", "Inspección QC suelos SPC fábrica China", "QC antes del envío"),
    internalLinksBlock("es"),
    b2bCtaBlock("es", "¿Planifica un envío 40HQ de suelos SPC? Obtenga cotización de contenedor, calendario de carga y lista de precios de fábrica."),
  ],
};
