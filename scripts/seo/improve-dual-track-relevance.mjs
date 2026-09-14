import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const queuePath = path.join(root, "content/blog/blogQueue.en.json");
const queue = JSON.parse(fs.readFileSync(queuePath, "utf8"));
const futureStart = "2026-09-15";

const imagePools = {
  "flooring-specs": [
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0008-fa3f70c0.webp", "SPC flooring plank edges and surface details", "A close product view supports thickness, edge and construction checks."],
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0003-45880da4.webp", "SPC click joint and waterproof surface detail", "The click profile and surface are practical checkpoints during sample approval."],
    ["/images/content-library/spc-flooring/spc-flooring-1784365386-164b5409.webp", "Wood-look SPC flooring plank samples", "Physical plank samples make finish and joint comparisons more reliable."],
  ],
  "flooring-waterproof": [
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0015-0e1e727c.webp", "Water droplets on an SPC flooring sample", "A real SPC sample illustrates the waterproof product category without unrelated scenery."],
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0003-45880da4.webp", "Waterproof SPC flooring click profile", "Surface and click-joint details should be reviewed together for wet-area projects."],
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0020-305a7e0b.webp", "Installed wood-look SPC flooring surface", "An installed surface helps buyers judge joint appearance and daily-use presentation."],
  ],
  "flooring-colors": [
    ["/images/content-library/spc-flooring/spc-flooring-1784365288-44b80770.webp", "SPC flooring color collection", "A focused color collection helps distributors build a practical local range."],
    ["/images/content-library/spc-flooring/spc-flooring-1784365396-09a3d114.webp", "SPC flooring sample fan in multiple colors", "Sample fans are useful for color, surface and range planning."],
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0022-03ce6ad0.webp", "SPC flooring colors displayed in warehouse stock", "Stock and sample views help buyers compare color families before ordering."],
  ],
  "flooring-packaging": [
    ["/images/content-library/spc-flooring/spc-flooring-1784365352-b3e7bc91.webp", "SPC flooring pallets cartons and export loading", "Export packaging links carton protection, pallets and container loading."],
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0016-068e1f87.webp", "SPC flooring cartons stacked on a pallet", "Carton and pallet details should be approved with the product specification."],
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0026-2bbf77d7.webp", "Private-label SPC flooring cartons prepared for shipment", "Packaging is part of distributor presentation and transport protection."],
  ],
  "flooring-factory": [
    ["/images/content-library/spc-flooring/spc-flooring-1784365346-1c110a30.webp", "SPC flooring thickness inspection with a caliper", "Measured sample checks are more useful than unsupported quality claims."],
    ["/images/content-library/factory-process/factory-process-05-factory-00bf4033.webp", "Flooring and wall panel production equipment", "Production equipment and controlled process stages support repeatable orders."],
    ["/images/content-library/factory-process/factory-process-05-factory-8170cff5.webp", "Factory production warehouse and container loading", "Factory, storage and loading records give buyers practical order visibility."],
  ],
  "flooring-application": [
    ["/images/content-library/spc-flooring/spc-flooring-1784365326-9bdcd6e6.webp", "SPC flooring colors shown in interior applications", "Visible flooring applications help connect color choices with project use."],
    ["/images/content-library/spc-flooring/spc-flooring-1784365403-e56b267b.webp", "Installed SPC flooring with visible wood-grain surface", "A clear installed surface is relevant for residential and commercial selection."],
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0020-305a7e0b.webp", "SPC flooring installation and joint appearance", "Installed-plank details help project buyers assess the finished appearance."],
  ],
  "flooring-product": [
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0001-cfa4054a.webp", "SPC flooring planks and stocked product samples", "Real plank and stock imagery keeps the article centered on SPC flooring."],
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0008-fa3f70c0.webp", "SPC flooring plank construction close-up", "A direct product close-up supports specification and buying discussions."],
    ["/images/content-library/spc-flooring/spc-flooring-spc-img-0004-9fe36363.webp", "SPC flooring plank stacks in factory stock", "Stocked planks are relevant to wholesale availability and repeat supply."],
  ],
  "wall-specs": [
    ["/images/content-library/wall-panels/wall-panels-1784365160-4f671650.webp", "Bamboo-wood fiber wall panel profiles and hollow sections", "Visible wall-panel sections help buyers compare construction and thickness."],
    ["/images/content-library/wall-panels/wall-panels-1784365172-5f0d2db3.webp", "Wall panel cross-section checked in the factory", "A factory sample view makes profile and thickness discussions concrete."],
    ["/images/content-library/wall-panels/wall-panels-1784365198-db95352e.webp", "Wall panel colors and cross-sections", "Multiple real profiles support width, finish and construction comparisons."],
  ],
  "wall-product": [
    ["/images/content-library/wall-panels/wall-panels-1784364697-9478eb4f.webp", "Decorative wall panel samples with visible cross-sections", "Real panel samples keep the product type and construction visible."],
    ["/images/content-library/wall-panels/wall-panels-1784364893-5c70c8fb.webp", "Integrated wall panel profile stack", "A clean profile view supports product introduction and buyer evaluation."],
    ["/images/content-library/wall-panels/wall-panels-1784364901-fe703735.webp", "Wall panel surface and edge profile samples", "Surface and edge views are useful when comparing decorative panel ranges."],
  ],
  "wall-colors": [
    ["/images/content-library/wall-panels/wall-panels-1784365198-db95352e.webp", "Wall panel finish colors and profiles", "Color and profile samples help buyers build a sellable collection."],
    ["/images/content-library/wall-panels/wall-panels-1784364614-b40903fc.webp", "Wall panel samples in several decorative finishes", "Physical samples are the right reference for catalog and showroom selection."],
    ["/images/content-library/wall-panels/wall-panels-1784364697-9478eb4f.webp", "Marble-look wall panel samples", "Finish samples should be reviewed together with construction and edge details."],
  ],
  "wall-installation": [
    ["/images/content-library/wall-panels/wall-panels-1784364730-156d6088.webp", "Wall panel clip and installation connection detail", "The clip detail directly supports installation and accessory planning."],
    ["/images/content-library/wall-panels/wall-panels-1784364374-8e7869af.webp", "Wall panel edge profile held for inspection", "Edge construction affects joining, cutting and trim selection."],
    ["/images/content-library/wall-panels/wall-panels-1784364619-2e44150a.webp", "Stacked wall panel profiles for accessory matching", "Profile checks help contractors plan corners, trims and finishing details."],
  ],
  "wall-packaging": [
    ["/images/content-library/wall-panels/wall-panels-1784364737-976961c9.webp", "Wall panel cartons prepared in a warehouse", "Carton protection and counting are essential for long wall-panel packages."],
    ["/images/content-library/wall-panels/wall-panels-1784365193-8295a941.webp", "Wall panel packages loaded into an export container", "A real loading image supports container and handling discussions."],
    ["/images/content-library/wall-panels/wall-panels-1784365254-0872e459.webp", "Finished wall panel stacks ready for packing", "Stack condition should be checked before wrapping and shipment release."],
  ],
  "wall-factory": [
    ["/images/content-library/wall-panels/wall-panels-1784365088-75a38b85.webp", "Wall panel production line with finished material", "A real production line is relevant to capacity, consistency and QC topics."],
    ["/images/content-library/factory-process/factory-process-05-factory-00bf4033.webp", "Building-material production machinery", "Documented process stages give buyers clearer manufacturing visibility."],
    ["/images/content-library/wall-panels/wall-panels-1784365172-5f0d2db3.webp", "Wall panel profile inspection in the factory", "Direct profile inspection connects factory control with the finished product."],
  ],
  "wall-application": [
    ["/images/content-library/wall-panels/wall-panels-1784364901-fe703735.webp", "Decorative wall panel samples for project selection", "Project choices should start from real surfaces, profiles and available finishes."],
    ["/images/content-library/wall-panels/wall-panels-1784365160-4f671650.webp", "Wood-look integrated wall panel profiles", "Product-visible imagery supports renovation and interior application planning."],
    ["/images/content-library/wall-panels/wall-panels-1784365198-db95352e.webp", "Wall panel range for residential and commercial interiors", "A visible range helps project buyers coordinate finish and profile choices."],
  ],
};

