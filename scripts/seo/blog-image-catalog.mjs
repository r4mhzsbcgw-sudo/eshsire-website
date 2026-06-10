/**
 * Eshsire Group blog image catalog 鈥?editorial + V2 floor/wall libraries.
 */
import { editorialSrc } from "./blog-editorial-sources.mjs";
import { selectBlogImagesV2 } from "./blog-image-engine.mjs";
import { BLOG_IMAGE_PREFIXES } from "./blog-image-libraries.mjs";
import { classifyTopic, topicImageCategory } from "./topic-classifier.mjs";

export const BLOG_IMAGE_PREFIX = "/images/blog/editorial/";

/** @type {Record<string, { src: string, altEn: string }>} */
export const IMAGE_ASSETS = {
  factoryProduction: {
    src: editorialSrc("factoryProduction"),
    altEn: "Industrial factory floor with automated production machinery",
  },
  productionLine: {
    src: editorialSrc("productionLine"),
    altEn: "Factory operator at industrial machinery on the production line",
  },
  qcInline: {
    src: editorialSrc("qcInline"),
    altEn: "Production quality station on the manufacturing floor",
  },
  warehouseStock: {
    src: editorialSrc("warehouseStock"),
    altEn: "Warehouse pallet racks with stacked cartons ready for dispatch",
  },
  warehouseAisle: {
    src: editorialSrc("warehouseAisle"),
    altEn: "Warehouse inventory aisle 鈥?finished goods staging area",
  },
  containerExport: {
    src: editorialSrc("containerExport"),
    altEn: "Shipping containers at port 鈥?ocean freight in landed-cost planning",
  },
  containerLoading: {
    src: editorialSrc("containerLoading"),
    altEn: "Distribution center floor 鈥?pallet build-up before container loading",
  },
  forkliftLoading: {
    src: editorialSrc("forkliftLoading"),
    altEn: "Freight yard with cargo handling 鈥?pre-export logistics stage",
  },
  commercialShowroom: {
    src: editorialSrc("commercialShowroom"),
    altEn: "Hotel commercial interior 鈥?reference for hospitality flooring projects",
  },
  productRange: {
    src: editorialSrc("productRange"),
    altEn: "Modern office interior 鈥?commercial traffic and wear-layer planning",
  },
  scratchTest: {
    src: editorialSrc("scratchTest"),
    altEn: "Residential wood-look flooring installation 鈥?SKU selection reference",
  },
  stainTest: {
    src: editorialSrc("stainTest"),
    altEn: "Contemporary interior with hard-surface flooring 鈥?project visual reference",
  },
  brandOverview: {
    src: editorialSrc("brandOverview"),
    altEn: "Interior design showroom 鈥?color and texture specification for buyers",
  },
};

