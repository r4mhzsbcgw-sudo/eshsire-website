/**
 * BJFLOOR blog image catalog — blog-only editorial assets under /images/blog/editorial/.
 * Does NOT reuse homepage, factory page, or legacy blog image folders.
 */
import { editorialSrc } from "./blog-editorial-sources.mjs";

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
    altEn: "Warehouse inventory aisle — finished goods staging area",
  },
  containerExport: {
    src: editorialSrc("containerExport"),
    altEn: "Shipping containers at port — ocean freight in landed-cost planning",
  },
  containerLoading: {
    src: editorialSrc("containerLoading"),
    altEn: "Distribution center floor — pallet build-up before container loading",
  },
  forkliftLoading: {
    src: editorialSrc("forkliftLoading"),
    altEn: "Freight yard with cargo handling — pre-export logistics stage",
  },
  commercialShowroom: {
    src: editorialSrc("commercialShowroom"),
    altEn: "Hotel commercial interior — reference for hospitality flooring projects",
  },
  productRange: {
    src: editorialSrc("productRange"),
    altEn: "Modern office interior — commercial traffic and wear-layer planning",
  },
  scratchTest: {
    src: editorialSrc("scratchTest"),
    altEn: "Residential wood-look flooring installation — SKU selection reference",
  },
  stainTest: {
    src: editorialSrc("stainTest"),
    altEn: "Contemporary interior with hard-surface flooring — project visual reference",
  },
  brandOverview: {
    src: editorialSrc("brandOverview"),
    altEn: "Interior design showroom — color and texture specification for buyers",
  },
};

