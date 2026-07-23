import type { Locale } from "@/i18n/locales";

/** Canonical company facts — single source of truth for all public pages. */
export const companyFacts = {
  manufacturingExperience: {
    value: "30",
    label: {
      en: "Manufacturing Experience",
      zh: "制造经验",
      es: "Experiencia en Fabricación",
      fr: "Expérience de fabrication",
      ar: "خبرة التصنيع",
      ru: "Производственный опыт",
    },
    headline: {
      en: "30 Years of Manufacturing Experience",
      zh: "30年制造经验",
      es: "30 años de experiencia en fabricación",
    },
  },
  factoryArea: {
    value: "6000㎡",
    label: {
      en: "Production & Warehousing Facility",
      zh: "生产与仓储基地",
      es: "Instalación de Producción y Almacén",
      fr: "Site de production et d’entreposage",
      ar: "منشأة الإنتاج والتخزين",
      ru: "Производство и склад",
    },
    headline: {
      en: "6000㎡ Production & Warehousing Facility",
      zh: "6000㎡ 生产与仓储基地",
      es: "Instalación de producción y almacén de 6000㎡",
    },
  },
  exportMarkets: {
    value: "30+",
    label: {
      en: "Export Countries & Regions",
      zh: "出口国家和地区",
      es: "Países y Regiones de Exportación",
      fr: "Pays et régions d’exportation",
      ar: "دول ومناطق التصدير",
      ru: "Страны и регионы экспорта",
    },
    headline: {
      en: "Exported to 30+ Countries and Regions",
      zh: "出口 30+ 个国家和地区",
      es: "Exportación a más de 30 países y regiones",
    },
  },
  oemOdm: {
    value: "OEM / ODM",
    label: {
      en: "Private Label & Custom Packaging",
      zh: "自有品牌包装与定制",
      es: "Marca Privada y Embalaje Personalizado",
      fr: "Marque privée et emballage sur mesure",
      ar: "علامة خاصة وتغليف مخصص",
      ru: "Private label и индивидуальная упаковка",
    },
  },
  coreProducts: [
    { en: "SPC Flooring", zh: "SPC 地板", es: "Suelos SPC" },
    { en: "Interior Wall Panels", zh: "室内墙板", es: "Paneles Murales Interiores" },
    { en: "PVC Ceiling Panels", zh: "PVC 吊顶板", es: "Paneles de Techo PVC" },
    { en: "Flooring Accessories", zh: "地板配件", es: "Accesorios para Suelos" },
  ],
  coreCapabilities: [
    {
      en: "Factory Production",
      zh: "工厂生产",
      es: "Producción en Fábrica",
    },
    {
      en: "OEM / ODM",
      zh: "OEM / ODM",
      es: "OEM / ODM",
    },
    {
      en: "Private Label Packaging",
      zh: "自有品牌包装",
      es: "Embalaje de Marca Privada",
    },
    {
      en: "Quality Inspection",
      zh: "质量检验",
      es: "Inspección de Calidad",
    },
    {
      en: "Mixed Container Planning",
      zh: "混装规划",
      es: "Planificación de Contenedores Mixtos",
    },
    {
      en: "Export Delivery Coordination",
      zh: "出口交付协同",
      es: "Coordinación de Entrega de Exportación",
    },
    {
      en: "Production Progress Photos and Videos",
      zh: "生产进度图片与视频",
      es: "Fotos y Videos del Progreso de Producción",
    },
  ],
  positioning: {
    primary: {
      en: "SPC Flooring & Wall Panel Manufacturer in China",
      zh: "中国 SPC 地板与墙板制造商",
      es: "Fabricante de Suelos SPC y Paneles Murales en China",
    },
    secondary: {
      en: "30 Years of Manufacturing Experience | OEM/ODM | Quality Control | Global Export Support",
      zh: "30年制造经验｜OEM/ODM｜质量检验｜全球出口支持",
      es: "30 años de experiencia | OEM/ODM | Control de Calidad | Soporte de Exportación Global",
    },
    description: {
      en: "Eshsire Group manufactures SPC flooring and interior wall panel solutions for distributors, importers and project buyers. We combine factory production, OEM customization, quality inspection, mixed-container planning and export delivery coordination in one workflow.",
      zh: "Eshsire Group 专注 SPC 地板、室内墙板及配套建材制造，为经销商、进口商和工程客户提供 OEM 定制、质量检验、混装规划、生产进度可视化和出口交付支持。",
      es: "Eshsire Group fabrica suelos SPC y paneles murales interiores para distribuidores, importadores y compradores de proyectos. Combinamos producción en fábrica, personalización OEM, inspección de calidad, planificación de contenedores mixtos y coordinación de exportación en un solo flujo.",
    },
  },
  factoryCoordination: {
    en: "Production, Quality & Loading Coordination",
    zh: "生产、质检与装柜协同",
    es: "Coordinación de Producción, Calidad y Carga",
  },
} as const;

