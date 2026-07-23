import type { Locale } from "@/i18n/locales";

export type ApplicationLocale = "en" | "zh" | "es";
export type LocalizedText = Record<ApplicationLocale, string>;
export type LocalizedList = Record<ApplicationLocale, string[]>;
export type LocalizedFaq = Record<ApplicationLocale, { q: string; a: string }[]>;

export type ProjectApplication = {
  id: string;
  slug: string;
  localeSlugs: Record<ApplicationLocale, string>;
  tag: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  heroImage: string;
  cardImage: string;
  galleryImages: string[];
  alt: LocalizedText;
  suitableFor: LocalizedList;
  productOptions: LocalizedList;
  eshsireSupport: LocalizedList;
  qualityWorkflow: LocalizedList;
  shipmentSupport: LocalizedList;
  faq: LocalizedFaq;
  cta: LocalizedText;
  relatedLinks: { href: string; label: LocalizedText }[];
};

const spc = "/images/content-library/spc-flooring";
const wall = "/images/content-library/wall-panels";
const apps = "/images/project-applications";
const factory = "/images/content-library/factory-process";

export const APPLICATION_SLUGS = [
  "private-label-spc-flooring-supply",
  "hospitality-commercial-flooring",
  "education-high-traffic-flooring",
  "residential-renovation-supply",
  "office-retail-flooring-supply",
  "mixed-container-spc-wall-panels",
  "easy-maintenance-public-spaces",
  "interior-wall-panel-solutions",
] as const;

const sameSlug = (slug: (typeof APPLICATION_SLUGS)[number]) => ({ en: slug, zh: slug, es: slug });

