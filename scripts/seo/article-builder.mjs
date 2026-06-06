/**
 * BJFLOOR long-form B2B article builder — target 1800–3000 words.
 * Titles are fixed verbatim from calendar; body emphasizes profit, import, supply chain.
 */
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

function img(src, alt, caption) {
  return { type: "img", src, alt, caption };
}

function richLink(text, link, href) {
  return {
    type: "rich-p",
    segments: [text, { link, href }],
  };
}

function expandParagraph(base, extra) {
  return `${base} ${extra}`;
}

function sectionBlocks(heading, paragraphs) {
  const blocks = [h2(heading)];
  for (const para of paragraphs) {
    blocks.push(p(para));
  }
  return blocks;
}

function buildSections(meta) {
  const pk = meta.primaryKeyword;
  const sk = meta.secondaryKeywords;
  const t = meta.title;
  const tag = meta.productTag;

  const intro = p(
    `${t} — this article is written for flooring distributors, wholesalers, contractors and building material importers who buy from China. ` +
      `Your primary sourcing lens is ${pk}: factory pricing logic, container shipment efficiency, bulk order procurement and supply chain visibility — not decoration trends. ` +
      `When ${sk[0]} and ${sk[1]} are evaluated correctly, importers protect margins, reduce claims and shorten replenishment cycles.`
  );

  const sections = [
    intro,
    h2("BJFLOOR factory advantage: why importers switch to direct supply"),
    p(
      `BJFLOOR partner Eshsire Group operates a 6000㎡ integrated SPC flooring and wall panel factory in Beijing with in-house extrusion, lamination, QC and export documentation teams. ` +
        `Distributors choose us when they need ${pk} with visible production — not broker repackaging — plus container programs to 30+ countries across Africa, Middle East, Europe and Southeast Asia.`
    ),
    richLink("Review ", "China flooring factory capability and production lines", "/factory"),
    p(
      `Factory-direct ${sk[0]} removes trader margin typically worth 8–15% on FOB quotes, while locked BOM references keep color stable for retail and project channels. ` +
        `Weekly production photos, loading records and sqm-per-SKU packing lists are standard for repeat ${sk[2] || "bulk orders"} — the supply chain transparency professional importers require.`
    ),
    richLink("Explore ", "wholesale wall panel supply for mixed container programs", "/wall-panels"),
    h2(`Why ${tag === "wall" ? "Wall Panel" : tag === "vinyl" ? "Vinyl Flooring" : "SPC Flooring"} Buyers Focus on Profit and Supply Chain`),
    p(
      expandParagraph(
        `Successful importers treat flooring as a cash-flow product category. Landed cost per sqm, MOQ structure, production lead time and container utilization determine whether a distributor grows or stalls.`,
        `A reliable ${pk} removes trader margin, stabilizes batch color and supports repeat ${sk[2] || "bulk orders"}.`
      )
    ),
    p(
      `Trading companies can quote quickly but often switch factories between containers. Factory-direct ${sk[0]} gives you production dates, QC photos, packing lists and loading records tied to one facility — critical when your retail customers or project clients penalize delays.`
    ),
    h3("What importers should document before placing orders"),
    ul([
      `Factory address, production line photos and ${pk} reference pricing`,
      `Wear layer / thickness matrix and MOQ per SKU for ${sk[3] || "wholesale flooring price"}`,
      `Container CBM plan: sqm per 40HQ, carton stacking and mixed-color feasibility`,
      `QC checklist, pre-shipment inspection protocol and claim handling process`,
      `Payment terms, production timeline and weekly status update format`,
    ]),
  ];

  if (t.toLowerCase().includes("what is") || t.toLowerCase().includes("commercial")) {
    sections.push(
      ...sectionBlocks(
        "SPC flooring for commercial projects — buyer economics, not decoration",
        [
          `Contractors and distributors select SPC for waterproof rigid core, fast click-lock installation and stable factory pricing — not because a showroom looks trendy. Commercial buyers model cost per sqm installed, callback risk and container replenishment cadence.`,
          `Hotels, schools, offices and retail fit-outs need wear layer specs tied to traffic class. Quote ${pk} per thickness and mil rating; avoid single-price brochures that hide MOQ and carton efficiency differences.`,
          `Project importers align SKU lists with container CBM before production — mixing too many colors in one PO increases changeover cost and delays loading.`,
        ],
        pk
      )
    );
  }

  if (t.toLowerCase().includes("mistake") || t.toLowerCase().includes("avoid")) {
    sections.push(
      ...sectionBlocks(
        "Costly procurement mistakes distributors must eliminate",
        [
          `Chasing lowest FOB without landed cost math — freight, claims and stock-outs erase savings within two quarters.`,
          `Skipping factory verification visits or video audits — brokers disappear when color batches fail on the retail floor.`,
          `Placing large first orders without pre-production sample lock on color, wear layer and carton marking.`,
          `Ignoring production visibility between deposit and loading — silence usually means queue jumps, not smooth progress.`,
        ],
        pk
      )
    );
  }

  if (t.toLowerCase().includes("choose") || t.toLowerCase().includes("reliable") || t.toLowerCase().includes("evaluate")) {
    sections.push(
      ...sectionBlocks(
        "How to evaluate a China SPC flooring supplier before first container",
        [
          `Confirm manufacturing address matches export documentation and loading photos — not a trading office downtown.`,
          `Request three references in your destination region with repeat order history and claim rates.`,
          `Review QC checklist: dimensional tolerance, click-lock fit, wear layer spot test and carton drop standard.`,
          `Compare response quality on container CBM planning — serious factories calculate sqm per 40HQ before quoting FOB.`,
        ],
        pk
      )
    );
  }

  if (t.toLowerCase().includes("hotel") || t.toLowerCase().includes("africa") || t.toLowerCase().includes("case study")) {
    sections.push(
      ...sectionBlocks(
        "Hotel and Africa project supply — container discipline",
        [
          `Hotel corridors and guest rooms need consistent wear layer and slip rating — specify before color selection to avoid rework at site.`,
          `Africa-bound containers benefit from moisture-resistant cartons, corner protection and SKU labels in English/French when required by customs.`,
          `OEM guestroom quantities often mix 3–5 colors in one 40HQ — factory staging by floor level speeds hotel installation.`,
          `Document loading photos and sqm per SKU for project sign-off; hotel operators penalize suppliers who cannot prove batch consistency.`,
        ],
        pk
      )
    );
  }

  if (t.toLowerCase().includes("container") || t.toLowerCase().includes("loading") || t.toLowerCase().includes("logistics")) {
    sections.push(
      ...sectionBlocks(
        "Container loading and logistics planning",
        [
          `A full 40HQ container typically carries 3,000–3,800 sqm depending on plank size and carton design. Planning SKU mix before production avoids half-empty containers and LCL premiums.`,
          `Load sequence matters: heavier cartons on the floor, balanced weight distribution, corner protection and SKU labels facing the door reduce damage and speed warehouse put-away at destination.`,
          `Photograph empty container, half load and sealed container with lock number. Align commercial invoice, packing list and BL draft to the same container ID before vessel departure.`,
          `Distributors running monthly replenishment should lock carton dimensions and pallet patterns so ${sk[1]} stays predictable across quarters.`,
        ],
        pk
      )
    );
  }

  if (t.toLowerCase().includes("factory") || t.toLowerCase().includes("pricing") || t.toLowerCase().includes("manufacturer")) {
    sections.push(
      ...sectionBlocks(
        "Factory pricing vs trading company quotes",
        [
          `Factory FOB price breaks down by thickness, wear layer mil rating, surface texture, order volume and OEM packaging — not a single retail number. Request itemized quotations per sqm with port and incoterm stated.`,
          `Integrated ${pk} facilities control extrusion, lamination, profiling and packing in one location. That reduces middleman markup and improves batch consistency for ${sk[2] || "bulk spc flooring order"} programs.`,
          `Compare quotes on landed cost: FOB price + local charges + ocean freight + destination fees + inspection + finance cost. A lower FOB from an unverified supplier often becomes expensive after delays and claims.`,
          `Lock BOM references for repeat orders so color, embossing and core formula stay stable — essential for retail display consistency and project sign-off.`,
        ],
        pk
      )
    );
  }

  if (t.toLowerCase().includes("quality") || t.toLowerCase().includes("inspection") || t.toLowerCase().includes("audit")) {
    sections.push(
      ...sectionBlocks(
        "Quality control before shipment",
        [
          `Inline QC during extrusion catches dimensional drift early. Pre-pack inspection verifies click-lock fit, surface defects, chamfer consistency and carton labels against the purchase order.`,
          `Random sampling per batch: caliper thickness, wear layer spot check, acetone rub on print layer and drop-test cartons before palletizing.`,
          `Third-party inspection is optional but recommended for first orders or new SKUs. Factory QC plus independent verification reduces dispute time when containers arrive.`,
          `Release only approved pallets to the export staging area. Mixed staging without SKU separation causes loading errors and customer complaints.`,
        ],
        pk
      )
    );
  }

  if (t.toLowerCase().includes("distributor") || t.toLowerCase().includes("margin") || t.toLowerCase().includes("profit") || t.toLowerCase().includes("cash")) {
    sections.push(
      ...sectionBlocks(
        "Distributor margin protection without raising retail prices",
        [
          `Margin improvement usually comes from landed cost reduction, not shelf price increases. Factory-direct ${pk}, optimized container fill and lower claim rates compound over four quarters.`,
          `SKU rationalization helps: fewer slow movers, deeper stock on winners, quarterly container rhythm instead of emergency LCL air-freight fixes.`,
          `Offer project clients and dealer networks transparent lead times backed by production updates — reliability becomes a sales tool that protects price integrity.`,
          `Track gross margin per SKU including freight amortization, not FOB alone. Finance teams often discover "cheap" lines destroy cash after logistics and returns.`,
        ],
        pk
      )
    );
  }

  if (t.toLowerCase().includes("inventory") || t.toLowerCase().includes("warehouse")) {
    sections.push(
      ...sectionBlocks(
        "Inventory and warehouse management for flooring importers",
        [
          `Flooring cartons are bulky — warehouse slotting by velocity class prevents picking bottlenecks. Fast SKUs near dispatch doors; project pallets grouped by job reference.`,
          `Safety stock formulas should use container lead time in weeks, not days. Include production queue, ocean transit, customs and inland delivery.`,
          `During market slowdowns, reduce new PO frequency but maintain container rhythm on core colors to preserve ${sk[0]} tiers.`,
          `Cycle counts by sqm on hand vs ERP reconcile shrink from sample rooms and damaged cartons before they distort replenishment.`,
        ],
        pk
      )
    );
  }

  if (t.toLowerCase().includes("risk") || t.toLowerCase().includes("mistake") || t.toLowerCase().includes("avoid")) {
    sections.push(
      ...sectionBlocks(
        "Procurement risk control checklist",
        [
          `Verify supplier is a manufacturer, not a broker repackaging others' cartons. Ask for same-day factory gate photos with order reference.`,
          `Never skip pre-production sample sign-off on color and wear layer for new collections.`,
          `Contract clauses: late production penalties, replacement policy for shipping damage, documentation timeline for BL and CO.`,
          `Diversify only after baseline factory relationship works — dual sourcing without volume splits increases complexity and QC drift.`,
        ],
        pk
      )
    );
  }

  if (meta.phase >= 2 && tag === "vinyl") {
    sections.push(
      ...sectionBlocks(
        "Vinyl / LVT wholesale supply considerations",
        [
          `Vinyl and LVT lines complement rigid SPC in many distributor catalogs. Separate MOQ and container plans — flexible LVT rolls and rigid planks rarely optimize the same CBM model.`,
          `${sk[0]} from the same factory group can simplify QC standards and documentation for mixed containers when approved by the manufacturer.`,
          `Commercial LVT projects may specify different wear layers than retail SPC — quote and produce separately to avoid margin erosion from spec mismatch.`,
        ],
        pk
      )
    );
  }

  if (meta.phase >= 2 && tag === "wall") {
    sections.push(
      ...sectionBlocks(
        "Wall panel supply alongside flooring programs",
        [
          `Distributors adding ${sk[0] || "wall panel supplier china"} SKUs can combine wall panels and flooring in one container when dimensions allow — shared factory QC and one export documentation set.`,
          `Interior wall panel factory output should be staged with similar pre-shipment inspection: surface finish, tongue-groove fit, carton strength and moisture protection.`,
          `Project clients often bundle floor and wall packages — quote container programs holistically to win hotel, apartment and commercial fit-out tenders.`,
        ],
        pk
      )
    );
  }

  sections.push(
    ...sectionBlocks(
      "Importer economics: landed cost and container math",
      [
        `FOB price per sqm is only the starting point. Importers must model ocean freight, insurance, destination port charges, inland delivery, finance cost and expected claim rate before comparing ${sk[1]} quotations.`,
        `A 40HQ container loading 3,500 sqm at optimized carton stacking can reduce per-unit freight by 15–25% versus LCL consolidation — that difference often exceeds a slightly higher FOB from a verified factory.`,
        `Distributors who plan quarterly ${sk[2] || "bulk orders"} align production slots with factory capacity, avoiding peak-season queue jumps that add 10–20 days and disrupt retail promotions.`,
        `Document every container: sqm shipped, SKU mix, claim count, days from PO to warehouse receipt. This dataset becomes your negotiation base for annual ${pk} supply agreements.`,
      ],
      pk
    ),
    ...sectionBlocks(
      "Supplier communication and production visibility",
      [
        `Weekly production updates should include completed sqm, pending QC holds, carton labeling status and estimated loading window — not generic "in progress" emails.`,
        `Importers who receive loading photos, seal numbers and draft BL before departure resolve customs issues faster and give sales teams accurate ETAs.`,
        `When switching from a trading company to factory-direct ${sk[0]}, expect a 1–2 container learning curve on documentation and SKU mapping — savings appear from the third shipment onward.`,
        `Multilingual export teams help Middle East, Africa and Latin America distributors align carton marks, certificates and project specifications without translation delays.`,
      ],
      pk
    ),
    ...sectionBlocks(
      "Scaling procurement without increasing working capital stress",
      [
        `Rotate A/B/C SKUs: A-class items in every container, B-class every other cycle, C-class trial on MOQ-friendly mixed loads.`,
        `Use factory warehouse staging when available to split one production run into two monthly containers — smoother cash outflow than single large PO.`,
        `Retail and project channels have different margin structures; quote landed cost separately so contractor bids do not erode dealer program profitability.`,
        `Annual volume commitments can unlock tiered ${sk[3] || "wholesale flooring price"} if backed by shipment history — factories prioritize partners with predictable container rhythm.`,
      ],
      pk
    )
  );

  if (meta.phase >= 3) {
    sections.push(
      ...sectionBlocks(
        "Case study patterns from global flooring distributors",
        [
          `First container: trial colors, strict QC, conservative SKU count. Repeat orders: locked BOM, mixed-color 40HQ, monthly production slot.`,
          `Africa and Middle East distributors often prioritize waterproof rigid core for hotels and apartments — plan OEM cartons and English/French labels before production.`,
          `Southeast Asia partners may reorder faster — maintain safety stock at factory warehouse for 7–10 day dispatch after PO confirmation when feasible.`,
          `Document each shipment: loading photos, sqm per SKU, claim rate and reorder interval. This data supports supplier negotiations and internal credit approval.`,
        ],
        pk
      )
    );
  }

  sections.push(
    h2("Implementation roadmap for your next order"),
    p(
      `Step 1: Send target sqm, thickness/wear layer matrix and destination port to request ${pk} factory price list. ` +
        `Step 2: Confirm container plan and production window. Step 3: Approve pre-production sample. Step 4: Receive weekly QC updates. Step 5: Review loading photos before BL release.`
    ),
    ul([
      `Request ${sk[1]} quotation with mixed-SKU 40HQ scenario`,
      `Align ${sk[2] || "bulk order"} MOQ with your warehouse capacity`,
      `Schedule inspection 5–7 days before planned loading date`,
      `Lock carton marking and pallet pattern for destination warehouse`,
    ]),
    h2("Conclusion: supplier that understands import economics"),
    p(
      `${t} — the takeaway for professional buyers is simple: choose partners who speak ${pk}, ${sk[0]} and container economics fluently. ` +
        `When factory pricing, production visibility and shipment discipline align, distributors improve margins without pushing retail prices up — and importers gain confidence to scale ${sk[3] || "flooring for contractor supply"} programs. ` +
        `If your current supplier cannot show production, QC and loading evidence on every container, it may be time to request a parallel quotation from a China flooring factory.`
    ),
    richLink(
      "Eshsire Group operates as a ",
      "SPC flooring supplier and China flooring factory",
      "/spc-flooring"
    ),
    richLink("Request ", "factory quotation and container pricing", "/contact"),
    p(
      `Contact our export team for factory price list, 40HQ container quotation and ${sk[2] || "bulk spc flooring order"} pricing. We support distributors who need stable supply chain control — not marketing stories.`
    )
  );

  return sections;
}