export type LocalizedString = {
  en: string;
  zh: string;
  es: string;
  fr?: string;
  ar?: string;
  ru?: string;
};

export function tFact<T extends LocalizedString>(locale: Locale, obj: T): string {
  if (locale === "zh") return obj.zh;
  if (locale === "es") return obj.es;
  if (locale === "fr" && obj.fr) return obj.fr;
  if (locale === "ar" && obj.ar) return obj.ar;
  if (locale === "ru" && obj.ru) return obj.ru;
  return obj.en;
}

function yearUnit(locale: Locale) {
  if (locale === "zh") return "年";
  if (locale === "es") return "Años";
  if (locale === "fr") return "ans";
  if (locale === "ar") return "عاماً";
  if (locale === "ru") return "лет";
  return "Years";
}

/** Four stat cards for homepage Factory Strength bar */
export function getStatsBarItems(locale: Locale) {
  const f = companyFacts;
  return [
    {
      value: `${f.manufacturingExperience.value} ${yearUnit(locale)}`,
      label: tFact(locale, f.manufacturingExperience.label),
    },
    {
      value: f.factoryArea.value,
      label: tFact(locale, f.factoryArea.label),
    },
    {
      value: f.exportMarkets.value,
      label: tFact(locale, f.exportMarkets.label),
    },
    {
      value: f.oemOdm.value,
      label: tFact(locale, f.oemOdm.label),
    },
  ];
}

/** About page stat row */
export function getAboutStats(locale: Locale) {
  const f = companyFacts;
  return [
    {
      value: `${f.manufacturingExperience.value} ${yearUnit(locale)}`,
      label: tFact(locale, f.manufacturingExperience.label),
    },
    {
      value: f.factoryArea.value,
      label: tFact(locale, f.factoryArea.label),
    },
    {
      value: f.exportMarkets.value,
      label: tFact(locale, f.exportMarkets.label),
    },
    {
      value: f.oemOdm.value,
      label: locale === "zh" ? "品牌定制支持" : locale === "es" ? "Soporte de Marca Privada" : "Private-Label Support",
    },
  ];
}

/** Factory page stat row */
export function getFactoryPageStats(locale: Locale) {
  const f = companyFacts;
  return [
    {
      value: `${f.manufacturingExperience.value}${locale === "zh" ? "年" : "+"}`,
      label:
        locale === "zh"
          ? "制造经验"
          : locale === "es"
            ? "Años de Fabricación"
            : locale === "fr"
              ? "Années de fabrication"
              : locale === "ar"
                ? "سنوات التصنيع"
                : locale === "ru"
                  ? "Лет производства"
                  : "Years Manufacturing",
    },
    {
      value: f.factoryArea.value,
      label:
        locale === "zh"
          ? "工厂面积"
          : locale === "es"
            ? "Área de Fábrica"
            : locale === "fr"
              ? "Surface d’usine"
              : locale === "ar"
                ? "مساحة المصنع"
                : locale === "ru"
                  ? "Площадь завода"
                  : "Factory Area",
    },
    {
      value: f.exportMarkets.value,
      label:
        locale === "zh"
          ? "出口国家"
          : locale === "es"
            ? "Países de Exportación"
            : locale === "fr"
              ? "Pays d’exportation"
              : locale === "ar"
                ? "دول التصدير"
                : locale === "ru"
                  ? "Страны экспорта"
                  : "Export Countries",
    },
    {
      value: locale === "zh" ? "全程" : locale === "es" ? "Integral" : "End-to-end",
      label: tFact(locale, f.factoryCoordination),
    },
  ];
}
