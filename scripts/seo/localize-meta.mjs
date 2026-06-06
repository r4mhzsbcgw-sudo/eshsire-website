/**
 * Localize calendar topic meta — title, keywords, description (no EN in non-EN locales).
 */
import { classifyTopic } from "./topic-classifier.mjs";

const KEYWORDS = {
  en: {
    spc: {
      pk: "spc flooring factory",
      sk: [
        "spc flooring manufacturer china",
        "wholesale flooring supplier china",
        "bulk spc flooring order",
        "flooring for contractor supply",
        "spc flooring price per sqm",
      ],
    },
    vinyl: {
      pk: "vinyl flooring wholesale",
      sk: ["vinyl flooring wholesale", "flooring manufacturer china", "wholesale flooring price", "bulk flooring order"],
    },
    wall: {
      pk: "wall panel supplier china",
      sk: ["interior wall panel factory", "building materials supplier china", "wholesale wall panel supplier"],
    },
  },
  zh: {
    spc: {
      pk: "SPC地板工厂",
      sk: ["中国SPC地板制造商", "中国地板批发供应商", "SPC地板大货批量订单", "工程承包商地板供应", "SPC地板每平方米价格"],
    },
    vinyl: { pk: "乙烯基地板批发", sk: ["乙烯基地板批发", "中国地板制造商", "地板批发价格", "地板大货批量订单"] },
    wall: { pk: "中国墙板供应商", sk: ["室内墙板工厂", "中国建材供应商", "墙板批发供应"] },
  },
  es: {
    spc: {
      pk: "fábrica de suelos SPC",
      sk: [
        "fabricante suelos SPC China",
        "proveedor mayorista suelos China",
        "pedido al por mayor suelos SPC",
        "suministro suelos contratistas",
        "precio suelo SPC por m²",
      ],
    },
    vinyl: { pk: "suelos vinílicos al por mayor", sk: ["mayorista vinílico", "fabricante suelos China", "precio mayorista suelos"] },
    wall: { pk: "proveedor paneles murales China", sk: ["fábrica paneles interiores", "proveedor materiales construcción China"] },
  },
  de: {
    spc: {
      pk: "SPC-Boden Fabrik",
      sk: [
        "SPC-Boden Hersteller China",
        "Großhändler Bodenbeläge China",
        "SPC-Boden Bulk-Bestellung",
        "Boden für Auftragnehmer",
        "SPC-Boden Preis pro m²",
      ],
    },
    vinyl: { pk: "Vinylboden Großhandel", sk: ["Vinyl Großhandel", "Bodenhersteller China", "Großhandelspreis Boden"] },
    wall: { pk: "Wandpanele Lieferant China", sk: ["Innenwandpanele Fabrik", "Baustofflieferant China"] },
  },
  fr: {
    spc: {
      pk: "usine sols SPC",
      sk: [
        "fabricant sols SPC Chine",
        "fournisseur gros sols Chine",
        "commande en volume sols SPC",
        "approvisionnement sols entrepreneurs",
        "prix sol SPC au m²",
      ],
    },
    vinyl: { pk: "sol vinyle en gros", sk: ["gros vinyle", "fabricant sols Chine", "prix gros sols"] },
    wall: { pk: "fournisseur panneaux muraux Chine", sk: ["usine panneaux intérieurs", "fournisseur matériaux Chine"] },
  },
  ar: {
    spc: {
      pk: "مصنع أرضيات SPC",
      sk: [
        "مصنع SPC الصين",
        "مورد أرضيات بالجملة الصين",
        "طلب SPC بالجملة",
        "توريد أرضيات للمقاولين",
        "سعر SPC للمتر المربع",
      ],
    },
    vinyl: { pk: "أرضيات فينيل بالجملة", sk: ["جملة فينيل", "مصنع أرضيات الصين", "سعر الجملة"] },
    wall: { pk: "مورد ألواح جدارية الصين", sk: ["مصنع ألواح داخلية", "مورد مواد بناء الصين"] },
  },
  ru: {
    spc: {
      pk: "фабрика SPC напольных покрытий",
      sk: [
        "производитель SPC Китай",
        "оптовый поставщик напольных покрытий Китай",
        "оптовый заказ SPC",
        "напольные покрытия для подрядчиков",
        "цена SPC за м²",
      ],
    },
    vinyl: { pk: "опт виниловых покрытий", sk: ["опт винил", "производитель Китай", "оптовая цена"] },
    wall: { pk: "поставщик стеновых панелей Китай", sk: ["фабрика внутренних панелей", "поставщик стройматериалов Китай"] },
  },
  it: {
    spc: {
      pk: "fabbrica pavimenti SPC",
      sk: ["produttore SPC Cina", "fornitore ingrosso pavimenti Cina", "ordine all'ingrosso SPC", "fornitura pavimenti appaltatori", "prezzo SPC al m²"],
    },
    vinyl: { pk: "pavimenti vinilici all'ingrosso", sk: ["ingrosso vinile", "produttore Cina", "prezzo ingrosso"] },
    wall: { pk: "fornitore pannelli murali Cina", sk: ["fabbrica pannelli interni", "fornitore materiali edili Cina"] },
  },
  pt: {
    spc: {
      pk: "fábrica pavimentos SPC",
      sk: ["fabricante SPC China", "fornecedor grossista pavimentos China", "encomenda grosso SPC", "fornecimento pavimentos empreiteiros", "preço SPC por m²"],
    },
    vinyl: { pk: "pavimentos vinílicos grosso", sk: ["grosso vinílico", "fabricante China", "preço grosso"] },
    wall: { pk: "fornecedor painéis parede China", sk: ["fábrica painéis interiores", "fornecedor materiais construção China"] },
  },
  ja: {
    spc: {
      pk: "SPC床材工場",
      sk: ["中国SPC床材メーカー", "中国床材卸サプライヤー", "SPC床材大口注文", "施工業者向け床材", "SPC床材㎡単価"],
    },
    vinyl: { pk: "ビニル床材卸", sk: ["ビニル卸", "中国床材メーカー", "卸価格"] },
    wall: { pk: "中国壁パネルサプライヤー", sk: ["室内壁パネル工場", "中国建材サプライヤー"] },
  },
  ko: {
    spc: {
      pk: "SPC 바닥재 공장",
      sk: ["중국 SPC 바닥재 제조사", "중국 바닥재 도매 공급업체", "SPC 바닥재 대량 주문", "시공사 바닥재 공급", "SPC ㎡ 가격"],
    },
    vinyl: { pk: "비닐 바닥재 도매", sk: ["비닐 도매", "중국 제조사", "도매 가격"] },
    wall: { pk: "중국 벽 패널 공급업체", sk: ["실내 벽 패널 공장", "중국 건자재 공급업체"] },
  },
  id: {
    spc: {
      pk: "pabrik lantai SPC",
      sk: ["produsen SPC China", "pemasok grosir lantai China", "pesanan bulk SPC", "pasokan lantai kontraktor", "harga SPC per m²"],
    },
    vinyl: { pk: "lantai vinil grosir", sk: ["grosir vinil", "produsen China", "harga grosir"] },
    wall: { pk: "pemasok panel dinding China", sk: ["pabrik panel interior", "pemasok material bangunan China"] },
  },
  th: {
    spc: {
      pk: "โรงงานพื้น SPC",
      sk: ["ผู้ผลิต SPC จีน", "ซัพพลายเออร์พื้นขายส่งจีน", "ออเดอร์ SPC จำนวนมาก", "จัดหาพื้นสำหรับผู้รับเหมา", "ราคา SPC ต่อ m²"],
    },
    vinyl: { pk: "พื้นไวนิลขายส่ง", sk: ["ขายส่งไวนิล", "ผู้ผลิตจีน", "ราคาขายส่ง"] },
    wall: { pk: "ซัพพลายเออร์แผ่นผนังจีน", sk: ["โรงงานแผ่นผนังภายใน", "ซัพพลายเออร์วัสดุก่อสร้างจีน"] },
  },
  tr: {
    spc: {
      pk: "SPC zemin fabrikası",
      sk: ["SPC üretici Çin", "toptan zemin tedarikçisi Çin", "toplu SPC siparişi", "müteahhit zemin tedariki", "SPC m² fiyat"],
    },
    vinyl: { pk: "vinil zemin toptan", sk: ["vinil toptan", "Çin üretici", "toptan fiyat"] },
    wall: { pk: "Çin duvar paneli tedarikçisi", sk: ["iç duvar paneli fabrikası", "Çin yapı malzemesi tedarikçisi"] },
  },
  vi: {
    spc: {
      pk: "nhà máy sàn SPC",
      sk: ["nhà sản xuất SPC Trung Quốc", "nhà cung cấp sàn bán sỉ Trung Quốc", "đơn hàng SPC số lượng lớn", "cung ứng sàn nhà thầu", "giá SPC m²"],
    },
    vinyl: { pk: "sàn vinyl bán sỉ", sk: ["bán sỉ vinyl", "nhà sản xuất Trung Quốc", "giá bán sỉ"] },
    wall: { pk: "nhà cung cấp tấm ốp Trung Quốc", sk: ["nhà máy tấm ốp nội thất", "nhà cung cấp vật liệu xây dựng Trung Quốc"] },
  },
  he: {
    spc: {
      pk: "מפעל רצפות SPC",
      sk: ["יצרן SPC בסין", "ספק רצפות סיטונאות בסין", "הזמנת SPC בכמות", "אספקת רצפות לקבלנים", "מחיר SPC למ\"ר"],
    },
    vinyl: { pk: "רצפות ויניל סיטונאות", sk: ["סיטונאות ויניל", "יצרן בסין", "מחיר סיטונאי"] },
    wall: { pk: "ספק פאנלים לקירות בסין", sk: ["מפעל פאנלים פנימיים", "ספק חומרי בניין בסין"] },
  },
};

