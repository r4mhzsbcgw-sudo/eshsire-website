/** Certification and test records — only entries with verifiable files should set hasFile: true. */

export type CertificationRecord = {
  id: string;
  name: { en: string; zh: string; es: string };
  products: { en: string; zh: string; es: string };
  issuer: { en: string; zh: string; es: string };
  dateOrValidity: { en: string; zh: string; es: string };
  /** Public path to PDF or image; omit when no file on disk */
  filePath?: string;
  hasFile: boolean;
  scope: { en: string; zh: string; es: string };
};

export const CERTIFICATION_RECORDS: CertificationRecord[] = [
  {
    id: "factory-qc",
    name: {
      en: "In-house Quality Inspection",
      zh: "工厂质量检验",
      es: "Inspección de Calidad en Fábrica",
    },
    products: {
      en: "SPC Flooring, Wall Panels, Accessories",
      zh: "SPC 地板、墙板、配件",
      es: "Suelos SPC, Paneles Murales, Accesorios",
    },
    issuer: {
      en: "Eshsire Group QC Team",
      zh: "Eshsire Group 质检团队",
      es: "Equipo QC de Eshsire Group",
    },
    dateOrValidity: {
      en: "Ongoing — per production batch",
      zh: "持续执行 — 按生产批次",
      es: "Continuo — por lote de producción",
    },
    hasFile: false,
    scope: {
      en: "Surface, thickness, lock, packaging and pre-shipment checks documented with photos on request.",
      zh: "表面、厚度、锁扣、包装与发货前检查，可按需提供图片记录。",
      es: "Controles de superficie, grosor, click, embalaje y pre-embarque documentados con fotos bajo solicitud.",
    },
  },
  {
    id: "third-party-testing",
    name: {
      en: "Third-party Test Reports (on request)",
      zh: "第三方检测报告（按需索取）",
      es: "Informes de Prueba de Terceros (bajo solicitud)",
    },
    products: {
      en: "SPC Flooring",
      zh: "SPC 地板",
      es: "Suelos SPC",
    },
    issuer: {
      en: "SGS / accredited labs (project dependent)",
      zh: "SGS / 认可实验室（视项目而定）",
      es: "SGS / laboratorios acreditados (según proyecto)",
    },
    dateOrValidity: {
      en: "Issued per product specification",
      zh: "按产品规格出具",
      es: "Emitido según especificación del producto",
    },
    hasFile: false,
    scope: {
      en: "Wear layer, fire resistance, formaldehyde and other market-specific tests arranged for confirmed orders.",
      zh: "耐磨层、阻燃、甲醛等市场相关检测，可在确认订单后安排。",
      es: "Capa de desgaste, resistencia al fuego, formaldehído y otras pruebas según mercado para pedidos confirmados.",
    },
  },
];