export function buildLongFormBlocks(meta, images) {
  const sections = buildSections(meta);
  const blocks = [];
  let imgIdx = 0;
  const sectionImgs = images.sections;
  let sectionCount = 0;

  for (const block of sections) {
    blocks.push(block);
    if (block.type === "h2" && sectionCount < 3 && sectionImgs[sectionCount]) {
      const url = sectionImgs[sectionCount];
      const capIdx = sectionCount + 1;
      blocks.push(
        img(
          url,
          images.alts?.[capIdx] ?? `${meta.primaryKeyword} ${meta.title.slice(0, 40)} image ${sectionCount + 1}`,
          images.captions?.[capIdx] ?? `BJFLOOR factory reference — ${meta.productTag} B2B supply`
        )
      );
      sectionCount++;
    }
  }

  blocks.push(
    img(
      images.ending,
      images.alts?.[4] ?? `${meta.primaryKeyword} container export flooring China`,
      images.captions?.[4] ?? "Export container loading — SPC flooring secured for ocean freight"
    )
  );

  let wc = countBlocksWords(blocks);
  let pad = 0;
  while (wc < 1800 && pad < 20) {
    const kw = meta.secondaryKeywords[pad % meta.secondaryKeywords.length];
    blocks.splice(blocks.length - 1, 0, p(
      `Procurement deep-dive ${pad + 1}: professional buyers evaluating ${kw} alongside ${meta.primaryKeyword} should stress-test quotations with three scenarios — single-SKU full container, mixed-color 40HQ and emergency LCL top-up. ` +
        `For each scenario, record production days, QC hold risk, freight per sqm and expected gross margin after claims allowance. ` +
        `Distributors who run this analysis before signing annual deals avoid the common trap of optimizing FOB while ignoring logistics and inventory carrying cost. ` +
        `Factory partners willing to share extrusion schedule, raw material lead times and loading calendar deserve priority when you scale ${meta.productTag === "vinyl" ? "vinyl flooring wholesale" : meta.productTag === "wall" ? "wall panel programs" : "SPC flooring import"} volume across multiple regions.`
    ));
    wc = countBlocksWords(blocks);
    pad++;
  }

  return { blocks, wordCount: wc };
}

export function buildArticleMeta(meta, images) {
  return {
    ...meta,
    heroImage: images.banner,
    ogImage: images.banner,
  };
}