const TITLE_TEMPLATES = {
  profit: {
    en: (s) => `${s}: Distributor Margin and Cost-Efficient SPC Sourcing from China`,
    zh: (s) => `${s}：经销商利润与 SPC 地板高效采购成本优化`,
    es: (s) => `${s}: margen del distribuidor y abastecimiento SPC rentable desde China`,
    de: (s) => `${s}: Händlermarge und kosteneffiziente SPC-Beschaffung aus China`,
    fr: (s) => `${s}: marge distributeur et approvisionnement SPC rentable depuis la Chine`,
    ar: (s) => `${s}: هامش الموزع وتوريد SPC بتكلفة فعالة من الصين`,
    ru: (s) => `${s}: маржа дистрибьютора и эффективные закупки SPC из Китая`,
    it: (s) => `${s}: margine distributore e approvvigionamento SPC efficiente dalla Cina`,
    pt: (s) => `${s}: margem do distribuidor e sourcing SPC eficiente da China`,
    ja: (s) => `${s}：ディストリビューター利益と中国SPC調達コスト最適化`,
    ko: (s) => `${s}: 유통업체 마진과 중국 SPC 조달 비용 효율`,
    id: (s) => `${s}: margin distributor dan sourcing SPC efisien dari China`,
    th: (s) => `${s}: กำไรตัวแทนจำหน่ายและการจัดหา SPC ที่มีประสิทธิภาพจากจีน`,
    tr: (s) => `${s}: distribütör marjı ve Çin'den verimli SPC tedariki`,
    vi: (s) => `${s}: biên lợi nhuận nhà phân phối và sourcing SPC hiệu quả từ Trung Quốc`,
    he: (s) => `${s}: מרווח מפיץ ורכש SPC יעיל מסין`,
  },
  logistics: {
    en: (s) => `${s}: Container Loading and Export Logistics for SPC Flooring`,
    zh: (s) => `${s}：SPC 地板集装箱装柜与出口物流方案`,
    es: (s) => `${s}: carga de contenedor y logística exportación suelos SPC`,
    de: (s) => `${s}: Containerbeladung und Exportlogistik für SPC-Boden`,
    fr: (s) => `${s}: chargement conteneur et logistique export sols SPC`,
    ar: (s) => `${s}: تحميل الحاويات ولوجستيات تصدير أرضيات SPC`,
    ru: (s) => `${s}: загрузка контейнеров и экспортная логистика SPC`,
    it: (s) => `${s}: carico container e logistica export pavimenti SPC`,
    pt: (s) => `${s}: carga de contentor e logística exportação pavimentos SPC`,
    ja: (s) => `${s}：SPC床材コンテナ積み込みと輸出物流`,
    ko: (s) => `${s}: SPC 바닥재 컨테이너 적재 및 수출 물류`,
    id: (s) => `${s}: muat kontainer dan logistik ekspor lantai SPC`,
    th: (s) => `${s}: การบรรจุตู้คอนเทนเนอร์และโลจิสติกส์ส่งออกพื้น SPC`,
    tr: (s) => `${s}: konteyner yükleme ve SPC zemin ihracat lojistiği`,
    vi: (s) => `${s}: xếp container và logistics xuất khẩu sàn SPC`,
    he: (s) => `${s}: טעינת מכולות ולוגיסטיקת ייצוא רצפות SPC`,
  },
  supplier: {
    en: (s) => `${s}: How Importers Evaluate China SPC Flooring Suppliers`,
    zh: (s) => `${s}：进口商如何评估中国 SPC 地板供应商`,
    es: (s) => `${s}: cómo evalúan importadores proveedores SPC en China`,
    de: (s) => `${s}: wie Importeure SPC-Lieferanten in China bewerten`,
    fr: (s) => `${s}: comment les importateurs évaluent les fournisseurs SPC en Chine`,
    ar: (s) => `${s}: كيف يقيّم المستوردون موردي SPC في الصين`,
    ru: (s) => `${s}: как импортёры оценивают поставщиков SPC в Китае`,
    it: (s) => `${s}: come gli importatori valutano fornitori SPC in Cina`,
    pt: (s) => `${s}: como importadores avaliam fornecedores SPC na China`,
    ja: (s) => `${s}：輸入業者が中国SPCサプライヤーを評価する方法`,
    ko: (s) => `${s}: 수입업체의 중국 SPC 공급업체 평가 방법`,
    id: (s) => `${s}: cara importir menilai pemasok SPC China`,
    th: (s) => `${s}: ผู้นำเข้าประเมินซัพพลายเออร์ SPC จีนอย่างไร`,
    tr: (s) => `${s}: ithalatçılar Çin SPC tedarikçilerini nasıl değerlendirir`,
    vi: (s) => `${s}: nhà nhập khẩu đánh giá nhà cung cấp SPC Trung Quốc`,
    he: (s) => `${s}: איך יבואנים מעריכים ספקי SPC בסין`,
  },
  project: {
    en: (s) => `${s}: SPC Flooring Supply for Commercial and Hotel Projects`,
    zh: (s) => `${s}：商业与酒店项目 SPC 地板供应方案`,
    es: (s) => `${s}: suministro suelos SPC para proyectos comerciales y hoteleros`,
    de: (s) => `${s}: SPC-Bodenlieferung für Hotel- und Gewerbeprojekte`,
    fr: (s) => `${s}: approvisionnement sols SPC pour projets hôteliers et commerciaux`,
    ar: (s) => `${s}: توريد أرضيات SPC لمشاريع فندقية وتجارية`,
    ru: (s) => `${s}: поставки SPC для отелей и коммерческих проектов`,
    it: (s) => `${s}: fornitura pavimenti SPC per hotel e progetti commerciali`,
    pt: (s) => `${s}: fornecimento pavimentos SPC para hotéis e projetos comerciais`,
    ja: (s) => `${s}：ホテル・商業プロジェクト向けSPC床材供給`,
    ko: (s) => `${s}: 호텔·상업 프로젝트 SPC 바닥재 공급`,
    id: (s) => `${s}: pasokan lantai SPC untuk proyek hotel dan komersial`,
    th: (s) => `${s}: จัดหาพื้น SPC สำหรับโรงแรมและโครงการเชิงพาณิชย์`,
    tr: (s) => `${s}: otel ve ticari projeler için SPC zemin tedariki`,
    vi: (s) => `${s}: cung ứng sàn SPC cho khách sạn và dự án thương mại`,
    he: (s) => `${s}: אספקת רצפות SPC לפרויקטי מלון ומסחר`,
  },
  risk: {
    en: (s) => `${s}: Procurement Risks When Importing SPC Flooring from China`,
    zh: (s) => `${s}：从中国进口 SPC 地板的采购风险控制`,
    es: (s) => `${s}: riesgos de compras al importar suelos SPC de China`,
    de: (s) => `${s}: Beschaffungsrisiken beim SPC-Import aus China`,
    fr: (s) => `${s}: risques d'achat lors de l'import de sols SPC de Chine`,
    ar: (s) => `${s}: مخاطر الشراء عند استيراد SPC من الصين`,
    ru: (s) => `${s}: риски закупок при импорте SPC из Китая`,
    it: (s) => `${s}: rischi di approvvigionamento importando SPC dalla Cina`,
    pt: (s) => `${s}: riscos de compras ao importar SPC da China`,
    ja: (s) => `${s}：中国からSPC床材を輸入する際の調達リスク`,
    ko: (s) => `${s}: 중국 SPC 수입 시 조달 리스크`,
    id: (s) => `${s}: risiko pengadaan impor lantai SPC dari China`,
    th: (s) => `${s}: ความเสี่ยงการจัดซื้อเมื่อนำเข้า SPC จากจีน`,
    tr: (s) => `${s}: Çin'den SPC ithalatında tedarik riskleri`,
    vi: (s) => `${s}: rủi ro mua hàng khi nhập sàn SPC từ Trung Quốc`,
    he: (s) => `${s}: סיכוני רכש בייבוא SPC מסין`,
  },
  inventory: {
    en: (s) => `${s}: Inventory Control for Flooring Distributors and Importers`,
    zh: (s) => `${s}：地板经销商与进口商库存控制策略`,
    es: (s) => `${s}: control de inventario para distribuidores e importadores de suelos`,
    de: (s) => `${s}: Bestandskontrolle für Bodenimporteure und Händler`,
    fr: (s) => `${s}: contrôle des stocks pour distributeurs et importateurs de sols`,
    ar: (s) => `${s}: إدارة المخزون لموزعي و مستوردي الأرضيات`,
    ru: (s) => `${s}: управление запасами для дистрибьюторов напольных покрытий`,
    it: (s) => `${s}: controllo inventario per distributori e importatori pavimenti`,
    pt: (s) => `${s}: controlo de inventário para distribuidores e importadores`,
    ja: (s) => `${s}：床材ディストリビューターの在庫管理`,
    ko: (s) => `${s}: 바닥재 유통업체 재고 관리`,
    id: (s) => `${s}: kontrol inventaris distributor dan importir lantai`,
    th: (s) => `${s}: การควบคุมสต็อกสำหรับตัวแทนจำหน่ายพื้น`,
    tr: (s) => `${s}: zemin distribütörleri için stok kontrolü`,
    vi: (s) => `${s}: kiểm soát tồn kho cho nhà phân phối sàn`,
    he: (s) => `${s}: בקרת מלאי למפיצי רצפות`,
  },
  quality: {
    en: (s) => `${s}: QC Standards Before Shipping SPC Flooring Containers`,
    zh: (s) => `${s}：SPC 地板出货前质量控制标准`,
    es: (s) => `${s}: estándares QC antes de enviar contenedores de suelos SPC`,
    de: (s) => `${s}: QC-Standards vor Versand von SPC-Containerladungen`,
    fr: (s) => `${s}: normes QC avant expédition de conteneurs SPC`,
    ar: (s) => `${s}: معايير QC قبل شحن حاويات SPC`,
    ru: (s) => `${s}: стандарты QC перед отгрузкой контейнеров SPC`,
    it: (s) => `${s}: standard QC prima della spedizione container SPC`,
    pt: (s) => `${s}: padrões QC antes de enviar contentores SPC`,
    ja: (s) => `${s}：SPCコンテナ出荷前のQC基準`,
    ko: (s) => `${s}: SPC 컨테이너 선적 전 QC 기준`,
    id: (s) => `${s}: standar QC sebelum pengiriman kontainer SPC`,
    th: (s) => `${s}: มาตรฐาน QC ก่อนส่งตู้ SPC`,
    tr: (s) => `${s}: SPC konteyner sevkiyat öncesi KK standartları`,
    vi: (s) => `${s}: tiêu chuẩn QC trước khi giao container SPC`,
    he: (s) => `${s}: תקני QC לפני משלוח מכולות SPC`,
  },
  market: {
    en: (s) => `${s}: Market Trends for SPC Flooring Importers and Distributors`,
    zh: (s) => `${s}：SPC 地板进口商与经销商市场趋势`,
    es: (s) => `${s}: tendencias de mercado para importadores y distribuidores SPC`,
    de: (s) => `${s}: Markttrends für SPC-Importeure und Händler`,
    fr: (s) => `${s}: tendances marché pour importateurs et distributeurs SPC`,
    ar: (s) => `${s}: اتجاهات السوق لمستوردي وموزعي SPC`,
    ru: (s) => `${s}: рыночные тренды для импортёров и дистрибьюторов SPC`,
    it: (s) => `${s}: trend di mercato per importatori e distributori SPC`,
    pt: (s) => `${s}: tendências de mercado para importadores SPC`,
    ja: (s) => `${s}：SPC輸入業者・ディストリビューターの市場動向`,
    ko: (s) => `${s}: SPC 수입업체·유통업체 시장 트렌드`,
    id: (s) => `${s}: tren pasar untuk importir dan distributor SPC`,
    th: (s) => `${s}: แนวโน้มตลาดสำหรับผู้นำเข้าและตัวแทนจำหน่าย SPC`,
    tr: (s) => `${s}: SPC ithalatçıları için pazar trendleri`,
    vi: (s) => `${s}: xu hướng thị trường cho nhà nhập khẩu SPC`,
    he: (s) => `${s}: מגמות שוק ליבואני SPC`,
  },
  distributor: {
    en: (s) => `${s}: Wholesale Channel Operations for SPC Flooring Distributors`,
    zh: (s) => `${s}：SPC 地板经销商批发渠道运营`,
    es: (s) => `${s}: operaciones canal mayorista para distribuidores SPC`,
    de: (s) => `${s}: Großhandelskanal-Betrieb für SPC-Händler`,
    fr: (s) => `${s}: opérations canal gros pour distributeurs SPC`,
    ar: (s) => `${s}: عمليات قناة الجملة لموزعي SPC`,
    ru: (s) => `${s}: оптовые каналы для дистрибьюторов SPC`,
    it: (s) => `${s}: operazioni canale ingrosso per distributori SPC`,
    pt: (s) => `${s}: operações canal grosso para distribuidores SPC`,
    ja: (s) => `${s}：SPCディストリビューターの卸チャネル運営`,
    ko: (s) => `${s}: SPC 유통업체 도매 채널 운영`,
    id: (s) => `${s}: operasi saluran grosir distributor SPC`,
    th: (s) => `${s}: การดำเนินงานช่องทางขายส่ง SPC`,
    tr: (s) => `${s}: SPC distribütörleri toptan kanal operasyonları`,
    vi: (s) => `${s}: vận hành kênh bán sỉ cho nhà phân phối SPC`,
    he: (s) => `${s}: תפעול ערוץ סיטונאות למפיצי SPC`,
  },
  factory: {
    en: (s) => `${s}: Factory-Level Pricing and Direct SPC Supply from China`,
    zh: (s) => `${s}：中国 SPC 地板工厂直供与工厂级定价`,
    es: (s) => `${s}: precio nivel fábrica y suministro directo SPC desde China`,
    de: (s) => `${s}: Fabrikpreise und direkte SPC-Lieferung aus China`,
    fr: (s) => `${s}: tarification usine et approvisionnement SPC direct depuis la Chine`,
    ar: (s) => `${s}: تسعير على مستوى المصنع وتوريد SPC مباشر من الصين`,
    ru: (s) => `${s}: цены уровня фабрики и прямые поставки SPC из Китая`,
    it: (s) => `${s}: prezzi di fabbrica e fornitura diretta SPC dalla Cina`,
    pt: (s) => `${s}: preço nível fábrica e fornecimento direto SPC da China`,
    ja: (s) => `${s}：中国SPC工場直供と工場レベル価格`,
    ko: (s) => `${s}: 중국 SPC 공장 직공급 및 공장 수준 가격`,
    id: (s) => `${s}: harga level pabrik dan pasokan langsung SPC dari China`,
    th: (s) => `${s}: ราคาระดับโรงงานและจัดหา SPC ตรงจากจีน`,
    tr: (s) => `${s}: fabrika seviyesi fiyatlandırma ve Çin'den direkt SPC tedariki`,
    vi: (s) => `${s}: giá cấp nhà máy và cung ứng trực tiếp SPC từ Trung Quốc`,
    he: (s) => `${s}: תמחור ברמת מפעל ואספקת SPC ישירה מסין`,
  },
};

