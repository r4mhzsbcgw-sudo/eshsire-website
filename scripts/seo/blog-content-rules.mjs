/**
 * Eshsire Group blog content rules — hooks, container logic, structure, forbidden phrases.
 */

export const FORBIDDEN_CONTAINER_PHRASES = [
  /40hq can load much more spc/i,
  /40hq can load much more flooring/i,
  /20gp and 40hq are both ideal/i,
  /importers should choose 40hq for large spc/i,
  /40hq is better for spc flooring because of larger volume/i,
  /maximize spc flooring loading with 40hq/i,
  /sqm per 40hq/i,
  /3,000[\u2013-]3,800 sqm.*40hq/i,
  /3500 sqm.*40hq/i,
  /40hq container loading 3,500 sqm/i,
  /mixed-color 40hq(?!.*wall panel|.*ceiling|.*accessor|.*lighter)/i,
];

export const GENERIC_OPENINGS = [
  /^spc flooring is popular/i,
  /^many importers choose spc flooring because it is waterproof/i,
  /^choosing a supplier is important/i,
  /^this article is written for flooring distributors/i,
];

export const HOOKS = {
  profitLoss: `Most flooring importers do not lose profit because the product price is too high. They lose profit because the supplier does not understand container weight, loading plans, packaging, and shipment risk.`,
  containerMyth: `Many suppliers talk about 40HQ containers, but SPC flooring is a heavy product. For importers, the real question is not container size. The real question is how to avoid overweight, wasted space, and unnecessary freight cost.`,
  sampleTrap: `A good sample does not mean the full container will be the same. For SPC flooring importers, the real risk starts after the deposit is paid.`,
  supplierGhost: `Many factories reply quickly before payment, then disappear during production. That is why importers need daily production updates before the container leaves China.`,
  lowPriceTrap: `A low unit price can still become an expensive order if the supplier makes mistakes in packaging, loading, quality inspection, or shipment planning.`,
  dealerPressure: `Your customer does not care why the shipment was delayed. They only know your stock did not arrive on time.`,
  mixedLoading: `For importers buying multiple building materials, the profit is not only in the product price. It is also in how SPC flooring, wall panels, PVC ceiling panels, and accessories are combined in one shipment.`,
};

export const CONTAINER_TRUTH = `Because SPC flooring is a heavy product, container loading is mainly limited by weight, not volume. For many standard SPC flooring shipments, a 20GP container is already enough. A 40HQ container is more useful when SPC flooring is combined with lighter products such as wall panels, PVC ceiling panels, accessories, or other interior materials.`;

export const STRUCTURE_H2 = {
  problem: "The Real Problem Importers Face",
  cost: "Why This Problem Costs Money",
  suppliersWrong: "What Most Suppliers Do Wrong",
  professionalCalc: "What a Professional Supplier Should Calculate",
  eshsire: "How Eshsire Group Reduces This Risk",
  checklist: "Buying Checklist for Importers",
  faq: "FAQ",
  conclusion: "Conclusion",
};

export const STANDARD_CTA =
  "Contact Eshsire Group to get an SPC flooring quotation, OEM packaging support, daily production updates, and a practical container loading plan based on weight, product mix, and shipment requirements.";

export const ESHSIRE_DIFFERENTIATORS = [
  "Daily Production Updates",
  "Visual Production Tracking",
  "Container Optimization",
  "Weight-based Loading Calculation",
  "OEM Packaging Support",
  "Quality Inspection Before Shipment",
  "Mixed Loading With Wall Panels / PVC Ceiling Panels / Accessories",
  "Lower Import Risk",
  "Fast Response",
];