export const PROJECT_APPLICATIONS: ProjectApplication[] = [
  {
    id: "private-label-spc",
    slug: APPLICATION_SLUGS[0],
    localeSlugs: sameSlug(APPLICATION_SLUGS[0]),
    tag: { en: "Distributor / OEM", zh: "经销商 / 贴牌", es: "Distribuidor / OEM" },
    title: {
      en: "Private Label SPC Flooring Supply for Distributors",
      zh: "SPC 地板经销商贴牌供货方案",
      es: "Suministro de pisos SPC con marca privada para distribuidores",
    },
    summary: {
      en: "OEM and private-label SPC flooring supply for distributors, importers and wholesalers who need stable specifications, packaging and brand support.",
      zh: "面向地板经销商、进口商和批发商，提供花色、规格、包装、标签与条码定制，帮助建立稳定的自有品牌产品线。",
      es: "Suministro OEM y de marca privada para distribuidores e importadores que necesitan especificaciones, empaque y soporte de marca.",
    },
    metaTitle: {
      en: "Private Label SPC Flooring Supply for Distributors | Eshsire Group",
      zh: "SPC 地板经销商贴牌供货方案 | Eshsire Group",
      es: "Pisos SPC con marca privada para distribuidores | Eshsire Group",
    },
    metaDescription: {
      en: "OEM SPC flooring supply with private-label cartons, labels, barcodes, samples, production updates and export support for distributors.",
      zh: "Eshsire 为经销商提供 SPC 地板 OEM 贴牌、包装标签、样品确认、生产跟进、装柜检查与出口支持。",
      es: "Suministro OEM de pisos SPC con cajas de marca privada, etiquetas, muestras, control de producción y soporte de exportación.",
    },
    heroImage: "/images/applications/private-label-spc-flooring-supply/private-label-spc-packaging-hero.webp",
    cardImage: "/images/project-applications/private-label-spc-packaging-card.webp",
    galleryImages: [
      "/images/applications/private-label-spc-flooring-supply/private-label-spc-packaging-hero.webp",
      `${spc}/spc-flooring-04-stock-211e96fe.webp`,
      `${spc}/spc-flooring-spc-img-0010-415e2d72.webp`,
      `${spc}/spc-flooring-1784365924-d62e7862.webp`,
      `${factory}/factory-process-05-factory-00bf4033.webp`,
    ],
    alt: {
      en: "Private label SPC flooring cartons stacked on pallets for distributor supply",
      zh: "SPC 地板贴牌包装纸箱托盘实拍",
      es: "Cajas de pisos SPC con marca privada apiladas en palets para distribuidores",
    },
    suitableFor: {
      en: ["Flooring distributors", "Importers", "Wholesalers", "Brand owners", "Flooring shops"],
      zh: ["地板经销商", "进口商", "批发商", "品牌运营商", "地板门店"],
      es: ["Distribuidores de pisos", "Importadores", "Mayoristas", "Dueños de marca", "Tiendas de pisos"],
    },
    productOptions: {
      en: ["4mm, 5mm and 6mm SPC flooring", "Wood-look and stone-look colors", "Private-label cartons", "Labels and barcodes", "Sample boards and catalogs"],
      zh: ["4mm、5mm、6mm SPC 地板", "木纹与石纹花色", "贴牌纸箱", "标签与条码", "样板册与目录"],
      es: ["Pisos SPC de 4mm, 5mm y 6mm", "Colores madera y piedra", "Cajas de marca privada", "Etiquetas y códigos de barras", "Muestrarios y catálogos"],
    },
    eshsireSupport: {
      en: ["Color and specification confirmation", "OEM packaging design coordination", "Sample confirmation before bulk order", "Production photo and video updates", "Packing and loading inspection"],
      zh: ["花色与规格确认", "OEM 包装设计协同", "大货前样品确认", "生产图片与视频更新", "包装与装柜检查"],
      es: ["Confirmación de color y especificación", "Coordinación de empaque OEM", "Confirmación de muestras antes del pedido", "Fotos y videos de producción", "Inspección de empaque y carga"],
    },
    qualityWorkflow: {
      en: ["Confirm technical sheet and color code", "Approve sample and carton artwork", "Check batch color and click profile", "Record packing before shipment"],
      zh: ["确认技术参数与色号", "确认样品和纸箱设计", "检查批次色差与锁扣", "出货前记录包装状态"],
      es: ["Confirmar ficha técnica y código de color", "Aprobar muestra y diseño de caja", "Revisar color de lote y perfil click", "Registrar empaque antes del envío"],
    },
    shipmentSupport: {
      en: ["Carton mark and barcode coordination", "Pallet or loose-load plan", "Container loading photo records", "Export document support"],
      zh: ["箱唛与条码协调", "托盘或散装装柜方案", "装柜照片记录", "出口单证支持"],
      es: ["Coordinación de marcas y códigos", "Plan de palet o carga suelta", "Fotos de carga de contenedor", "Soporte documental de exportación"],
    },
    faq: {
      en: [
        { q: "Can Eshsire make private-label SPC flooring cartons?", a: "Yes. We coordinate carton artwork, labels and barcode requirements after specifications and quantities are confirmed." },
        { q: "Can I approve samples before bulk production?", a: "Yes. Sample confirmation is part of the normal OEM workflow before mass production starts." },
        { q: "What buyers is this solution designed for?", a: "It is designed for distributors, wholesalers, importers and brand owners building a repeatable SPC flooring line." },
      ],
      zh: [
        { q: "Eshsire 可以做 SPC 地板贴牌纸箱吗？", a: "可以。规格和数量确认后，我们可协同纸箱设计、标签和条码要求。" },
        { q: "大货前可以先确认样品吗？", a: "可以。样品确认是 OEM 贴牌订单进入量产前的常规流程。" },
        { q: "这个方案适合哪些客户？", a: "适合经销商、批发商、进口商和希望建立稳定 SPC 地板产品线的品牌客户。" },
      ],
      es: [
        { q: "¿Eshsire puede hacer cajas SPC con marca privada?", a: "Sí. Coordinamos diseño de caja, etiquetas y códigos después de confirmar especificaciones y cantidades." },
        { q: "¿Puedo aprobar muestras antes de producción?", a: "Sí. La aprobación de muestras forma parte del flujo OEM antes de iniciar producción masiva." },
        { q: "¿Para qué compradores sirve esta solución?", a: "Para distribuidores, mayoristas, importadores y marcas que necesitan una línea SPC repetible." },
      ],
    },
    cta: { en: "Request OEM SPC Flooring Quote", zh: "获取 OEM SPC 地板报价", es: "Solicitar cotización OEM de pisos SPC" },
    relatedLinks: [
      { href: "/spc-flooring", label: { en: "SPC Flooring", zh: "SPC 地板", es: "Pisos SPC" } },
      { href: "/oem-service", label: { en: "OEM Service", zh: "OEM 服务", es: "Servicio OEM" } },
      { href: "/contact", label: { en: "Contact Jason", zh: "联系 Jason", es: "Contactar a Jason" } },
    ],
  },
  {
    id: "hospitality-commercial",
    slug: APPLICATION_SLUGS[1],
    localeSlugs: sameSlug(APPLICATION_SLUGS[1]),
    tag: { en: "Commercial", zh: "酒店 / 商业", es: "Comercial" },
    title: { en: "Hospitality & Commercial SPC Flooring Supply", zh: "酒店与商业空间 SPC 地板方案", es: "Pisos SPC para hoteles y espacios comerciales" },
    summary: {
      en: "SPC flooring options for hotels, apartments, retail stores and commercial interiors requiring durability, waterproof performance and easy maintenance.",
      zh: "面向酒店、公寓、零售店和商业室内空间，提供耐磨、防水、易维护的 SPC 地板选型与供货支持。",
      es: "Opciones de pisos SPC para hoteles, apartamentos, tiendas y espacios comerciales que requieren durabilidad, resistencia al agua y fácil mantenimiento.",
    },
    metaTitle: { en: "Hospitality & Commercial SPC Flooring Supply | Eshsire Group", zh: "酒店与商业空间 SPC 地板方案 | Eshsire Group", es: "Pisos SPC para hoteles y espacios comerciales | Eshsire Group" },
    metaDescription: { en: "Commercial SPC flooring supply for hotels, apartments, retail stores and interiors with sample, packing and loading support.", zh: "酒店、公寓、零售店和商业室内空间 SPC 地板供货，支持厚度建议、花色确认、样品、包装和装柜。", es: "Suministro de pisos SPC comerciales para hoteles, apartamentos y tiendas con muestras, empaque y carga." },
    heroImage: `${apps}/hospitality-commercial.webp`,
    cardImage: `${apps}/hospitality-commercial.webp`,
    galleryImages: [`${apps}/hospitality-commercial.webp`, `${spc}/spc-flooring-1784365428-b8a575d1.webp`, `${spc}/spc-flooring-1784365403-e56b267b.webp`, `${spc}/spc-flooring-spc-img-0013-7b82cc9b.webp`],
    alt: { en: "SPC flooring in a commercial interior", zh: "商业室内空间 SPC 地板", es: "Pisos SPC en un interior comercial" },
    suitableFor: { en: ["Hotels", "Apartments", "Retail stores", "Commercial interiors", "Renovation contractors"], zh: ["酒店", "公寓", "零售店", "商业室内空间", "翻新承包商"], es: ["Hoteles", "Apartamentos", "Tiendas", "Interiores comerciales", "Contratistas de renovación"] },
    productOptions: { en: ["5mm and 6mm SPC flooring", "Wear-resistant surface", "Wood-look colors", "Stone-look colors", "Commercial packaging options"], zh: ["5mm、6mm SPC 地板", "耐磨表面", "木纹花色", "石纹花色", "商业包装选项"], es: ["Pisos SPC de 5mm y 6mm", "Superficie resistente al desgaste", "Colores madera", "Colores piedra", "Opciones de empaque comercial"] },
    eshsireSupport: { en: ["Recommend thickness and wear layer", "Confirm color collection", "Prepare samples", "Share production and packing updates", "Plan container loading"], zh: ["推荐厚度和耐磨层", "确认花色系列", "准备样品", "更新生产和包装进度", "规划集装箱装柜"], es: ["Recomendar espesor y capa de desgaste", "Confirmar colección de colores", "Preparar muestras", "Actualizar producción y empaque", "Planificar carga de contenedor"] },
    qualityWorkflow: { en: ["Match usage level to specification", "Confirm surface texture and color", "Check carton and batch labels", "Review loading plan before dispatch"], zh: ["按使用强度匹配规格", "确认表面纹理和花色", "检查纸箱与批次标签", "发货前复核装柜计划"], es: ["Relacionar uso con especificación", "Confirmar textura y color", "Revisar cajas y etiquetas de lote", "Revisar plan de carga"] },
    shipmentSupport: { en: ["Commercial carton options", "Container utilization planning", "Packing photo records", "Export document coordination"], zh: ["商业纸箱选项", "集装箱利用率规划", "包装照片记录", "出口单证协同"], es: ["Opciones de caja comercial", "Plan de aprovechamiento de contenedor", "Fotos de empaque", "Coordinación documental"] },
    faq: {
      en: [{ q: "Which SPC thickness is common for commercial interiors?", a: "Many projects select 5mm or 6mm SPC, with the final choice based on traffic level and budget." }, { q: "Can you help with hotel color selection?", a: "Yes. We can suggest neutral wood-look or stone-look collections and prepare samples for confirmation." }, { q: "Do you support container loading records?", a: "Yes. Packing and loading photos or videos can be arranged before shipment." }],
      zh: [{ q: "商业空间常用什么厚度？", a: "多数项目会选择 5mm 或 6mm SPC，最终按人流强度和预算确认。" }, { q: "可以协助酒店花色选择吗？", a: "可以，我们可推荐中性色木纹或石纹系列，并安排样品确认。" }, { q: "能提供装柜记录吗？", a: "可以，出货前可安排包装和装柜图片或视频记录。" }],
      es: [{ q: "¿Qué espesor se usa en interiores comerciales?", a: "Muchos proyectos eligen SPC de 5mm o 6mm según tránsito y presupuesto." }, { q: "¿Pueden ayudar con colores para hoteles?", a: "Sí. Podemos sugerir colecciones madera o piedra neutras y preparar muestras." }, { q: "¿Ofrecen registros de carga?", a: "Sí. Podemos organizar fotos o videos de empaque y carga antes del envío." }],
    },
    cta: { en: "Request Commercial Flooring Quote", zh: "获取商业地板报价", es: "Solicitar cotización comercial" },
    relatedLinks: [{ href: "/spc-flooring", label: { en: "Commercial SPC Options", zh: "商业 SPC 选项", es: "Opciones SPC comerciales" } }, { href: "/contact", label: { en: "Request Samples", zh: "申请样品", es: "Solicitar muestras" } }],
  },
  {
    id: "education-high-traffic",
    slug: APPLICATION_SLUGS[2],
    localeSlugs: sameSlug(APPLICATION_SLUGS[2]),
    tag: { en: "High Traffic", zh: "高人流", es: "Alto tráfico" },
    title: { en: "SPC Flooring for Education and High-Traffic Projects", zh: "学校与高人流区域地板选材方案", es: "Pisos SPC para proyectos educativos y áreas de alto tráfico" },
    summary: { en: "SPC flooring selection support for schools, corridors, training centers and public areas where durability and easy maintenance are important.", zh: "面向学校、走廊、培训中心和公共区域，提供重视耐用性与易清洁性的 SPC 地板选材支持。", es: "Soporte de selección de pisos SPC para escuelas, pasillos, centros de capacitación y áreas públicas donde importan la durabilidad y el mantenimiento fácil." },
    metaTitle: { en: "SPC Flooring for Education and High-Traffic Projects | Eshsire Group", zh: "学校与高人流区域 SPC 地板方案 | Eshsire Group", es: "Pisos SPC para educación y alto tráfico | Eshsire Group" },
    metaDescription: { en: "SPC flooring selection for schools, corridors and public areas with stronger wear layers, samples and packing checks.", zh: "学校、走廊和公共区域 SPC 地板选材，支持耐磨层确认、样品、生产进度和包装检查。", es: "Selección SPC para escuelas, pasillos y áreas públicas con capa de desgaste, muestras y revisión de empaque." },
    heroImage: `${spc}/spc-flooring-1784365386-164b5409.webp`,
    cardImage: `${spc}/spc-flooring-1784365386-164b5409.webp`,
    galleryImages: [`${spc}/spc-flooring-1784365386-164b5409.webp`, `${spc}/spc-flooring-1784365346-1c110a30.webp`, `${spc}/spc-flooring-spc-img-0010-415e2d72.webp`, `${spc}/spc-flooring-1784366073-e8e868ab.webp`],
    alt: { en: "SPC flooring samples for high-traffic selection", zh: "高人流区域 SPC 地板样品", es: "Muestras de pisos SPC para alto tráfico" },
    suitableFor: { en: ["Schools", "Corridors", "Training centers", "Public areas", "High-traffic renovation projects"], zh: ["学校", "走廊", "培训中心", "公共区域", "高人流翻新项目"], es: ["Escuelas", "Pasillos", "Centros de capacitación", "Áreas públicas", "Renovaciones de alto tráfico"] },
    productOptions: { en: ["5mm and 6mm SPC flooring", "Stronger wear layer", "Easy-clean surface", "Stable click system", "Neutral color collections"], zh: ["5mm、6mm SPC 地板", "更强耐磨层", "易清洁表面", "稳定锁扣系统", "中性色花色系列"], es: ["Pisos SPC de 5mm y 6mm", "Capa de desgaste reforzada", "Superficie fácil de limpiar", "Sistema click estable", "Colecciones de color neutro"] },
    eshsireSupport: { en: ["Recommend thickness by traffic level", "Confirm wear layer", "Prepare samples", "Share production progress", "Check packing before shipment"], zh: ["按人流强度推荐厚度", "确认耐磨层", "准备样品", "更新生产进度", "出货前检查包装"], es: ["Recomendar espesor según tráfico", "Confirmar capa de desgaste", "Preparar muestras", "Actualizar producción", "Revisar empaque antes del envío"] },
    qualityWorkflow: { en: ["Confirm project traffic level", "Approve color and surface", "Inspect click profile and plank surface", "Record packing and batch information"], zh: ["确认项目人流强度", "确认花色与表面", "检查锁扣和板面", "记录包装与批次信息"], es: ["Confirmar nivel de tráfico", "Aprobar color y superficie", "Inspeccionar perfil click y tabla", "Registrar empaque y lote"] },
    shipmentSupport: { en: ["Batch-label control", "Packing photos", "Container loading plan", "Export document support"], zh: ["批次标签管理", "包装照片", "装柜计划", "出口单证支持"], es: ["Control de etiquetas de lote", "Fotos de empaque", "Plan de carga", "Soporte documental"] },
    faq: {
      en: [{ q: "What thickness is suitable for schools and high-traffic areas?", a: "For schools, corridors and public areas, buyers usually compare 5mm and 6mm SPC flooring based on traffic level, budget and expected service life." }, { q: "What quality points should project buyers check?", a: "Wear layer, click strength, dimensional stability, scratch resistance and batch color consistency should be confirmed before mass production." }, { q: "Can we confirm samples before bulk order?", a: "Yes. Samples can be prepared for color, thickness and surface confirmation before bulk production." }],
      zh: [{ q: "学校和高人流区域应该选择多厚的 SPC 地板？", a: "通常建议根据人流量、使用年限和预算选择 5mm 或 6mm SPC 地板，并结合合适的耐磨层。" }, { q: "这类项目需要关注哪些质量点？", a: "建议重点确认耐磨层、锁扣强度、尺寸稳定性、表面耐刮性和批次颜色一致性。" }, { q: "可以先寄样品确认再下大货吗？", a: "可以。我们可以根据目标项目和预算提供样品，确认颜色、厚度和表面后再安排大货。" }],
      es: [{ q: "¿Qué espesor es adecuado para escuelas y zonas de alto tráfico?", a: "Para escuelas, pasillos y áreas públicas, normalmente se comparan pisos SPC de 5mm y 6mm según el tráfico, presupuesto y vida útil esperada." }, { q: "¿Qué puntos de calidad deben revisar los compradores de proyectos?", a: "Se recomienda confirmar la capa de desgaste, resistencia del sistema click, estabilidad dimensional, resistencia a rayaduras y consistencia de color." }, { q: "¿Podemos confirmar muestras antes del pedido grande?", a: "Sí. Podemos preparar muestras para confirmar color, espesor y superficie antes de la producción en masa." }],
    },
    cta: { en: "Ask for High-Traffic Flooring Advice", zh: "咨询高人流地板选型", es: "Pedir asesoría para alto tráfico" },
    relatedLinks: [{ href: "/spc-flooring/specs", label: { en: "SPC Specifications", zh: "SPC 规格参数", es: "Especificaciones SPC" } }, { href: "/factory", label: { en: "Factory Quality Control", zh: "工厂质检", es: "Control de calidad" } }],
  },
  {
    id: "residential-renovation",
    slug: APPLICATION_SLUGS[3],
    localeSlugs: sameSlug(APPLICATION_SLUGS[3]),
    tag: { en: "Residential", zh: "住宅翻新", es: "Residencial" },
    title: { en: "Residential Renovation SPC Flooring Supply", zh: "住宅翻新与公寓 SPC 地板供货方案", es: "Suministro de pisos SPC para renovación residencial" },
    summary: { en: "SPC flooring supply for residential renovation, apartments, rental housing and home improvement channels.", zh: "面向住宅翻新、公寓、出租房和家装渠道的 SPC 地板供货方案。", es: "Suministro de pisos SPC para renovación residencial, apartamentos, vivienda de alquiler y canales de mejoras del hogar." },
    metaTitle: { en: "Residential Renovation SPC Flooring Supply | Eshsire Group", zh: "住宅翻新 SPC 地板供货方案 | Eshsire Group", es: "Pisos SPC para renovación residencial | Eshsire Group" },
    metaDescription: { en: "Residential SPC flooring supply with popular wood colors, click lock, standard cartons and reorder support.", zh: "住宅翻新与公寓 SPC 地板供货，支持热门木纹、锁扣、标准纸箱和补货系列。", es: "Suministro SPC residencial con colores madera populares, sistema click, cajas estándar y reposición." },
    heroImage: `${apps}/residential-renovation.webp`,
    cardImage: `${apps}/residential-renovation.webp`,
    galleryImages: [`${apps}/residential-renovation.webp`, `${spc}/spc-flooring-1784365886-febac5c5.webp`, `${spc}/spc-flooring-1784365914-f30b00a9.webp`, `${spc}/spc-flooring-spc-img-0027-b3f47d61.webp`],
    alt: { en: "Residential SPC flooring color and installation reference", zh: "住宅 SPC 地板花色与安装参考", es: "Referencia de color e instalación de pisos SPC residenciales" },
    suitableFor: { en: ["Apartments", "Residential renovation", "Rental housing", "Flooring shops", "Home improvement channels"], zh: ["公寓", "住宅翻新", "出租房", "地板门店", "家装渠道"], es: ["Apartamentos", "Renovación residencial", "Vivienda de alquiler", "Tiendas de pisos", "Canales de mejora del hogar"] },
    productOptions: { en: ["4mm and 5mm SPC flooring", "Popular wood colors", "Click lock", "Standard cartons", "Reorder color collections"], zh: ["4mm、5mm SPC 地板", "热门木纹花色", "锁扣系统", "标准纸箱", "可补货花色系列"], es: ["Pisos SPC de 4mm y 5mm", "Colores madera populares", "Sistema click", "Cajas estándar", "Colecciones para reposición"] },
    eshsireSupport: { en: ["Recommend popular colors", "Confirm product level", "Prepare sample options", "Support regular reorder", "Combine flooring and accessories"], zh: ["推荐热门花色", "确认产品档位", "准备样品选项", "支持常规补货", "地板与配件组合供货"], es: ["Recomendar colores populares", "Confirmar nivel de producto", "Preparar muestras", "Apoyar reposición regular", "Combinar pisos y accesorios"] },
    qualityWorkflow: { en: ["Confirm color collection", "Check click lock and plank surface", "Confirm carton quantity", "Keep reorder records"], zh: ["确认花色系列", "检查锁扣与板面", "确认纸箱数量", "保留补货记录"], es: ["Confirmar colección de color", "Revisar click y superficie", "Confirmar cantidad por caja", "Mantener registros de reposición"] },
    shipmentSupport: { en: ["Standard carton packing", "Accessory combination planning", "Loading photos", "Export documents"], zh: ["标准纸箱包装", "配件组合规划", "装柜照片", "出口单证"], es: ["Empaque en caja estándar", "Plan de accesorios", "Fotos de carga", "Documentos de exportación"] },
    faq: {
      en: [{ q: "Which colors are suitable for residential renovation?", a: "Popular neutral wood colors are commonly selected for apartments and home improvement channels." }, { q: "Can flooring and accessories ship together?", a: "Yes. Flooring, skirting and trims can be planned together." }, { q: "Can reorder colors be kept stable?", a: "We help keep color and batch records for repeat orders." }],
      zh: [{ q: "住宅翻新适合哪些花色？", a: "公寓和家装渠道通常选择中性热门木纹。" }, { q: "地板和配件可以一起发货吗？", a: "可以，地板、踢脚线和收边条可一起规划。" }, { q: "补货花色可以保持稳定吗？", a: "我们会协助保留花色与批次记录，方便后续补货。" }],
      es: [{ q: "¿Qué colores sirven para renovación residencial?", a: "Los colores madera neutros suelen funcionar bien para apartamentos y canales residenciales." }, { q: "¿Pueden enviar accesorios junto con pisos?", a: "Sí. Pisos, zócalos y perfiles se pueden planificar juntos." }, { q: "¿Se mantienen colores para reposición?", a: "Ayudamos a conservar registros de color y lote para pedidos repetidos." }],
    },
    cta: { en: "Get Residential Flooring Catalog", zh: "获取住宅地板目录", es: "Obtener catálogo residencial" },
    relatedLinks: [{ href: "/spc-flooring", label: { en: "SPC Flooring Catalog", zh: "SPC 地板目录", es: "Catálogo SPC" } }, { href: "/accessories", label: { en: "Flooring Accessories", zh: "地板配件", es: "Accesorios de piso" } }],
  },
  {
    id: "office-retail",
    slug: APPLICATION_SLUGS[4],
    localeSlugs: sameSlug(APPLICATION_SLUGS[4]),
    tag: { en: "Office / Retail", zh: "办公 / 零售", es: "Oficina / Tienda" },
    title: { en: "Office & Retail SPC Flooring Supply", zh: "办公与零售空间 SPC 地板供货方案", es: "Pisos SPC para oficinas y tiendas" },
    summary: { en: "SPC flooring supply for offices, shops, showrooms and retail spaces requiring stable batches, clean appearance and commercial usability.", zh: "面向办公室、店铺、展厅和零售空间，提供批次稳定、外观整洁、适合商业使用的 SPC 地板供货。", es: "Suministro SPC para oficinas, tiendas, showrooms y espacios retail que requieren lotes estables, apariencia limpia y uso comercial." },
    metaTitle: { en: "Office & Retail SPC Flooring Supply | Eshsire Group", zh: "办公与零售 SPC 地板供货方案 | Eshsire Group", es: "Pisos SPC para oficinas y tiendas | Eshsire Group" },
    metaDescription: { en: "Office and retail SPC flooring supply with commercial-grade recommendations, color consistency, packing checks and delivery planning.", zh: "办公与零售空间 SPC 地板供货，支持商业级选型、花色一致性、包装检查与交付规划。", es: "Suministro SPC para oficinas y tiendas con recomendación comercial, color estable, revisión de empaque y entrega." },
    heroImage: `${apps}/office-retail.webp`,
    cardImage: `${apps}/office-retail.webp`,
    galleryImages: [`${apps}/office-retail.webp`, `${spc}/spc-flooring-spc-img-0013-7b82cc9b.webp`, `${spc}/spc-flooring-1784365428-b8a575d1.webp`, `${spc}/spc-flooring-1784365931-e64432b8.webp`],
    alt: { en: "SPC flooring for office and retail interior supply", zh: "办公零售空间 SPC 地板供货", es: "Suministro SPC para oficinas y tiendas" },
    suitableFor: { en: ["Offices", "Retail shops", "Showrooms", "Commercial renovation", "Contractors"], zh: ["办公室", "零售店", "展厅", "商业翻新", "承包商"], es: ["Oficinas", "Tiendas", "Showrooms", "Renovación comercial", "Contratistas"] },
    productOptions: { en: ["5mm SPC flooring", "6mm SPC flooring", "Wear-resistant surface", "Neutral wood colors", "Commercial cartons"], zh: ["5mm SPC 地板", "6mm SPC 地板", "耐磨表面", "中性木纹", "商业纸箱"], es: ["SPC de 5mm", "SPC de 6mm", "Superficie resistente", "Colores madera neutros", "Cajas comerciales"] },
    eshsireSupport: { en: ["Recommend commercial grade", "Confirm color consistency", "Confirm packing details", "Share inspection records", "Plan delivery"], zh: ["推荐商业级产品", "确认花色一致性", "确认包装细节", "提供检查记录", "规划交付"], es: ["Recomendar grado comercial", "Confirmar consistencia de color", "Confirmar empaque", "Compartir inspección", "Planificar entrega"] },
    qualityWorkflow: { en: ["Confirm commercial usage", "Approve colors", "Check batch consistency", "Record packing and delivery status"], zh: ["确认商业使用场景", "确认花色", "检查批次一致性", "记录包装和交付状态"], es: ["Confirmar uso comercial", "Aprobar colores", "Revisar consistencia de lote", "Registrar empaque y entrega"] },
    shipmentSupport: { en: ["Carton details", "Batch labels", "Loading schedule", "Export documents"], zh: ["纸箱细节", "批次标签", "装柜时间", "出口单证"], es: ["Detalles de caja", "Etiquetas de lote", "Horario de carga", "Documentos de exportación"] },
    faq: {
      en: [{ q: "Can you recommend flooring for retail shops?", a: "Yes. We match thickness, wear layer and colors to the expected use." }, { q: "How do you control color consistency?", a: "We confirm color code, batch records and sample references before shipment." }, { q: "Can delivery be planned by project schedule?", a: "Yes. We coordinate production, packing and loading timing." }],
      zh: [{ q: "可以为零售店推荐地板吗？", a: "可以，我们会按使用强度匹配厚度、耐磨层和花色。" }, { q: "如何控制花色一致性？", a: "通过确认色号、批次记录和样品参考来控制。" }, { q: "可以按项目时间交付吗？", a: "可以，我们会协同生产、包装和装柜节奏。" }],
      es: [{ q: "¿Pueden recomendar pisos para tiendas?", a: "Sí. Ajustamos espesor, capa de desgaste y colores al uso esperado." }, { q: "¿Cómo controlan el color?", a: "Confirmamos código, lote y referencia de muestra antes del envío." }, { q: "¿Pueden planificar entrega por proyecto?", a: "Sí. Coordinamos producción, empaque y carga." }],
    },
    cta: { en: "Request Office Flooring Quote", zh: "获取办公地板报价", es: "Solicitar cotización para oficina" },
    relatedLinks: [{ href: "/spc-flooring", label: { en: "SPC Flooring Products", zh: "SPC 地板产品", es: "Productos SPC" } }, { href: "/contact", label: { en: "Quote Request", zh: "询价", es: "Solicitar precio" } }],
  },
  {
    id: "mixed-container",
    slug: APPLICATION_SLUGS[5],
    localeSlugs: sameSlug(APPLICATION_SLUGS[5]),
    tag: { en: "Mixed Container", zh: "混装柜", es: "Contenedor mixto" },
    title: { en: "Mixed Container Planning for SPC Flooring, Wall Panels and PVC Ceiling Panels", zh: "SPC 地板、墙板与 PVC 吊顶混装方案", es: "Planificación de contenedor mixto para pisos SPC, paneles de pared y cielorrasos PVC" },
    summary: { en: "Mixed-loading support for buyers who want to combine SPC flooring, wall panels, PVC ceiling panels and accessories in one shipment.", zh: "为希望在同一票货中组合 SPC 地板、墙板、PVC 吊顶和配件的买家提供混装规划支持。", es: "Soporte de carga mixta para compradores que desean combinar pisos SPC, paneles de pared, cielorrasos PVC y accesorios en un envío." },
    metaTitle: { en: "Mixed Container Planning for SPC Flooring and Wall Panels | Eshsire Group", zh: "SPC 地板墙板混装柜方案 | Eshsire Group", es: "Contenedor mixto para pisos SPC y paneles | Eshsire Group" },
    metaDescription: { en: "Plan mixed containers for SPC flooring, wall panels, PVC ceiling panels and accessories with loading photos and export support.", zh: "SPC 地板、墙板、PVC 吊顶和配件混装柜规划，支持重轻货搭配、装柜照片与出口单证。", es: "Planificación de contenedores mixtos para pisos SPC, paneles, cielorrasos PVC y accesorios con fotos de carga." },
    heroImage: `${apps}/mixed-container.webp`,
    cardImage: `${apps}/mixed-container.webp`,
    galleryImages: [`${apps}/mixed-container.webp`, `${spc}/spc-flooring-1784365931-e64432b8.webp`, `${wall}/wall-panels-1784365193-8295a941.webp`, `${spc}/spc-flooring-1784365975-6369c12a.webp`, `${factory}/factory-process-05-factory-8170cff5.webp`],
    alt: { en: "Warehouse and carton planning for mixed container loading", zh: "混装柜仓库与纸箱规划", es: "Plan de almacén y cajas para contenedor mixto" },
    suitableFor: { en: ["Importers", "Distributors", "Mixed product buyers", "Building material wholesalers", "Container order buyers"], zh: ["进口商", "经销商", "混合产品买家", "建材批发商", "整柜订单买家"], es: ["Importadores", "Distribuidores", "Compradores de producto mixto", "Mayoristas de materiales", "Compradores por contenedor"] },
    productOptions: { en: ["SPC flooring", "Wall panels", "PVC ceiling panels", "Skirting", "Trims and accessories"], zh: ["SPC 地板", "墙板", "PVC 吊顶", "踢脚线", "收边条与配件"], es: ["Pisos SPC", "Paneles de pared", "Cielorrasos PVC", "Zócalos", "Perfiles y accesorios"] },
    eshsireSupport: { en: ["Calculate loading plan", "Balance heavy and light products", "Confirm pallet and carton details", "Provide loading photos or videos", "Coordinate export documents"], zh: ["计算装柜方案", "平衡重货与轻货", "确认托盘和纸箱细节", "提供装柜照片或视频", "协同出口单证"], es: ["Calcular plan de carga", "Balancear productos pesados y ligeros", "Confirmar palets y cajas", "Ofrecer fotos o videos de carga", "Coordinar documentos"] },
    qualityWorkflow: { en: ["Confirm product mix", "Review carton dimensions", "Plan loading order", "Check loading record before shipment"], zh: ["确认产品组合", "复核纸箱尺寸", "规划装柜顺序", "出货前检查装柜记录"], es: ["Confirmar mezcla de productos", "Revisar dimensiones de caja", "Planificar orden de carga", "Revisar registro de carga"] },
    shipmentSupport: { en: ["Loading plan", "Pallet and carton list", "Photo and video records", "Commercial invoice and packing list support"], zh: ["装柜方案", "托盘与纸箱清单", "图片视频记录", "发票与装箱单支持"], es: ["Plan de carga", "Lista de palets y cajas", "Fotos y videos", "Factura y lista de empaque"] },
    faq: {
      en: [{ q: "Can flooring and wall panels load in one container?", a: "Yes. We plan heavy and light products together to protect goods and use space well." }, { q: "Can you provide loading photos?", a: "Yes. Loading photos or videos can be arranged before shipment." }, { q: "Can accessories be added?", a: "Yes. Skirting, trims and related accessories can be included in the loading plan." }],
      zh: [{ q: "地板和墙板可以同柜吗？", a: "可以，我们会搭配重货和轻货，兼顾保护和空间利用。" }, { q: "可以提供装柜照片吗？", a: "可以，出货前可安排装柜图片或视频。" }, { q: "配件可以一起加进去吗？", a: "可以，踢脚线、收边条等配件可纳入装柜方案。" }],
      es: [{ q: "¿Pisos y paneles pueden ir en un contenedor?", a: "Sí. Planificamos productos pesados y ligeros para proteger la carga y usar bien el espacio." }, { q: "¿Pueden dar fotos de carga?", a: "Sí. Se pueden organizar fotos o videos antes del envío." }, { q: "¿Se pueden agregar accesorios?", a: "Sí. Zócalos, perfiles y accesorios pueden incluirse." }],
    },
    cta: { en: "Ask for Mixed Container Plan", zh: "咨询混装柜方案", es: "Pedir plan de contenedor mixto" },
    relatedLinks: [{ href: "/spc-flooring", label: { en: "SPC Flooring", zh: "SPC 地板", es: "Pisos SPC" } }, { href: "/wall-panels", label: { en: "Wall Panels", zh: "墙板", es: "Paneles de pared" } }, { href: "/contact", label: { en: "Container Quote", zh: "整柜询价", es: "Cotización de contenedor" } }],
  },
  {
    id: "public-spaces",
    slug: APPLICATION_SLUGS[6],
    localeSlugs: sameSlug(APPLICATION_SLUGS[6]),
    tag: { en: "Public Space", zh: "公共空间", es: "Espacio público" },
    title: { en: "Easy-Maintenance SPC Flooring for Public Spaces", zh: "易清洁公共空间 SPC 地板方案", es: "Pisos SPC de fácil mantenimiento para espacios públicos" },
    summary: { en: "Waterproof and easy-maintenance SPC flooring options for public service areas, corridors and frequent-cleaning environments.", zh: "面向公共服务区、走廊和高频清洁环境，提供防水、易清洁的 SPC 地板选型。", es: "Opciones SPC impermeables y fáciles de mantener para áreas de servicio público, pasillos y ambientes de limpieza frecuente." },
    metaTitle: { en: "Easy-Maintenance SPC Flooring for Public Spaces | Eshsire Group", zh: "公共空间易清洁 SPC 地板方案 | Eshsire Group", es: "Pisos SPC fáciles de mantener para espacios públicos | Eshsire Group" },
    metaDescription: { en: "Waterproof easy-maintenance SPC flooring for public spaces, corridors and frequent-cleaning areas with samples and shipment support.", zh: "公共空间、走廊和高频清洁区域 SPC 地板选型，支持防水易清洁表面、样品、包装检查和发货规划。", es: "Pisos SPC impermeables de fácil mantenimiento para espacios públicos con muestras y soporte de envío." },
    heroImage: `${spc}/spc-flooring-1784366149-a77c88a2.webp`,
    cardImage: `${spc}/spc-flooring-1784366149-a77c88a2.webp`,
    galleryImages: [`${spc}/spc-flooring-1784366149-a77c88a2.webp`, `${spc}/spc-flooring-spc-img-0010-415e2d72.webp`, `${spc}/spc-flooring-1784365955-e091700c.webp`, `${spc}/spc-flooring-1784365346-1c110a30.webp`],
    alt: { en: "Light-color SPC flooring sample for easy maintenance", zh: "易维护浅色 SPC 地板样品", es: "Muestra SPC clara de fácil mantenimiento" },
    suitableFor: { en: ["Public service areas", "Clinics", "Corridors", "High-cleaning spaces", "Utility areas"], zh: ["公共服务区域", "诊所", "走廊", "高频清洁空间", "功能区域"], es: ["Áreas de servicio público", "Clínicas", "Pasillos", "Espacios de limpieza frecuente", "Áreas utilitarias"] },
    productOptions: { en: ["Waterproof SPC", "Easy-clean surface", "Wear-resistant options", "Neutral colors", "Matching accessories"], zh: ["防水 SPC", "易清洁表面", "耐磨选项", "中性花色", "配套配件"], es: ["SPC impermeable", "Superficie fácil de limpiar", "Opciones resistentes", "Colores neutros", "Accesorios a juego"] },
    eshsireSupport: { en: ["Recommend surface and wear layer", "Prepare samples", "Confirm packing", "Share inspection records", "Plan shipment"], zh: ["推荐表面和耐磨层", "准备样品", "确认包装", "提供检查记录", "规划发货"], es: ["Recomendar superficie y capa", "Preparar muestras", "Confirmar empaque", "Compartir inspecciones", "Planificar envío"] },
    qualityWorkflow: { en: ["Confirm cleaning frequency", "Select surface texture", "Check plank surface and lock", "Record packing status"], zh: ["确认清洁频率", "选择表面纹理", "检查板面和锁扣", "记录包装状态"], es: ["Confirmar frecuencia de limpieza", "Seleccionar textura", "Revisar superficie y click", "Registrar empaque"] },
    shipmentSupport: { en: ["Accessory matching", "Carton packing check", "Loading photos", "Export documents"], zh: ["配件匹配", "纸箱包装检查", "装柜照片", "出口单证"], es: ["Accesorios compatibles", "Revisión de cajas", "Fotos de carga", "Documentos de exportación"] },
    faq: {
      en: [{ q: "Why is SPC flooring suitable for public spaces?", a: "SPC flooring is waterproof, easy to clean and wear-resistant, making it suitable for corridors, public service areas and frequent-cleaning environments." }, { q: "What surface should be selected for public areas?", a: "Buyers should consider easy-clean surface, wear resistance and suitable anti-slip performance based on traffic level and cleaning frequency." }, { q: "Can SPC flooring be shipped together with wall panels or PVC ceiling panels?", a: "Yes. We can help plan mixed shipments with SPC flooring, wall panels, PVC ceiling panels and accessories to improve container utilization." }],
      zh: [{ q: "公共空间为什么适合使用 SPC 地板？", a: "SPC 地板具备防水、易清洁和耐磨特点，适合走廊、公共服务区域和需要频繁清洁的空间。" }, { q: "公共空间应该选择什么表面？", a: "建议选择易清洁、耐磨、防滑性能合适的表面，具体可根据项目人流量和清洁频率确认。" }, { q: "可以和墙板、PVC 吊顶或配件一起发货吗？", a: "可以。我们可以协助规划 SPC 地板、墙板、PVC 吊顶和配件混装，提高集装箱利用率。" }],
      es: [{ q: "¿Por qué el piso SPC es adecuado para espacios públicos?", a: "El piso SPC es impermeable, fácil de limpiar y resistente al desgaste, adecuado para pasillos, áreas públicas y espacios con limpieza frecuente." }, { q: "¿Qué superficie se recomienda para áreas públicas?", a: "Se recomienda considerar una superficie fácil de limpiar, resistente al desgaste y con desempeño antideslizante adecuado según el tráfico y la frecuencia de limpieza." }, { q: "¿Se puede enviar junto con paneles de pared o cielorrasos PVC?", a: "Sí. Podemos ayudar a planificar envíos mixtos con pisos SPC, paneles de pared, cielorrasos PVC y accesorios." }],
    },
    cta: { en: "Request Public Space Flooring Advice", zh: "咨询公共空间地板方案", es: "Solicitar asesoría para espacios públicos" },
    relatedLinks: [{ href: "/spc-flooring/specs", label: { en: "SPC Specs", zh: "SPC 参数", es: "Especificaciones SPC" } }, { href: "/accessories", label: { en: "Accessories", zh: "配件", es: "Accesorios" } }],
  },
  {
    id: "wall-panels",
    slug: APPLICATION_SLUGS[7],
    localeSlugs: sameSlug(APPLICATION_SLUGS[7]),
    tag: { en: "Wall Panels", zh: "墙板", es: "Paneles" },
    title: { en: "Interior Wall Panel Solutions for Global Buyers", zh: "室内墙板与装饰墙面供货方案", es: "Soluciones de paneles interiores para compradores globales" },
    summary: { en: "SPC, WPC, grille and decorative wall panel solutions with matching colors, profiles, accessories and installation support.", zh: "提供 SPC、WPC、格栅和装饰墙板方案，支持花色、型材、配件和安装匹配。", es: "Soluciones de paneles SPC, WPC, tipo grille y decorativos con colores, perfiles, accesorios y soporte de instalación." },
    metaTitle: { en: "Interior Wall Panel Solutions for Global Buyers | Eshsire Group", zh: "室内墙板与装饰墙面供货方案 | Eshsire Group", es: "Soluciones de paneles interiores | Eshsire Group" },
    metaDescription: { en: "Interior wall panel supply with SPC, WPC, grille panels, profiles, accessories, color catalog and mixed shipment support.", zh: "室内墙板供货，覆盖 SPC、WPC、格栅墙板、配件、花色目录和地板混装发货支持。", es: "Suministro de paneles interiores SPC, WPC y grille con perfiles, accesorios, colores y envío mixto." },
    heroImage: `${apps}/wall-panels.webp`,
    cardImage: `${apps}/wall-panels.webp`,
    galleryImages: [`${apps}/wall-panels.webp`, `${wall}/wall-panels-1784364374-8e7869af.webp`, `${wall}/wall-panels-1784364602-0fe702ee.webp`, `${wall}/wall-panels-1784364785-ce7b6bbd.webp`, `${wall}/wall-panels-1784365193-8295a941.webp`],
    alt: { en: "Interior wall panel product and decorative application", zh: "室内墙板产品与装饰应用", es: "Producto y aplicación decorativa de panel interior" },
    suitableFor: { en: ["Wall panel distributors", "Interior contractors", "Villa decoration", "Commercial interiors", "Renovation buyers"], zh: ["墙板经销商", "室内承包商", "别墅装饰", "商业室内空间", "翻新买家"], es: ["Distribuidores de paneles", "Contratistas interiores", "Decoración de villas", "Interiores comerciales", "Compradores de renovación"] },
    productOptions: { en: ["SPC wall panels", "WPC wall panels", "Grille wall panels", "Inside corners", "Outside corners", "Skirting and top lines"], zh: ["SPC 墙板", "WPC 墙板", "格栅墙板", "内角线", "外角线", "踢脚线与顶线"], es: ["Paneles SPC", "Paneles WPC", "Paneles tipo grille", "Esquinas internas", "Esquinas externas", "Zócalos y líneas superiores"] },
    eshsireSupport: { en: ["Recommend wall panel type", "Provide color catalog", "Match accessories", "Confirm packing and quantity", "Plan mixed shipment with flooring"], zh: ["推荐墙板类型", "提供花色目录", "匹配配件", "确认包装和数量", "与地板混装发货规划"], es: ["Recomendar tipo de panel", "Proporcionar catálogo de colores", "Combinar accesorios", "Confirmar empaque y cantidad", "Planificar envío mixto con pisos"] },
    qualityWorkflow: { en: ["Confirm panel type and profile", "Match color and accessories", "Check panel surface and edge", "Record packing before shipment"], zh: ["确认墙板类型与型材", "匹配花色和配件", "检查板面与边部", "出货前记录包装"], es: ["Confirmar tipo y perfil", "Combinar color y accesorios", "Revisar superficie y borde", "Registrar empaque antes del envío"] },
    shipmentSupport: { en: ["Wall panel carton planning", "Accessory packing", "Forklift/loading records", "Mixed shipment support"], zh: ["墙板纸箱规划", "配件包装", "叉车/装车记录", "混装发货支持"], es: ["Plan de cajas para paneles", "Empaque de accesorios", "Registros de carga", "Soporte de envío mixto"] },
    faq: {
      en: [{ q: "Do you supply wall panel accessories?", a: "Yes. Inside corners, outside corners, skirting and top lines can be matched." }, { q: "Can wall panels ship with flooring?", a: "Yes. Mixed shipment can be planned when quantities and carton details are confirmed." }, { q: "Can you provide a wall panel color catalog?", a: "Yes. Color catalog and product samples can be arranged." }],
      zh: [{ q: "墙板配件可以一起供货吗？", a: "可以，内角线、外角线、踢脚线和顶线都可匹配。" }, { q: "墙板可以和地板混装吗？", a: "可以，数量和纸箱信息确认后可规划混装发货。" }, { q: "可以提供墙板花色目录吗？", a: "可以，可安排花色目录和产品样品。" }],
      es: [{ q: "¿Suministran accesorios de panel?", a: "Sí. Esquinas, zócalos y líneas superiores pueden combinarse." }, { q: "¿Paneles y pisos pueden enviarse juntos?", a: "Sí. Se puede planificar envío mixto al confirmar cantidades y cajas." }, { q: "¿Pueden dar catálogo de colores?", a: "Sí. Catálogo y muestras pueden organizarse." }],
    },
    cta: { en: "Get Wall Panel Catalog", zh: "获取墙板目录", es: "Obtener catálogo de paneles" },
    relatedLinks: [{ href: "/wall-panels", label: { en: "Wall Panel Products", zh: "墙板产品", es: "Productos de panel" } }, { href: "/mixed-container-spc-flooring-wall-panels", label: { en: "Mixed Container Landing", zh: "混装柜专题", es: "Página de contenedor mixto" } }, { href: "/contact", label: { en: "Request Catalog", zh: "索取目录", es: "Solicitar catálogo" } }],
  },
];

export function appLocale(locale: Locale | string): ApplicationLocale {
  return locale === "zh" ? "zh" : locale === "es" ? "es" : "en";
}

export function getApplicationPath(locale: Locale | string, slug: string): string {
  return `/${locale}/applications/${slug}`;
}

export function getProjectApplication(slug: string): ProjectApplication | undefined {
  return PROJECT_APPLICATIONS.find((item) => item.slug === slug);
}

export function localizeProjectApplication(application: ProjectApplication, locale: Locale | string) {
  const lang = appLocale(locale);
  return {
    tag: application.tag[lang],
    title: application.title[lang],
    summary: application.summary[lang],
    metaTitle: application.metaTitle[lang],
    metaDescription: application.metaDescription[lang],
    alt: application.alt[lang],
    suitableFor: application.suitableFor[lang],
    productOptions: application.productOptions[lang],
    eshsireSupport: application.eshsireSupport[lang],
    qualityWorkflow: application.qualityWorkflow[lang],
    shipmentSupport: application.shipmentSupport[lang],
    faq: application.faq[lang],
    cta: application.cta[lang],
    relatedLinks: application.relatedLinks.map((link) => ({ href: link.href, label: link.label[lang] })),
  };
}