const DESC_TEMPLATES = {
  en: (t, pk) =>
    `${t}. B2B guide for flooring distributors: ${pk}, factory-level pricing, container optimization and supply chain control from China.`,
  zh: (t, pk) =>
    `${t}。面向地板经销商的 B2B 指南：${pk}、工厂级定价、整柜优化与中国供应链管控。`,
  es: (t, pk) =>
    `${t}. Guía B2B para distribuidores: ${pk}, precio nivel fábrica, optimización de contenedor y control de cadena de suministro desde China.`,
  de: (t, pk) =>
    `${t}. B2B-Leitfaden für Händler: ${pk}, Fabrikpreise, Containeroptimierung und Lieferkettenkontrolle aus China.`,
  fr: (t, pk) =>
    `${t}. Guide B2B pour distributeurs: ${pk}, tarification usine, optimisation conteneur et contrôle supply chain depuis la Chine.`,
  ar: (t, pk) =>
    `${t}. دليل B2B للموزعين: ${pk}، تسعير المصنع، تحسين الحاويات والتحكم في سلسلة التوريد من الصين.`,
  ru: (t, pk) =>
    `${t}. B2B-руководство для дистрибьюторов: ${pk}, цены фабрики, оптимизация контейнеров и контроль цепочки поставок из Китая.`,
  it: (t, pk) =>
    `${t}. Guida B2B per distributori: ${pk}, prezzi di fabbrica, ottimizzazione container e controllo supply chain dalla Cina.`,
  pt: (t, pk) =>
    `${t}. Guia B2B para distribuidores: ${pk}, preço de fábrica, otimização de contentor e controlo de cadeia de abastecimento da China.`,
  ja: (t, pk) =>
    `${t}。ディストリビューター向けB2Bガイド：${pk}、工場価格、コンテナ最適化、中国サプライチェーン管理。`,
  ko: (t, pk) =>
    `${t}. 유통업체 B2B 가이드: ${pk}, 공장 수준 가격, 컨테이너 최적화, 중국 공급망 관리.`,
  id: (t, pk) =>
    `${t}. Panduan B2B distributor: ${pk}, harga level pabrik, optimasi kontainer, kontrol rantai pasok dari China.`,
  th: (t, pk) =>
    `${t}. คู่มือ B2B สำหรับตัวแทนจำหน่าย: ${pk}, ราคาระดับโรงงาน, การเพิ่มประสิทธิภาพตู้คอนเทนเนอร์, การควบคุมห่วงโซ่อุปทานจากจีน`,
  tr: (t, pk) =>
    `${t}. Distribütörler için B2B rehberi: ${pk}, fabrika seviyesi fiyat, konteyner optimizasyonu, Çin tedarik zinciri kontrolü.`,
  vi: (t, pk) =>
    `${t}. Hướng dẫn B2B cho nhà phân phối: ${pk}, giá cấp nhà máy, tối ưu container, kiểm soát chuỗi cung ứng từ Trung Quốc.`,
  he: (t, pk) =>
    `${t}. מדריך B2B למפיצים: ${pk}, תמחור ברמת מפעל, אופטימיזציית מכולות ובקרת שרשרת אספקה מסין.`,
};

