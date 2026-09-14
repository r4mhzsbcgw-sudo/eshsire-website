import type { BlogBlock, BlogPost, BlogPublishSlot } from "./types";

export type BlogImage = { src: string; alt: string; caption: string };
export type BlogImageAssignment = { featuredImage: BlogImage; inlineImages: BlogImage[] };

type ImageTopic =
  | "flooring-product" | "flooring-specs" | "flooring-waterproof" | "flooring-colors"
  | "flooring-packaging" | "flooring-factory" | "flooring-application"
  | "wall-product" | "wall-specs" | "wall-colors" | "wall-installation"
  | "wall-packaging" | "wall-factory" | "wall-application";

const image = (src: string, alt: string, caption: string): BlogImage => ({ src, alt, caption });
const spc = "/images/content-library/spc-flooring/";
const wall = "/images/content-library/wall-panels/";
const factory = "/images/content-library/factory-process/";

// Visually verified first-party/local product material only. Stock-photo folders,
// Unsplash/Pexels case images, placeholders and generic room/landscape images are excluded.
const topicPools: Record<ImageTopic, BlogImage[]> = {
  "flooring-product": [
    image(`${spc}spc-flooring-spc-img-0001-cfa4054a.webp`, "SPC flooring planks and stocked product samples", "Real plank and stock imagery keeps the article centered on SPC flooring."),
    image(`${spc}spc-flooring-spc-img-0008-fa3f70c0.webp`, "SPC flooring plank construction close-up", "A direct product close-up supports specification and buying discussions."),
    image(`${spc}spc-flooring-spc-img-0004-9fe36363.webp`, "SPC flooring plank stacks in factory stock", "Stocked planks are relevant to wholesale availability and repeat supply."),
  ],
  "flooring-specs": [
    image(`${spc}spc-flooring-spc-img-0008-fa3f70c0.webp`, "SPC flooring plank edges and surface details", "A close product view supports thickness, edge and construction checks."),
    image(`${spc}spc-flooring-spc-img-0003-45880da4.webp`, "SPC click joint and waterproof surface detail", "The click profile and surface are practical checkpoints during sample approval."),
    image(`${spc}spc-flooring-1784365386-164b5409.webp`, "Wood-look SPC flooring plank samples", "Physical plank samples make finish and joint comparisons more reliable."),
  ],
  "flooring-waterproof": [
    image(`${spc}spc-flooring-spc-img-0015-0e1e727c.webp`, "Water droplets on an SPC flooring sample", "A real SPC sample illustrates the waterproof product category."),
    image(`${spc}spc-flooring-spc-img-0003-45880da4.webp`, "Waterproof SPC flooring click profile", "Surface and click-joint details should be reviewed together for wet-area projects."),
    image(`${spc}spc-flooring-spc-img-0020-305a7e0b.webp`, "Installed wood-look SPC flooring surface", "An installed surface helps buyers judge joint appearance and presentation."),
  ],
  "flooring-colors": [
    image(`${spc}spc-flooring-1784365288-44b80770.webp`, "SPC flooring color collection", "A focused color collection helps distributors build a practical local range."),
    image(`${spc}spc-flooring-1784365396-09a3d114.webp`, "SPC flooring sample fan in multiple colors", "Sample fans are useful for color, surface and range planning."),
    image(`${spc}spc-flooring-spc-img-0022-03ce6ad0.webp`, "SPC flooring colors displayed in warehouse stock", "Stock and sample views help buyers compare color families."),
  ],
  "flooring-packaging": [
    image(`${spc}spc-flooring-1784365352-b3e7bc91.webp`, "SPC flooring pallets cartons and export loading", "Export packaging links carton protection, pallets and container loading."),
    image(`${spc}spc-flooring-spc-img-0016-068e1f87.webp`, "SPC flooring cartons stacked on a pallet", "Carton and pallet details should be approved with the product specification."),
    image(`${spc}spc-flooring-spc-img-0026-2bbf77d7.webp`, "Private-label SPC flooring cartons prepared for shipment", "Packaging supports distributor presentation and transport protection."),
  ],
  "flooring-factory": [
    image(`${spc}spc-flooring-1784365346-1c110a30.webp`, "SPC flooring thickness inspection with a caliper", "Measured sample checks are more useful than unsupported quality claims."),
    image(`${factory}factory-process-05-factory-00bf4033.webp`, "Flooring and wall panel production equipment", "Controlled production stages support repeatable orders."),
    image(`${factory}factory-process-05-factory-8170cff5.webp`, "Factory production warehouse and container loading", "Factory, storage and loading records give buyers practical order visibility."),
  ],
  "flooring-application": [
    image(`${spc}spc-flooring-1784365326-9bdcd6e6.webp`, "SPC flooring colors shown in interior applications", "Visible flooring applications connect color choices with project use."),
    image(`${spc}spc-flooring-1784365403-e56b267b.webp`, "Installed SPC flooring with visible wood-grain surface", "A clear installed surface is relevant for residential and commercial selection."),
    image(`${spc}spc-flooring-spc-img-0020-305a7e0b.webp`, "SPC flooring installation and joint appearance", "Installed-plank details help project buyers assess the finish."),
  ],
  "wall-product": [
    image(`${wall}wall-panels-1784364697-9478eb4f.webp`, "Decorative wall panel samples with visible cross-sections", "Real panel samples keep the product type and construction visible."),
    image(`${wall}wall-panels-1784364893-5c70c8fb.webp`, "Integrated wall panel profile stack", "A clean profile view supports product introduction and buyer evaluation."),
    image(`${wall}wall-panels-1784364901-fe703735.webp`, "Wall panel surface and edge profile samples", "Surface and edge views support decorative panel comparisons."),
  ],
  "wall-specs": [
    image(`${wall}wall-panels-1784365160-4f671650.webp`, "Bamboo-wood fiber wall panel profiles and hollow sections", "Visible wall-panel sections help buyers compare construction and thickness."),
    image(`${wall}wall-panels-1784365172-5f0d2db3.webp`, "Wall panel cross-section checked in the factory", "A factory sample view makes profile and thickness discussions concrete."),
    image(`${wall}wall-panels-1784365198-db95352e.webp`, "Wall panel colors and cross-sections", "Multiple real profiles support width, finish and construction comparisons."),
  ],
  "wall-colors": [
    image(`${wall}wall-panels-1784365198-db95352e.webp`, "Wall panel finish colors and profiles", "Color and profile samples help buyers build a sellable collection."),
    image(`${wall}wall-panels-1784364614-b40903fc.webp`, "Wall panel samples in several decorative finishes", "Physical samples are the right reference for catalog selection."),
    image(`${wall}wall-panels-1784364697-9478eb4f.webp`, "Marble-look wall panel samples", "Finish samples should be reviewed with construction details."),
  ],
  "wall-installation": [
    image(`${wall}wall-panels-1784364730-156d6088.webp`, "Wall panel clip and installation connection detail", "The clip detail directly supports installation and accessory planning."),
    image(`${wall}wall-panels-1784364374-8e7869af.webp`, "Wall panel edge profile held for inspection", "Edge construction affects joining, cutting and trim selection."),
    image(`${wall}wall-panels-1784364619-2e44150a.webp`, "Stacked wall panel profiles for accessory matching", "Profile checks help contractors plan trims and finishing details."),
  ],
  "wall-packaging": [
    image(`${wall}wall-panels-1784364737-976961c9.webp`, "Wall panel cartons prepared in a warehouse", "Carton protection and counting are essential for long packages."),
    image(`${wall}wall-panels-1784365193-8295a941.webp`, "Wall panel packages loaded into an export container", "A real loading image supports container and handling discussions."),
    image(`${wall}wall-panels-1784365254-0872e459.webp`, "Finished wall panel stacks ready for packing", "Stack condition should be checked before shipment release."),
  ],
  "wall-factory": [
    image(`${wall}wall-panels-1784365088-75a38b85.webp`, "Wall panel production line with finished material", "A real production line is relevant to capacity and QC topics."),
    image(`${factory}factory-process-05-factory-00bf4033.webp`, "Building-material production machinery", "Documented process stages give buyers manufacturing visibility."),
    image(`${wall}wall-panels-1784365172-5f0d2db3.webp`, "Wall panel profile inspection in the factory", "Profile inspection connects factory control with the finished product."),
  ],
  "wall-application": [
    image(`${wall}wall-panels-1784364901-fe703735.webp`, "Decorative wall panel samples for project selection", "Project choices should start from real surfaces and profiles."),
    image(`${wall}wall-panels-1784365160-4f671650.webp`, "Wood-look integrated wall panel profiles", "Product-visible imagery supports renovation planning."),
    image(`${wall}wall-panels-1784365198-db95352e.webp`, "Wall panel range for residential and commercial interiors", "A visible range helps project buyers coordinate choices."),
  ],
};

