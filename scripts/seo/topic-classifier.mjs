/** Classify calendar topic for CTA, images, and localized title templates */

export const TOPIC_TYPES = [
  "profit",
  "logistics",
  "supplier",
  "project",
  "inventory",
  "risk",
  "quality",
  "market",
  "distributor",
  "factory",
];

export function classifyTopic(title) {
  const t = title.toLowerCase();
  if (/container|loading|logistics|40hq|shipment|freight|cbm/.test(t)) return "logistics";
  if (/hotel|africa|project|case study|apartment|office fit/.test(t)) return "project";
  if (/mistake|risk|avoid|fail|error/.test(t)) return "risk";
  if (/inventory|warehouse|stock|replenish/.test(t)) return "inventory";
  if (/margin|profit|cash|roi|economics/.test(t)) return "profit";
  if (/quality|inspection|qc|audit|test/.test(t)) return "quality";
  if (/market|trend|demand|region/.test(t)) return "market";
  if (/distributor|dealer|wholesale|retail channel/.test(t)) return "distributor";
  if (/factory|manufacturer|pricing|production|oem/.test(t)) return "factory";
  if (/choose|reliable|supplier|evaluate|select/.test(t)) return "supplier";
  return "supplier";
}

export function topicImageCategory(topicType, slot) {
  const map = {
    logistics: "logistics",
    project: "project",
    inventory: "warehouse",
    quality: "qc",
    factory: "factory",
    supplier: "factory",
    profit: "distributor",
    distributor: "distributor",
    risk: "qc",
    market: "distributor",
  };
  return map[topicType] ?? (slot === "evening" ? "qc" : slot === "afternoon" ? "factory" : "logistics");
}
