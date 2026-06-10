import type { Locale } from "@/i18n/locales";
import type { BlogBlock } from "./types";

type LinkSegment = string | { link: string; href: string };

const internalLinksContent: Record<Locale, LinkSegment[]> = {
  en: [
    "Eshsire Group is a ",
    { link: "SPC flooring supplier", href: "/spc-flooring" },
    " and ",
    { link: "China flooring factory", href: "/factory" },
    " offering ",
    { link: "wholesale wall panel supply", href: "/wall-panels" },
    ". ",
    { link: "Request a quotation", href: "/contact" },
    " for container pricing and bulk orders.",
  ],
  zh: [
    "Eshsire Group 是专业的 ",
    { link: "SPC 地板供应商", href: "/spc-flooring" },
    " 与 ",
    { link: "中国地板工厂", href: "/factory" },
    "，提供 ",
    { link: "墙板批发供应", href: "/wall-panels" },
    "。",
    { link: "索取报价", href: "/contact" },
    " 获取整柜价格与大货批量价。",
  ],
  es: [
    "Eshsire Group es ",
    { link: "proveedor de suelos SPC", href: "/spc-flooring" },
    " y ",
    { link: "fábrica de suelos en China", href: "/factory" },
    " con ",
    { link: "suministro mayorista de paneles murales", href: "/wall-panels" },
    ". ",
    { link: "Solicite cotización", href: "/contact" },
    " para precios de contenedor y pedidos al por mayor.",
  ],
  ar: [
    "Eshsire Group ",
    { link: "مورد أرضيات SPC", href: "/spc-flooring" },
    " و",
    { link: "مصنع أرضيات في الصين", href: "/factory" },
    " يقدم ",
    { link: "توريد ألواح جدارية بالجملة", href: "/wall-panels" },
    ". ",
    { link: "اطلب عرض سعر", href: "/contact" },
    " لأسعار الحاويات والطلبات بالجملة.",
  ],
  de: [
    "Eshsire Group ist ",
    { link: "SPC-Boden Lieferant", href: "/spc-flooring" },
    " und ",
    { link: "Bodenfabrik in China", href: "/factory" },
    " mit ",
    { link: "Wandpaneele Großhandel", href: "/wall-panels" },
    ". ",
    { link: "Angebot anfordern", href: "/contact" },
    " für Containerpreise und Bulk-Bestellungen.",
  ],
  fr: [
    "Eshsire Group est ",
    { link: "fournisseur de sols SPC", href: "/spc-flooring" },
    " et ",
    { link: "usine de sols en Chine", href: "/factory" },
    " avec ",
    { link: "panneaux muraux en gros", href: "/wall-panels" },
    ". ",
    { link: "Demander un devis", href: "/contact" },
    " pour prix conteneur et commandes en volume.",
  ],
  he: [
    "Eshsire Group הוא ",
    { link: "ספק רצפות SPC", href: "/spc-flooring" },
    " ו",
    { link: "מפעל רצפות בסין", href: "/factory" },
    " עם ",
    { link: "אספקת פאנלים לקירות בסיטונות", href: "/wall-panels" },
    ". ",
    { link: "בקש הצעת מחיר", href: "/contact" },
    " למחירי מכולות והזמנות בכמות.",
  ],
  id: [
    "Eshsire Group adalah ",
    { link: "pemasok lantai SPC", href: "/spc-flooring" },
    " dan ",
    { link: "pabrik lantai China", href: "/factory" },
    " yang menyediakan ",
    { link: "panel dinding grosir", href: "/wall-panels" },
    ". ",
    { link: "Minta penawaran", href: "/contact" },
    " untuk harga kontainer dan pesanan bulk.",
  ],
  it: [
    "Eshsire Group è ",
    { link: "fornitore pavimenti SPC", href: "/spc-flooring" },
    " e ",
    { link: "fabbrica pavimenti in Cina", href: "/factory" },
    " con ",
    { link: "fornitura pannelli murali all'ingrosso", href: "/wall-panels" },
    ". ",
    { link: "Richiedi preventivo", href: "/contact" },
    " per prezzi container e ordini all'ingrosso.",
  ],
  ja: [
    "Eshsire Groupは ",
    { link: "SPCフローリングサプライヤー", href: "/spc-flooring" },
    " 兼 ",
    { link: "中国フローリング工場", href: "/factory" },
    " で ",
    { link: "壁パネル卸供給", href: "/wall-panels" },
    " を提供しています。",
    { link: "見積依頼", href: "/contact" },
    " でコンテナ価格・大口注文のお問い合わせ。",
  ],
  ko: [
    "Eshsire Group은 ",
    { link: "SPC 바닥재 공급업체", href: "/spc-flooring" },
    " 및 ",
    { link: "중국 바닥재 공장", href: "/factory" },
    "으로 ",
    { link: "벽 패널 도매 공급", href: "/wall-panels" },
    "을 제공합니다. ",
    { link: "견적 요청", href: "/contact" },
    "으로 컨테이너 가격 및 대량 주문 문의.",
  ],
  pt: [
    "A Eshsire Group é ",
    { link: "fornecedor de pavimentos SPC", href: "/spc-flooring" },
    " e ",
    { link: "fábrica de pavimentos na China", href: "/factory" },
    " com ",
    { link: "painéis de parede por grosso", href: "/wall-panels" },
    ". ",
    { link: "Pedir cotação", href: "/contact" },
    " para preços de contentor e encomendas em volume.",
  ],
  ru: [
    "Eshsire Group — ",
    { link: "поставщик SPC напольных покрытий", href: "/spc-flooring" },
    " и ",
    { link: "фабрика напольных покрытий в Китае", href: "/factory" },
    " с ",
    { link: "оптовыми стеновыми панелями", href: "/wall-panels" },
    ". ",
    { link: "Запросить коммерческое предложение", href: "/contact" },
    " для цен на контейнер и оптовые заказы.",
  ],
  th: [
    "Eshsire Group เป็น ",
    { link: "ซัพพลายเออร์พื้น SPC", href: "/spc-flooring" },
    " และ ",
    { link: "โรงงานพื้นในจีน", href: "/factory" },
    " ที่มี ",
    { link: "แผ่นผนังขายส่ง", href: "/wall-panels" },
    " ",
    { link: "ขอใบเสนอราคา", href: "/contact" },
    " สำหรับราคาตู้คอนเทนเนอร์และออเดอร์จำนวนมาก",
  ],
  tr: [
    "Eshsire Group bir ",
    { link: "SPC zemin tedarikçisi", href: "/spc-flooring" },
    " ve ",
    { link: "Çin zemin fabrikasıdır", href: "/factory" },
    "; ",
    { link: "toptan duvar paneli tedariki", href: "/wall-panels" },
    " sunar. ",
    { link: "Teklif isteyin", href: "/contact" },
    " — konteyner fiyatı ve toplu siparişler.",
  ],
  vi: [
    "Eshsire Group là ",
    { link: "nhà cung cấp sàn SPC", href: "/spc-flooring" },
    " và ",
    { link: "nhà máy sàn tại Trung Quốc", href: "/factory" },
    " cung cấp ",
    { link: "tấm ốp tường bán sỉ", href: "/wall-panels" },
    ". ",
    { link: "Yêu cầu báo giá", href: "/contact" },
    " cho giá container và đơn hàng số lượng lớn.",
  ],
};