function hash(value: string): number {
  let result = 2166136261;
  for (const char of value) result = Math.imul(result ^ char.charCodeAt(0), 16777619);
  return result >>> 0;
}

function inferTopic(post: BlogPost, slot?: BlogPublishSlot): ImageTopic {
  const text = `${post.title} ${post.targetKeyword || ""} ${post.productCategory || ""}`.toLowerCase();
  const prefix = slot === "wall-panel" || /wall panel|wpc|bamboo|pvc ceiling|fluted/.test(text) ? "wall" : "flooring";
  if (/pack|pallet|carton|container|load|logistic|shipping|moq|private label|oem|distributor/.test(text)) return `${prefix}-packaging` as ImageTopic;
  if (/factory|production|quality|qc|inspection|test|claim|tolerance/.test(text)) return `${prefix}-factory` as ImageTopic;
  if (prefix === "wall" && /install|trim|corner|accessor|clip|skirting|end cap/.test(text)) return "wall-installation";
  if (prefix === "flooring" && /water|bath|kitchen|moisture/.test(text)) return "flooring-waterproof";
  if (/color|surface|eir|finish|wood look|marble/.test(text)) return `${prefix}-colors` as ImageTopic;
  if (/thick|wear layer|size|\bspecs?\b|specification|edge|bevel|profile|width|\b\d+(?:\.\d+)?\s*mm\b|\bvs\b|compare/.test(text)) return `${prefix}-specs` as ImageTopic;
  if (/hotel|office|retail|school|apartment|residential|commercial|renovation|project/.test(text)) return `${prefix}-application` as ImageTopic;
  return `${prefix}-product` as ImageTopic;
}

