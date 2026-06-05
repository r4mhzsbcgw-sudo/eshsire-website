/**
 * Locale-specific template blocks for auto-generated SEO articles.
 * Used when hand-written .zh.ts / .es.ts files do not exist yet.
 */

export function resolveMeta(meta, locale) {
  if (locale === "en") return meta;
  const i18n = meta.i18n?.[locale];
  if (i18n) {
    return {
      ...meta,
      title: i18n.title ?? meta.title,
      metaTitle: i18n.metaTitle ?? meta.metaTitle,
      description: i18n.description ?? meta.description,
      ctaText: i18n.ctaText,
    };
  }
  return meta;
}

const IMG_ALT = {
  production: {
    en: "SPC flooring factory production line China",
    zh: "中国 SPC 地板工厂生产线",
    es: "Línea de producción de suelos SPC en fábrica China",
  },
  loading: {
    en: "SPC flooring container loading 40HQ",
    zh: "SPC 地板 40HQ 整柜装载",
    es: "Carga de contenedor 40HQ suelos SPC",
  },
  quality: {
    en: "SPC flooring QC inspection China factory",
    zh: "中国 SPC 地板工厂 QC 检验",
    es: "Inspección QC suelos SPC fábrica China",
  },
};

export function templateBlocks(slot, meta, locale, IMG) {
  const t = CONTENT[locale]?.[slot] ?? CONTENT.en[slot];
  const intro = {
    type: "p",
    text: t.intro(meta.title),
  };
  const sections = [
    { type: "h2", text: t.h2Supply },
    { type: "p", text: t.pSupply },
    {
      type: "img",
      src: IMG.production,
      alt: IMG_ALT.production[locale] ?? IMG_ALT.production.en,
      caption: t.captionProduction,
    },
    { type: "h2", text: t.h2Pricing },
    { type: "p", text: t.pPricing },
    {
      type: "img",
      src: IMG.loading,
      alt: IMG_ALT.loading[locale] ?? IMG_ALT.loading.en,
      caption: t.captionLoading,
    },
  ];
  if (slot === "afternoon") {
    sections.push({ type: "h3", text: t.h3Cost });
    sections.push({ type: "ul", items: t.costItems });
  }
  if (slot === "evening") {
    sections.push({
      type: "img",
      src: IMG.quality,
      alt: IMG_ALT.quality[locale] ?? IMG_ALT.quality.en,
      caption: t.captionQc,
    });
  }
  return { blocks: [intro, ...sections], ctaText: meta.ctaText ?? t.ctaDefault };
}

