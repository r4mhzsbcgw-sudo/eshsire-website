/**
 * V2 CTA selection by article topic type
 */
const CTA_BY_TYPE = {
  profit: {
    en: { title: "Get Distributor Margin Worksheet", text: "Request our factory-level pricing model and margin calculator for SPC container programs.", variant: "b2b-procurement" },
    zh: { title: "获取经销商利润计算表", text: "索取工厂级定价模型与 SPC 整柜利润测算表，24 小时内回复。", variant: "b2b-procurement" },
    es: { title: "Obtener hoja de márgenes", text: "Solicite nuestro modelo de precios de fábrica y calculadora de margen para programas SPC.", variant: "b2b-procurement" },
    de: { title: "Margen-Rechner anfordern", text: "Fordern Sie unser Fabrikpreismodell und Margen-Arbeitsblatt für SPC-Container an.", variant: "b2b-procurement" },
    fr: { title: "Obtenir feuille de marge", text: "Demandez notre modèle prix usine et calculateur de marge pour programmes SPC.", variant: "b2b-procurement" },
    ar: { title: "احصل على جدول هامش الربح", text: "اطلب نموذج تسعير المصنع وحاسبة الهامش لبرامج SPC.", variant: "b2b-procurement" },
    ru: { title: "Получить таблицу маржи", text: "Запросите модель цен фабрики и калькулятор маржи для SPC.", variant: "b2b-procurement" },
  },
  logistics: {
    en: { title: "Get 40HQ Container Loading Plan", text: "Request a mixed-SKU container plan with sqm optimization and export documentation checklist.", variant: "b2b-procurement" },
    zh: { title: "获取 40HQ 整柜装柜方案", text: "索取混装 SKU 整柜方案、平方米优化与出口单证清单，24 小时内回复。", variant: "b2b-procurement" },
    es: { title: "Plan de carga contenedor 40HQ", text: "Solicite plan de contenedor mixto con optimización m² y checklist de exportación.", variant: "b2b-procurement" },
    de: { title: "40HQ-Beladeplan anfordern", text: "Fordern Sie Misch-SKU-Containerplan mit m²-Optimierung und Export-Checkliste an.", variant: "b2b-procurement" },
    fr: { title: "Plan chargement 40HQ", text: "Demandez plan conteneur mixte avec optimisation m² et checklist export.", variant: "b2b-procurement" },
    ar: { title: "احصل على خطة تحميل 40HQ", text: "اطلب خطة حاوية مختلطة مع تحسين المتر المربع وقائمة التصدير.", variant: "b2b-procurement" },
    ru: { title: "План загрузки 40HQ", text: "Запросите план mix-контейнера с оптимизацией м² и чеклистом экспорта.", variant: "b2b-procurement" },
  },
  supplier: {
    en: { title: "Request Factory Quotation", text: "Get factory price list, MOQ matrix and supplier verification checklist from our export team.", variant: "b2b-procurement" },
    zh: { title: "获取工厂报价", text: "索取工厂价目表、MOQ 矩阵与供应商核实清单，24 小时内回复。", variant: "b2b-procurement" },
    es: { title: "Solicitar cotización de fábrica", text: "Obtenga lista de precios, matriz MOQ y checklist de verificación de proveedor.", variant: "b2b-procurement" },
    de: { title: "Fabrikangebot anfordern", text: "Erhalten Sie Preisliste, MOQ-Matrix und Lieferanten-Checkliste vom Exportteam.", variant: "b2b-procurement" },
    fr: { title: "Demander devis usine", text: "Obtenez liste de prix, matrice MOQ et checklist vérification fournisseur.", variant: "b2b-procurement" },
    ar: { title: "اطلب عرض سعر المصنع", text: "احصل على قائمة الأسعار ومصفوفة MOQ وقائمة التحقق من المورد.", variant: "b2b-procurement" },
    ru: { title: "Запросить котировку фабрики", text: "Получите прайс-лист, матрицу MOQ и чеклист проверки поставщика.", variant: "b2b-procurement" },
  },
  project: {
    en: { title: "Get Project Supply Solution", text: "Request hotel or commercial project quotation with OEM packaging and phased container delivery.", variant: "b2b-procurement" },
    zh: { title: "获取项目供应解决方案", text: "索取酒店或商业项目报价，含 OEM 包装与分阶段整柜交付方案。", variant: "b2b-procurement" },
    es: { title: "Solución de suministro para proyectos", text: "Solicite cotización hotel/comercial con OEM y entrega por fases en contenedor.", variant: "b2b-procurement" },
    de: { title: "Projektversorgungslösung", text: "Anfrage Hotel-/Gewerbeprojekt mit OEM und phasenweiser Containerlieferung.", variant: "b2b-procurement" },
    fr: { title: "Solution approvisionnement projet", text: "Devis hôtel/commercial avec OEM et livraison conteneur par phases.", variant: "b2b-procurement" },
    ar: { title: "حل توريد المشاريع", text: "اطلب عرض فندق/تجاري مع OEM وتسليم حاويات على مراحل.", variant: "b2b-procurement" },
    ru: { title: "Решение для проектов", text: "Запрос котировки отель/коммерция с OEM и поэтапной поставкой контейнеров.", variant: "b2b-procurement" },
  },
};

const DEFAULT_TYPE = "supplier";

function fillLocale(typeMap, locale) {
  return typeMap[locale] ?? typeMap.de ?? typeMap.es ?? typeMap.fr ?? typeMap.en;
}

export function selectCta(topicType, locale) {
  const type = CTA_BY_TYPE[topicType] ? topicType : DEFAULT_TYPE;
  const map = CTA_BY_TYPE[type] ?? CTA_BY_TYPE[DEFAULT_TYPE];
  const c = fillLocale(map, locale);
  return { type: "cta", variant: c.variant, title: c.title, text: c.text, ctaType: type };
}