export type BlogProcurementLabels = {
  title: string;
  text: string;
  requestPriceList: string;
  containerQuotation: string;
  bulkOrderPricing: string;
};

const procurementLabels: Record<Locale, BlogProcurementLabels> = {
  en: {
    title: "Factory Direct Pricing for Distributors & Contractors",
    text: "Contact Eshsire Group for an SPC flooring quotation, OEM packaging support, daily production updates, and a weight-based container loading plan. Reply within 24 hours.",
    requestPriceList: "Request Factory Price List",
    containerQuotation: "Get Container Quotation",
    bulkOrderPricing: "Get Bulk Order Pricing",
  },
  zh: {
    title: "工厂直供价 — 面向经销商与工程承包商",
    text: "联系出口团队索取工厂价目表、40HQ 整柜报价及 SPC 地板大货批量价，24 小时内回复。",
    requestPriceList: "索取工厂价目表",
    containerQuotation: "获取整柜报价",
    bulkOrderPricing: "获取大货批量价",
  },
  es: {
    title: "Precio directo de fábrica para distribuidores y contratistas",
    text: "Contacte a nuestro equipo de exportación para lista de precios de fábrica, cotización de contenedor 40HQ y precios mayoristas de suelos SPC. Respuesta en 24 horas.",
    requestPriceList: "Solicitar lista de precios de fábrica",
    containerQuotation: "Cotización de contenedor",
    bulkOrderPricing: "Precio por pedido al por mayor",
  },
  ar: {
    title: "أسعار مباشرة من المصنع للموزعين والمقاولين",
    text: "تواصل مع فريق التصدير للحصول على قائمة أسعار المصنع وعرض حاوية 40HQ وأسعار SPC بالجملة. رد خلال 24 ساعة.",
    requestPriceList: "طلب قائمة أسعار المصنع",
    containerQuotation: "عرض سعر الحاوية",
    bulkOrderPricing: "سعر الطلب بالجملة",
  },
  de: {
    title: "Direkt ab Werk — für Händler & Auftragnehmer",
    text: "Kontaktieren Sie unser Exportteam für Werkspreisliste, 40HQ-Containerangebot und SPC-Großhandelspreise. Antwort innerhalb von 24 Stunden.",
    requestPriceList: "Werkspreisliste anfordern",
    containerQuotation: "Containerangebot",
    bulkOrderPricing: "Großhandelspreis",
  },
  fr: {
    title: "Prix direct usine pour distributeurs et entrepreneurs",
    text: "Contactez notre équipe export pour liste de prix usine, devis conteneur 40HQ et tarifs SPC en gros. Réponse sous 24 h.",
    requestPriceList: "Demander la liste de prix usine",
    containerQuotation: "Devis conteneur",
    bulkOrderPricing: "Prix commande en gros",
  },
  he: {
    title: "מחיר ישיר מהמפעל למפיצים וקבלנים",
    text: "צור קשר עם צוות הייצוא לרשימת מחירי מפעל, הצעת מחיר למכולה 40HQ ומחירי SPC בכמות. מענה תוך 24 שעות.",
    requestPriceList: "בקש רשימת מחירי מפעל",
    containerQuotation: "הצעת מחיר למכולה",
    bulkOrderPricing: "מחיר הזמנה בכמות",
  },
  id: {
    title: "Harga Langsung Pabrik untuk Distributor & Kontraktor",
    text: "Hubungi tim ekspor kami untuk daftar harga pabrik, penawaran kontainer 40HQ, dan harga SPC grosir. Balasan dalam 24 jam.",
    requestPriceList: "Minta Daftar Harga Pabrik",
    containerQuotation: "Penawaran Kontainer",
    bulkOrderPricing: "Harga Pesanan Bulk",
  },
  it: {
    title: "Prezzo diretto di fabbrica per distributori e appaltatori",
    text: "Contatta il team export per listino prezzi di fabbrica, preventivo container 40HQ e prezzi SPC all'ingrosso. Risposta entro 24 ore.",
    requestPriceList: "Richiedi listino prezzi fabbrica",
    containerQuotation: "Preventivo container",
    bulkOrderPricing: "Prezzo ordine all'ingrosso",
  },
  ja: {
    title: "ディストリビューター・施工業者向け工場直供価格",
    text: "工場価格表、40HQコンテナ見積、SPCフローリング大口価格は輸出チームまで。24時間以内に返信。",
    requestPriceList: "工場価格表を請求",
    containerQuotation: "コンテナ見積",
    bulkOrderPricing: "大口注文価格",
  },
  ko: {
    title: "유통업체·시공사를 위한 공장 직공급 가격",
    text: "공장 가격표, 40HQ 컨테이너 견적, SPC 바닥재 대량 가격은 수출팀에 문의하세요. 24시간 내 회신.",
    requestPriceList: "공장 가격표 요청",
    containerQuotation: "컨테이너 견적",
    bulkOrderPricing: "대량 주문 가격",
  },
  pt: {
    title: "Preço direto de fábrica para distribuidores e empreiteiros",
    text: "Contacte a nossa equipa de exportação para lista de preços de fábrica, cotação de contentor 40HQ e preços SPC por grosso. Resposta em 24 horas.",
    requestPriceList: "Pedir lista de preços de fábrica",
    containerQuotation: "Cotação de contentor",
    bulkOrderPricing: "Preço de encomenda por grosso",
  },
  ru: {
    title: "Прямые цены с фабрики для дистрибьюторов и подрядчиков",
    text: "Свяжитесь с экспортным отделом для прайс-листа, расчёта контейнера 40HQ и оптовых цен на SPC. Ответ в течение 24 часов.",
    requestPriceList: "Запросить прайс-лист фабрики",
    containerQuotation: "Расчёт контейнера",
    bulkOrderPricing: "Цена оптового заказа",
  },
  th: {
    title: "ราคาตรงจากโรงงานสำหรับตัวแทนจำหน่ายและผู้รับเหมา",
    text: "ติดต่อทีมส่งออกเพื่อขอรายการราคาโรงงาน ใบเสนอราคาตู้ 40HQ และราคาพื้น SPC จำนวนมาก ตอบกลับภายใน 24 ชม.",
    requestPriceList: "ขอรายการราคาโรงงาน",
    containerQuotation: "ใบเสนอราคาตู้คอนเทนเนอร์",
    bulkOrderPricing: "ราคาสั่งซื้อจำนวนมาก",
  },
  tr: {
    title: "Distribütörler ve müteahhitler için fabrikadan direkt fiyat",
    text: "Fabrika fiyat listesi, 40HQ konteyner teklifi ve toplu SPC zemin fiyatları için ihracat ekibimizle iletişime geçin. 24 saat içinde yanıt.",
    requestPriceList: "Fabrika Fiyat Listesi İste",
    containerQuotation: "Konteyner Teklifi",
    bulkOrderPricing: "Toplu Sipariş Fiyatı",
  },
  vi: {
    title: "Giá trực tiếp từ nhà máy cho nhà phân phối & nhà thầu",
    text: "Liên hệ đội xuất khẩu để nhận bảng giá nhà máy, báo giá container 40HQ và giá sàn SPC số lượng lớn. Phản hồi trong 24 giờ.",
    requestPriceList: "Yêu cầu bảng giá nhà máy",
    containerQuotation: "Báo giá container",
    bulkOrderPricing: "Giá đơn hàng số lượng lớn",
  },
};

export function getBlogProcurementLabels(locale: Locale): BlogProcurementLabels {
  return procurementLabels[locale] ?? procurementLabels.en;
}

/** Standard internal-link paragraph for auto-generated B2B articles */
export function internalLinksBlock(locale: Locale = "en"): BlogBlock {
  return { type: "rich-p", segments: internalLinksContent[locale] ?? internalLinksContent.en };
}

export function b2bCtaBlock(locale: Locale = "en", text?: string): BlogBlock {
  const defaults = getBlogProcurementLabels(locale);
  return {
    type: "cta",
    variant: "b2b-procurement",
    title: defaults.title,
    text: text ?? defaults.text,
  };
}

export function imgBlock(
  src: string,
  alt: string,
  caption?: string
): BlogBlock {
  return { type: "img", src, alt, caption };
}
