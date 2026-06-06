/**
 * V2 contextual internal links — ≥3 links, localized anchors
 */
const PRODUCT_LINK = {
  en: ["Browse ", "SPC flooring factory supply", "/spc-flooring"],
  zh: ["浏览 ", "SPC 地板工厂供应", "/spc-flooring"],
  es: ["Ver ", "suministro fábrica suelos SPC", "/spc-flooring"],
  de: ["Entdecken Sie ", "SPC-Boden Fabrikversorgung", "/spc-flooring"],
  fr: ["Voir ", "approvisionnement usine sols SPC", "/spc-flooring"],
  ar: ["تصفح ", "توريد مصنع أرضيات SPC", "/spc-flooring"],
  ru: ["Смотрите ", "поставки SPC с фабрики", "/spc-flooring"],
  it: ["Sfoglia ", "fornitura fabbrica pavimenti SPC", "/spc-flooring"],
  pt: ["Ver ", "fornecimento fábrica pavimentos SPC", "/spc-flooring"],
  ja: ["見る ", "SPC床材工場供給", "/spc-flooring"],
  ko: ["보기 ", "SPC 바닥재 공장 공급", "/spc-flooring"],
  id: ["Lihat ", "pasokan pabrik lantai SPC", "/spc-flooring"],
  th: ["ดู ", "จัดหาโรงงานพื้น SPC", "/spc-flooring"],
  tr: ["İnceleyin ", "SPC zemin fabrika tedariki", "/spc-flooring"],
  vi: ["Xem ", "cung ứng nhà máy sàn SPC", "/spc-flooring"],
  he: ["עיינו ", "אספקת מפעל רצפות SPC", "/spc-flooring"],
};

const RELATED_BY_TOPIC = {
  logistics: ["load-40hq-container-spc-flooring-export"],
  supplier: ["spc-flooring-supplier-manufacturer-china", "choose-reliable-spc-flooring-supplier-china-2026"],
  profit: ["spc-flooring-factory-price-bulk-container-orders"],
  project: ["spc-flooring-supply-hotel-project-africa"],
  risk: ["7-mistakes-importing-spc-flooring-from-china"],
  factory: ["spc-flooring-factory-price-bulk-container-orders"],
};

const RELATED_ANCHOR = {
  en: "Related procurement guide",
  zh: "相关采购指南",
  es: "Guía de compras relacionada",
  de: "Verwandter Einkaufsleitfaden",
  fr: "Guide d'achat connexe",
  ar: "دليل شراء ذو صلة",
  ru: "Связанное руководство по закупкам",
  it: "Guida acquisti correlata",
  pt: "Guia de compras relacionado",
  ja: "関連調達ガイド",
  ko: "관련 조달 가이드",
  id: "Panduan pengadaan terkait",
  th: "คู่มือจัดซื้อที่เกี่ยวข้อง",
  tr: "İlgili tedarik rehberi",
  vi: "Hướng dẫn mua hàng liên quan",
  he: "מדריך רכש קשור",
};

function richLink(parts, locale) {
  const p = parts[locale] ?? parts.en;
  return { type: "rich-p", segments: [p[0], { link: p[1], href: p[2] }] };
}

/**
 * Inject topic-related blog links if slugs exist in published set
 */
export function injectInternalLinks(blocks, locale, topicType, publishedSlugs = []) {
  const out = [...blocks];
  const related = RELATED_BY_TOPIC[topicType] ?? RELATED_BY_TOPIC.supplier;
  const anchor = RELATED_ANCHOR[locale] ?? RELATED_ANCHOR.en;

  for (const slug of related) {
    if (publishedSlugs.includes(slug) && out.length > 2) {
      out.splice(out.length - 2, 0, {
        type: "rich-p",
        segments: [`${anchor}: `, { link: slug.replace(/-/g, " "), href: `/blog/${slug}` }],
      });
      break;
    }
  }

  if (!out.some((b) => b.type === "rich-p" && b.segments?.some((s) => typeof s !== "string" && s.href === "/spc-flooring"))) {
    out.splice(1, 0, richLink(PRODUCT_LINK, locale));
  }

  return out;
}

export function countInternalLinks(blocks) {
  let n = 0;
  for (const b of blocks) {
    if (b.type === "rich-p") {
      for (const s of b.segments) if (typeof s !== "string" && s.href) n++;
    }
  }
  return n;
}
