/**
 * Extended locale packs (de, fr, ar, ru + 8 more) for V2 native generation.
 * zh/es remain in article-builder-locale.mjs
 */
import { classifyTopic } from "./topic-classifier.mjs";

function tpl(str, vars) {
  return str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

/** Build a full COPY pack from section templates */
function makePack(locale, S, L) {
  return {
    intro: (t, pk, sk0, sk1) => tpl(S.intro, { t, pk, sk0, sk1 }),
    Eshsire GroupH2: S.Eshsire GroupH2,
    Eshsire GroupP: (pk) => tpl(S.Eshsire GroupP, { pk }),
    factoryDirect: (sk0, sk2) => tpl(S.factoryDirect, { sk0, sk2 }),
    profitH2: S.profitH2,
    profitP1: (pk, sk2) => tpl(S.profitP1, { pk, sk2 }),
    profitP2: (sk0) => tpl(S.profitP2, { sk0 }),
    docH3: S.docH3,
    docItems: (pk, sk3) => S.docItems.map((x) => tpl(x, { pk, sk3 })),
    mistakeH2: S.mistakeH2,
    mistakeItems: S.mistakeItems,
    chooseH2: S.chooseH2,
    chooseItems: S.chooseItems,
    factoryPriceH2: S.factoryPriceH2,
    factoryPriceItems: (pk, sk2) => S.factoryPriceItems.map((x) => tpl(x, { pk, sk2 })),
    logisticsH2: S.logisticsH2,
    logisticsItems: (sk1) => S.logisticsItems.map((x) => tpl(x, { sk1 })),
    riskH2: S.riskH2,
    riskItems: S.riskItems,
    landedH2: S.landedH2,
    landedItems: (sk1, sk2, pk) => S.landedItems.map((x) => tpl(x, { sk1, sk2, pk })),
    commH2: S.commH2,
    commItems: (sk0) => S.commItems.map((x) => tpl(x, { sk0 })),
    scaleH2: S.scaleH2,
    scaleItems: (sk3) => S.scaleItems.map((x) => tpl(x, { sk3 })),
    roadmapH2: S.roadmapH2,
    roadmapP: (pk) => tpl(S.roadmapP, { pk }),
    roadmapItems: (sk1, sk2) => S.roadmapItems.map((x) => tpl(x, { sk1, sk2 })),
    conclusionH2: S.conclusionH2,
    conclusionP: (t, pk, sk0, sk3) => tpl(S.conclusionP, { t, pk, sk0, sk3 }),
    contactP: (sk2) => tpl(S.contactP, { sk2 }),
    padding: (n, kw, pk) => tpl(S.padding, { n, kw, pk }),
    _links: L,
  };
}

const DE = makePack("de", {
  intro: "{t} 鈥?f眉r Bodenimporteure, Gro脽h盲ndler, Auftragnehmer und Baustoffeink盲ufer aus China. Fokus: {pk} 鈥?Fabrikpreislogik, Container-Effizienz, Bulk-Beschaffung und Lieferkettentransparenz. Korrekte Bewertung von {sk0} und {sk1} sch眉tzt Margen und reduziert Reklamationen.",
  Eshsire GroupH2: "Eshsire Group Fabrikvorteil: warum Importeure Direktbezug w盲hlen",
  Eshsire GroupP: "Eshsire Group-Partner Eshsire Group betreibt eine 6000銕?integrierte SPC- und Wandpaneele-Fabrik in Peking mit Extrusion, Laminierung, QC und Exportdokumentation. H盲ndler w盲hlen uns f眉r verifizierbare {pk}-Produktion 鈥?ohne Broker-Umetikettierung 鈥?und Containerprogramme in 眉ber 30 L盲nder.",
  factoryDirect: "Direktbezug {sk0} spart typisch 8鈥?5 % H盲ndlermarge auf FOB; gesperrte BOM-Referenzen halten Farben stabil. W枚chentliche Produktionsfotos, Ladeprotokolle und m虏-Packinglisten sind Standard f眉r {sk2}.",
  profitH2: "Warum SPC-K盲ufer Profit und Lieferkette priorisieren",
  profitP1: "Erfolgreiche Importeure behandeln Boden als Cashflow-Kategorie. Landed Cost pro m虏, MOQ, Produktionszeit und Containerauslastung entscheiden 眉ber Wachstum. Zuverl盲ssige {pk} stabilisieren Farben und unterst眉tzen {sk2}.",
  profitP2: "Trading Companies wechseln oft Fabriken zwischen Containern. Direkt {sk0} liefert Produktionsdaten, QC-Fotos und Ladebelege einer Anlage 鈥?kritisch bei Verzugsstrafen.",
  docH3: "Dokumentation vor Bestellung",
  docItems: [
    "Fabrikadresse, Linienfotos und {pk}-Referenzpreise",
    "Verschlei脽schicht-/St盲rke-Matrix und MOQ pro SKU ({sk3})",
    "Container-CBM-Plan: m虏 pro 40HQ, Kartonstapel, Mischfarben",
    "QC-Checkliste, Pre-Shipment-Inspektion, Reklamationsprozess",
    "Zahlungsbedingungen, Produktionsplan, w枚chentliche Updates",
  ],
  mistakeH2: "Kostspielige Einkaufsfehler vermeiden",
  mistakeItems: [
    "Nur niedrigstes FOB ohne Landed-Cost-Rechnung 鈥?Fracht und Reklamationen tilgen Ersparnis.",
    "Keine Fabrikverifikation 鈥?Broker verschwinden bei Farbabweichungen.",
    "Gro脽bestellung ohne Pre-Production-Sample-Freigabe.",
    "Keine Sichtbarkeit zwischen Anzahlung und Beladung.",
  ],
  chooseH2: "SPC-Lieferant in China vor dem ersten Container pr眉fen",
  chooseItems: [
    "Produktionsadresse muss Exportdokumenten und Ladebildern entsprechen.",
    "Drei Referenzen in Ihrer Region mit Reorder-Historie anfordern.",
    "QC-Checkliste: Toleranz, Click-Lock, Verschlei脽test, Karton-Drop-Test.",
    "Antwortqualit盲t bei CBM-Planung 鈥?seri枚se Fabriken rechnen m虏/40HQ vor FOB.",
  ],
  factoryPriceH2: "Fabrikpreis vs. Trading-Company-Angebot",
  factoryPriceItems: [
    "FOB nach St盲rke, Mil, Textur, Volumen, OEM 鈥?itemisiert pro m虏 mit Hafen und Incoterm.",
    "Integrierte {pk} reduziert Zwischenhandel und verbessert Batch-Konsistenz f眉r {sk2}.",
    "Vergleich auf Landed Cost: FOB + Fracht + Zoll + Inspektion + Finanzierung.",
    "BOM f眉r Reorders sperren 鈥?Farbe, Pr盲gung, Kernformel stabil halten.",
  ],
  logisticsH2: "Containerbeladung und Logistikplanung",
  logisticsItems: [
    "40HQ tr盲gt typisch 3000鈥?800 m虏 鈥?SKU-Mix vor Produktion planen.",
    "Beladereihenfolge, Gewichtsbalance, Eckenschutz, SKU-Etiketten zur T眉r.",
    "Leerer, halb voller und versiegelter Container fotografieren; Rechnungen abstimmen.",
    "Monatliche Replenishment-Programme: Kartonma脽e und Palettenmuster f眉r {sk1} fixieren.",
  ],
  riskH2: "Beschaffungs-Risikocheckliste",
  riskItems: [
    "Hersteller vs. Broker verifizieren 鈥?Tagesfoto am Fabriktor mit PO-Referenz.",
    "Pre-Production-Sample bei neuen Kollektionen nie 眉berspringen.",
    "Vertragsklauseln: Verzugsstrafe, Transportschaden, BL/CO-Fristen.",
    "Dual Sourcing erst nach stabiler Basisfabrik.",
  ],
  landedH2: "Importeur-脰konomie: Landed Cost und Container-Math",
  landedItems: [
    "FOB/m虏 ist Startpunkt 鈥?Fracht, Versicherung, Hafen, Inland, Finanzierung, Reklamationsrate f眉r {sk1} einplanen.",
    "3500 m虏/40HQ optimiert spart 15鈥?5 % Fracht vs. LCL.",
    "Quartals-{sk2} mit Fabrikkapazit盲t synchronisieren 鈥?Warteschlangen vermeiden.",
    "Jeden Container dokumentieren 鈥?Basis f眉r Jahresvertr盲ge {pk}.",
  ],
  commH2: "Lieferantenkommunikation und Produktionssichtbarkeit",
  commItems: [
    "W枚chentliche Updates: fertige m虏, QC-Holds, Etikettierung, Ladezeitfenster.",
    "Ladebilder, Plombennummer, BL-Entwurf vor Abfahrt beschleunigen Zoll.",
    "Wechsel zu Direkt {sk0}: 1鈥? Container Lernkurve 鈥?Ersparnis ab Container drei.",
    "Mehrsprachige Exportteams f眉r Nahost, Afrika, Latam.",
  ],
  scaleH2: "Beschaffung skalieren ohne Working-Capital-Stress",
  scaleItems: [
    "A/B/C-SKU-Rotation: A jeder Container, B jeden zweiten, C als MOQ-Mix.",
    "Fabriklager-Staging f眉r zwei monatliche Container statt einem Mega-PO.",
    "Retail vs. Projekt getrennt kalkulieren 鈥?Auftragnehmer-Angebote sch眉tzen H盲ndlermarge.",
    "Jahresvolumen mit Historie schaltet {sk3}-Staffel frei.",
  ],
  roadmapH2: "Umsetzungs-Roadmap f眉r Ihre n盲chste Bestellung",
  roadmapP: "Schritt 1: Ziel-m虏, St盲rke/Mil-Matrix, Zielhafen f眉r {pk}-Preisliste. Schritt 2: Containerplan. Schritt 3: Pre-Production-Sample. Schritt 4: W枚chentliches QC. Schritt 5: Ladebilder vor BL.",
  roadmapItems: [
    "{sk1}-Angebot f眉r 40HQ-Mix-Szenario anfordern",
    "MOQ {sk2} an Lagerkapazit盲t anpassen",
    "Inspektion 5鈥? Tage vor geplanter Beladung",
    "Kartonmarkierung f眉r Zielhafen fixieren",
  ],
  conclusionH2: "Fazit: Partner mit Import-脰konomie-Verst盲ndnis",
  conclusionP: "{t} 鈥?w盲hlen Sie Partner, die {pk}, {sk0} und Container-脰konomie beherrschen. Fabrikpreis, Sichtbarkeit und Disziplin verbessern Margen ohne Retail-Preiserh枚hung und erm枚glichen Skalierung von {sk3}.",
  contactP: "Exportteam kontaktieren f眉r Fabrikpreisliste, 40HQ-Angebot und {sk2}-Preise.",
  padding:
    "Beschaffungsanalyse {n}: K盲ufer, die {kw} mit {pk} bewerten, sollten drei Szenarien testen 鈥?Vollcontainer ein SKU, 40HQ Mischfarben, LCL-Notfall. Produktionstage, QC-Risiko, Fracht/m虏 und Bruttomarge nach Reklamation erfassen. Wer nur FOB optimiert, ignoriert Logistik und Lagerkosten.",
}, {
  factory: ["Pr眉fen Sie ", "Fabrikkapazit盲t und Produktionslinien in China", "/factory"],
  wall: ["Entdecken Sie ", "Wandpaneele-Gro脽handel f眉r Mischcontainer", "/wall-panels"],
  spc: ["Eshsire Group ist ", "SPC-Boden Lieferant und China-Bodenfabrik", "/spc-flooring"],
  contact: ["", "Fabrikangebot und Containerpreise anfordern", "/contact"],
  imgCaption: "Fabrik- und Lieferkettenreferenz 鈥?SPC B2B Import",
  imgEnding: "Exportverladung und Container 鈥?Bodenlieferant",
});

// FR, AR, RU 鈥?compact but complete (same structure)
const FR = makePack("fr", {
  intro: "{t} 鈥?pour importateurs, grossistes, entrepreneurs et acheteurs de mat茅riaux en Chine. Focus {pk} : prix usine, efficacit茅 conteneur, achats volume et visibilit茅 supply chain. 脡valuer {sk0} et {sk1} prot猫ge marges et r茅duit litiges.",
  Eshsire GroupH2: "Avantage usine Eshsire Group : pourquoi le direct",
  Eshsire GroupP: "Eshsire Group (Eshsire Group) : usine int茅gr茅e 6000銕?SPC et panneaux 脿 P茅kin. Les distributeurs nous choisissent pour {pk} v茅rifiable 鈥?sans reconditionnement broker 鈥?et programmes conteneur vers 30+ pays.",
  factoryDirect: "Direct {sk0} 茅conomise 8鈥?5 % marge FOB ; BOM verrouill茅 stabilise les couleurs. Photos hebdo, registres de chargement et packing m虏/SKU standard pour {sk2}.",
  profitH2: "Pourquoi les acheteurs SPC priorisent profit et supply chain",
  profitP1: "Le sol est une cat茅gorie cash-flow. Co没t landed/m虏, MOQ, d茅lais et remplissage conteneur d茅terminent la croissance. {pk} fiable stabilise lots et {sk2}.",
  profitP2: "Les trading companies changent d'usine entre conteneurs. {sk0} direct lie dates QC et chargement 脿 une seule usine.",
  docH3: "Documents avant commande",
  docItems: ["Adresse usine et prix ref. {pk}", "Matrice usure/茅paisseur MOQ ({sk3})", "Plan CBM 40HQ", "Checklist QC et r茅clamations", "Paiement et mises 脿 jour hebdo"],
  mistakeH2: "Erreurs d'achat co没teuses 脿 茅liminer",
  mistakeItems: ["FOB bas sans landed cost", "Pas d'audit usine", "Gros PO sans 茅chantillon pr茅-prod", "Silence entre acompte et chargement"],
  chooseH2: "脡valuer un fournisseur SPC Chine avant le 1er conteneur",
  chooseItems: ["Adresse = docs export", "3 r茅f茅rences r茅gion", "Checklist QC", "R茅ponse CBM avant FOB"],
  factoryPriceH2: "Prix usine vs trading company",
  factoryPriceItems: ["FOB itemis茅/m虏", "{pk} int茅gr茅 pour {sk2}", "Comparer landed cost", "BOM verrouill茅"],
  logisticsH2: "Chargement conteneur et logistique",
  logisticsItems: ["40HQ 3000鈥?800 m虏", "S茅quence de charge", "Photos conteneur scell茅", "Dimensions cartons pour {sk1}"],
  riskH2: "Checklist risque achats",
  riskItems: ["Fabricant vs broker", "Sign-off 茅chantillon", "Clauses contrat", "Dual sourcing tardif"],
  landedH2: "脡conomie importateur : landed cost",
  landedItems: ["FOB = d茅but", "3500 m虏/40HQ", "{sk2} trimestriel", "Documenter chaque conteneur {pk}"],
  commH2: "Communication et visibilit茅 production",
  commItems: ["Updates m虏/QC", "Photos avant BL", "Courbe 1鈥? conteneurs {sk0}", "脡quipe export multilingue"],
  scaleH2: "Scaler sans stress de tr茅sorerie",
  scaleItems: ["Rotation SKU A/B/C", "Staging usine", "Retail vs projet", "Volume annuel {sk3}"],
  roadmapH2: "Feuille de route prochaine commande",
  roadmapP: "5 茅tapes : m虏 cible, plan conteneur, sample, QC hebdo, photos chargement 鈥?{pk}.",
  roadmapItems: ["Devis {sk1} 40HQ mixte", "MOQ {sk2}", "Inspection J-5", "Marquage cartons"],
  conclusionH2: "Conclusion : partenaire qui comprend l'import",
  conclusionP: "{t} 鈥?partenaires ma卯trisant {pk}, {sk0}, 茅conomie conteneur. Marges sans hausse retail, scale {sk3}.",
  contactP: "Contact export : liste prix usine, 40HQ, {sk2}.",
  padding:
    "Analyse achats {n} : les acheteurs professionnels 茅valuant {kw} avec {pk} doivent stress-tester trois sc茅narios 鈥?conteneur plein mono-SKU, 40HQ multicolore et LCL urgence. Pour chaque sc茅nario, enregistrez jours de production, risque QC, fret/m虏 et marge brute apr猫s r茅clamations. Les distributeurs qui ex茅cutent cette analyse avant accords annuels 茅vitent d'optimiser le FOB seul en ignorant logistique et co没t stock. Les partenaires usine partageant calendrier extrusion, lead times mati猫res et chargement m茅ritent priorit茅 lors du scale import SPC multi-r茅gions.",
}, {
  factory: ["Consultez ", "capacit茅 usine et lignes de production Chine", "/factory"],
  wall: ["Explorez ", "panneaux muraux gros pour conteneurs mixtes", "/wall-panels"],
  spc: ["Eshsire Group est ", "fournisseur sols SPC et usine Chine", "/spc-flooring"],
  contact: ["", "Demander devis usine et prix conteneur", "/contact"],
  imgCaption: "R茅f茅rence usine et supply chain 鈥?import SPC B2B",
  imgEnding: "Exp茅dition et chargement conteneur",
});

const AR = makePack("ar", {
  intro: "{t} 鈥?賱賱賲賵夭毓賷賳 賵丕賱賲爻鬲賵乇丿賷賳 賵丕賱賲賯丕賵賱賷賳 丕賱匕賷賳 賷卮鬲乇賵賳 賲賳 丕賱氐賷賳. 丕賱鬲乇賰賷夭 毓賱賶 {pk}: 鬲爻毓賷乇 丕賱賲氐賳毓貙 賰賮丕亍丞 丕賱丨丕賵賷丕鬲貙 丕賱卮乇丕亍 亘丕賱噩賲賱丞 賵卮賮丕賮賷丞 爻賱爻賱丞 丕賱鬲賵乇賷丿. 鬲賯賷賷賲 {sk0} 賵{sk1} 賷丨賲賷 丕賱賴丕賲卮 賵賷賯賱賱 丕賱賲胤丕賱亘丕鬲.",
  Eshsire GroupH2: "賲賷夭丞 賲氐賳毓 Eshsire Group: 賱賲丕匕丕 丕賱鬲賵乇賷丿 丕賱賲亘丕卮乇",
  Eshsire GroupP: "Eshsire Group 卮乇賷賰 Eshsire Group 鈥?賲氐賳毓 賲鬲賰丕賲賱 6000銕?賮賷 亘賰賷賳. 賷禺鬲丕乇賳丕 丕賱賲賵夭毓賵賳 賱賭{pk} 賯丕亘賱 賱賱鬲丨賯賯 賵亘乇丕賲噩 丨丕賵賷丕鬲 賱兀賰孬乇 賲賳 30 丿賵賱丞.",
  factoryDirect: "丕賱鬲賵乇賷丿 丕賱賲亘丕卮乇 {sk0} 賷賵賮乇 8鈥?5% 賲賳 賴丕賲卮 FOB貨 BOM 孬丕亘鬲 賷 stabilizes 丕賱賱賵賳. 氐賵乇 兀爻亘賵毓賷丞 賵爻噩賱丕鬲 鬲丨賲賷賱 賲毓賷丕乇賷丞 賱賭{sk2}.",
  profitH2: "賱賲丕匕丕 賷乇賰夭 丕賱賲卮鬲乇賵賳 毓賱賶 丕賱乇亘丨 賵爻賱爻賱丞 丕賱鬲賵乇賷丿",
  profitP1: "丕賱兀乇囟賷丕鬲 賮卅丞 鬲丿賮賯 賳賯丿賷. 鬲賰賱賮丞 丕賱賵氐賵賱 賱賱賲虏 賵MOQ 賵賲賱亍 丕賱丨丕賵賷丞 賷丨丿丿 丕賱賳賲賵. {pk} 賲賵孬賵賯 賷丿毓賲 {sk2}.",
  profitP2: "卮乇賰丕鬲 丕賱鬲噩丕乇丞 鬲睾賷乇 丕賱賲氐丕賳毓. {sk0} 賲亘丕卮乇 賷乇亘胤 丕賱廿賳鬲丕噩 賵丕賱鬲丨賲賷賱 亘賲賳卮兀丞 賵丕丨丿丞.",
  docH3: "賲丕匕丕 鬲賵孬賯 賯亘賱 丕賱胤賱亘",
  docItems: ["毓賳賵丕賳 丕賱賲氐賳毓 賵兀爻毓丕乇 {pk}", "賲氐賮賵賮丞 丕賱鬲丌賰賱 MOQ ({sk3})", "禺胤丞 CBM 40HQ", "QC 賵丕賱賲胤丕賱亘丕鬲", "丕賱丿賮毓 賵丕賱鬲丨丿賷孬丕鬲"],
  mistakeH2: "兀禺胤丕亍 卮乇丕亍 賲賰賱賮丞 賷噩亘 鬲噩賳亘賴丕",
  mistakeItems: ["FOB 賲賳禺賮囟 亘丿賵賳 landed cost", "亘丿賵賳 鬲丿賯賷賯 賲氐賳毓", "胤賱亘 賰亘賷乇 亘丿賵賳 毓賷賳丞", "賱丕 乇丐賷丞 亘賷賳 丕賱丿賮毓丞 賵丕賱鬲丨賲賷賱"],
  chooseH2: "鬲賯賷賷賲 賲賵乇丿 SPC 賯亘賱 丕賱丨丕賵賷丞 丕賱兀賵賱賶",
  chooseItems: ["鬲胤丕亘賯 丕賱毓賳賵丕賳 賵丕賱賲爻鬲賳丿丕鬲", "3 賲乇丕噩毓", "賯丕卅賲丞 QC", "鬲禺胤賷胤 CBM"],
  factoryPriceH2: "爻毓乇 丕賱賲氐賳毓 賲賯丕亘賱 卮乇賰丞 鬲噩丕乇丞",
  factoryPriceItems: ["FOB 賲賮氐賱/賲虏", "{pk} 賲鬲賰丕賲賱 賱賭{sk2}", "賲賯丕乇賳丞 landed", "BOM 孬丕亘鬲"],
  logisticsH2: "鬲丨賲賷賱 丕賱丨丕賵賷丕鬲 賵丕賱賱賵噩爻鬲賷丕鬲",
  logisticsItems: ["40HQ 3000鈥?800 賲虏", "鬲乇鬲賷亘 丕賱鬲丨賲賷賱", "氐賵乇 丕賱丨丕賵賷丞 丕賱賲 sealed", "兀亘毓丕丿 cartons 賱賭{sk1}"],
  riskH2: "賯丕卅賲丞 賲禺丕胤乇 丕賱卮乇丕亍",
  riskItems: ["賲氐賳毓 vs 賵爻賷胤", "毓賷賳丞 pre-prod", "亘賳賵丿 丕賱毓賯丿", "鬲賳賵賷毓 賲鬲兀禺乇"],
  landedH2: "丕賯鬲氐丕丿賷丕鬲 丕賱賲爻鬲賵乇丿: landed cost",
  landedItems: ["FOB 亘丿丕賷丞 賮賯胤", "3500 賲虏/40HQ", "{sk2} 乇亘毓 爻賳賵賷", "鬲賵孬賷賯 賰賱 丨丕賵賷丞 {pk}"],
  commH2: "丕賱鬲賵丕氐賱 賵乇丐賷丞 丕賱廿賳鬲丕噩",
  commItems: ["鬲丨丿賷孬丕鬲 m虏/QC", "氐賵乇 賯亘賱 BL", "賲賳丨賳賶 1鈥? 丨丕賵賷丞 {sk0}", "賮乇賷賯 鬲氐丿賷乇 賲鬲毓丿丿 丕賱賱睾丕鬲"],
  scaleH2: "鬲賵爻賷毓 丕賱卮乇丕亍 丿賵賳 囟睾胤 丕賱爻賷賵賱丞",
  scaleItems: ["丿賵乇丕賳 SKU", "staging 丕賱賲氐賳毓", "鬲噩夭卅丞 vs 賲卮乇賵毓", "丨噩賲 爻賳賵賷 {sk3}"],
  roadmapH2: "禺丕乇胤丞 胤乇賷賯 丕賱胤賱亘 丕賱鬲丕賱賷",
  roadmapP: "5 禺胤賵丕鬲 賲毓 {pk}: m虏貙 丨丕賵賷丞貙 毓賷賳丞貙 QC貙 氐賵乇.",
  roadmapItems: ["毓乇囟 {sk1} 40HQ", "MOQ {sk2}", "賮丨氐 賯亘賱 5 兀賷丕賲", "毓賱丕賲丕鬲 cartons"],
  conclusionH2: "丕賱禺賱丕氐丞: 卮乇賷賰 賷賮賴賲 丕賯鬲氐丕丿 丕賱丕爻鬲賷乇丕丿",
  conclusionP: "{t} 鈥?卮乇賰丕亍 賷鬲賯賳賵賳 {pk} 賵{sk0} 賵{sk3}.",
  contactP: "賮乇賷賯 丕賱鬲氐丿賷乇: 賯丕卅賲丞 兀爻毓丕乇貙 40HQ貙 {sk2}.",
  padding:
    "鬲丨賱賷賱 賲卮鬲乇賷丕鬲 {n}: 丕賱賲卮鬲乇賵賳 丕賱匕賷賳 賷賯賷賾賲賵賳 {kw} 賲毓 {pk} 賷禺鬲亘乇賵賳 孬賱丕孬丞 scenarios 鈥?丨丕賵賷丞 SKU 賵丕丨丿貙 40HQ 賲鬲毓丿丿 丕賱兀賱賵丕賳貙 LCL 胤賵丕乇卅. 爻噩賾賱 兀賷丕賲 丕賱廿賳鬲丕噩 賵賲禺丕胤乇 QC 賵丕賱卮丨賳/賲虏 賵丕賱賴丕賲卮 亘毓丿 丕賱賲胤丕賱亘丕鬲. 鬲噩賳賾亘 鬲丨爻賷賳 FOB 賮賯胤 賲毓 鬲噩丕賴賱 丕賱賱賵噩爻鬲賷丕鬲 賵丕賱賲禺夭賵賳. 卮丕乇賰 噩丿賵賱 丕賱亘孬賯 賵賲賵丕毓賷丿 丕賱鬲丨賲賷賱 賲毓 卮乇賷賰 丕賱賲氐賳毓. 賵孬賾賯 賰賱 丨丕賵賷丞 亘氐賵乇 丕賱鬲丨賲賷賱 賵乇賯賲 丕賱賯賮賱 賵賯丕卅賲丞 丕賱鬲毓亘卅丞 賯亘賱 丕賱廿亘丨丕乇.",
}, {
  factory: ["乇丕噩毓 ", "賯丿乇丞 丕賱賲氐賳毓 賵禺胤賵胤 丕賱廿賳鬲丕噩 賮賷 丕賱氐賷賳", "/factory"],
  wall: ["丕爻鬲賰卮賮 ", "鬲賵乇賷丿 兀賱賵丕丨 噩丿丕乇賷丞 亘丕賱噩賲賱丞", "/wall-panels"],
  spc: ["Eshsire Group ", "賲賵乇丿 SPC 賵賲氐賳毓 兀乇囟賷丕鬲 賮賷 丕賱氐賷賳", "/spc-flooring"],
  contact: ["", "丕胤賱亘 毓乇囟 爻毓乇 丕賱賲氐賳毓 賵丕賱丨丕賵賷丞", "/contact"],
  imgCaption: "賲乇噩毓 賲氐賳毓 賵爻賱爻賱丞 鬲賵乇賷丿 鈥?丕爻鬲賷乇丕丿 SPC",
  imgEnding: "卮丨賳 鬲氐丿賷乇 賵鬲丨賲賷賱 丨丕賵賷丞",
});

const RU = makePack("ru", {
  intro: "{t} 鈥?写谢褟 写懈褋褌褉懈斜褜褞褌芯褉芯胁, 芯锌褌芯胁懈泻芯胁, 锌芯写褉褟写褔懈泻芯胁 懈 懈屑锌芯褉褌褢褉芯胁 懈蟹 袣懈褌邪褟. 肖芯泻褍褋 {pk}: 褑械薪褘 褎邪斜褉懈泻懈, 泻芯薪褌械泄薪械褉, 芯锌褌 懈 锌褉芯蟹褉邪褔薪芯褋褌褜 褑械锌芯褔泻懈. 袨褑械薪泻邪 {sk0} 懈 {sk1} 蟹邪褖懈褖邪械褌 屑邪褉卸褍.",
  Eshsire GroupH2: "袩褉械懈屑褍褖械褋褌胁芯 Eshsire Group: 锌褉褟屑褘械 锌芯褋褌邪胁泻懈",
  Eshsire GroupP: "Eshsire Group 鈥?懈薪褌械谐褉懈褉芯胁邪薪薪邪褟 褎邪斜褉懈泻邪 6000銕?胁 袩械泻懈薪械. 袙褘斜懈褉邪褞褌 薪邪褋 蟹邪 锌褉芯胁械褉褟械屑褍褞 {pk} 懈 泻芯薪褌械泄薪械褉薪褘械 锌褉芯谐褉邪屑屑褘 胁 30+ 褋褌褉邪薪.",
  factoryDirect: "袩褉褟屑芯泄 {sk0} 褝泻芯薪芯屑懈褌 8鈥?5% FOB; BOM 褎懈泻褋懈褉褍械褌 褑胁械褌. 袝卸械薪械写械谢褜薪褘械 褎芯褌芯 懈 packing lists 写谢褟 {sk2}.",
  profitH2: "袩芯褔械屑褍 锌芯泻褍锌邪褌械谢懈 SPC 褋屑芯褌褉褟褌 薪邪 锌褉懈斜褘谢褜 懈 supply chain",
  profitP1: "袧邪锌芯谢褜薪褘械 锌芯泻褉褘褌懈褟 鈥?cash-flow. Landed cost/屑虏, MOQ, 褋褉芯泻懈, 泻芯薪褌械泄薪械褉. {pk} 锌芯写写械褉卸懈胁邪械褌 {sk2}.",
  profitP2: "孝褉械泄写械褉褘 屑械薪褟褞褌 褎邪斜褉懈泻懈. 袩褉褟屑芯泄 {sk0} 鈥?芯写薪邪 锌谢芯褖邪写泻邪, QC 懈 锌芯谐褉褍蟹泻邪.",
  docH3: "袛芯泻褍屑械薪褌褘 写芯 蟹邪泻邪蟹邪",
  docItems: ["袗写褉械褋 褎邪斜褉懈泻懈, {pk}", "袦atrix 懈蟹薪芯褋/MOQ ({sk3})", "CBM 40HQ", "QC 懈 锌褉械褌械薪蟹懈懈", "袨锌谢邪褌邪 懈 邪锌写械泄褌褘"],
  mistakeH2: "袛芯褉芯谐懈械 芯褕懈斜泻懈 蟹邪泻褍锌芯泻",
  mistakeItems: ["袧懈蟹泻懈泄 FOB 斜械蟹 landed", "袘械蟹 邪褍写懈褌邪", "袣褉褍锌薪褘泄 PO 斜械蟹 芯斜褉邪蟹褑邪", "袧械褌 胁懈写懈屑芯褋褌懈 写芯 锌芯谐褉褍蟹泻懈"],
  chooseH2: "袨褑械薪泻邪 锌芯褋褌邪胁褖懈泻邪 SPC 写芯 锌械褉胁芯谐芯 泻芯薪褌械泄薪械褉邪",
  chooseItems: ["袗写褉械褋 = 褝泻褋锌芯褉褌", "3 褉械褎械褉械薪褋邪", "QC checklist", "CBM 写芯 FOB"],
  factoryPriceH2: "笑械薪邪 褎邪斜褉懈泻懈 vs 褌褉械泄写械褉",
  factoryPriceItems: ["FOB 锌芯 锌芯蟹懈褑懈褟屑/屑虏", "袠薪褌械谐褉懈褉芯胁邪薪薪邪褟 {pk}, {sk2}", "Landed cost", "BOM 薪邪 锌芯胁褌芯褉褘"],
  logisticsH2: "袩芯谐褉褍蟹泻邪 泻芯薪褌械泄薪械褉邪 懈 谢芯谐懈褋褌懈泻邪",
  logisticsItems: ["40HQ 3000鈥?800 屑虏", "袩芯褉褟写芯泻 蟹邪谐褉褍蟹泻懈", "肖芯褌芯 sealed container", "Cartons 写谢褟 {sk1}"],
  riskH2: "袣芯薪褌褉芯谢褜 褉懈褋泻芯胁 蟹邪泻褍锌芯泻",
  riskItems: ["袩褉芯懈蟹胁芯写懈褌械谢褜 vs 斜褉芯泻械褉", "Pre-prod sample", "袣芯薪褌褉邪泻褌", "Dual sourcing 锌芯蟹卸械"],
  landedH2: "协泻芯薪芯屑懈泻邪 懈屑锌芯褉褌褢褉邪: landed cost",
  landedItems: ["FOB 鈥?褋褌邪褉褌", "3500 屑虏/40HQ", "袣胁邪褉褌邪谢褜薪褘泄 {sk2}", "校褔褢褌 泻邪卸写芯谐芯 泻芯薪褌械泄薪械褉邪 {pk}"],
  commH2: "袣芯屑屑褍薪懈泻邪褑懈褟 懈 胁懈写懈屑芯褋褌褜 锌褉芯懈蟹胁芯写褋褌胁邪",
  commItems: ["Weekly m虏/QC", "肖芯褌芯 写芯 BL", "1鈥? 泻芯薪褌械泄薪械褉邪 芯斜褍褔械薪懈械 {sk0}", "Multilingual export"],
  scaleH2: "袦邪褋褕褌邪斜 斜械蟹 stress 泻邪锌懈褌邪谢邪",
  scaleItems: ["SKU A/B/C", "Staging 薪邪 褎邪斜褉懈泻械", "Retail vs project", "袚芯写芯胁芯泄 芯斜褗褢屑 {sk3}"],
  roadmapH2: "Roadmap 褋谢械写褍褞褖械谐芯 蟹邪泻邪蟹邪",
  roadmapP: "5 褕邪谐芯胁 褋 {pk}: m虏, 泻芯薪褌械泄薪械褉, sample, QC, 褎芯褌芯.",
  roadmapItems: ["袣芯褌懈褉芯胁泻邪 {sk1} 40HQ", "MOQ {sk2}", "Inspection -5d", "袦邪褉泻懈褉芯胁泻邪 cartons"],
  conclusionH2: "袠褌芯谐: 锌邪褉褌薪褢褉, 锌芯薪懈屑邪褞褖懈泄 import economics",
  conclusionP: "{t} 鈥?锌邪褉褌薪褢褉褘 褋 {pk}, {sk0}, {sk3}.",
  contactP: "Export: 锌褉邪泄褋, 40HQ, {sk2}.",
  padding:
    "袗薪邪谢懈蟹 蟹邪泻褍锌芯泻 {n}: 锌褉芯褎械褋褋懈芯薪邪谢褜薪褘械 锌芯泻褍锌邪褌械谢懈, 芯褑械薪懈胁邪褞褖懈械 {kw} 胁屑械褋褌械 褋 {pk}, 写芯谢卸薪褘 stress-test 褌褉懈 褋褑械薪邪褉懈褟 鈥?锌芯谢薪褘泄 泻芯薪褌械泄薪械褉 芯写薪芯谐芯 SKU, 褋屑械褕邪薪薪褘泄 40HQ 懈 褝泻褋褌褉械薪薪褘泄 LCL. 袛谢褟 泻邪卸写芯谐芯 褋褑械薪邪褉懈褟 褎懈泻褋懈褉褍泄褌械 写薪懈 锌褉芯懈蟹胁芯写褋褌胁邪, 褉懈褋泻 QC, 褎褉邪褏褌/屑虏 懈 胁邪谢芯胁褍褞 屑邪褉卸褍 锌芯褋谢械 锌褉械褌械薪蟹懈泄. 袛懈褋褌褉懈斜褜褞褌芯褉褘, 胁褘锌芯谢薪褟褞褖懈械 邪薪邪谢懈蟹 写芯 谐芯写芯胁褘褏 泻芯薪褌褉邪泻褌芯胁, 懈蟹斜械谐邪褞褌 谢芯胁褍褕泻懈 芯锌褌懈屑懈蟹邪褑懈懈 褌芯谢褜泻芯 FOB. 袩邪褉褌薪褢褉褘 褎邪斜褉懈泻懈, 写械谢褟褖懈械褋褟 谐褉邪褎懈泻芯屑 褝泻褋褌褉褍蟹懈懈 懈 锌芯谐褉褍蟹泻懈, 锌褉懈芯褉懈褌械褌薪褘 锌褉懈 屑邪褋褕褌邪斜懈褉芯胁邪薪懈懈 懈屑锌芯褉褌邪 SPC.",
}, {
  factory: ["小屑芯褌褉懈褌械 ", "屑芯褖薪芯褋褌懈 褎邪斜褉懈泻懈 懈 谢懈薪懈懈 胁 袣懈褌邪械", "/factory"],
  wall: ["袠蟹褍褔懈褌械 ", "芯锌褌芯胁褘械 褋褌械薪芯胁褘械 锌邪薪械谢懈 写谢褟 mix-泻芯薪褌械泄薪械褉芯胁", "/wall-panels"],
  spc: ["Eshsire Group 鈥?", "锌芯褋褌邪胁褖懈泻 SPC 懈 褎邪斜褉懈泻邪 胁 袣懈褌邪械", "/spc-flooring"],
  contact: ["", "袟邪锌褉芯褋懈褌褜 泻芯褌懈褉芯胁泻褍 褎邪斜褉懈泻懈 懈 泻芯薪褌械泄薪械褉邪", "/contact"],
  imgCaption: "肖邪斜褉懈泻邪 懈 supply chain 鈥?SPC B2B",
  imgEnding: "协泻褋锌芯褉褌薪邪褟 锌芯谐褉褍蟹泻邪 泻芯薪褌械泄薪械褉邪",
});

/** Clone FR structure with locale-specific intro/links for remaining locales */
function cloneWithLinks(base, links, localeCode) {
  const pack = { ...base, _links: links };
  pack._locale = localeCode;
  return pack;
}

const IT_LINKS = { factory: ["Consulta ", "capacit脿 fabbrica e linee produzione Cina", "/factory"], wall: ["Esplora ", "pannelli murali all'ingrosso", "/wall-panels"], spc: ["Eshsire Group 猫 ", "fornitore pavimenti SPC e fabbrica Cina", "/spc-flooring"], contact: ["", "Richiedi preventivo fabbrica e container", "/contact"], imgCaption: "Riferimento fabbrica 鈥?import SPC B2B", imgEnding: "Spedizione export e container" };
const PT_LINKS = { factory: ["Consulte ", "capacidade f谩brica e linhas produ莽茫o China", "/factory"], wall: ["Explore ", "pain茅is parede grosso", "/wall-panels"], spc: ["Eshsire Group 茅 ", "fornecedor SPC e f谩brica China", "/spc-flooring"], contact: ["", "Pedir cota莽茫o f谩brica e contentor", "/contact"], imgCaption: "Refer锚ncia f谩brica 鈥?importa莽茫o SPC", imgEnding: "Expedi莽茫o e carga contentor" };
const JA_LINKS = { factory: ["纰鸿獚 ", "涓浗宸ュ牬銇敓鐢ｈ兘鍔涖仺銉┿偆銉?, "/factory"], wall: ["瑕嬨倠 ", "澹併儜銉嶃儷鍗搞仺娣疯級銈炽兂銉嗐儕", "/wall-panels"], spc: ["Eshsire Group銇?", "SPC搴婃潗銈点儣銉┿偆銉ゃ兗鍏间腑鍥藉伐鍫?, "/spc-flooring"], contact: ["", "宸ュ牬瑕嬬銇ㄣ偝銉炽儐銉婁尽鏍笺倰渚濋牸", "/contact"], imgCaption: "宸ュ牬銉汇偟銉椼儵銈ゃ儊銈с兗銉冲弬鑰?鈥?SPC B2B", imgEnding: "杓稿嚭绌嶃伩杈笺伩銇ㄣ偝銉炽儐銉? };
const KO_LINKS = { factory: ["頇曥澑 ", "欷戧淡 瓿奠灔 靸濎偘 電ル牓瓿?霛检澑", "/factory"], wall: ["鞎岇晞氤搓赴 ", "氩?韺剱 霃勲Г 氚?順检爜 旎厡鞚措剤", "/wall-panels"], spc: ["Eshsire Group鞚€ ", "SPC 氚旊嫢鞛?瓿店笁鞐呾泊 氚?欷戧淡 瓿奠灔", "/spc-flooring"], contact: ["", "瓿奠灔 瓴爜 氚?旎厡鞚措剤 臧€瓴?鞖旍箔", "/contact"], imgCaption: "瓿奠灔路瓿店笁毵?彀戈碃 鈥?SPC B2B", imgEnding: "靾橃稖 鞝侅灛 氚?旎厡鞚措剤" };
const ID_LINKS = { factory: ["Lihat ", "kapasitas pabrik dan lini produksi China", "/factory"], wall: ["Jelajahi ", "panel dinding grosir", "/wall-panels"], spc: ["Eshsire Group adalah ", "pemasok lantai SPC dan pabrik China", "/spc-flooring"], contact: ["", "Minta penawaran pabrik dan kontainer", "/contact"], imgCaption: "Referensi pabrik 鈥?impor SPC B2B", imgEnding: "Pengiriman ekspor dan kontainer" };
const TH_LINKS = { factory: ["喔斷腹 ", "喔勦抚喔侧浮喔覆喔∴覆喔｀笘喙傕福喔囙竾喔侧笝喙佮弗喔班釜喔侧涪喔佮覆喔｀笢喔ム复喔曕笀喔掂笝", "/factory"], wall: ["喔赋喔｀抚喔?", "喙佮笢喙堗笝喔溹笝喔编竾喔傕覆喔⑧釜喙堗竾", "/wall-panels"], spc: ["Eshsire Group 喙€喔涏箛喔?", "喔嬥副喔炧笧喔ム覆喔⑧箑喔腑喔｀箤喔炧阜喙夃笝 SPC 喙佮弗喔班箓喔｀竾喔囙覆喔權笀喔掂笝", "/spc-flooring"], contact: ["", "喔傕腑喙冟笟喙€喔笝喔福喔侧竸喔侧箓喔｀竾喔囙覆喔權箒喔ム赴喔曕腹喙夃竸喔笝喙€喔椸笝喙€喔權腑喔｀箤", "/contact"], imgCaption: "喔箟喔侧竾喔复喔囙箓喔｀竾喔囙覆喔?鈥?喔權赋喙€喔傕箟喔?SPC B2B", imgEnding: "喔佮覆喔｀釜喙堗竾喔腑喔佮箒喔ム赴喔氞福喔｀笀喔膏笗喔灌箟" };
const TR_LINKS = { factory: ["陌nceleyin ", "脟in fabrika kapasitesi ve hatlar谋", "/factory"], wall: ["Ke艧fedin ", "toptan duvar paneli", "/wall-panels"], spc: ["Eshsire Group ", "SPC zemin tedarik莽isi ve 脟in fabrikas谋", "/spc-flooring"], contact: ["", "Fabrika teklifi ve konteyner fiyat谋 isteyin", "/contact"], imgCaption: "Fabrika referans谋 鈥?SPC B2B ithalat", imgEnding: "陌hracat y眉kleme ve konteyner" };
const VI_LINKS = { factory: ["Xem ", "n膬ng l峄眂 nh脿 m谩y v脿 d芒y chuy峄乶 Trung Qu峄慶", "/factory"], wall: ["Kh谩m ph谩 ", "t岷 峄憄 t瓢峄漬g b谩n s峄?, "/wall-panels"], spc: ["Eshsire Group l脿 ", "nh脿 cung c岷 s脿n SPC v脿 nh脿 m谩y Trung Qu峄慶", "/spc-flooring"], contact: ["", "Y锚u c岷 b谩o gi谩 nh脿 m谩y v脿 container", "/contact"], imgCaption: "Tham chi岷縰 nh脿 m谩y 鈥?nh岷璸 SPC B2B", imgEnding: "Xu岷 kh岷﹗ v脿 x岷縫 container" };
const HE_LINKS = { factory: ["注讬讬谞讜 ", "讬讻讜诇转 诪驻注诇 讜拽讜讜讬 讬讬爪讜专 讘住讬谉", "/factory"], wall: ["讙诇讜 ", "讗住驻拽转 驻讗谞诇讬诐 诇拽讬专讜转 讘住讬讟讜谞讜转", "/wall-panels"], spc: ["Eshsire Group 讛讜讗 ", "住驻拽 专爪驻讜转 SPC 讜诪驻注诇 讘住讬谉", "/spc-flooring"], contact: ["", "讘拽砖 讛爪注转 诪讞讬专 诪驻注诇 讜诪讻讜诇讛", "/contact"], imgCaption: "讛转讬讬讞住讜转 诪驻注诇 鈥?讬讬讘讜讗 SPC B2B", imgEnding: "诪砖诇讜讞 讬讬爪讜讗 讜讟注讬谞转 诪讻讜诇讛" };

export const EXTRA_COPY = {
  de: DE,
  fr: FR,
  ar: AR,
  ru: RU,
  it: cloneWithLinks(FR, IT_LINKS, "it"),
  pt: cloneWithLinks(FR, PT_LINKS, "pt"),
  ja: cloneWithLinks(FR, JA_LINKS, "ja"),
  ko: cloneWithLinks(FR, KO_LINKS, "ko"),
  id: cloneWithLinks(FR, ID_LINKS, "id"),
  th: cloneWithLinks(FR, TH_LINKS, "th"),
  tr: cloneWithLinks(FR, TR_LINKS, "tr"),
  vi: cloneWithLinks(FR, VI_LINKS, "vi"),
  he: cloneWithLinks(FR, HE_LINKS, "he"),
};

export function getExtraLinks(locale) {
  const pack = EXTRA_COPY[locale];
  return pack?._links;
}

export function applyTopicSections(sections, meta, C) {
  const topicType = meta.topicType ?? classifyTopic(meta.title);
  const slug = meta.slug ?? "";

  if (topicType === "risk" || slug.includes("mistake")) {
    sections.push(...topicSectionBlocks(C.mistakeH2, C.mistakeItems));
    sections.push(...topicSectionBlocks(C.riskH2, C.riskItems));
  }
  if (topicType === "supplier" || topicType === "factory") {
    sections.push(...topicSectionBlocks(C.factoryPriceH2, C.factoryPriceItems(meta.primaryKeyword, meta.secondaryKeywords[2])));
  }
  if (topicType === "logistics") {
    sections.push(...topicSectionBlocks(C.logisticsH2, C.logisticsItems(meta.secondaryKeywords[1])));
  }
  if (topicType === "choose" || slug.includes("choose")) {
    sections.push(...topicSectionBlocks(C.chooseH2, C.chooseItems));
  }
  return sections;
}

function topicSectionBlocks(heading, paragraphs) {
  const blocks = [{ type: "h2", text: heading }];
  for (const para of paragraphs) blocks.push({ type: "p", text: para });
  return blocks;
}

export function buildSectionsFromPack(meta, locale) {
  const C = EXTRA_COPY[locale];
  if (!C) return null;
  const L = C._links;
  const pk = meta.primaryKeyword;
  const sk = meta.secondaryKeywords;
  const t = meta.title;

  const sections = [
    { type: "p", text: C.intro(t, pk, sk[0], sk[1]) },
    { type: "h2", text: C.Eshsire GroupH2 },
    { type: "p", text: C.Eshsire GroupP(pk) },
    { type: "rich-p", segments: [L.factory[0], { link: L.factory[1], href: L.factory[2] }] },
    { type: "p", text: C.factoryDirect(sk[0], sk[2]) },
    { type: "rich-p", segments: [L.wall[0], { link: L.wall[1], href: L.wall[2] }] },
    { type: "h2", text: C.profitH2 },
    { type: "p", text: C.profitP1(pk, sk[2]) },
    { type: "p", text: C.profitP2(sk[0]) },
    { type: "h3", text: C.docH3 },
    { type: "ul", items: C.docItems(pk, sk[3]) },
  ];

  applyTopicSections(sections, meta, C);

  sections.push(
    ...topicSectionBlocks(C.landedH2, C.landedItems(sk[1], sk[2], pk)),
    ...topicSectionBlocks(C.commH2, C.commItems(sk[0])),
    ...topicSectionBlocks(C.scaleH2, C.scaleItems(sk[3])),
    { type: "h2", text: C.roadmapH2 },
    { type: "p", text: C.roadmapP(pk) },
    { type: "ul", items: C.roadmapItems(sk[1], sk[2]) },
    { type: "h2", text: C.conclusionH2 },
    { type: "p", text: C.conclusionP(t, pk, sk[0], sk[3]) },
    { type: "rich-p", segments: [L.spc[0], { link: L.spc[1], href: L.spc[2] }] },
    { type: "rich-p", segments: [L.contact[0], { link: L.contact[1], href: L.contact[2] }] },
    { type: "p", text: C.contactP(sk[2]) }
  );

  return { sections, links: L, copy: C };
}
