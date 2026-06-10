/**
 * Eshsire Group V3 long-form B2B article builder — pain hooks, 8-section structure, weight-based container logic.
 */
import { insertSectionImages } from "./article-image-blocks.mjs";
import {
  pickHook,
  resolvePrimaryKeyword,
  CONTAINER_TRUTH,
  STRUCTURE_H2,
  ESHSIRE_DIFFERENTIATORS,
  isLogisticsTopic,
  isQualityTopic,
  isFactoryTopic,
} from "./blog-content-rules.mjs";

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length;
}

function countBlocksWords(blocks) {
  return blocks.reduce((sum, b) => {
    if (b.type === "p") return sum + wordCount(b.text);
    if (b.type === "ul") return sum + b.items.join(" ").split(/\s+/).length;
    if (b.type === "rich-p")
      return (
        sum +
        b.segments
          .filter((s) => typeof s === "string")
          .join(" ")
          .split(/\s+/).length
      );
    return sum;
  }, 0);
}

function p(text) {
  return { type: "p", text };
}

function h2(text) {
  return { type: "h2", text };
}

function h3(text) {
  return { type: "h3", text };
}

function ul(items) {
  return { type: "ul", items };
}

function richLink(text, link, href) {
  return { type: "rich-p", segments: [text, { link, href }] };
}