/** @type {Record<string, Record<string, string>>} */
export const CAPTIONS = {
  factoryProduction: {
    en: "Industrial manufacturing floor 鈥?use this reference when auditing real production capacity and line count",
    zh: "宸ヤ笟鐢熶骇杞﹂棿鍙傝€冨浘 鈥?鐢ㄤ簬璇勪及宸ュ巶瀹為檯浜ц兘涓庣敓浜х嚎鏁伴噺",
    es: "Planta de fabricaci贸n industrial 鈥?referencia para auditar capacidad real de producci贸n",
    de: "Industrielle Fertigungshalle 鈥?Referenz zur Pr眉fung der tats盲chlichen Produktionskapazit盲t",
    fr: "Atelier de fabrication industrielle 鈥?r茅f茅rence pour auditer la capacit茅 de production",
    ar: "賵乇卮丞 鬲氐賳賷毓 氐賳丕毓賷丞 鈥?賲乇噩毓 賱鬲丿賯賷賯 丕賱賯丿乇丞 丕賱廿賳鬲丕噩賷丞 丕賱賮毓賱賷丞",
    ru: "袩褉芯屑褘褕谢械薪薪褘泄 褑械褏 鈥?芯褉懈械薪褌懈褉 锌褉懈 邪褍写懈褌械 褉械邪谢褜薪芯泄 锌褉芯懈蟹胁芯写褋褌胁械薪薪芯泄 屑芯褖薪芯褋褌懈",
  },
  productionLine: {
    en: "Operator at production machinery 鈥?verify in-person that lines are running during factory visits",
    zh: "鐢熶骇绾胯澶囨搷浣?鈥?楠屽巶鏃剁‘璁よ澶囩湡瀹炶繍琛岃€岄潪浠呭睍绀烘牱鍝侀棿",
    es: "Operario en maquinaria de producci贸n 鈥?confirme en visita que las l铆neas est谩n activas",
    de: "Bedienpersonal an Produktionsmaschinen 鈥?bei Werksbesuch laufende Linien verifizieren",
    fr: "Op茅rateur sur ligne de production 鈥?v茅rifier en usine que les lignes tournent r茅ellement",
    ar: "賲卮睾賾賱 毓賱賶 禺胤 丕賱廿賳鬲丕噩 鈥?鬲丨賯賯 兀孬賳丕亍 夭賷丕乇丞 丕賱賲氐賳毓 賲賳 鬲卮睾賷賱 丕賱賲毓丿丕鬲 賮毓賱賷丕賸",
    ru: "袨锌械褉邪褌芯褉 薪邪 锌褉芯懈蟹胁芯写褋褌胁械薪薪芯泄 谢懈薪懈懈 鈥?锌褉懈 胁懈蟹懈褌械 薪邪 蟹邪胁芯写 锌褉芯胁械褉褜褌械 褉邪斜芯褌褍 谢懈薪懈泄",
  },
  qcInline: {
    en: "On-floor quality station — importers should request QC checklist tied to each production batch",
    zh: "车间质检工位 — 进口商应要求每批次对应 QC 清单与抽检记录",
    es: "Estacion de calidad en planta — solicite checklist QC vinculado a cada lote",
    de: "QC-Station in der Halle — Checkliste je Produktionscharge anfordern",
    fr: "Poste qualite en atelier — exiger une checklist QC par lot de production",
    ar: "QC station on production floor",
    ru: "QC station on production floor",
  },
  warehouseStock: {
    en: "Pallet-rack warehouse — finished cartons staged before weight-based container loading",
    zh: "托盘式仓库 — 成品纸箱在整柜装运前的备货阶段",
    es: "Almacen con estanterias — cartones terminados antes de la carga del contenedor",
    de: "Palettenregal-Lager — fertige Kartons vor gewichtsbasierter Containerbeladung",
    fr: "Entrepot a rayonnages — cartons finis avant chargement conteneur",
    ar: "Warehouse pallet racks before container loading",
    ru: "Warehouse pallet racks before container loading",
  },
  warehouseAisle: {
    en: "Inventory aisle — distributors model warehouse carrying cost alongside FOB price",
    zh: "仓库通道库存 — 经销商应将仓储占用成本与 FOB 价一并测算",
    es: "Pasillo de inventario — modele coste de almacen junto al precio FOB",
    de: "Lagerstrasse — Lagerkosten zusammen mit FOB-Preis kalkulieren",
    fr: "Allee de stock — modeliser le cout d entrepot avec le prix FOB",
    ar: "Warehouse inventory aisle",
    ru: "Warehouse inventory aisle",
  },
  containerExport: {
    en: "Port container yard — ocean freight is a major variable in landed cost per sqm",
    zh: "港口集装箱堆场 — 海运费是到岸每平方米成本的重要变量",
    es: "Patio portuario — el flete maritimo impacta el coste por m2",
    de: "Containerhof im Hafen — Seefracht ist zentral fuer Landed Cost pro m2",
    fr: "Parc a conteneurs portuaire — le fret maritime pese sur le cout rendu",
    ar: "Port container yard for ocean freight planning",
    ru: "Port container yard for ocean freight planning",
  },
  containerLoading: {
    en: "Distribution center staging — mixed-SKU pallet build-up before seal and BL release",
    zh: "配送中心备货 — 混色 SKU 托盘组托、封柜与提单签发前的最后环节",
    es: "Centro de distribucion — preparacion de palets mixtos antes del precinto y BL",
    de: "Distribution Center — gemischte SKU-Paletten vor Versiegelung und BL",
    fr: "Centre de distribution — palettes SKU mixtes avant scelle et BL",
    ar: "Distribution center staging before container seal",
    ru: "Distribution center staging before container seal",
  },
  forkliftLoading: {
    en: "Freight yard handling 鈥?yard-to-port timing affects export documentation cut-offs",
    zh: "璐у満鎼繍浣滀笟 鈥?鍘傚尯鑷虫腐鍙ｇ殑琛旀帴褰卞搷鍑哄彛鍗曡瘉鎴叧鏃堕棿",
    es: "Manipulaci贸n en patio de carga 鈥?el traslado a puerto afecta cut-off documental",
    de: "Frachtumschlag 鈥?Werksgel盲nde-zum-Hafen-Timing beeinflusst Cut-off",
    fr: "Manutention en cour de fret 鈥?timing vers le port et cut-off documentaire",
    ar: "賲賳丕賵賱丞 賮賷 爻丕丨丞 丕賱卮丨賳 鈥?鬲賵賯賷鬲 丕賱賳賯賱 廿賱賶 丕賱賲賷賳丕亍 賷丐孬乇 毓賱賶 廿睾賱丕賯 丕賱賲爻鬲賳丿丕鬲",
    ru: "袩芯谐褉褍蟹泻邪 薪邪 谐褉褍蟹芯胁芯屑 写胁芯褉械 鈥?褋褉芯泻 写芯褋褌邪胁泻懈 薪邪 锌芯褉褌 胁谢懈褟械褌 薪邪 cut-off 写芯泻褍屑械薪褌芯胁",
  },
  commercialShowroom: {
    en: "Hospitality interior reference 鈥?hotel and serviced-apartment projects need higher wear-layer specs",
    zh: "閰掑簵鍟嗕笟绌洪棿鍙傝€?鈥?閰掑簵涓庢湇鍔″紡鍏瘬椤圭洰闇€鏇撮珮 wear layer 瑙勬牸",
    es: "Referencia hotelera 鈥?proyectos hoteleros requieren mayor capa de desgaste",
    de: "Hotel-Interior-Referenz 鈥?Hospitality-Projekte brauchen h枚here Nutzschicht",
    fr: "R茅f茅rence h么teli猫re 鈥?projets hospitality exigent couche d'usure plus 茅paisse",
    ar: "賲乇噩毓 囟賷丕賮丞 鈥?賲卮丕乇賷毓 丕賱賮賳丕丿賯 鬲丨鬲丕噩 胤亘賯丞 鬲丌賰賱 兀毓賱賶",
    ru: "袠薪褌械褉褜械褉 芯褌械谢褟 鈥?写谢褟 hospitality 薪褍卸械薪 斜芯谢械械 褌芯谢褋褌褘泄 懈蟹薪芯褋薪褘泄 褋谢芯泄",
  },
  productRange: {
    en: "Commercial office traffic class 鈥?map wear layer and thickness to daily footfall before SKU lock",
    zh: "鍟嗕笟鍔炲叕浜烘祦绛夌骇 鈥?閿佸畾 SKU 鍓嶆寜鏃ヤ汉娴侀噺鍖归厤鑰愮（灞備笌鍘氬害",
    es: "Tr谩fico de oficina comercial 鈥?vincule capa de desgaste al flujo diario antes del SKU",
    de: "Gewerblicher B眉roverkehr 鈥?Nutzschicht vor SKU-Fixierung zum Fu脽verkehr passen",
    fr: "Trafic bureau commercial 鈥?adapter couche d'usure 脿 l'affluence avant fixation SKU",
    ar: "丨乇賰丞 賲乇賵乇 賲賰鬲亘賷丞 鈥?丕乇亘胤 胤亘賯丞 丕賱鬲丌賰賱 亘賰孬丕賮丞 丕賱賲卮丕丞 賯亘賱 鬲孬亘賷鬲 SKU",
    ru: "袨褎懈褋薪褘泄 泻芯屑屑械褉褔械褋泻懈泄 褌褉邪褎懈泻 鈥?锌芯写斜械褉懈褌械 懈蟹薪芯褋薪褘泄 褋谢芯泄 写芯 褎懈泻褋邪褑懈懈 SKU",
  },
  scratchTest: {
    en: "Installed wood-look surface 鈥?compare wear-layer mil rating against your market callback history",
    zh: "宸插畨瑁呮湪绾归潰 鈥?瀵圭収鐩爣甯傚満鍘嗗彶瀹㈣瘔鐜囪瘎浼拌€愮（灞?mil 绛夌骇",
    es: "Superficie instalada 鈥?compare mil de desgaste con historial de reclamaciones",
    de: "Verlegte Holzoptik 鈥?Mil-Rating mit Reklamationshistorie vergleichen",
    fr: "Surface pos茅e 鈥?comparer le mil d'usure 脿 l'historique de SAV",
    ar: "爻胤丨 賲乇賰賾亘 鈥?賯丕乇賳 mil 胤亘賯丞 丕賱鬲丌賰賱 賲毓 爻噩賱 丕賱卮賰丕賵賶",
    ru: "校谢芯卸械薪薪芯械 锌芯泻褉褘褌懈械 鈥?褋褉邪胁薪懈褌械 mil 懈蟹薪芯褋薪芯谐芯 褋谢芯褟 褋 懈褋褌芯褉懈械泄 褉械泻谢邪屑邪褑懈泄",
  },
  stainTest: {
    en: "Modern hard-surface interior 鈥?stain and scratch performance matters for F&B adjacent zones",
    zh: "鐜颁唬纭潰瀹ゅ唴绌洪棿 鈥?閭昏繎椁愰ギ鍖哄煙闇€閲嶇偣璇勪及鑰愭薄涓庤€愬埉鎬ц兘",
    es: "Interior de superficie dura 鈥?resistencia a manchas cerca de zonas F&B",
    de: "Harte Bodenfl盲che 鈥?Fleckenbest盲ndigkeit nahe Gastronomiebereichen pr眉fen",
    fr: "Int茅rieur surface dure 鈥?performance taches pr猫s des zones restauration",
    ar: "丿丕禺賱賷丞 爻胤丨 氐賱亘 鈥?賲賯丕賵賲丞 丕賱亘賯毓 賯乇亘 賲賳丕胤賯 丕賱賲胤丕毓賲",
    ru: "袠薪褌械褉褜械褉 褋 褌胁褢褉写褘屑 锌芯泻褉褘褌懈em 鈥?褋褌芯泄泻芯褋褌褜 泻 锌褟褌薪邪屑 褍 蟹芯薪 芯斜褖械锌懈褌邪",
  },
  brandOverview: {
    en: "Showroom color board 鈥?lock SKU list and container CBM plan before issuing purchase order",
    zh: "灞曞巺鑹叉澘鍙傝€?鈥?涓?PO 鍓嶉攣瀹?SKU 娓呭崟涓庢暣鏌?CBM 鏂规",
    es: "Muestrario de color 鈥?fije SKU y plan CBM del contenedor antes del PO",
    de: "Showroom-Farbmuster 鈥?SKU-Liste und Container-CBM vor PO festlegen",
    fr: "Nuancier showroom 鈥?verrouiller SKU et CBM conteneur avant PO",
    ar: "賱賵丨丞 兀賱賵丕賳 丕賱毓乇囟 鈥?孬亘賾鬲 SKU 賵禺胤丞 CBM 賯亘賱 兀賲乇 丕賱卮乇丕亍",
    ru: "楔芯褍褉褍屑 芯斜褉邪蟹褑芯胁 鈥?蟹邪褎懈泻褋懈褉褍泄褌械 SKU 懈 CBM 泻芯薪褌械泄薪械褉邪 写芯 PO",
  },
};