/** @type {Record<string, Record<string, string>>} */
export const CAPTIONS = {
  factoryProduction: {
    en: "Industrial manufacturing floor — use this reference when auditing real production capacity and line count",
    zh: "工业生产车间参考图 — 用于评估工厂实际产能与生产线数量",
    es: "Planta de fabricación industrial — referencia para auditar capacidad real de producción",
    de: "Industrielle Fertigungshalle — Referenz zur Prüfung der tatsächlichen Produktionskapazität",
    fr: "Atelier de fabrication industrielle — référence pour auditer la capacité de production",
    ar: "ورشة تصنيع صناعية — مرجع لتدقيق القدرة الإنتاجية الفعلية",
    ru: "Промышленный цех — ориентир при аудите реальной производственной мощности",
  },
  productionLine: {
    en: "Operator at production machinery — verify in-person that lines are running during factory visits",
    zh: "生产线设备操作 — 验厂时确认设备真实运行而非仅展示样品间",
    es: "Operario en maquinaria de producción — confirme en visita que las líneas están activas",
    de: "Bedienpersonal an Produktionsmaschinen — bei Werksbesuch laufende Linien verifizieren",
    fr: "Opérateur sur ligne de production — vérifier en usine que les lignes tournent réellement",
    ar: "مشغّل على خط الإنتاج — تحقق أثناء زيارة المصنع من تشغيل المعدات فعلياً",
    ru: "Оператор на производственной линии — при визите на завод проверьте работу линий",
  },
  qcInline: {
    en: "On-floor quality station — importers should request QC checklist tied to each production batch",
    zh: "车间质检工位 — 进口商应要求每批次对应 QC 清单与抽检记录",
    es: "Estación de calidad en planta — solicite checklist QC vinculado a cada lote",
    de: "QC-Station in der Halle — Checkliste je Produktionscharge anfordern",
    fr: "Poste qualité en atelier — exiger une checklist QC par lot de production",
    ar: "محطة جودة في الورشة — اطلب قائمة QC مرتبطة بكل دفعة إنتاج",
    ru: "Пост контроля качества в цехе — запрашивайте QC-чеклист для каждой партии",
  },
  warehouseStock: {
    en: "Pallet-rack warehouse — finished cartons staged before 40HQ container loading",
    zh: "托盘式仓库 — 成品纸箱在整柜装运前的备货阶段",
    es: "Almacén con estanterías — cartones terminados antes de la carga del contenedor 40HQ",
    de: "Palettenregal-Lager — fertige Kartons vor 40HQ-Containerbeladung",
    fr: "Entrepôt à rayonnages — cartons finis avant chargement conteneur 40HQ",
    ar: "مستودع برفوف — كراتين جاهزة قبل تحميل حاوية 40HQ",
    ru: "Склад с паллетными стеллажами — готовые коробки перед погрузкой 40HQ",
  },
  warehouseAisle: {
    en: "Inventory aisle — distributors model warehouse carrying cost alongside FOB price",
    zh: "仓库通道库存 — 经销商应将仓储占用成本与 FOB 价一并测算",
    es: "Pasillo de inventario — modele coste de almacén junto al precio FOB",
    de: "Lagerstraße — Lagerkosten zusammen mit FOB-Preis kalkulieren",
    fr: "Allée de stock — modéliser le coût d'entrepôt avec le prix FOB",
    ar: "ممر المخزون — احسب تكلفة التخزين مع سعر FOB",
    ru: "Складской проход — учитывайте стоимость хранения вместе с FOB",
  },
  containerExport: {
    en: "Port container yard — ocean freight is a major variable in landed cost per sqm",
    zh: "港口集装箱堆场 — 海运费是到岸每平米成本的重要变量",
    es: "Patio de contenedores portuario — el flete marítimo impacta el coste por m²",
    de: "Containerhof im Hafen — Seefracht ist zentral für Landed Cost pro m²",
    fr: "Parc à conteneurs portuaire — le fret maritime pèse sur le coût rendu au m²",
    ar: "ساحة حاويات الميناء — الشحن البحري عامل رئيسي في التكلفة لكل م²",
    ru: "Контейнерная площадка порта — морфрахт существенно влияет на себестоимость м²",
  },
  containerLoading: {
    en: "Distribution center staging — mixed-SKU pallet build-up before seal and BL release",
    zh: "配送中心备货 — 混色 SKU 托盘组柜、封柜与提单签发前的最后环节",
    es: "Centro de distribución — preparación de palés mixtos antes del precinto y BL",
    de: "Distribution Center — gemischte SKU-Paletten vor Versiegelung und BL",
    fr: "Centre de distribution — palettes SKU mixtes avant scellé et BL",
    ar: "مركز توزيع — تجهيز منصات SKU مختلطة قبل الختم وإصدار BL",
    ru: "Распределительный центр — сбор смешанных паллет перед опломбированием",
  },
  forkliftLoading: {
    en: "Freight yard handling — yard-to-port timing affects export documentation cut-offs",
    zh: "货场搬运作业 — 厂区至港口的衔接影响出口单证截关时间",
    es: "Manipulación en patio de carga — el traslado a puerto afecta cut-off documental",
    de: "Frachtumschlag — Werksgelände-zum-Hafen-Timing beeinflusst Cut-off",
    fr: "Manutention en cour de fret — timing vers le port et cut-off documentaire",
    ar: "مناولة في ساحة الشحن — توقيت النقل إلى الميناء يؤثر على إغلاق المستندات",
    ru: "Погрузка на грузовом дворе — срок доставки на порт влияет на cut-off документов",
  },
  commercialShowroom: {
    en: "Hospitality interior reference — hotel and serviced-apartment projects need higher wear-layer specs",
    zh: "酒店商业空间参考 — 酒店与服务式公寓项目需更高 wear layer 规格",
    es: "Referencia hotelera — proyectos hoteleros requieren mayor capa de desgaste",
    de: "Hotel-Interior-Referenz — Hospitality-Projekte brauchen höhere Nutzschicht",
    fr: "Référence hôtelière — projets hospitality exigent couche d'usure plus épaisse",
    ar: "مرجع ضيافة — مشاريع الفنادق تحتاج طبقة تآكل أعلى",
    ru: "Интерьер отеля — для hospitality нужен более толстый износный слой",
  },
  productRange: {
    en: "Commercial office traffic class — map wear layer and thickness to daily footfall before SKU lock",
    zh: "商业办公人流等级 — 锁定 SKU 前按日人流量匹配耐磨层与厚度",
    es: "Tráfico de oficina comercial — vincule capa de desgaste al flujo diario antes del SKU",
    de: "Gewerblicher Büroverkehr — Nutzschicht vor SKU-Fixierung zum Fußverkehr passen",
    fr: "Trafic bureau commercial — adapter couche d'usure à l'affluence avant fixation SKU",
    ar: "حركة مرور مكتبية — اربط طبقة التآكل بكثافة المشاة قبل تثبيت SKU",
    ru: "Офисный коммерческий трафик — подберите износный слой до фиксации SKU",
  },
  scratchTest: {
    en: "Installed wood-look surface — compare wear-layer mil rating against your market callback history",
    zh: "已安装木纹面 — 对照目标市场历史客诉率评估耐磨层 mil 等级",
    es: "Superficie instalada — compare mil de desgaste con historial de reclamaciones",
    de: "Verlegte Holzoptik — Mil-Rating mit Reklamationshistorie vergleichen",
    fr: "Surface posée — comparer le mil d'usure à l'historique de SAV",
    ar: "سطح مركّب — قارن mil طبقة التآكل مع سجل الشكاوى",
    ru: "Уложенное покрытие — сравните mil износного слоя с историей рекламаций",
  },
  stainTest: {
    en: "Modern hard-surface interior — stain and scratch performance matters for F&B adjacent zones",
    zh: "现代硬面室内空间 — 邻近餐饮区域需重点评估耐污与耐刮性能",
    es: "Interior de superficie dura — resistencia a manchas cerca de zonas F&B",
    de: "Harte Bodenfläche — Fleckenbeständigkeit nahe Gastronomiebereichen prüfen",
    fr: "Intérieur surface dure — performance taches près des zones restauration",
    ar: "داخلية سطح صلب — مقاومة البقع قرب مناطق المطاعم",
    ru: "Интерьер с твёрдым покрытиem — стойкость к пятнам у зон общепита",
  },
  brandOverview: {
    en: "Showroom color board — lock SKU list and container CBM plan before issuing purchase order",
    zh: "展厅色板参考 — 下 PO 前锁定 SKU 清单与整柜 CBM 方案",
    es: "Muestrario de color — fije SKU y plan CBM del contenedor antes del PO",
    de: "Showroom-Farbmuster — SKU-Liste und Container-CBM vor PO festlegen",
    fr: "Nuancier showroom — verrouiller SKU et CBM conteneur avant PO",
    ar: "لوحة ألوان العرض — ثبّت SKU وخطة CBM قبل أمر الشراء",
    ru: "Шоурум образцов — зафиксируйте SKU и CBM контейнера до PO",
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
  return `${keyword} — ${a.altEn}`;
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

export function selectImagesForArticle(articleKey, locale = "en", primaryKeyword = "SPC flooring") {
  const set = ARTICLE_IMAGE_SETS[articleKey] ?? ARTICLE_IMAGE_SETS["choose-reliable-supplier"];
  const heroAsset = getAsset(set.hero);
  const sectionUrls = set.sections.map((k) => getAsset(k).src);
  const endingAsset = getAsset(set.ending);
  const themes = [set.hero, ...set.sections, set.ending];
  return {
    banner: heroAsset.src,
    sections: sectionUrls,
    ending: endingAsset.src,
    meta: {
      themes,
      captions: themes.map((t) => getCaption(t, locale)),
      alts: themes.map((t) => getAlt(t, primaryKeyword)),
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
  return typeof url === "string" && url.startsWith(BLOG_IMAGE_PREFIX);
}