const profileCopy = {
  "buyer-guide": ["Procurement brief", "Decision criteria", "Supplier questions", "Sample approval", "Order handover", "Buyer conclusion"],
  "product-introduction": ["Product at a glance", "Construction and options", "Where it fits", "Range planning", "Commercial details", "Product conclusion"],
  "product-comparison": ["Comparison objective", "Side-by-side differences", "Cost and risk trade-offs", "Market fit", "How to test", "Comparison conclusion"],
  "application-scenario": ["Project brief", "Room and traffic demands", "Specification response", "Installation coordination", "Maintenance and replacement", "Project conclusion"],
  "factory-qc": ["Manufacturing objective", "Incoming and in-process checks", "Finished-product control", "Records buyers can request", "Shipment release", "Quality conclusion"],
  "oem-distributor": ["Program objective", "Range architecture", "Private-label workflow", "Samples and approvals", "Repeat-order control", "Distributor conclusion"],
  "packaging-logistics": ["Shipping objective", "Carton and pallet plan", "Container calculation", "Labels and documents", "Loading control", "Logistics conclusion"],
  "installation-accessories": ["System overview", "Site preparation", "Main installation choices", "Accessories and quantities", "Handover checks", "Installation conclusion"],
  "decision-support": ["Decision in one minute", "Evidence to collect", "Risk signals", "Shortlist method", "Final verification", "Decision conclusion"],
};