export const ARTICLE_IMAGE_SETS = {
  "what-is-spc-flooring-commercial-projects": {
    hero: "productRange",
    sections: ["factoryProduction", "commercialShowroom", "qcInline"],
    ending: "containerExport",
  },
  "spc-flooring-factory-price-bulk-container-orders": {
    hero: "factoryProduction",
    sections: ["productionLine", "qcInline", "warehouseStock"],
    ending: "containerExport",
  },
  "load-40hq-container-spc-flooring-export": {
    hero: "containerExport",
    sections: ["warehouseStock", "containerLoading", "forkliftLoading"],
    ending: "warehouseAisle",
  },
  "spc-flooring-supply-hotel-project-africa": {
    hero: "commercialShowroom",
    sections: ["productRange", "warehouseStock", "containerExport"],
    ending: "forkliftLoading",
  },
  "choose-reliable-supplier": {
    hero: "brandOverview",
    sections: ["factoryProduction", "qcInline", "warehouseStock"],
    ending: "containerExport",
  },
  "seven-mistakes": {
    hero: "brandOverview",
    sections: ["scratchTest", "warehouseAisle", "stainTest"],
    ending: "containerLoading",
  },
  "spc-supplier-manufacturer": {
    hero: "factoryProduction",
    sections: ["productionLine", "qcInline", "warehouseStock"],
    ending: "forkliftLoading",
  },
};