function subjectFromEnTitle(enTitle) {
  return enTitle.length > 72 ? `${enTitle.slice(0, 69)}…` : enTitle;
}

export function localizeTopicMeta(enMeta, locale) {
  const topicType = classifyTopic(enMeta.title);
  const tag = enMeta.productTag ?? "spc";
  const kw = KEYWORDS[locale]?.[tag] ?? KEYWORDS.en[tag];
  const subject = subjectFromEnTitle(enMeta.title);
  const titleFn = TITLE_TEMPLATES[topicType]?.[locale] ?? TITLE_TEMPLATES.supplier[locale];
  const title = titleFn ? titleFn(subject) : enMeta.title;
  const descFn = DESC_TEMPLATES[locale] ?? DESC_TEMPLATES.en;
  const description = descFn(title, kw.pk);
  const metaTitle = `${title.length > 52 ? `${title.slice(0, 49)}…` : title} | ${kw.pk} | BJFLOOR`;

  return {
    ...enMeta,
    title,
    metaTitle,
    description,
    primaryKeyword: kw.pk,
    secondaryKeywords: kw.sk,
    topicType,
    locale,
  };
}

export function getLocalizedKeywords(locale, productTag = "spc") {
  return KEYWORDS[locale]?.[productTag] ?? KEYWORDS.en[productTag];
}
