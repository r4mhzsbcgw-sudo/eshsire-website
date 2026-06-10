/**
 * Localize calendar topic meta 鈥?title, keywords, description (no EN in non-EN locales).
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
      pk: "SPC鍦版澘宸ュ巶",
      sk: ["涓浗SPC鍦版澘鍒堕€犲晢", "涓浗鍦版澘鎵瑰彂渚涘簲鍟?, "SPC鍦版澘澶ц揣鎵归噺璁㈠崟", "宸ョ▼鎵垮寘鍟嗗湴鏉夸緵搴?, "SPC鍦版澘姣忓钩鏂圭背浠锋牸"],
    },
    vinyl: { pk: "涔欑儻鍩哄湴鏉挎壒鍙?, sk: ["涔欑儻鍩哄湴鏉挎壒鍙?, "涓浗鍦版澘鍒堕€犲晢", "鍦版澘鎵瑰彂浠锋牸", "鍦版澘澶ц揣鎵归噺璁㈠崟"] },
    wall: { pk: "涓浗澧欐澘渚涘簲鍟?, sk: ["瀹ゅ唴澧欐澘宸ュ巶", "涓浗寤烘潗渚涘簲鍟?, "澧欐澘鎵瑰彂渚涘簲"] },
  },
  es: {
    spc: {
      pk: "f谩brica de suelos SPC",
      sk: [
        "fabricante suelos SPC China",
        "proveedor mayorista suelos China",
        "pedido al por mayor suelos SPC",
        "suministro suelos contratistas",
        "precio suelo SPC por m虏",
      ],
    },
    vinyl: { pk: "suelos vin铆licos al por mayor", sk: ["mayorista vin铆lico", "fabricante suelos China", "precio mayorista suelos"] },
    wall: { pk: "proveedor paneles murales China", sk: ["f谩brica paneles interiores", "proveedor materiales construcci贸n China"] },
  },
  de: {
    spc: {
      pk: "SPC-Boden Fabrik",
      sk: [
        "SPC-Boden Hersteller China",
        "Gro脽h盲ndler Bodenbel盲ge China",
        "SPC-Boden Bulk-Bestellung",
        "Boden f眉r Auftragnehmer",
        "SPC-Boden Preis pro m虏",
      ],
    },
    vinyl: { pk: "Vinylboden Gro脽handel", sk: ["Vinyl Gro脽handel", "Bodenhersteller China", "Gro脽handelspreis Boden"] },
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
        "prix sol SPC au m虏",
      ],
    },
    vinyl: { pk: "sol vinyle en gros", sk: ["gros vinyle", "fabricant sols Chine", "prix gros sols"] },
    wall: { pk: "fournisseur panneaux muraux Chine", sk: ["usine panneaux int茅rieurs", "fournisseur mat茅riaux Chine"] },
  },
  ar: {
    spc: {
      pk: "賲氐賳毓 兀乇囟賷丕鬲 SPC",
      sk: [
        "賲氐賳毓 SPC 丕賱氐賷賳",
        "賲賵乇丿 兀乇囟賷丕鬲 亘丕賱噩賲賱丞 丕賱氐賷賳",
        "胤賱亘 SPC 亘丕賱噩賲賱丞",
        "鬲賵乇賷丿 兀乇囟賷丕鬲 賱賱賲賯丕賵賱賷賳",
        "爻毓乇 SPC 賱賱賲鬲乇 丕賱賲乇亘毓",
      ],
    },
    vinyl: { pk: "兀乇囟賷丕鬲 賮賷賳賷賱 亘丕賱噩賲賱丞", sk: ["噩賲賱丞 賮賷賳賷賱", "賲氐賳毓 兀乇囟賷丕鬲 丕賱氐賷賳", "爻毓乇 丕賱噩賲賱丞"] },
    wall: { pk: "賲賵乇丿 兀賱賵丕丨 噩丿丕乇賷丞 丕賱氐賷賳", sk: ["賲氐賳毓 兀賱賵丕丨 丿丕禺賱賷丞", "賲賵乇丿 賲賵丕丿 亘賳丕亍 丕賱氐賷賳"] },
  },
  ru: {
    spc: {
      pk: "褎邪斜褉懈泻邪 SPC 薪邪锌芯谢褜薪褘褏 锌芯泻褉褘褌懈泄",
      sk: [
        "锌褉芯懈蟹胁芯写懈褌械谢褜 SPC 袣懈褌邪泄",
        "芯锌褌芯胁褘泄 锌芯褋褌邪胁褖懈泻 薪邪锌芯谢褜薪褘褏 锌芯泻褉褘褌懈泄 袣懈褌邪泄",
        "芯锌褌芯胁褘泄 蟹邪泻邪蟹 SPC",
        "薪邪锌芯谢褜薪褘械 锌芯泻褉褘褌懈褟 写谢褟 锌芯写褉褟写褔懈泻芯胁",
        "褑械薪邪 SPC 蟹邪 屑虏",
      ],
    },
    vinyl: { pk: "芯锌褌 胁懈薪懈谢芯胁褘褏 锌芯泻褉褘褌懈泄", sk: ["芯锌褌 胁懈薪懈谢", "锌褉芯懈蟹胁芯写懈褌械谢褜 袣懈褌邪泄", "芯锌褌芯胁邪褟 褑械薪邪"] },
    wall: { pk: "锌芯褋褌邪胁褖懈泻 褋褌械薪芯胁褘褏 锌邪薪械谢械泄 袣懈褌邪泄", sk: ["褎邪斜褉懈泻邪 胁薪褍褌褉械薪薪懈褏 锌邪薪械谢械泄", "锌芯褋褌邪胁褖懈泻 褋褌褉芯泄屑邪褌械褉懈邪谢芯胁 袣懈褌邪泄"] },
  },
  it: {
    spc: {
      pk: "fabbrica pavimenti SPC",
      sk: ["produttore SPC Cina", "fornitore ingrosso pavimenti Cina", "ordine all'ingrosso SPC", "fornitura pavimenti appaltatori", "prezzo SPC al m虏"],
    },
    vinyl: { pk: "pavimenti vinilici all'ingrosso", sk: ["ingrosso vinile", "produttore Cina", "prezzo ingrosso"] },
    wall: { pk: "fornitore pannelli murali Cina", sk: ["fabbrica pannelli interni", "fornitore materiali edili Cina"] },
  },
  pt: {
    spc: {
      pk: "f谩brica pavimentos SPC",
      sk: ["fabricante SPC China", "fornecedor grossista pavimentos China", "encomenda grosso SPC", "fornecimento pavimentos empreiteiros", "pre莽o SPC por m虏"],
    },
    vinyl: { pk: "pavimentos vin铆licos grosso", sk: ["grosso vin铆lico", "fabricante China", "pre莽o grosso"] },
    wall: { pk: "fornecedor pain茅is parede China", sk: ["f谩brica pain茅is interiores", "fornecedor materiais constru莽茫o China"] },
  },
  ja: {
    spc: {
      pk: "SPC搴婃潗宸ュ牬",
      sk: ["涓浗SPC搴婃潗銉°兗銈兗", "涓浗搴婃潗鍗搞偟銉椼儵銈ゃ儰銉?, "SPC搴婃潗澶у彛娉ㄦ枃", "鏂藉伐妤€呭悜銇戝簥鏉?, "SPC搴婃潗銕″崢渚?],
    },
    vinyl: { pk: "銉撱儖銉簥鏉愬嵏", sk: ["銉撱儖銉嵏", "涓浗搴婃潗銉°兗銈兗", "鍗镐尽鏍?] },
    wall: { pk: "涓浗澹併儜銉嶃儷銈点儣銉┿偆銉ゃ兗", sk: ["瀹ゅ唴澹併儜銉嶃儷宸ュ牬", "涓浗寤烘潗銈点儣銉┿偆銉ゃ兗"] },
  },
  ko: {
    spc: {
      pk: "SPC 氚旊嫢鞛?瓿奠灔",
      sk: ["欷戧淡 SPC 氚旊嫢鞛?鞝滌“靷?, "欷戧淡 氚旊嫢鞛?霃勲Г 瓿店笁鞐呾泊", "SPC 氚旊嫢鞛?雽€霟?欤茧", "鞁滉车靷?氚旊嫢鞛?瓿店笁", "SPC 銕?臧€瓴?],
    },
    vinyl: { pk: "牍勲嫄 氚旊嫢鞛?霃勲Г", sk: ["牍勲嫄 霃勲Г", "欷戧淡 鞝滌“靷?, "霃勲Г 臧€瓴?] },
    wall: { pk: "欷戧淡 氩?韺剱 瓿店笁鞐呾泊", sk: ["鞁る偞 氩?韺剱 瓿奠灔", "欷戧淡 瓯挫瀽鞛?瓿店笁鞐呾泊"] },
  },
  id: {
    spc: {
      pk: "pabrik lantai SPC",
      sk: ["produsen SPC China", "pemasok grosir lantai China", "pesanan bulk SPC", "pasokan lantai kontraktor", "harga SPC per m虏"],
    },
    vinyl: { pk: "lantai vinil grosir", sk: ["grosir vinil", "produsen China", "harga grosir"] },
    wall: { pk: "pemasok panel dinding China", sk: ["pabrik panel interior", "pemasok material bangunan China"] },
  },
  th: {
    spc: {
      pk: "喙傕福喔囙竾喔侧笝喔炧阜喙夃笝 SPC",
      sk: ["喔溹腹喙夃笢喔ム复喔?SPC 喔堗傅喔?, "喔嬥副喔炧笧喔ム覆喔⑧箑喔腑喔｀箤喔炧阜喙夃笝喔傕覆喔⑧釜喙堗竾喔堗傅喔?, "喔腑喙€喔斷腑喔｀箤 SPC 喔堗赋喔權抚喔權浮喔侧竵", "喔堗副喔斷斧喔侧笧喔粪箟喔權釜喔赤斧喔｀副喔氞笢喔灌箟喔｀副喔氞箑喔浮喔?, "喔｀覆喔勦覆 SPC 喔曕箞喔?m虏"],
    },
    vinyl: { pk: "喔炧阜喙夃笝喙勦抚喔權复喔ム競喔侧涪喔箞喔?, sk: ["喔傕覆喔⑧釜喙堗竾喙勦抚喔權复喔?, "喔溹腹喙夃笢喔ム复喔曕笀喔掂笝", "喔｀覆喔勦覆喔傕覆喔⑧釜喙堗竾"] },
    wall: { pk: "喔嬥副喔炧笧喔ム覆喔⑧箑喔腑喔｀箤喙佮笢喙堗笝喔溹笝喔编竾喔堗傅喔?, sk: ["喙傕福喔囙竾喔侧笝喙佮笢喙堗笝喔溹笝喔编竾喔犩覆喔⑧箖喔?, "喔嬥副喔炧笧喔ム覆喔⑧箑喔腑喔｀箤喔о副喔笖喔膏竵喙堗腑喔福喙夃覆喔囙笀喔掂笝"] },
  },
  tr: {
    spc: {
      pk: "SPC zemin fabrikas谋",
      sk: ["SPC 眉retici 脟in", "toptan zemin tedarik莽isi 脟in", "toplu SPC sipari艧i", "m眉teahhit zemin tedariki", "SPC m虏 fiyat"],
    },
    vinyl: { pk: "vinil zemin toptan", sk: ["vinil toptan", "脟in 眉retici", "toptan fiyat"] },
    wall: { pk: "脟in duvar paneli tedarik莽isi", sk: ["i莽 duvar paneli fabrikas谋", "脟in yap谋 malzemesi tedarik莽isi"] },
  },
  vi: {
    spc: {
      pk: "nh脿 m谩y s脿n SPC",
      sk: ["nh脿 s岷 xu岷 SPC Trung Qu峄慶", "nh脿 cung c岷 s脿n b谩n s峄?Trung Qu峄慶", "膽啤n h脿ng SPC s峄?l瓢峄g l峄沶", "cung 峄﹏g s脿n nh脿 th岷", "gi谩 SPC m虏"],
    },
    vinyl: { pk: "s脿n vinyl b谩n s峄?, sk: ["b谩n s峄?vinyl", "nh脿 s岷 xu岷 Trung Qu峄慶", "gi谩 b谩n s峄?] },
    wall: { pk: "nh脿 cung c岷 t岷 峄憄 Trung Qu峄慶", sk: ["nh脿 m谩y t岷 峄憄 n峄檌 th岷", "nh脿 cung c岷 v岷璽 li峄噓 x芒y d峄眓g Trung Qu峄慶"] },
  },
  he: {
    spc: {
      pk: "诪驻注诇 专爪驻讜转 SPC",
      sk: ["讬爪专谉 SPC 讘住讬谉", "住驻拽 专爪驻讜转 住讬讟讜谞讗讜转 讘住讬谉", "讛讝诪谞转 SPC 讘讻诪讜转", "讗住驻拽转 专爪驻讜转 诇拽讘诇谞讬诐", "诪讞讬专 SPC 诇诪\"专"],
    },
    vinyl: { pk: "专爪驻讜转 讜讬谞讬诇 住讬讟讜谞讗讜转", sk: ["住讬讟讜谞讗讜转 讜讬谞讬诇", "讬爪专谉 讘住讬谉", "诪讞讬专 住讬讟讜谞讗讬"] },
    wall: { pk: "住驻拽 驻讗谞诇讬诐 诇拽讬专讜转 讘住讬谉", sk: ["诪驻注诇 驻讗谞诇讬诐 驻谞讬诪讬讬诐", "住驻拽 讞讜诪专讬 讘谞讬讬谉 讘住讬谉"] },
  },
};

const TITLE_TEMPLATES = {
  profit: {
    en: (s) => `${s}: Distributor Margin and Cost-Efficient SPC Sourcing from China`,
    zh: (s) => `${s}锛氱粡閿€鍟嗗埄娑︿笌 SPC 鍦版澘楂樻晥閲囪喘鎴愭湰浼樺寲`,
    es: (s) => `${s}: margen del distribuidor y abastecimiento SPC rentable desde China`,
    de: (s) => `${s}: H盲ndlermarge und kosteneffiziente SPC-Beschaffung aus China`,
    fr: (s) => `${s}: marge distributeur et approvisionnement SPC rentable depuis la Chine`,
    ar: (s) => `${s}: 賴丕賲卮 丕賱賲賵夭毓 賵鬲賵乇賷丿 SPC 亘鬲賰賱賮丞 賮毓丕賱丞 賲賳 丕賱氐賷賳`,
    ru: (s) => `${s}: 屑邪褉卸邪 写懈褋褌褉懈斜褜褞褌芯褉邪 懈 褝褎褎械泻褌懈胁薪褘械 蟹邪泻褍锌泻懈 SPC 懈蟹 袣懈褌邪褟`,
    it: (s) => `${s}: margine distributore e approvvigionamento SPC efficiente dalla Cina`,
    pt: (s) => `${s}: margem do distribuidor e sourcing SPC eficiente da China`,
    ja: (s) => `${s}锛氥儑銈ｃ偣銉堛儶銉撱儱銉笺偪銉煎埄鐩娿仺涓浗SPC瑾块仈銈炽偣銉堟渶閬╁寲`,
    ko: (s) => `${s}: 鞙犿喌鞐呾泊 毵堨瓿?欷戧淡 SPC 臁半嫭 牍勳毄 須湪`,
    id: (s) => `${s}: margin distributor dan sourcing SPC efisien dari China`,
    th: (s) => `${s}: 喔佮赋喙勦福喔曕副喔о箒喔椸笝喔堗赋喔笝喙堗覆喔⑧箒喔ム赴喔佮覆喔｀笀喔编笖喔覆 SPC 喔椸傅喙堗浮喔掂笡喔｀赴喔复喔椸笜喔脆笭喔侧笧喔堗覆喔佮笀喔掂笝`,
    tr: (s) => `${s}: distrib眉t枚r marj谋 ve 脟in'den verimli SPC tedariki`,
    vi: (s) => `${s}: bi锚n l峄 nhu岷璶 nh脿 ph芒n ph峄慽 v脿 sourcing SPC hi峄噓 qu岷?t峄?Trung Qu峄慶`,
    he: (s) => `${s}: 诪专讜讜讞 诪驻讬抓 讜专讻砖 SPC 讬注讬诇 诪住讬谉`,
  },
  logistics: {
    en: (s) => `${s}: Container Loading and Export Logistics for SPC Flooring`,
    zh: (s) => `${s}锛歋PC 鍦版澘闆嗚绠辫鏌滀笌鍑哄彛鐗╂祦鏂规`,
    es: (s) => `${s}: carga de contenedor y log铆stica exportaci贸n suelos SPC`,
    de: (s) => `${s}: Containerbeladung und Exportlogistik f眉r SPC-Boden`,
    fr: (s) => `${s}: chargement conteneur et logistique export sols SPC`,
    ar: (s) => `${s}: 鬲丨賲賷賱 丕賱丨丕賵賷丕鬲 賵賱賵噩爻鬲賷丕鬲 鬲氐丿賷乇 兀乇囟賷丕鬲 SPC`,
    ru: (s) => `${s}: 蟹邪谐褉褍蟹泻邪 泻芯薪褌械泄薪械褉芯胁 懈 褝泻褋锌芯褉褌薪邪褟 谢芯谐懈褋褌懈泻邪 SPC`,
    it: (s) => `${s}: carico container e logistica export pavimenti SPC`,
    pt: (s) => `${s}: carga de contentor e log铆stica exporta莽茫o pavimentos SPC`,
    ja: (s) => `${s}锛歋PC搴婃潗銈炽兂銉嗐儕绌嶃伩杈笺伩銇ㄨ几鍑虹墿娴乣,
    ko: (s) => `${s}: SPC 氚旊嫢鞛?旎厡鞚措剤 鞝侅灛 氚?靾橃稖 氍茧`,
    id: (s) => `${s}: muat kontainer dan logistik ekspor lantai SPC`,
    th: (s) => `${s}: 喔佮覆喔｀笟喔｀福喔堗父喔曕腹喙夃竸喔笝喙€喔椸笝喙€喔權腑喔｀箤喙佮弗喔班箓喔ム笀喔脆釜喔曕复喔佮釜喙屶釜喙堗竾喔腑喔佮笧喔粪箟喔?SPC`,
    tr: (s) => `${s}: konteyner y眉kleme ve SPC zemin ihracat lojisti臒i`,
    vi: (s) => `${s}: x岷縫 container v脿 logistics xu岷 kh岷﹗ s脿n SPC`,
    he: (s) => `${s}: 讟注讬谞转 诪讻讜诇讜转 讜诇讜讙讬住讟讬拽转 讬讬爪讜讗 专爪驻讜转 SPC`,
  },
  supplier: {
    en: (s) => `${s}: How Importers Evaluate China SPC Flooring Suppliers`,
    zh: (s) => `${s}锛氳繘鍙ｅ晢濡備綍璇勪及涓浗 SPC 鍦版澘渚涘簲鍟哷,
    es: (s) => `${s}: c贸mo eval煤an importadores proveedores SPC en China`,
    de: (s) => `${s}: wie Importeure SPC-Lieferanten in China bewerten`,
    fr: (s) => `${s}: comment les importateurs 茅valuent les fournisseurs SPC en Chine`,
    ar: (s) => `${s}: 賰賷賮 賷賯賷賾賲 丕賱賲爻鬲賵乇丿賵賳 賲賵乇丿賷 SPC 賮賷 丕賱氐賷賳`,
    ru: (s) => `${s}: 泻邪泻 懈屑锌芯褉褌褢褉褘 芯褑械薪懈胁邪褞褌 锌芯褋褌邪胁褖懈泻芯胁 SPC 胁 袣懈褌邪械`,
    it: (s) => `${s}: come gli importatori valutano fornitori SPC in Cina`,
    pt: (s) => `${s}: como importadores avaliam fornecedores SPC na China`,
    ja: (s) => `${s}锛氳几鍏ユキ鑰呫亴涓浗SPC銈点儣銉┿偆銉ゃ兗銈掕渚°仚銈嬫柟娉昤,
    ko: (s) => `${s}: 靾橃瀰鞐呾泊鞚?欷戧淡 SPC 瓿店笁鞐呾泊 韽夑皜 氚╇矔`,
    id: (s) => `${s}: cara importir menilai pemasok SPC China`,
    th: (s) => `${s}: 喔溹腹喙夃笝喔赤箑喔傕箟喔侧笡喔｀赴喙€喔∴复喔權笅喔编笧喔炧弗喔侧涪喙€喔腑喔｀箤 SPC 喔堗傅喔權腑喔⑧箞喔侧竾喙勦福`,
    tr: (s) => `${s}: ithalat莽谋lar 脟in SPC tedarik莽ilerini nas谋l de臒erlendirir`,
    vi: (s) => `${s}: nh脿 nh岷璸 kh岷﹗ 膽谩nh gi谩 nh脿 cung c岷 SPC Trung Qu峄慶`,
    he: (s) => `${s}: 讗讬讱 讬讘讜讗谞讬诐 诪注专讬讻讬诐 住驻拽讬 SPC 讘住讬谉`,
  },
  project: {
    en: (s) => `${s}: SPC Flooring Supply for Commercial and Hotel Projects`,
    zh: (s) => `${s}锛氬晢涓氫笌閰掑簵椤圭洰 SPC 鍦版澘渚涘簲鏂规`,
    es: (s) => `${s}: suministro suelos SPC para proyectos comerciales y hoteleros`,
    de: (s) => `${s}: SPC-Bodenlieferung f眉r Hotel- und Gewerbeprojekte`,
    fr: (s) => `${s}: approvisionnement sols SPC pour projets h么teliers et commerciaux`,
    ar: (s) => `${s}: 鬲賵乇賷丿 兀乇囟賷丕鬲 SPC 賱賲卮丕乇賷毓 賮賳丿賯賷丞 賵鬲噩丕乇賷丞`,
    ru: (s) => `${s}: 锌芯褋褌邪胁泻懈 SPC 写谢褟 芯褌械谢械泄 懈 泻芯屑屑械褉褔械褋泻懈褏 锌褉芯械泻褌芯胁`,
    it: (s) => `${s}: fornitura pavimenti SPC per hotel e progetti commerciali`,
    pt: (s) => `${s}: fornecimento pavimentos SPC para hot茅is e projetos comerciais`,
    ja: (s) => `${s}锛氥儧銉嗐儷銉诲晢妤儣銉偢銈с偗銉堝悜銇慡PC搴婃潗渚涚郸`,
    ko: (s) => `${s}: 順疙厰路靸侅梾 頂勲鞝濏姼 SPC 氚旊嫢鞛?瓿店笁`,
    id: (s) => `${s}: pasokan lantai SPC untuk proyek hotel dan komersial`,
    th: (s) => `${s}: 喔堗副喔斷斧喔侧笧喔粪箟喔?SPC 喔赋喔福喔编笟喙傕福喔囙箒喔｀浮喙佮弗喔班箓喔勦福喔囙竵喔侧福喙€喔娻复喔囙笧喔侧笓喔脆笂喔⑧箤`,
    tr: (s) => `${s}: otel ve ticari projeler i莽in SPC zemin tedariki`,
    vi: (s) => `${s}: cung 峄﹏g s脿n SPC cho kh谩ch s岷 v脿 d峄?谩n th瓢啤ng m岷`,
    he: (s) => `${s}: 讗住驻拽转 专爪驻讜转 SPC 诇驻专讜讬拽讟讬 诪诇讜谉 讜诪住讞专`,
  },
  risk: {
    en: (s) => `${s}: Procurement Risks When Importing SPC Flooring from China`,
    zh: (s) => `${s}锛氫粠涓浗杩涘彛 SPC 鍦版澘鐨勯噰璐闄╂帶鍒禶,
    es: (s) => `${s}: riesgos de compras al importar suelos SPC de China`,
    de: (s) => `${s}: Beschaffungsrisiken beim SPC-Import aus China`,
    fr: (s) => `${s}: risques d'achat lors de l'import de sols SPC de Chine`,
    ar: (s) => `${s}: 賲禺丕胤乇 丕賱卮乇丕亍 毓賳丿 丕爻鬲賷乇丕丿 SPC 賲賳 丕賱氐賷賳`,
    ru: (s) => `${s}: 褉懈褋泻懈 蟹邪泻褍锌芯泻 锌褉懈 懈屑锌芯褉褌械 SPC 懈蟹 袣懈褌邪褟`,
    it: (s) => `${s}: rischi di approvvigionamento importando SPC dalla Cina`,
    pt: (s) => `${s}: riscos de compras ao importar SPC da China`,
    ja: (s) => `${s}锛氫腑鍥姐亱銈塖PC搴婃潗銈掕几鍏ャ仚銈嬮殯銇閬斻儶銈广偗`,
    ko: (s) => `${s}: 欷戧淡 SPC 靾橃瀰 鞁?臁半嫭 毽姢韥琡,
    id: (s) => `${s}: risiko pengadaan impor lantai SPC dari China`,
    th: (s) => `${s}: 喔勦抚喔侧浮喙€喔傅喙堗涪喔囙竵喔侧福喔堗副喔斷笅喔粪箟喔箑喔∴阜喙堗腑喔權赋喙€喔傕箟喔?SPC 喔堗覆喔佮笀喔掂笝`,
    tr: (s) => `${s}: 脟in'den SPC ithalat谋nda tedarik riskleri`,
    vi: (s) => `${s}: r峄 ro mua h脿ng khi nh岷璸 s脿n SPC t峄?Trung Qu峄慶`,
    he: (s) => `${s}: 住讬讻讜谞讬 专讻砖 讘讬讬讘讜讗 SPC 诪住讬谉`,
  },
  inventory: {
    en: (s) => `${s}: Inventory Control for Flooring Distributors and Importers`,
    zh: (s) => `${s}锛氬湴鏉跨粡閿€鍟嗕笌杩涘彛鍟嗗簱瀛樻帶鍒剁瓥鐣,
    es: (s) => `${s}: control de inventario para distribuidores e importadores de suelos`,
    de: (s) => `${s}: Bestandskontrolle f眉r Bodenimporteure und H盲ndler`,
    fr: (s) => `${s}: contr么le des stocks pour distributeurs et importateurs de sols`,
    ar: (s) => `${s}: 廿丿丕乇丞 丕賱賲禺夭賵賳 賱賲賵夭毓賷 賵 賲爻鬲賵乇丿賷 丕賱兀乇囟賷丕鬲`,
    ru: (s) => `${s}: 褍锌褉邪胁谢械薪懈械 蟹邪锌邪褋邪屑懈 写谢褟 写懈褋褌褉懈斜褜褞褌芯褉芯胁 薪邪锌芯谢褜薪褘褏 锌芯泻褉褘褌懈泄`,
    it: (s) => `${s}: controllo inventario per distributori e importatori pavimenti`,
    pt: (s) => `${s}: controlo de invent谩rio para distribuidores e importadores`,
    ja: (s) => `${s}锛氬簥鏉愩儑銈ｃ偣銉堛儶銉撱儱銉笺偪銉笺伄鍦ㄥ韩绠＄悊`,
    ko: (s) => `${s}: 氚旊嫢鞛?鞙犿喌鞐呾泊 鞛碃 甏€毽琡,
    id: (s) => `${s}: kontrol inventaris distributor dan importir lantai`,
    th: (s) => `${s}: 喔佮覆喔｀竸喔о笟喔勦父喔∴釜喔曕箛喔竵喔赋喔福喔编笟喔曕副喔о箒喔椸笝喔堗赋喔笝喙堗覆喔⑧笧喔粪箟喔檂,
    tr: (s) => `${s}: zemin distrib眉t枚rleri i莽in stok kontrol眉`,
    vi: (s) => `${s}: ki峄僲 so谩t t峄搉 kho cho nh脿 ph芒n ph峄慽 s脿n`,
    he: (s) => `${s}: 讘拽专转 诪诇讗讬 诇诪驻讬爪讬 专爪驻讜转`,
  },
  quality: {
    en: (s) => `${s}: QC Standards Before Shipping SPC Flooring Containers`,
    zh: (s) => `${s}锛歋PC 鍦版澘鍑鸿揣鍓嶈川閲忔帶鍒舵爣鍑哷,
    es: (s) => `${s}: est谩ndares QC antes de enviar contenedores de suelos SPC`,
    de: (s) => `${s}: QC-Standards vor Versand von SPC-Containerladungen`,
    fr: (s) => `${s}: normes QC avant exp茅dition de conteneurs SPC`,
    ar: (s) => `${s}: 賲毓丕賷賷乇 QC 賯亘賱 卮丨賳 丨丕賵賷丕鬲 SPC`,
    ru: (s) => `${s}: 褋褌邪薪写邪褉褌褘 QC 锌械褉械写 芯褌谐褉褍蟹泻芯泄 泻芯薪褌械泄薪械褉芯胁 SPC`,
    it: (s) => `${s}: standard QC prima della spedizione container SPC`,
    pt: (s) => `${s}: padr玫es QC antes de enviar contentores SPC`,
    ja: (s) => `${s}锛歋PC銈炽兂銉嗐儕鍑鸿嵎鍓嶃伄QC鍩烘簴`,
    ko: (s) => `${s}: SPC 旎厡鞚措剤 靹犾爜 鞝?QC 旮办`,
    id: (s) => `${s}: standar QC sebelum pengiriman kontainer SPC`,
    th: (s) => `${s}: 喔∴覆喔曕福喔愢覆喔?QC 喔佮箞喔笝喔箞喔囙笗喔灌箟 SPC`,
    tr: (s) => `${s}: SPC konteyner sevkiyat 枚ncesi KK standartlar谋`,
    vi: (s) => `${s}: ti锚u chu岷﹏ QC tr瓢峄沜 khi giao container SPC`,
    he: (s) => `${s}: 转拽谞讬 QC 诇驻谞讬 诪砖诇讜讞 诪讻讜诇讜转 SPC`,
  },
  market: {
    en: (s) => `${s}: Market Trends for SPC Flooring Importers and Distributors`,
    zh: (s) => `${s}锛歋PC 鍦版澘杩涘彛鍟嗕笌缁忛攢鍟嗗競鍦鸿秼鍔縛,
    es: (s) => `${s}: tendencias de mercado para importadores y distribuidores SPC`,
    de: (s) => `${s}: Markttrends f眉r SPC-Importeure und H盲ndler`,
    fr: (s) => `${s}: tendances march茅 pour importateurs et distributeurs SPC`,
    ar: (s) => `${s}: 丕鬲噩丕賴丕鬲 丕賱爻賵賯 賱賲爻鬲賵乇丿賷 賵賲賵夭毓賷 SPC`,
    ru: (s) => `${s}: 褉褘薪芯褔薪褘械 褌褉械薪写褘 写谢褟 懈屑锌芯褉褌褢褉芯胁 懈 写懈褋褌褉懈斜褜褞褌芯褉芯胁 SPC`,
    it: (s) => `${s}: trend di mercato per importatori e distributori SPC`,
    pt: (s) => `${s}: tend锚ncias de mercado para importadores SPC`,
    ja: (s) => `${s}锛歋PC杓稿叆妤€呫兓銉囥偅銈广儓銉儞銉ャ兗銈裤兗銇競鍫村嫊鍚慲,
    ko: (s) => `${s}: SPC 靾橃瀰鞐呾泊路鞙犿喌鞐呾泊 鞁滌灔 韸鸽爩霌渀,
    id: (s) => `${s}: tren pasar untuk importir dan distributor SPC`,
    th: (s) => `${s}: 喙佮笝喔о箓喔權箟喔∴笗喔ム覆喔斷釜喔赤斧喔｀副喔氞笢喔灌箟喔權赋喙€喔傕箟喔侧箒喔ム赴喔曕副喔о箒喔椸笝喔堗赋喔笝喙堗覆喔?SPC`,
    tr: (s) => `${s}: SPC ithalat莽谋lar谋 i莽in pazar trendleri`,
    vi: (s) => `${s}: xu h瓢峄沶g th峄?tr瓢峄漬g cho nh脿 nh岷璸 kh岷﹗ SPC`,
    he: (s) => `${s}: 诪讙诪讜转 砖讜拽 诇讬讘讜讗谞讬 SPC`,
  },
  distributor: {
    en: (s) => `${s}: Wholesale Channel Operations for SPC Flooring Distributors`,
    zh: (s) => `${s}锛歋PC 鍦版澘缁忛攢鍟嗘壒鍙戞笭閬撹繍钀,
    es: (s) => `${s}: operaciones canal mayorista para distribuidores SPC`,
    de: (s) => `${s}: Gro脽handelskanal-Betrieb f眉r SPC-H盲ndler`,
    fr: (s) => `${s}: op茅rations canal gros pour distributeurs SPC`,
    ar: (s) => `${s}: 毓賲賱賷丕鬲 賯賳丕丞 丕賱噩賲賱丞 賱賲賵夭毓賷 SPC`,
    ru: (s) => `${s}: 芯锌褌芯胁褘械 泻邪薪邪谢褘 写谢褟 写懈褋褌褉懈斜褜褞褌芯褉芯胁 SPC`,
    it: (s) => `${s}: operazioni canale ingrosso per distributori SPC`,
    pt: (s) => `${s}: opera莽玫es canal grosso para distribuidores SPC`,
    ja: (s) => `${s}锛歋PC銉囥偅銈广儓銉儞銉ャ兗銈裤兗銇嵏銉併儯銉嶃儷閬嬪柖`,
    ko: (s) => `${s}: SPC 鞙犿喌鞐呾泊 霃勲Г 毂勲剱 鞖挫榿`,
    id: (s) => `${s}: operasi saluran grosir distributor SPC`,
    th: (s) => `${s}: 喔佮覆喔｀笖喔赤箑喔權复喔權竾喔侧笝喔娻箞喔竾喔椸覆喔囙競喔侧涪喔箞喔?SPC`,
    tr: (s) => `${s}: SPC distrib眉t枚rleri toptan kanal operasyonlar谋`,
    vi: (s) => `${s}: v岷璶 h脿nh k锚nh b谩n s峄?cho nh脿 ph芒n ph峄慽 SPC`,
    he: (s) => `${s}: 转驻注讜诇 注专讜抓 住讬讟讜谞讗讜转 诇诪驻讬爪讬 SPC`,
  },
  factory: {
    en: (s) => `${s}: Factory-Level Pricing and Direct SPC Supply from China`,
    zh: (s) => `${s}锛氫腑鍥?SPC 鍦版澘宸ュ巶鐩翠緵涓庡伐鍘傜骇瀹氫环`,
    es: (s) => `${s}: precio nivel f谩brica y suministro directo SPC desde China`,
    de: (s) => `${s}: Fabrikpreise und direkte SPC-Lieferung aus China`,
    fr: (s) => `${s}: tarification usine et approvisionnement SPC direct depuis la Chine`,
    ar: (s) => `${s}: 鬲爻毓賷乇 毓賱賶 賲爻鬲賵賶 丕賱賲氐賳毓 賵鬲賵乇賷丿 SPC 賲亘丕卮乇 賲賳 丕賱氐賷賳`,
    ru: (s) => `${s}: 褑械薪褘 褍褉芯胁薪褟 褎邪斜褉懈泻懈 懈 锌褉褟屑褘械 锌芯褋褌邪胁泻懈 SPC 懈蟹 袣懈褌邪褟`,
    it: (s) => `${s}: prezzi di fabbrica e fornitura diretta SPC dalla Cina`,
    pt: (s) => `${s}: pre莽o n铆vel f谩brica e fornecimento direto SPC da China`,
    ja: (s) => `${s}锛氫腑鍥絊PC宸ュ牬鐩翠緵銇ㄥ伐鍫淬儸銉欍儷渚℃牸`,
    ko: (s) => `${s}: 欷戧淡 SPC 瓿奠灔 歆侁车旮?氚?瓿奠灔 靾橃 臧€瓴ー,
    id: (s) => `${s}: harga level pabrik dan pasokan langsung SPC dari China`,
    th: (s) => `${s}: 喔｀覆喔勦覆喔｀赴喔斷副喔氞箓喔｀竾喔囙覆喔權箒喔ム赴喔堗副喔斷斧喔?SPC 喔曕福喔囙笀喔侧竵喔堗傅喔檂,
    tr: (s) => `${s}: fabrika seviyesi fiyatland谋rma ve 脟in'den direkt SPC tedariki`,
    vi: (s) => `${s}: gi谩 c岷 nh脿 m谩y v脿 cung 峄﹏g tr峄眂 ti岷縫 SPC t峄?Trung Qu峄慶`,
    he: (s) => `${s}: 转诪讞讜专 讘专诪转 诪驻注诇 讜讗住驻拽转 SPC 讬砖讬专讛 诪住讬谉`,
  },
};

const DESC_TEMPLATES = {
  en: (t, pk) =>
    `${t}. B2B guide for flooring distributors: ${pk}, factory-level pricing, container optimization and supply chain control from China.`,
  zh: (t, pk) =>
    `${t}銆傞潰鍚戝湴鏉跨粡閿€鍟嗙殑 B2B 鎸囧崡锛?{pk}銆佸伐鍘傜骇瀹氫环銆佹暣鏌滀紭鍖栦笌涓浗渚涘簲閾剧鎺с€俙,
  es: (t, pk) =>
    `${t}. Gu铆a B2B para distribuidores: ${pk}, precio nivel f谩brica, optimizaci贸n de contenedor y control de cadena de suministro desde China.`,
  de: (t, pk) =>
    `${t}. B2B-Leitfaden f眉r H盲ndler: ${pk}, Fabrikpreise, Containeroptimierung und Lieferkettenkontrolle aus China.`,
  fr: (t, pk) =>
    `${t}. Guide B2B pour distributeurs: ${pk}, tarification usine, optimisation conteneur et contr么le supply chain depuis la Chine.`,
  ar: (t, pk) =>
    `${t}. 丿賱賷賱 B2B 賱賱賲賵夭毓賷賳: ${pk}貙 鬲爻毓賷乇 丕賱賲氐賳毓貙 鬲丨爻賷賳 丕賱丨丕賵賷丕鬲 賵丕賱鬲丨賰賲 賮賷 爻賱爻賱丞 丕賱鬲賵乇賷丿 賲賳 丕賱氐賷賳.`,
  ru: (t, pk) =>
    `${t}. B2B-褉褍泻芯胁芯写褋褌胁芯 写谢褟 写懈褋褌褉懈斜褜褞褌芯褉芯胁: ${pk}, 褑械薪褘 褎邪斜褉懈泻懈, 芯锌褌懈屑懈蟹邪褑懈褟 泻芯薪褌械泄薪械褉芯胁 懈 泻芯薪褌褉芯谢褜 褑械锌芯褔泻懈 锌芯褋褌邪胁芯泻 懈蟹 袣懈褌邪褟.`,
  it: (t, pk) =>
    `${t}. Guida B2B per distributori: ${pk}, prezzi di fabbrica, ottimizzazione container e controllo supply chain dalla Cina.`,
  pt: (t, pk) =>
    `${t}. Guia B2B para distribuidores: ${pk}, pre莽o de f谩brica, otimiza莽茫o de contentor e controlo de cadeia de abastecimento da China.`,
  ja: (t, pk) =>
    `${t}銆傘儑銈ｃ偣銉堛儶銉撱儱銉笺偪銉煎悜銇態2B銈偆銉夛細${pk}銆佸伐鍫翠尽鏍笺€併偝銉炽儐銉婃渶閬╁寲銆佷腑鍥姐偟銉椼儵銈ゃ儊銈с兗銉崇鐞嗐€俙,
  ko: (t, pk) =>
    `${t}. 鞙犿喌鞐呾泊 B2B 臧€鞚措摐: ${pk}, 瓿奠灔 靾橃 臧€瓴? 旎厡鞚措剤 斓滌爜頇? 欷戧淡 瓿店笁毵?甏€毽?`,
  id: (t, pk) =>
    `${t}. Panduan B2B distributor: ${pk}, harga level pabrik, optimasi kontainer, kontrol rantai pasok dari China.`,
  th: (t, pk) =>
    `${t}. 喔勦腹喙堗浮喔粪腑 B2B 喔赋喔福喔编笟喔曕副喔о箒喔椸笝喔堗赋喔笝喙堗覆喔? ${pk}, 喔｀覆喔勦覆喔｀赴喔斷副喔氞箓喔｀竾喔囙覆喔? 喔佮覆喔｀箑喔炧复喙堗浮喔涏福喔班釜喔脆笚喔樴复喔犩覆喔炧笗喔灌箟喔勦腑喔權箑喔椸笝喙€喔權腑喔｀箤, 喔佮覆喔｀竸喔о笟喔勦父喔∴斧喙堗抚喔囙箓喔嬥箞喔父喔涏笚喔侧笝喔堗覆喔佮笀喔掂笝`,
  tr: (t, pk) =>
    `${t}. Distrib眉t枚rler i莽in B2B rehberi: ${pk}, fabrika seviyesi fiyat, konteyner optimizasyonu, 脟in tedarik zinciri kontrol眉.`,
  vi: (t, pk) =>
    `${t}. H瓢峄沶g d岷玭 B2B cho nh脿 ph芒n ph峄慽: ${pk}, gi谩 c岷 nh脿 m谩y, t峄慽 瓢u container, ki峄僲 so谩t chu峄梚 cung 峄﹏g t峄?Trung Qu峄慶.`,
  he: (t, pk) =>
    `${t}. 诪讚专讬讱 B2B 诇诪驻讬爪讬诐: ${pk}, 转诪讞讜专 讘专诪转 诪驻注诇, 讗讜驻讟讬诪讬讝爪讬讬转 诪讻讜诇讜转 讜讘拽专转 砖专砖专转 讗住驻拽讛 诪住讬谉.`,
};

function subjectFromEnTitle(enTitle) {
  return enTitle.length > 72 ? `${enTitle.slice(0, 69)}鈥 : enTitle;
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
  const metaTitle = `${title.length > 52 ? `${title.slice(0, 49)}鈥 : title} | ${kw.pk} | Eshsire Group`;

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