export function getCaption(themeKey, locale = "en") {
  const c = CAPTIONS[themeKey];
  if (!c) return CAPTIONS.factoryProduction.en;
  return c[locale] ?? c.en;
}

export function getAsset(themeKey) {
  return IMAGE_ASSETS[themeKey] ?? IMAGE_ASSETS.factoryProduction;
}

export function getAlt(themeKey, keyword = "SPC flooring") {
  const a = getAsset(themeKey);
  return `${keyword} 鈥?${a.altEn}`;
}

export function resolveArticleKey(filePath) {
  const base = filePath.replace(/\\/g, "/").split("/").pop() ?? "";
  const name = base.replace(/\.(en|zh|es|de|fr|ar|ru|pt|it|nl|pl|tr|ja|ko|vi|th|id|he)\.ts$/, "");
  if (ARTICLE_IMAGE_SETS[name]) return name;
  for (const slug of Object.keys(ARTICLE_IMAGE_SETS)) {
    if (name.startsWith(slug) || name === slug) return slug;
  }
  const slugMatch = base.match(/^([^.]+)\./);
  return slugMatch?.[1] ?? name;
}

export function resolveLocale(filePath) {
  const m = filePath.match(/\.(en|zh|es|de|fr|ar|ru|pt|it|nl|pl|tr|ja|ko|vi|th|id|he)\.ts$/);
  return m?.[1] ?? "en";
}