const CONTENT = {
  en: {
    morning: {
      intro: (title) =>
        `${title}. This guide is for flooring distributors, contractors and building material importers sourcing from a China SPC flooring factory. We focus on factory pricing, container efficiency and stable bulk supply — not decoration trends.`,
      h2Supply: "Factory supply chain overview",
      pSupply:
        "Direct factory procurement removes trader margin and improves batch consistency. Bulk SPC flooring orders packed for 40HQ containers reduce landed cost per sqm compared with LCL shipments.",
      captionProduction: "SPC flooring production line",
      h2Pricing: "Pricing and procurement logic",
      pPricing:
        "Wholesale flooring price depends on thickness, wear layer, volume and packaging. Request factory price list with target sqm and port for accurate container flooring price quotation.",
      captionLoading: "Container loading for export orders",
      h3Cost: "",
      costItems: [],
      captionQc: "",
      ctaDefault:
        "Contact our export team for factory price list, container quotation and bulk SPC flooring pricing.",
    },
    afternoon: {
      intro: (title) =>
        `${title}. Importers comparing spc flooring price per sqm need to understand how factory FOB quotes differ from trading company margins on bulk container orders.`,
      h2Supply: "How factory pricing is calculated",
      pSupply:
        "Wholesale SPC flooring price breaks down by thickness, wear layer, volume and packaging. Full 40HQ container orders share fixed setup costs across more square meters.",
      captionProduction: "Integrated production lowers middleman cost",
      h2Pricing: "Why bulk container orders cost less per sqm",
      pPricing:
        "A 40HQ container fits roughly 3,000–3,800 sqm. Factory scheduling prioritizes full-container runs, giving distributors better wholesale flooring price than sporadic LCL shipments.",
      captionLoading: "40HQ container loading for export orders",
      h3Cost: "Cost breakdown for importers",
      costItems: [
        "FOB factory price per sqm",
        "OEM carton and label costs",
        "Local trucking to port",
        "Ocean freight and destination charges",
      ],
      captionQc: "",
      ctaDefault:
        "Share target thickness, wear layer and container volume for factory price list and 40HQ quotation within 24 hours.",
    },
    evening: {
      intro: (title) =>
        `${title}. Distributors evaluating an SPC flooring supplier in China need visibility into production QC, warehouse staging and container loading — not only unit price.`,
      h2Supply: "Pre-loading: production and QC",
      pSupply:
        "Every export batch passes inline QC during extrusion and pre-pack inspection before cartons enter warehouse staging. Only released pallets are eligible for container loading.",
      captionProduction: "Production line before export batch release",
      h2Pricing: "Warehouse staging and container planning",
      pPricing:
        "Warehouse teams stack cartons by SKU sequence to match the importer unloading plan. Mixed-color containers load heavier cartons first to reduce shifting during ocean transit.",
      captionLoading: "40HQ container loading process",
      h3Cost: "",
      costItems: [],
      captionQc: "QC before shipment",
      ctaDefault:
        "Planning a 40HQ SPC flooring shipment? Get container quotation, loading schedule and factory price list.",
    },
  },
  zh: {
    morning: {
      intro: (title) =>
        `${title}。本文面向从中国 SPC 地板工厂采购的经销商、承包商和建材进口商，聚焦工厂定价、整柜效率与稳定大货供应——而非装饰趋势。`,
      h2Supply: "工厂供应链概览",
      pSupply:
        "工厂直采可消除贸易中间商加价并提升批次一致性。按 40HQ 整柜打包的大货 SPC 地板订单，到岸每平米成本低于 LCL 散货。",
      captionProduction: "SPC 地板生产线",
      h2Pricing: "定价与采购逻辑",
      pPricing:
        "批发地板价取决于厚度、耐磨层、订单量与包装。提供目标平米与港口信息，索取工厂价目表以获取准确的整柜地板报价。",
      captionLoading: "出口订单整柜装载",
      h3Cost: "",
      costItems: [],
      captionQc: "",
      ctaDefault: "联系出口团队索取工厂价目表、整柜报价及 SPC 地板大货批量价。",
    },
    afternoon: {
      intro: (title) =>
        `${title}。比较 SPC 地板每平米价格的进口商，需了解工厂 FOB 报价与大货整柜订单中贸易公司加价的差异。`,
      h2Supply: "工厂价如何计算",
      pSupply:
        "批发 SPC 地板价格按厚度、耐磨层、订单量与包装分项核算。满装 40HQ 整柜订单将固定准备成本分摊到更多平米。",
      captionProduction: "一体化生产降低中间商成本",
      h2Pricing: "为何大货整柜订单每平米更低",
      pPricing:
        "40HQ 整柜约装 3,000–3,800 平米。工厂优先排产满柜批次，经销商因此获得优于零星 LCL 采购的批发地板价。",
      captionLoading: "出口订单 40HQ 整柜装载",
      h3Cost: "进口商成本构成",
      costItems: [
        "FOB 工厂每平米价",
        "OEM 外箱与标签费用",
        "本地拖柜至港口",
        "海运费与目的港费用",
      ],
      captionQc: "",
      ctaDefault: "提供目标厚度、耐磨层与整柜方量，24 小时内回复工厂价目表与 40HQ 报价。",
    },
    evening: {
      intro: (title) =>
        `${title}。评估中国 SPC 地板供应商的经销商，需了解生产 QC、仓库备货与整柜装柜流程——不仅看单价。`,
      h2Supply: "装柜前：生产与 QC",
      pSupply:
        "每批出口货物在挤出环节在线 QC，装箱前再次检验后进入仓库备货。仅放行合格托盘方可装柜。",
      captionProduction: "出口批次放行前的生产线",
      h2Pricing: "仓库备货与整柜规划",
      pPricing:
        "仓库按 SKU 顺序堆码，匹配进口商卸货计划。混色整柜先装重箱在柜底，减少海运移位。",
      captionLoading: "40HQ 整柜装载流程",
      h3Cost: "",
      costItems: [],
      captionQc: "发货前 QC 检验",
      ctaDefault: "计划 40HQ SPC 地板出货？索取整柜报价、装柜排期与工厂价目表。",
    },
  },
  es: {
    morning: {
      intro: (title) =>
        `${title}. Esta guía es para distribuidores de suelos, contratistas e importadores de materiales de construcción que compran a una fábrica de suelos SPC en China. Nos centramos en precio de fábrica, eficiencia de contenedor y suministro estable a granel — no en tendencias decorativas.`,
      h2Supply: "Panorama de la cadena de suministro de fábrica",
      pSupply:
        "La compra directa a fábrica elimina el margen del trader y mejora la consistencia de lote. Los pedidos a granel de suelos SPC en contenedor 40HQ reducen el coste de llegada por m² frente a envíos LCL.",
      captionProduction: "Línea de producción de suelos SPC",
      h2Pricing: "Lógica de precios y compra",
      pPricing:
        "El precio mayorista depende de grosor, capa de desgaste, volumen y embalaje. Solicite lista de precios de fábrica con m² objetivo y puerto para una cotización precisa de suelo en contenedor.",
      captionLoading: "Carga de contenedor para pedidos de exportación",
      h3Cost: "",
      costItems: [],
      captionQc: "",
      ctaDefault:
        "Contacte a nuestro equipo de exportación para lista de precios de fábrica, cotización de contenedor y precios mayoristas SPC.",
    },
    afternoon: {
      intro: (title) =>
        `${title}. Los importadores que comparan precio SPC por m² deben entender cómo las cotizaciones FOB de fábrica difieren de los márgenes de trading companies en pedidos a granel en contenedor.`,
      h2Supply: "Cómo se calcula el precio de fábrica",
      pSupply:
        "El precio mayorista SPC se desglosa por grosor, capa de desgaste, volumen y embalaje. Los pedidos de contenedor 40HQ completo reparten costes fijos de preparación entre más metros cuadrados.",
      captionProduction: "Producción integrada reduce coste de intermediarios",
      h2Pricing: "Por qué los pedidos a granel en contenedor cuestan menos por m²",
      pPricing:
        "Un contenedor 40HQ admite aproximadamente 3.000–3.800 m². La fábrica prioriza lotes de contenedor completo, ofreciendo mejor precio mayorista que envíos LCL esporádicos.",
      captionLoading: "Carga en contenedor 40HQ para exportación",
      h3Cost: "Desglose de costes para importadores",
      costItems: [
        "Precio FOB de fábrica por m²",
        "Costes de cartón y etiqueta OEM",
        "Transporte local al puerto",
        "Flete marítimo y cargos en destino",
      ],
      captionQc: "",
      ctaDefault:
        "Indique grosor, capa de desgaste y volumen de contenedor para lista de precios y cotización 40HQ en 24 horas.",
    },
    evening: {
      intro: (title) =>
        `${title}. Los distribuidores que evalúan un proveedor de suelos SPC en China necesitan visibilidad de QC de producción, preparación en almacén y carga de contenedor — no solo precio unitario.`,
      h2Supply: "Pre-carga: producción y QC",
      pSupply:
        "Cada lote de exportación pasa QC en línea durante extrusión e inspección pre-embalaje antes del almacén. Solo pallets liberados son elegibles para carga en contenedor.",
      captionProduction: "Línea de producción antes de liberar lote de exportación",
      h2Pricing: "Preparación en almacén y planificación de contenedor",
      pPricing:
        "Los equipos apilan cartones por secuencia SKU según el plan de descarga del importador. En contenedores multicolor, los cartones más pesados cargan primero para reducir movimiento en tránsito.",
      captionLoading: "Proceso de carga en contenedor 40HQ",
      h3Cost: "",
      costItems: [],
      captionQc: "QC antes del envío",
      ctaDefault:
        "¿Planifica un envío 40HQ de suelos SPC? Obtenga cotización de contenedor, calendario de carga y lista de precios de fábrica.",
    },
  },
};