function buildSections(meta) {
  const pk = meta.primaryKeyword ?? resolvePrimaryKeyword(meta);
  const sk = meta.secondaryKeywords ?? [];
  const t = meta.title ?? "";
  const hook = pickHook({ ...meta, primaryKeyword: pk });
  const logistics = isLogisticsTopic(meta);
  const quality = isQualityTopic(meta);
  const factory = isFactoryTopic(meta);

  const problemBody = logistics
    ? [
        `Importers ordering ${pk} often receive volume-based advice that ignores weight limits. SPC flooring cartons are heavy — a full load can hit port limits before the container looks full.`,
        `The real problem is not finding a factory quote. It is getting a supplier who calculates total gross weight, carton stacking, SKU mix, and destination weighbridge rules before production starts.`,
        `When ${sk[0] ?? "SPC flooring manufacturer China"} partners treat every order as a 40HQ volume play, distributors absorb overweight fees, reworked packing lists, and delayed BL release.`,
      ]
    : quality
      ? [
          `Distributors lose margin when batch quality drifts after the approved sample. For ${pk}, the gap between sample room and production floor is where most claims start.`,
          `Importers need documented QC checkpoints — dimensional tolerance, click-lock fit, wear layer verification, and carton drop tests — tied to each production batch, not a one-page brochure.`,
          `Without ${sk[1] ?? "SPC flooring quality inspection"} discipline before loading, a low FOB price becomes an expensive reorder cycle within one retail season.`,
        ]
      : factory
        ? [
            `Many buyers discover too late that their "${pk}" contact is a trading desk, not the extrusion line. Factory identity, production capacity, and export documentation must align before deposit.`,
            `Trading companies can quote faster, but they switch subcontractor factories between containers — color drift, QC inconsistency, and missing loading photos follow.`,
            `Professional importers evaluate ${sk[0] ?? "SPC flooring factory direct"} partners on production visibility, not just price per sqm.`,
          ]
        : [
            `Professional importers evaluating ${pk} face supplier noise — fast replies, glossy samples, and vague production timelines. The risk starts when deposit is paid and visibility stops.`,
            `Distributors need partners who understand landed cost, MOQ structure, carton efficiency, and replenishment cadence — not showroom marketing.`,
            `When ${sk[0] ?? "SPC flooring supplier in China"} cannot show weight-based loading plans, daily production updates, and pre-shipment QC evidence, import risk rises quickly.`,
          ];

  const costBody = [
    `Every week of production silence adds finance cost, warehouse gap risk, and lost retail sell-through. Distributors pay twice — once in holding cost, once in emergency air freight or LCL premiums.`,
    `Claims on color mismatch, damaged click-lock, or short carton count typically run 3–8% of order value when QC is weak — erasing any FOB savings from a cheaper quote.`,
    logistics
      ? `Overweight containers trigger port penalties, reload fees, and insurance disputes. Freight cost per usable sqm rises when loading plans ignore weight limits.`
      : `Margin erosion compounds when importers optimize FOB alone. Landed cost must include ocean freight, insurance, port charges, inland delivery, and expected claim allowance.`,
    `Retail and project customers penalize late stock. Your customer does not care why the shipment was delayed — they only know your inventory did not arrive on time.`,
  ];

  const suppliersWrong = [
    `Recommend 40HQ for every SPC-only order without calculating total weight, carton gross weight, and destination port limits.`,
    `Push volume-based container advice without explaining that 20GP and 40HQ weight limits are often near 28 tonnes — so 40HQ is not automatically better for heavy SPC-only loads.`,
    `Reply quickly before payment, then go quiet during production — no daily production updates, no visual production tracking, no loading photos.`,
    `Quote single FOB price without MOQ matrix, wear layer options, OEM packaging specs, or mixed-loading scenarios with wall panels and PVC ceiling panels.`,
    `Skip quality inspection before shipment — no batch QC checklist, no pre-loading sample sign-off, no seal and BL alignment.`,
  ];

  const professionalCalc = logistics
    ? [
        `Total gross weight per SKU and combined container weight against 20GP / 40HQ limits`,
        `Carton size, pallet or non-pallet loading, and product thickness impact on stack height`,
        `Product mix: SPC-only 20GP vs mixed loading with lighter wall panels, PVC ceiling panels, skirting, trims, underlayment, and accessories in 40HQ`,
        `Destination port rules, weighbridge limits, overweight risk, and loading sequence`,
        `Freight cost per usable product category — not vanity sqm claims that ignore weight caps`,
      ]
    : [
        `Wear layer and thickness matrix mapped to traffic class, MOQ per SKU, and carton efficiency`,
        `Production timeline with daily production updates and visual production tracking milestones`,
        `OEM packaging dimensions, private label artwork lead time, and carton drop standard`,
        `Pre-shipment quality inspection checklist and claim handling process`,
        `Weight-based loading calculation when combining SPC with other building materials`,
      ];

  const eshsireBody = [
    `Eshsire Group operates integrated SPC flooring and wall panel production with export teams serving importers across Africa, Middle East, Europe, and Southeast Asia.`,
    `${ESHSIRE_DIFFERENTIATORS[0]} and ${ESHSIRE_DIFFERENTIATORS[1]} keep distributors informed from deposit to loading — not generic "in progress" emails.`,
    `${ESHSIRE_DIFFERENTIATORS[2]} and ${ESHSIRE_DIFFERENTIATORS[3]} mean every shipment plan starts with weight tables, not volume guesses. For standard SPC-only orders, 20GP is usually enough. 40HQ becomes useful when SPC shares space with lighter interior materials.`,
    `${ESHSIRE_DIFFERENTIATORS[4]} and ${ESHSIRE_DIFFERENTIATORS[5]} protect brand reputation before cartons leave the factory.`,
    `${ESHSIRE_DIFFERENTIATORS[6]} helps building materials distributors reduce freight cost per category without overweight risk.`,
    `${ESHSIRE_DIFFERENTIATORS[7]} and ${ESHSIRE_DIFFERENTIATORS[8]} come from documented QC, loading photos, and responsive export coordination.`,
  ];

  const checklist = [
    `Confirm factory address matches export documentation and loading photos`,
    `Request three reference importers in your destination region with repeat order history`,
    `Lock pre-production sample on color, wear layer, thickness, and carton marking`,
    `Get weight-based container loading plan — 20GP for standard SPC-only, 40HQ only for verified mixed loading`,
    `Agree daily production updates format and QC hold escalation process`,
    `Review loading photos, seal number, and draft BL before vessel departure`,
    `Document landed cost model including freight, claims allowance, and warehouse carrying cost`,
  ];

  const faqItems = logistics
    ? [
        {
          q: `Is 40HQ always better for ${pk}?`,
          a: `No. SPC flooring is heavy, so loading is mainly limited by weight. For many standard orders, 20GP is already enough. 40HQ is more useful when SPC is combined with lighter products such as wall panels, PVC ceiling panels, or accessories.`,
        },
        {
          q: `What should importers verify before container loading?`,
          a: `Total weight against port limits, carton stacking plan, SKU mix, loading sequence, and pre-shipment quality inspection sign-off. Professional suppliers calculate these before recommending 20GP or 40HQ.`,
        },
        {
          q: `Can SPC flooring and wall panels ship in one container?`,
          a: `Yes — mixed loading is a core profit lever for building materials distributors. Weight-based loading calculation ensures SPC and lighter materials fill the container without overweight risk.`,
        },
      ]
    : [
        {
          q: `How do importers verify a real ${pk}?`,
          a: `Factory visit or video audit, production line photos, export record samples, and reference checks. Trading companies often cannot show consistent loading photos from one facility.`,
        },
        {
          q: `What MOQ should distributors expect?`,
          a: `MOQ varies by SKU, thickness, and wear layer. Serious factories publish MOQ matrix per color and support mixed-SKU programs with documented carton efficiency — not one blanket MOQ.`,
        },
        {
          q: `Why do samples differ from full production?`,
          a: `Sample rooms use controlled batches. Full production risk starts after deposit — daily production updates and quality inspection before shipment catch drift early.`,
        },
      ];

  const sections = [
    p(hook),
    p(
      logistics
        ? `${CONTAINER_TRUTH} This guide focuses on ${pk} for flooring distributors, wholesalers, and building material importers sourcing from China.`
        : `This guide focuses on ${pk} for flooring distributors, wholesalers, and building material importers sourcing from China — factory pricing logic, weight-based shipment planning, and supply chain control, not decoration trends.`
    ),
    h2(STRUCTURE_H2.problem),
    ...problemBody.map(p),
    h2(STRUCTURE_H2.cost),
    ...costBody.map(p),
    h2(STRUCTURE_H2.suppliersWrong),
    ...suppliersWrong.map(p),
    h2(STRUCTURE_H2.professionalCalc),
    ul(professionalCalc),
    p(
      `Professional suppliers calculate total weight, carton size, pallet or non-pallet loading, product thickness, product mix, destination port rules, overweight risk, and loading sequence before recommending 20GP or 40HQ.`
    ),
    h2(STRUCTURE_H2.eshsire),
    ...eshsireBody.map(p),
    richLink("Review ", "SPC flooring factory capability and production lines", "/factory"),
    richLink("Explore ", "wall panel and mixed container supply programs", "/wall-panels"),
    richLink("Request ", "factory quotation and weight-based loading plan", "/contact"),
    h2(STRUCTURE_H2.checklist),
    ul(checklist),
    h2(STRUCTURE_H2.faq),
    ...faqItems.flatMap(({ q, a }) => [h3(q), p(a)]),
    h2(STRUCTURE_H2.conclusion),
    p(
      `${t} — professional importers win on supply chain discipline, not lowest FOB alone. Choose partners who deliver ${pk}, daily production updates, weight-based loading calculation, and quality inspection before shipment. When factory pricing, production visibility, and container planning align, distributors improve margins and ${ESHSIRE_DIFFERENTIATORS[7].toLowerCase()}.`
    ),
    richLink("Eshsire Group operates as a ", "SPC flooring supplier and China flooring factory", "/spc-flooring"),
  ];

  if (t.toLowerCase().includes("mistake")) {
    sections.splice(
      4,
      0,
      p(
        `The seven costliest mistakes — chasing lowest FOB without landed cost math, skipping factory verification, placing large first orders without sample lock, ignoring production visibility, accepting volume-based 40HQ advice for heavy SPC-only orders, weak carton marking, and no pre-shipment QC — destroy distributor margins within two quarters.`
      )
    );
  }

  if (t.toLowerCase().includes("africa") || t.toLowerCase().includes("hotel")) {
    sections.splice(
      4,
      0,
      p(
        `Africa and hospitality distributors often combine waterproof SPC with wall panels and PVC ceiling panels. Mixed loading in one 40HQ — when weight allows — reduces freight cost per category versus separate LCL shipments. Plan OEM cartons and English/French labels before production.`
      )
    );
  }

  if (t.toLowerCase().includes("factory vs") || t.toLowerCase().includes("trading")) {
    sections.splice(
      4,
      0,
      p(
        `Factory-direct ${pk} removes typical trader margin while locking BOM references for color stability. Trading companies may switch factories between containers — importers should demand loading photos, seal numbers, and production batch records from the same facility every shipment.`
      )
    );
  }

  return sections;
}

