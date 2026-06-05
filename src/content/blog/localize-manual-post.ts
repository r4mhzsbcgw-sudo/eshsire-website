import type { Locale } from "@/i18n/locales";
import type { BlogPost } from "./types";

type PostMeta = Pick<BlogPost, "title" | "metaTitle" | "description">;

/** Localized titles for manual blog posts (body uses EN until full translation) */
const manualPostMeta: Partial<Record<Locale, Record<string, PostMeta>>> = {
  de: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "SPC-Boden Lieferant & Hersteller China | Fabrik Großhandel & OEM",
      metaTitle: "SPC-Boden Lieferant China | Fabrik Großhandel OEM",
      description:
        "Vertrauenswürdiger SPC-Bodenhersteller in China. Direkt ab Werk, OEM-Anpassung, wasserdichte Böden für globale Bauprojekte.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "Zuverlässigen SPC-Boden Lieferanten in China wählen (2026)",
      metaTitle: "SPC-Boden Lieferant China 2026 | Auswahlleitfaden",
      description:
        "So erkennen Sie einen zuverlässigen SPC-Boden Lieferanten in China: Fabrik, QC, Lieferzuverlässigkeit und Exporterfahrung.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "7 Fehler beim SPC-Boden Import aus China",
      metaTitle: "7 Importfehler SPC-Boden China | Händler-Leitfaden",
      description:
        "Häufige Fehler beim SPC-Boden Import aus China vermeiden: Lieferant, QC, Verpackung, Logistik und Preisfallen.",
    },
  },
  fr: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "Fournisseur et fabricant de sols SPC en Chine | Usine & OEM",
      metaTitle: "Fournisseur sols SPC Chine | Usine gros & OEM",
      description:
        "Fabricant de sols SPC fiable en Chine. Approvisionnement direct usine, OEM, sols imperméables pour projets mondiaux.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "Choisir un fournisseur SPC fiable en Chine en 2026",
      metaTitle: "Fournisseur SPC Chine 2026 | Guide de sélection",
      description:
        "Identifier un fournisseur SPC fiable en Chine : usine, QC, fiabilité de livraison et expérience export.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "7 erreurs en important des sols SPC de Chine",
      metaTitle: "7 erreurs import SPC Chine | Guide distributeur",
      description:
        "Évitez les erreurs courantes d'import de sols SPC depuis la Chine : fournisseur, QC, emballage et logistique.",
    },
  },
  ar: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "مورد ومصنع أرضيات SPC في الصين | مصنع جملة وOEM",
      metaTitle: "مورد أرضيات SPC الصين | مصنع جملة OEM",
      description: "مصنع أرضيات SPC موثوق في الصين. توريد مباشر من المصنع وتخصيص OEM لمشاريع عالمية.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "كيفية اختيار مورد SPC موثوق في الصين 2026",
      metaTitle: "مورد SPC الصين 2026 | دليل الاختيار",
      description: "تحديد مورد SPC موثوق: قدرة المصنع، الجودة، التسليم وخبرة التصدير.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "7 أخطاء عند استيراد أرضيات SPC من الصين",
      metaTitle: "7 أخطاء استيراد SPC الصين | دليل الموزع",
      description: "تجنب أخطاء الاستيراد الشائعة: المورد، QC، التعبئة واللوجستيات.",
    },
  },
  ja: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "中国SPC床材サプライヤー・メーカー | 工場卸・OEM",
      metaTitle: "中国SPC床材サプライヤー | 工場卸OEM",
      description: "信頼できる中国SPC床材メーカー。工場直供、OEM、防水床材を世界プロジェクトに。",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "2026年 中国で信頼できるSPC床材サプライヤーの選び方",
      metaTitle: "中国SPCサプライヤー2026 | 選定ガイド",
      description: "工場能力、QC、納期、輸出実績を確認して信頼できるSPCサプライヤーを選ぶ。",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "中国からSPC床材を輸入する際の7つの失敗",
      metaTitle: "SPC輸入7つの失敗 | ディストリビューターガイド",
      description: "サプライヤー選定、QC、梱包、物流でよくある輸入ミスを回避。",
    },
  },
  ko: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "중국 SPC 바닥재 공급업체 및 제조사 | 공장 도매·OEM",
      metaTitle: "중국 SPC 바닥재 공급업체 | 공장 도매 OEM",
      description: "신뢰할 수 있는 중국 SPC 바닥재 제조사. 공장 직공급, OEM, 방수 바닥재 글로벌 프로젝트.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "2026년 중국에서 신뢰할 수 있는 SPC 바닥재 공급업체 선택법",
      metaTitle: "중국 SPC 공급업체 2026 | 선택 가이드",
      description: "공장 역량, QC, 납기, 수출 경험을 확인하여 신뢰할 수 있는 SPC 공급업체를 선택하세요.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "중국에서 SPC 바닥재 수입 시 흔한 7가지 실수",
      metaTitle: "SPC 수입 7가지 실수 | 유통업체 가이드",
      description: "공급업체, QC, 포장, 물류에서 흔한 수입 실수를 피하세요.",
    },
  },
  pt: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "Fornecedor e fabricante de pavimentos SPC na China | Fábrica & OEM",
      metaTitle: "Fornecedor SPC China | Fábrica grossista OEM",
      description: "Fabricante de pavimentos SPC de confiança na China. Fornecimento direto, OEM, projetos globais.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "Como escolher um fornecedor SPC fiável na China em 2026",
      metaTitle: "Fornecedor SPC China 2026 | Guia de seleção",
      description: "Identifique fornecedor SPC fiável: fábrica, QC, entrega e experiência de exportação.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "7 erros ao importar pavimentos SPC da China",
      metaTitle: "7 erros importação SPC China | Guia distribuidor",
      description: "Evite erros comuns na importação SPC: fornecedor, QC, embalagem e logística.",
    },
  },
  ru: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "Поставщик и производитель SPC напольных покрытий в Китае",
      metaTitle: "Поставщик SPC Китай | Опт с фабрики OEM",
      description: "Надёжный производитель SPC в Китае. Прямые поставки с фабрики, OEM, экспорт по всему миру.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "Как выбрать надёжного поставщика SPC в Китае в 2026",
      metaTitle: "Поставщик SPC Китай 2026 | Руководство",
      description: "Как проверить фабрику, QC, сроки поставки и экспортный опыт поставщика SPC.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "7 ошибок при импорте SPC напольных покрытий из Китая",
      metaTitle: "7 ошибок импорта SPC | Гид дистрибьютора",
      description: "Типичные ошибки импорта: поставщик, QC, упаковка и логистика.",
    },
  },
  it: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "Fornitore e produttore pavimenti SPC in Cina | Fabbrica & OEM",
      metaTitle: "Fornitore SPC Cina | Fabbrica ingrosso OEM",
      description: "Produttore SPC affidabile in Cina. Fornitura diretta, OEM, pavimenti impermeabili per progetti globali.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "Come scegliere un fornitore SPC affidabile in Cina nel 2026",
      metaTitle: "Fornitore SPC Cina 2026 | Guida alla scelta",
      description: "Identificare un fornitore SPC affidabile: fabbrica, QC, consegne ed esperienza export.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "7 errori nell'importazione di pavimenti SPC dalla Cina",
      metaTitle: "7 errori import SPC Cina | Guida distributore",
      description: "Evitare errori comuni: fornitore, QC, imballaggio e logistica.",
    },
  },
  id: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "Pemasok & produsen lantai SPC China | Pabrik grosir & OEM",
      metaTitle: "Pemasok lantai SPC China | Pabrik grosir OEM",
      description: "Produsen lantai SPC terpercaya di China. Pasokan langsung pabrik, OEM, proyek global.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "Cara memilih pemasok lantai SPC terpercaya di China 2026",
      metaTitle: "Pemasok SPC China 2026 | Panduan pemilihan",
      description: "Identifikasi pemasok SPC terpercaya: pabrik, QC, pengiriman, pengalaman ekspor.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "7 kesalahan impor lantai SPC dari China",
      metaTitle: "7 kesalahan impor SPC China | Panduan distributor",
      description: "Hindari kesalahan impor umum: pemasok, QC, kemasan, dan logistik.",
    },
  },
  th: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "ซัพพลายเออร์และผู้ผลิตพื้น SPC จีน | โรงงานขายส่ง OEM",
      metaTitle: "ซัพพลายเออร์พื้น SPC จีน | โรงงานขายส่ง OEM",
      description: "ผู้ผลิตพื้น SPC ที่เชื่อถือได้ในจีน ส่งตรงจากโรงงาน OEM สำหรับโปรเจกต์ทั่วโลก",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "วิธีเลือกซัพพลายเออร์พื้น SPC ที่เชื่อถือได้ในจีน 2026",
      metaTitle: "ซัพพลายเออร์ SPC จีน 2026 | คู่มือเลือก",
      description: "ระบุซัพพลายเออร์ SPC ที่เชื่อถือได้: โรงงาน QC การส่งมอบ และประสบการณ์ส่งออก",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "7 ข้อผิดพลาดในการนำเข้าพื้น SPC จากจีน",
      metaTitle: "7 ข้อผิดพลาดนำเข้า SPC | คู่มือตัวแทนจำหน่าย",
      description: "หลีกเลี่ยงข้อผิดพลาดการนำเข้า: ซัพพลายเออร์ QC บรรจุภัณฑ์ และโลจิสติกส์",
    },
  },
  vi: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "Nhà cung cấp & nhà sản xuất sàn SPC Trung Quốc | Nhà máy bán sỉ OEM",
      metaTitle: "Nhà cung cấp sàn SPC Trung Quốc | Nhà máy bán sỉ OEM",
      description: "Nhà sản xuất sàn SPC uy tín tại Trung Quốc. Cung ứng trực tiếp nhà máy, OEM, dự án toàn cầu.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "Cách chọn nhà cung cấp sàn SPC đáng tin cậy tại Trung Quốc 2026",
      metaTitle: "Nhà cung cấp SPC Trung Quốc 2026 | Hướng dẫn lựa chọn",
      description: "Xác định nhà cung cấp SPC đáng tin: nhà máy, QC, giao hàng và kinh nghiệm xuất khẩu.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "7 sai lầm khi nhập khẩu sàn SPC từ Trung Quốc",
      metaTitle: "7 sai lầm nhập SPC | Hướng dẫn nhà phân phối",
      description: "Tránh sai lầm nhập khẩu phổ biến: nhà cung cấp, QC, đóng gói và logistics.",
    },
  },
  tr: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "Çin SPC zemin tedarikçisi ve üreticisi | Fabrika toptan OEM",
      metaTitle: "SPC zemin tedarikçisi Çin | Fabrika toptan OEM",
      description: "Güvenilir Çin SPC zemin üreticisi. Fabrikadan direkt tedarik, OEM, global projeler.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "2026'da Çin'de güvenilir SPC zemin tedarikçisi nasıl seçilir",
      metaTitle: "SPC tedarikçisi Çin 2026 | Seçim rehberi",
      description: "Güvenilir SPC tedarikçisi: fabrika, KK, teslimat ve ihracat deneyimi.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "Çin'den SPC zemin ithalatında 7 hata",
      metaTitle: "7 SPC ithalat hatası | Distribütör rehberi",
      description: "Yaygın ithalat hatalarından kaçının: tedarikçi, KK, ambalaj ve lojistik.",
    },
  },
  he: {
    "spc-flooring-supplier-manufacturer-china": {
      title: "ספק ויצרן רצפות SPC בסין | מפעל סיטונאות OEM",
      metaTitle: "ספק רצפות SPC בסין | מפעל סיטונאות OEM",
      description: "יצרן רצפות SPC אמין בסין. אספקה ישירה מהמפעל, OEM, פרויקטים גלובליים.",
    },
    "choose-reliable-spc-flooring-supplier-china-2026": {
      title: "איך לבחור ספק SPC אמין בסין ב-2026",
      metaTitle: "ספק SPC בסין 2026 | מדריך בחירה",
      description: "זיהוי ספק SPC אמין: יכולת מפעל, QC, אספקה וניסיון ייצוא.",
    },
    "7-mistakes-importing-spc-flooring-from-china": {
      title: "7 טעויות בייבוא רצפות SPC מסין",
      metaTitle: "7 טעויות ייבוא SPC | מדריך מפיץ",
      description: "הימנעו מטעויות ייבוא נפוצות: ספק, QC, אריזה ולוגיסטיקה.",
    },
  },
};

export function localizeManualPost(post: BlogPost, locale: Locale): BlogPost {
  const meta = manualPostMeta[locale]?.[post.slug];
  if (!meta) return post;
  return { ...post, ...meta };
}