export function getBlogImageAssignment(post: BlogPost, day: number, slot?: BlogPublishSlot, imageTopic?: string, explicit?: BlogImageAssignment): BlogImageAssignment {
  if (explicit?.featuredImage && explicit.inlineImages.length) return explicit;
  const topic = imageTopic && imageTopic in topicPools ? imageTopic as ImageTopic : inferTopic(post, slot);
  const pool = topicPools[topic];
  const start = imageTopic ? hash(`${post.slug}:${day}`) % pool.length : Math.max(0, day - 1) % pool.length;
  return { featuredImage: pool[start], inlineImages: [pool[(start + 1) % pool.length], pool[(start + 2) % pool.length]] };
}

function insertInlineImages(blocks: BlogBlock[], images: BlogImage[]): BlogBlock[] {
  const needed = Math.max(0, Math.min(2, images.length) - blocks.filter((block) => block.type === "img").length);
  if (!needed) return blocks;
  const result = [...blocks];
  const first = Math.min(3, result.length);
  result.splice(first, 0, { type: "img", ...images[0] });
  if (needed === 1) return result;
  const final = result.findIndex((block, index) => index > first && block.type === "h2" && /final|conclusion|recommend|need help/i.test(block.text));
  result.splice(final >= 0 ? final : Math.max(first + 2, Math.floor(result.length * 0.68)), 0, { type: "img", ...images[1] });
  return result;
}

export function applyBlogImageAssignment(post: BlogPost, day: number, slot?: BlogPublishSlot, imageTopic?: string, explicit?: BlogImageAssignment): BlogPost {
  const assignment = getBlogImageAssignment(post, day, slot, imageTopic, explicit);
  return { ...post, heroImage: assignment.featuredImage.src, ogImage: assignment.featuredImage.src, imageAlt: assignment.featuredImage.alt, blocks: insertInlineImages(post.blocks, assignment.inlineImages) };
}

export const blogImageAuditPools = topicPools;