export function selectImagesForArticle(articleKey, locale = "en", primaryKeyword = "SPC flooring", topic = {}) {
  const topicType = topic.topicType ?? classifyTopic(topic.title ?? "");
  const useEditorial = ["logistics", "quality", "factory", "inventory", "distributor", "supplier", "risk"].includes(
    topicType
  );

  if (useEditorial) {
    const editorial = selectEditorialImagesByCategory(topic, locale, primaryKeyword, topic.globalUsed ?? new Set());
    if (editorial) return editorial;
  }

  const v2 = selectBlogImagesV2(
    { ...topic, slug: articleKey, primaryKeyword, productTag: topic.productTag ?? "spc" },
    locale,
    topic.globalUsed ?? new Set()
  );
  return {
    banner: v2.banner,
    sections: v2.sections,
    ending: v2.ending,
    imageType: v2.imageType,
    imageCount: v2.imageCount,
    meta: v2.meta,
  };
}

const EDITORIAL_THEME_KEYS = {
  logistics: ["containerExport", "warehouseStock", "containerLoading", "forkliftLoading", "warehouseAisle"],
  warehouse: ["warehouseStock", "warehouseAisle", "containerLoading", "forkliftLoading"],
  factory: ["factoryProduction", "productionLine", "qcInline", "warehouseStock"],
  qc: ["qcInline", "factoryProduction", "warehouseStock", "warehouseAisle"],
  project: ["commercialShowroom", "productRange", "brandOverview", "warehouseStock"],
  distributor: ["brandOverview", "warehouseAisle", "productRange", "warehouseStock"],
};