export function buildLongFormBlocks(meta, images) {
  const enriched = { ...meta, primaryKeyword: resolvePrimaryKeyword(meta) };
  const sections = buildSections(enriched);
  let blocks = insertSectionImages(sections, images, enriched, {
    imgCaption: `Eshsire Group — ${enriched.primaryKeyword} reference`,
    imgEnding: "Export staging reference — SPC flooring supply chain",
  });

  let wc = countBlocksWords(blocks);
  let pad = 0;
  while (wc < 1800 && pad < 35) {
    const kw = meta.secondaryKeywords?.[pad % (meta.secondaryKeywords?.length || 1)] ?? "SPC flooring wholesale supplier";
    blocks.splice(
      blocks.length - 1,
      0,
      p(
        `Import planning note ${pad + 1}: when evaluating ${kw} alongside ${enriched.primaryKeyword}, model three shipment scenarios — standard 20GP SPC load, mixed loading with lighter wall or ceiling materials in 40HQ, and emergency LCL top-up. ` +
          `For each scenario record production days, QC hold risk, total weight against port limits, freight per sqm, and gross margin after claims. ` +
          `Distributors who run this analysis before annual supply agreements avoid optimizing FOB while ignoring weight limits and inventory carrying cost. ` +
          `Partners offering daily production updates, visual production tracking, and weight-based loading calculation deserve priority when scaling import volume.`
      )
    );
    wc = countBlocksWords(blocks);
    pad++;
  }

  return { blocks, wordCount: wc };
}

export function buildArticleMeta(meta, images) {
  const pk = resolvePrimaryKeyword(meta);
  return {
    ...meta,
    primaryKeyword: pk,
    heroImage: images.banner,
    ogImage: images.banner,
  };
}
