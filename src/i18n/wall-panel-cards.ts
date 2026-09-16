import type { Locale } from "./locales";

type CardCopy = { name: string; desc: string };

// Product cards only; page headings, metadata and other sections are unchanged.
export const wallPanelCards: Record<Locale, CardCopy[]> = {
  en: [
    { name: "SPC Wall Panels", desc: "SPC wall panels with decorative surface options for interior wall finishes and coordinated project supply." },
    { name: "WPC Wall Panels", desc: "WPC wall-panel profiles and wood-look finishes for feature walls and coordinated interior supply." },
    { name: "PVC Ceiling Panels", desc: "PVC ceiling panels in flat, grooved and wave profiles for coordinated interior finishes." },
  ],
  zh: [
    { name: "SPC 墙板", desc: "SPC 室内墙板，提供多种装饰饰面，适用于室内墙面与工程配套供货。" },
    { name: "WPC 墙板", desc: "木纹质感 WPC 墙板及型材，适用于背景墙和室内装饰配套。" },
    { name: "PVC 天花板", desc: "提供平板、凹槽及波浪等 PVC 天花板款式，满足室内吊顶装饰需求。" },
  ],
  es: [
    { name: "Paneles de pared SPC", desc: "Paneles SPC con acabados decorativos para paredes interiores y suministro de proyectos." },
    { name: "Paneles de pared WPC", desc: "Paneles y perfiles WPC con aspecto de madera para paredes decorativas e interiores." },
    { name: "Paneles de techo PVC", desc: "Paneles de techo PVC planos, ranurados y ondulados para acabados interiores." },
  ],
  fr: [
    { name: "Panneaux muraux SPC", desc: "Panneaux SPC à finitions décoratives pour murs intérieurs et approvisionnement de projets." },
    { name: "Panneaux muraux WPC", desc: "Panneaux et profilés WPC à aspect bois pour murs décoratifs et aménagement intérieur." },
    { name: "Panneaux de plafond PVC", desc: "Panneaux de plafond PVC plats, rainurés ou ondulés pour les finitions intérieures." },
  ],
  ar: [
    { name: "ألواح جدران SPC", desc: "ألواح SPC بتشطيبات زخرفية للجدران الداخلية وتوريد المشاريع." },
    { name: "ألواح جدران WPC", desc: "ألواح وقطاعات WPC بمظهر خشبي للجدران الزخرفية والتصميم الداخلي." },
    { name: "ألواح أسقف PVC", desc: "ألواح أسقف PVC مسطحة أو محززة أو متموجة للتشطيبات الداخلية." },
  ],
  ru: [
    { name: "Стеновые панели SPC", desc: "Панели SPC с декоративными покрытиями для внутренних стен и комплектации проектов." },
    { name: "Стеновые панели WPC", desc: "Панели и профили WPC с текстурой дерева для акцентных стен и отделки интерьера." },
    { name: "Потолочные панели PVC", desc: "Плоские, пазовые и волнистые потолочные панели PVC для внутренней отделки." },
  ],
  de: [
    { name: "SPC-Wandpaneele", desc: "SPC-Paneele mit dekorativen Oberflächen für Innenwände und die Projektausstattung." },
    { name: "WPC-Wandpaneele", desc: "WPC-Paneele und Profile in Holzoptik für Akzentwände und Innenausbau." },
    { name: "PVC-Deckenpaneele", desc: "Flache, genutete und gewellte PVC-Deckenpaneele für den Innenausbau." },
  ],
  he: [
    { name: "לוחות קיר SPC", desc: "לוחות SPC בגימורים דקורטיביים לקירות פנים ולאספקה לפרויקטים." },
    { name: "לוחות קיר WPC", desc: "לוחות ופרופילי WPC במראה עץ לקירות דקורטיביים ולעיצוב פנים." },
    { name: "לוחות תקרה PVC", desc: "לוחות תקרה PVC שטוחים, מחורצים וגליים לגימורי פנים." },
  ],
  id: [
    { name: "Panel Dinding SPC", desc: "Panel SPC dengan pilihan lapisan dekoratif untuk dinding interior dan kebutuhan proyek." },
    { name: "Panel Dinding WPC", desc: "Panel dan profil WPC bermotif kayu untuk dinding aksen dan interior." },
    { name: "Panel Plafon PVC", desc: "Panel plafon PVC datar, beralur, dan bergelombang untuk penyelesaian interior." },
  ],
  it: [
    { name: "Pannelli da parete SPC", desc: "Pannelli SPC con finiture decorative per pareti interne e forniture di progetto." },
    { name: "Pannelli da parete WPC", desc: "Pannelli e profili WPC effetto legno per pareti decorative e interni." },
    { name: "Pannelli da soffitto PVC", desc: "Pannelli da soffitto PVC piani, scanalati e ondulati per finiture interne." },
  ],
  ja: [
    { name: "SPC 壁パネル", desc: "内装壁やプロジェクト向けに、多彩な化粧仕上げのSPC壁パネルをご用意しています。" },
    { name: "WPC 壁パネル", desc: "アクセントウォールや内装に適した、木目調のWPC壁パネルと形材。" },
    { name: "PVC 天井パネル", desc: "内装天井向けに、フラット・溝付き・波形のPVCパネルをご用意しています。" },
  ],
  ko: [
    { name: "SPC 벽 패널", desc: "실내 벽 마감과 프로젝트 공급을 위한 다양한 장식 표면의 SPC 패널." },
    { name: "WPC 벽 패널", desc: "포인트 벽과 실내 장식에 적합한 목재 무늬 WPC 패널 및 프로파일." },
    { name: "PVC 천장 패널", desc: "실내 마감을 위한 평판형, 홈형, 물결형 PVC 천장 패널." },
  ],
  pt: [
    { name: "Painéis de parede SPC", desc: "Painéis SPC com acabamentos decorativos para paredes interiores e fornecimento para projetos." },
    { name: "Painéis de parede WPC", desc: "Painéis e perfis WPC com aspeto de madeira para paredes decorativas e interiores." },
    { name: "Painéis de teto PVC", desc: "Painéis de teto PVC planos, ranhurados e ondulados para acabamentos interiores." },
  ],
  th: [
    { name: "แผ่นผนัง SPC", desc: "แผ่น SPC พร้อมผิวตกแต่งหลากหลายสำหรับผนังภายในและการจัดส่งสำหรับโครงการ" },
    { name: "แผ่นผนัง WPC", desc: "แผ่นและโปรไฟล์ WPC ลายไม้สำหรับผนังตกแต่งและงานภายใน" },
    { name: "แผ่นฝ้าเพดาน PVC", desc: "แผ่นฝ้าเพดาน PVC แบบเรียบ แบบร่อง และแบบลอนสำหรับงานตกแต่งภายใน" },
  ],
  tr: [
    { name: "SPC Duvar Panelleri", desc: "İç duvar kaplamaları ve proje tedariki için dekoratif yüzey seçenekli SPC paneller." },
    { name: "WPC Duvar Panelleri", desc: "Dekoratif duvarlar ve iç mekânlar için ahşap görünümlü WPC panel ve profiller." },
    { name: "PVC Tavan Panelleri", desc: "İç mekân kaplamaları için düz, oluklu ve dalgalı PVC tavan panelleri." },
  ],
  vi: [
    { name: "Tấm ốp tường SPC", desc: "Tấm SPC với các bề mặt trang trí cho tường nội thất và cung ứng dự án." },
    { name: "Tấm ốp tường WPC", desc: "Tấm và thanh WPC vân gỗ dành cho tường điểm nhấn và trang trí nội thất." },
    { name: "Tấm trần PVC", desc: "Tấm trần PVC dạng phẳng, rãnh và sóng cho hoàn thiện nội thất." },
  ],
};