function selectEditorialImagesByCategory(topic, locale, primaryKeyword, globalUsed) {
  const topicType = topic.topicType ?? classifyTopic(topic.title ?? "");
  const category = topicImageCategory(topicType, topic.slot ?? "morning");
  let keys = EDITORIAL_THEME_KEYS[category] ?? EDITORIAL_THEME_KEYS.factory;
  const title = (topic.title ?? "").toLowerCase();
  if (/mix.*wall|wall panel.*shipment|mixed.*container/i.test(title)) {
    keys = ["warehouseStock", "containerExport", "containerLoading", "forkliftLoading", "warehouseAisle"];
  }

  const usedInArticle = new Set();
  const assets = [];
  for (const key of keys) {
    const asset = getAsset(key);
    if (usedInArticle.has(asset.src)) continue;
    if (globalUsed.has(asset.src) && assets.length < keys.length - 2) continue;
    usedInArticle.add(asset.src);
    assets.push({ key, ...asset });
    if (assets.length >= 5) break;
  }
  for (const key of keys) {
    if (assets.length >= 4) break;
    const asset = getAsset(key);
    if (usedInArticle.has(asset.src)) continue;
    usedInArticle.add(asset.src);
    assets.push({ key, ...asset });
  }
  if (assets.length < 3) return null;

  const banner = assets[0];
  const ending = assets[assets.length - 1];
  const middle = assets.slice(1, -1);
  const urls = [banner.src, ...middle.map((a) => a.src), ending.src];
  const allAssets = [banner, ...middle, ending];

  return {
    banner: urls[0],
    sections: urls.slice(1, -1),
    ending: urls[urls.length - 1],
    imageType: "EDITORIAL",
    imageCount: urls.length,
    meta: {
      themes: allAssets.map((a) => a.key),
      captions: allAssets.map((a) => getCaption(a.key, locale)),
      alts: allAssets.map((a) => `${primaryKeyword} — ${a.altEn}`),
      sourceUrls: urls,
      reasoning: allAssets.map((a, i) => ({ role: i === 0 ? "banner" : "section", key: a.key, reason: "editorial_topic_match" })),
    },
  };
}

export function localPoolForCategory(category) {
  const map = {
    logistics: ["containerExport", "containerLoading", "forkliftLoading", "warehouseStock"],
    warehouse: ["warehouseStock", "warehouseAisle", "containerLoading"],
    factory: ["factoryProduction", "productionLine", "qcInline"],
    qc: ["qcInline", "scratchTest", "stainTest"],
    project: ["commercialShowroom", "productRange", "brandOverview"],
    distributor: ["brandOverview", "productRange", "commercialShowroom"],
  };
  const keys = map[category] ?? map.factory;
  return keys.map((k) => getAsset(k).src);
}

export function isRemoteImageUrl(url) {
  return typeof url === "string" && url.startsWith("http");
}

export function isAllowedBlogImageUrl(url) {
  return typeof url === "string" && BLOG_IMAGE_PREFIXES.some((p) => url.startsWith(p));
}