export const PRIMARY_KEYWORD_POOL = [
  "SPC flooring supplier",
  "SPC flooring manufacturer",
  "SPC flooring factory",
  "SPC flooring China",
  "SPC flooring supplier in China",
  "SPC flooring manufacturer in China",
  "waterproof SPC flooring supplier",
  "vinyl flooring manufacturer China",
  "SPC flooring importer guide",
  "SPC flooring wholesale supplier",
  "SPC flooring distributor supplier",
  "SPC flooring MOQ",
  "SPC flooring container loading",
  "SPC flooring OEM packaging",
  "SPC flooring quality inspection",
  "SPC flooring factory direct",
  "wall panel supplier China",
  "PVC ceiling panel supplier",
  "interior wall panel manufacturer",
  "building materials supplier China",
];

export function pickHook(meta) {
  const t = `${meta.title ?? ""} ${meta.primaryKeyword ?? ""}`.toLowerCase();
  if (/container|loading|20gp|40hq|freight|logistics/.test(t)) return HOOKS.containerMyth;
  if (/mistake|avoid|risk|cheap|fail/.test(t)) return HOOKS.lowPriceTrap;
  if (/choose|reliable|supplier|factory vs|trading/.test(t)) return HOOKS.sampleTrap;
  if (/quality|inspection|qc|audit/.test(t)) return HOOKS.sampleTrap;
  if (/oem|packaging|brand|private label/.test(t)) return HOOKS.profitLoss;
  if (/hotel|africa|middle east|market|distributor/.test(t)) return HOOKS.dealerPressure;
  if (/wall panel|ceiling|mixed|accessor/.test(t)) return HOOKS.mixedLoading;
  if (/production|update|lead time|visibility/.test(t)) return HOOKS.supplierGhost;
  return HOOKS.profitLoss;
}

export function resolvePrimaryKeyword(meta) {
  const t = `${meta.title ?? ""}`.toLowerCase();
  if (/mix.*wall|wall panel.*one shipment|mixed.*container loading/i.test(t)) return "SPC flooring mixed container loading";
  if (/container|loading|20gp|40hq/.test(t)) return "SPC flooring container loading";
  if (/quality|inspection|qc/.test(t)) return "SPC flooring quality inspection";
  if (/oem|packaging|private label/.test(t)) return "SPC flooring OEM packaging";
  if (/mistake|avoid|risk/.test(t)) return "SPC flooring importer guide";
  if (/choose|reliable|supplier|factory vs/.test(t)) return "SPC flooring supplier in China";
  if (/middle east|saudi|uae|iraq/.test(t)) return "SPC flooring supplier for Middle East";
  if (/africa|nigeria|south africa/.test(t)) return "SPC flooring supplier for Africa";
  if (/wall panel/.test(t)) return "wall panel supplier China";
  if (/wholesale|distributor|dealer/.test(t)) return "SPC flooring wholesale supplier";
  if (/factory|manufacturer|pricing/.test(t)) return "SPC flooring manufacturer in China";
  if (/what is|commercial/.test(t)) return "SPC flooring supplier";
  if (/supplier in china|supplier.*china|manufacturer china/.test(t)) return "SPC flooring supplier in China";
  return meta.primaryKeyword ?? "SPC flooring supplier China";
}

export function buildMetaDescription(title, pk) {
  return `${title}. For importers and distributors: ${pk}, weight-based container planning, daily production updates, and lower supply risk from Eshsire Group China factory.`;
}

export function hasForbiddenContainerText(text) {
  return FORBIDDEN_CONTAINER_PHRASES.some((re) => re.test(text));
}

export function isLogisticsTopic(meta) {
  const t = `${meta.title ?? ""} ${meta.slug ?? ""}`.toLowerCase();
  return /container|loading|20gp|40hq|freight|logistics|shipment/.test(t);
}

export function isQualityTopic(meta) {
  const t = `${meta.title ?? ""}`.toLowerCase();
  return /quality|inspection|qc|audit|mistake/.test(t);
}

export function isFactoryTopic(meta) {
  const t = `${meta.title ?? ""}`.toLowerCase();
  return /factory|manufacturer|production|oem|pricing/.test(t);
}