function hash(value) {
  let result = 2166136261;
  for (const char of value) result = Math.imul(result ^ char.charCodeAt(0), 16777619);
  return result >>> 0;
}

function inferScenario(entry) {
  const text = `${entry.title} ${entry.targetKeyword}`.toLowerCase();
  const matches = ["hotel", "office", "retail", "school", "apartment", "residential", "commercial", "warehouse", "showroom", "distributor", "renovation", "project"];
  return matches.find((item) => text.includes(item)) || (entry.publishSlot === "flooring" ? "wholesale flooring supply" : "interior wall project supply");
}

function inferContentType(entry) {
  const text = `${entry.title} ${entry.targetKeyword}`.toLowerCase();
  if (/\bvs\b|compare|difference|which .* better/.test(text)) return "product-comparison";
  if (/install|trim|corner|accessor|skirting|end cap|underlayment/.test(text)) return "installation-accessories";
  if (/pack|pallet|carton|container|load|logistic|shipping|moq|freight/.test(text)) return "packaging-logistics";
  if (/factory|production|quality|qc|inspection|test|claim|certification|tolerance/.test(text)) return "factory-qc";
  if (/oem|private label|distributor program|catalog|sample order|samples from/.test(text)) return "oem-distributor";
  if (/hotel|office|retail|school|apartment|residential|commercial|renovation|clinic|public space|high-traffic|project/.test(text)) return "application-scenario";
  if (/mistake|avoid|red flag|problem|checklist|what .* ask|how to choose|selection|decision/.test(text)) return "decision-support";
  if (/guide|importing|buyer|what .* know|how to/.test(text)) return "buyer-guide";
  return "product-introduction";
}

function inferImageTopic(entry, contentType) {
  const text = `${entry.title} ${entry.targetKeyword}`.toLowerCase();
  const prefix = entry.publishSlot === "flooring" ? "flooring" : "wall";
  if (prefix === "wall" && /install|trim|corner|accessor|clip|skirting|end cap/.test(text)) return "wall-installation";
  if (prefix === "flooring" && /water|bath|kitchen|moisture/.test(text)) return "flooring-waterproof";
  if (/color|surface|eir|finish|wood look|marble/.test(text)) return `${prefix}-colors`;
  if (/thick|wear layer|size|\bspecs?\b|specification|edge|bevel|profile|width|\b\d+(?:\.\d+)?\s*mm\b|\bvs\b|compare/.test(text) || contentType === "product-comparison") return `${prefix}-specs`;
  if (/hotel|office|retail|school|apartment|residential|commercial|renovation|project/.test(text)) return `${prefix}-application`;
  if (/factory|production|quality|qc|inspection|test|claim|tolerance|certification/.test(text)) return `${prefix}-factory`;
  if (/pack|pallet|carton|container|load|logistic|shipping|moq|private label|oem|distributor/.test(text)) return `${prefix}-packaging`;
  if (contentType === "factory-qc") return `${prefix}-factory`;
  if (["packaging-logistics", "oem-distributor"].includes(contentType)) return `${prefix}-packaging`;
  if (contentType === "application-scenario") return `${prefix}-application`;
  return `${prefix}-product`;
}

function assignImages(entry, topic) {
  const pool = imagePools[topic];
  const start = hash(entry.slug) % pool.length;
  const ordered = [pool[start], pool[(start + 1) % pool.length], pool[(start + 2) % pool.length]];
  const make = ([src, alt, caption]) => ({ src, alt, caption });
  return {
    featuredImage: make(ordered[0]),
    inlineImages: [
      { ...make(ordered[1]), position: "after-introduction" },
      { ...make(ordered[2]), position: "before-final-recommendation" },
    ],
  };
}

function words(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function buildBody(entry, contentType, scenario) {
  const track = entry.publishSlot;
  const material = track === "flooring" ? "SPC flooring" : "WPC, bamboo-wood fiber and PVC wall-panel systems";
  const buyer = track === "flooring" ? "flooring importers, distributors, contractors and project buyers" : "interior-material importers, distributors, contractors and project buyers";
  const specification = track === "flooring"
    ? "overall thickness, wear layer, click profile, surface, optional backing, carton and pallet method"
    : "panel material, width, thickness, surface film, edge profile, matching trims, carton and bundle method";
  const practicalChecks = track === "flooring"
    ? ["compare physical planks under the same light", "test click fit across several cartons", "confirm wear layer and backing in writing", "approve carton marks before printing"]
    : ["compare panel faces and hollow sections", "confirm trim colors beside the panel", "check the proposed fixing method on the actual wall", "approve bundle marks before packing"];
  const headings = profileCopy[contentType];
  const seed = hash(entry.slug);
  const focus = entry.targetKeyword || entry.title;
  const angle = `${headings[0].toLowerCase()} for ${scenario}`;
  const tableTitle = contentType === "product-comparison" ? "Comparison worksheet" : contentType === "factory-qc" ? "Inspection checkpoint table" : "B2B planning table";
  const rows = track === "flooring"
    ? [
      ["Application", scenario, "Defines traffic, comfort and presentation priorities"],
      ["Product build", "Thickness, wear layer, click profile and optional backing", "Keeps quotations comparable"],
      ["Sample", "Color, surface, edge, joint fit and carton mock-up", "Creates an approval reference"],
      ["Order", "Quantity, batch plan, cartons, pallets and loading", "Connects unit price with landed risk"],
    ]
    : [
      ["Application", scenario, "Defines finish, cleaning and installation priorities"],
      ["Panel system", "Material, width, profile, surface and accessories", "Keeps quotations comparable"],
      ["Sample", "Face, edge, section, trim match and installation trial", "Creates an approval reference"],
      ["Order", "Panels, trims, allowance, bundles and loading", "Prevents an incomplete site package"],
    ];
  const variant = seed % 3;
  const opening = [
    `${entry.title} is a commercial planning question, not a slogan. For ${buyer}, the useful answer links the real ${scenario} requirement to a written specification, a physical approval sample and an order-control plan. This article approaches ${focus} through a ${angle}, so a purchasing team can move from inquiry to repeat order without relying on unrelated product photos or vague supplier claims.`,
    `A workable decision about ${focus} starts with the destination market and the job the product must perform. ${entry.title} therefore needs to be reviewed as a complete B2B package: product construction, sample evidence, installation context, packaging and supplier follow-through. The discussion below is organized as a ${angle} for ${buyer}.`,
    `Buyers usually create risk when they separate product choice from order execution. In ${entry.title}, appearance matters, but so do ${specification}. This ${angle} gives ${buyer} a practical way to define the requirement, compare evidence and hand an approved specification to production and logistics teams.`,
  ][variant];

  const sectionParagraphs = [
    `${focus} should first be translated into an intended use, target customer and acceptable range position. A distributor-stock program needs repeatable colors and manageable replenishment, while a named project may give more weight to a particular finish, delivery sequence or installation constraint. Writing that context at the top of the inquiry prevents the supplier from answering a specific question with a generic quotation.`,
    `The product description should list ${specification}. Buyers should ask what is included, what is optional and which details change the cost or loading quantity. A quotation is only comparable when each supplier responds to the same written build. If one offer omits backing, accessories, pallets or branded cartons, a lower number may not represent a lower delivered cost.`,
    `Samples are decision tools rather than sales souvenirs. The team should ${practicalChecks[0]}, ${practicalChecks[1]}, and record the accepted result with photos or a signed reference. Sample labels should include the code and key build. That reference then follows the purchase order, production check and claim procedure instead of disappearing after the initial meeting.`,
    `For ${scenario}, the installation team needs information before materials arrive. Substrate or wall condition, expansion or edge treatment, cutting loss, trims and cleaning routines can change the recommended solution. A supplier can explain its product system, but the local contractor remains responsible for checking site conditions and local requirements. This boundary should be clear in the project file.`,
    `Commercial control continues after the sample is approved. The buyer should confirm batch grouping, color-code labels, packaging strength, pallet or bundle method and the evidence expected before shipment. Useful evidence may include production photos, measurement records, packing photos and loading views. The request should be proportionate to the order and agreed before production starts.`,
    `The safest short list is built on evidence and communication quality. Buyers can compare response completeness, willingness to clarify options, sample consistency and the ability to repeat an approved construction. A supplier that identifies missing information early is often easier to manage than one that gives an instant price without defining the product.`,
  ];

  let body = `# ${entry.title}\n\n${opening}\n\n`;
  sectionParagraphs.forEach((paragraph, index) => {
    body += `## ${headings[index]}: ${index === 0 ? focus : scenario}\n\n${paragraph}\n\n`;
    if (index === 1) {
      body += `### ${tableTitle}\n\n| Planning point | What to define | Why it matters |\n|---|---|---|\n${rows.map((row) => `| ${row.join(" | ")} |`).join("\n")}\n\n`;
    }
    if (index === 2) {
      body += `### Working checks for this order\n\n- ${practicalChecks[0][0].toUpperCase()}${practicalChecks[0].slice(1)}.\n- ${practicalChecks[1][0].toUpperCase()}${practicalChecks[1].slice(1)}.\n- ${practicalChecks[2][0].toUpperCase()}${practicalChecks[2].slice(1)}.\n- ${practicalChecks[3][0].toUpperCase()}${practicalChecks[3].slice(1)}.\n\n`;
    }
  });
  body += `## ${headings[5]} for ${entry.title}\n\nA clear next step is to send the application, destination, target quantity and required ${specification} in one inquiry. Ask the supplier to identify assumptions instead of hiding them in a short quotation. Review a physical sample, close the packaging and accessory details, and keep the approved reference for shipment control. This process turns ${focus} into an order that sales, technical, production and logistics teams can all understand.\n\n`;
  body += `The same file can support repeat orders. Record approved codes, acceptable tolerances, carton artwork revision, packing count and any project-specific note. When market feedback arrives, change one controlled variable at a time. That discipline helps a distributor improve the range without losing track of which construction, finish or packing method produced the result.\n\n`;

  const expansion = [
    `A buyer should also separate mandatory requirements from preferences. Mandatory points belong in the purchase specification and inspection record. Preferences can be ranked by commercial value, such as a wider color choice, a different surface or a particular carton presentation. This distinction keeps negotiations productive when price, lead time and loading efficiency need to be balanced.`,
    `Before payment milestones are agreed, the purchasing team should assign an owner for sample approval, artwork approval, production updates and shipping documents. Named ownership reduces delays and prevents contradictory instructions. For a multi-product or mixed-container order, one consolidated checklist is especially important because packing dimensions and loading sequence can affect every product group.`,
    `After delivery, the buyer should collect structured feedback from warehouse staff, installers and sales teams. Damage patterns, slow-moving colors, installation questions and repeat inquiries reveal different issues. Feeding those observations into the next specification is more useful than changing products after one isolated complaint or one unusually successful project.`,
  ];
  for (let index = 0; words(body) < 930 && index < expansion.length; index += 1) {
    body += `## ${["Commercial priorities", "Order ownership", "Repeat-order learning"][index]} for ${scenario}\n\n${expansion[(index + variant) % expansion.length]}\n\n`;
  }
  if (words(body) < 900) {
    body += `## Final order note for ${focus}\n\nKeep the final requirement in one controlled document and ask every responsible person to work from the same revision. A clear record of the approved product, sample, packaging and shipment evidence is the simplest way to protect both the first order and later replenishment.\n\n`;
  }
  return body.trim();
}

const future = queue.entries.filter((entry) => entry.publishDate >= futureStart);
const publishedSnapshot = JSON.stringify(queue.entries.filter((entry) => entry.publishDate < futureStart));
const complementaryType = {
  "buyer-guide": "decision-support",
  "product-introduction": "buyer-guide",
  "product-comparison": "decision-support",
  "application-scenario": "decision-support",
  "factory-qc": "buyer-guide",
  "oem-distributor": "buyer-guide",
  "packaging-logistics": "buyer-guide",
  "installation-accessories": "decision-support",
  "decision-support": "buyer-guide",
};
const plannedTypes = new Map();
const groups = new Map();
for (const entry of future) {
  const group = groups.get(entry.publishGroupDate) || [];
  group.push(entry);
  groups.set(entry.publishGroupDate, group);
}
for (const entries of groups.values()) {
  const flooring = entries.find((entry) => entry.publishSlot === "flooring");
  const wallPanel = entries.find((entry) => entry.publishSlot === "wall-panel");
  const flooringType = inferContentType(flooring);
  let wallType = inferContentType(wallPanel);
  if (wallType === flooringType) wallType = complementaryType[wallType];
  plannedTypes.set(flooring.slug, flooringType);
  plannedTypes.set(wallPanel.slug, wallType);
}

for (const entry of future) {
  const slot = entry.publishSlot;
  if (slot !== "flooring" && slot !== "wall-panel") throw new Error(`Invalid publishSlot: ${entry.slug}`);
  const contentType = plannedTypes.get(entry.slug);
  const scenario = inferScenario(entry);
  const imageTopic = inferImageTopic(entry, contentType);
  const assigned = assignImages(entry, imageTopic);
  const body = buildBody(entry, contentType, scenario);
  if (words(body) < 900 || words(body) > 1400) throw new Error(`${entry.slug} generated ${words(body)} words`);

  Object.assign(entry, {
    contentType,
    contentAngle: `${profileCopy[contentType][0]} for ${scenario}`,
    primaryTopic: entry.targetKeyword,
    imageTopic,
    applicationScenario: scenario,
    excerpt: `${entry.title} explained for B2B buyers through ${profileCopy[contentType][0].toLowerCase()}, product evidence, order planning and ${scenario} requirements.`,
    body,
    faq: [
      { question: `What should buyers define first for ${entry.targetKeyword}?`, answer: `Define the destination market, ${scenario} application, target quantity and the complete product build before comparing quotations.` },
      { question: `What sample evidence is useful before a bulk order?`, answer: `Approve the real surface, construction, edge or joint details, color code and relevant packaging or accessory sample, then retain the reference for production checks.` },
      { question: `How can Eshsire support this order?`, answer: `Eshsire can discuss specifications, samples, OEM packaging, order updates and export packing after the buyer provides the application, quantity and destination.` },
    ],
    cta: {
      label: `Discuss ${entry.targetKeyword}`,
      title: `Plan a ${scenario} order with Eshsire`,
      text: `Send the target specification, quantity, destination and sample requirements for a focused B2B quotation.`,
      href: "/en/contact",
    },
    ...assigned,
  });
}

// Keep the alternating list visually varied even when two adjacent articles use
// a shared factory topic. Rotate only within the already-approved topic pool.
for (let index = 1; index < future.length; index += 1) {
  const previous = future[index - 1];
  const current = future[index];
  if (current.featuredImage.src === previous.featuredImage.src) {
    const candidates = [current.featuredImage, ...current.inlineImages.map(({ position: _position, ...item }) => item)];
    const replacementIndex = candidates.findIndex((item) => item.src !== previous.featuredImage.src);
    const ordered = [...candidates.slice(replacementIndex), ...candidates.slice(0, replacementIndex)];
    current.featuredImage = ordered[0];
    current.inlineImages = ordered.slice(1).map((item, imageIndex) => ({
      ...item,
      position: imageIndex === 0 ? "after-introduction" : "before-final-recommendation",
    }));
  }
}

if (JSON.stringify(queue.entries.filter((entry) => entry.publishDate < futureStart)) !== publishedSnapshot) {
  throw new Error("Published entries changed unexpectedly");
}

fs.writeFileSync(queuePath, `${JSON.stringify(queue, null, 2)}\n`);
console.log(`Updated ${future.length} future entries without changing published entries.`);
