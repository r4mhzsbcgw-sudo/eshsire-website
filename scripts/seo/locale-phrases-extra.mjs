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
    bjfloorH2: S.bjfloorH2,
    bjfloorP: (pk) => tpl(S.bjfloorP, { pk }),
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
  intro: "{t} — für Bodenimporteure, Großhändler, Auftragnehmer und Baustoffeinkäufer aus China. Fokus: {pk} — Fabrikpreislogik, Container-Effizienz, Bulk-Beschaffung und Lieferkettentransparenz. Korrekte Bewertung von {sk0} und {sk1} schützt Margen und reduziert Reklamationen.",
  bjfloorH2: "BJFLOOR Fabrikvorteil: warum Importeure Direktbezug wählen",
  bjfloorP: "BJFLOOR-Partner Eshsire Group betreibt eine 6000㎡ integrierte SPC- und Wandpaneele-Fabrik in Peking mit Extrusion, Laminierung, QC und Exportdokumentation. Händler wählen uns für verifizierbare {pk}-Produktion — ohne Broker-Umetikettierung — und Containerprogramme in über 30 Länder.",
  factoryDirect: "Direktbezug {sk0} spart typisch 8–15 % Händlermarge auf FOB; gesperrte BOM-Referenzen halten Farben stabil. Wöchentliche Produktionsfotos, Ladeprotokolle und m²-Packinglisten sind Standard für {sk2}.",
  profitH2: "Warum SPC-Käufer Profit und Lieferkette priorisieren",
  profitP1: "Erfolgreiche Importeure behandeln Boden als Cashflow-Kategorie. Landed Cost pro m², MOQ, Produktionszeit und Containerauslastung entscheiden über Wachstum. Zuverlässige {pk} stabilisieren Farben und unterstützen {sk2}.",
  profitP2: "Trading Companies wechseln oft Fabriken zwischen Containern. Direkt {sk0} liefert Produktionsdaten, QC-Fotos und Ladebelege einer Anlage — kritisch bei Verzugsstrafen.",
  docH3: "Dokumentation vor Bestellung",
  docItems: [
    "Fabrikadresse, Linienfotos und {pk}-Referenzpreise",
    "Verschleißschicht-/Stärke-Matrix und MOQ pro SKU ({sk3})",
    "Container-CBM-Plan: m² pro 40HQ, Kartonstapel, Mischfarben",
    "QC-Checkliste, Pre-Shipment-Inspektion, Reklamationsprozess",
    "Zahlungsbedingungen, Produktionsplan, wöchentliche Updates",
  ],
  mistakeH2: "Kostspielige Einkaufsfehler vermeiden",
  mistakeItems: [
    "Nur niedrigstes FOB ohne Landed-Cost-Rechnung — Fracht und Reklamationen tilgen Ersparnis.",
    "Keine Fabrikverifikation — Broker verschwinden bei Farbabweichungen.",
    "Großbestellung ohne Pre-Production-Sample-Freigabe.",
    "Keine Sichtbarkeit zwischen Anzahlung und Beladung.",
  ],
  chooseH2: "SPC-Lieferant in China vor dem ersten Container prüfen",
  chooseItems: [
    "Produktionsadresse muss Exportdokumenten und Ladebildern entsprechen.",
    "Drei Referenzen in Ihrer Region mit Reorder-Historie anfordern.",
    "QC-Checkliste: Toleranz, Click-Lock, Verschleißtest, Karton-Drop-Test.",
    "Antwortqualität bei CBM-Planung — seriöse Fabriken rechnen m²/40HQ vor FOB.",
  ],
  factoryPriceH2: "Fabrikpreis vs. Trading-Company-Angebot",
  factoryPriceItems: [
    "FOB nach Stärke, Mil, Textur, Volumen, OEM — itemisiert pro m² mit Hafen und Incoterm.",
    "Integrierte {pk} reduziert Zwischenhandel und verbessert Batch-Konsistenz für {sk2}.",
    "Vergleich auf Landed Cost: FOB + Fracht + Zoll + Inspektion + Finanzierung.",
    "BOM für Reorders sperren — Farbe, Prägung, Kernformel stabil halten.",
  ],
  logisticsH2: "Containerbeladung und Logistikplanung",
  logisticsItems: [
    "40HQ trägt typisch 3000–3800 m² — SKU-Mix vor Produktion planen.",
    "Beladereihenfolge, Gewichtsbalance, Eckenschutz, SKU-Etiketten zur Tür.",
    "Leerer, halb voller und versiegelter Container fotografieren; Rechnungen abstimmen.",
    "Monatliche Replenishment-Programme: Kartonmaße und Palettenmuster für {sk1} fixieren.",
  ],
  riskH2: "Beschaffungs-Risikocheckliste",
  riskItems: [
    "Hersteller vs. Broker verifizieren — Tagesfoto am Fabriktor mit PO-Referenz.",
    "Pre-Production-Sample bei neuen Kollektionen nie überspringen.",
    "Vertragsklauseln: Verzugsstrafe, Transportschaden, BL/CO-Fristen.",
    "Dual Sourcing erst nach stabiler Basisfabrik.",
  ],
  landedH2: "Importeur-Ökonomie: Landed Cost und Container-Math",
  landedItems: [
    "FOB/m² ist Startpunkt — Fracht, Versicherung, Hafen, Inland, Finanzierung, Reklamationsrate für {sk1} einplanen.",
    "3500 m²/40HQ optimiert spart 15–25 % Fracht vs. LCL.",
    "Quartals-{sk2} mit Fabrikkapazität synchronisieren — Warteschlangen vermeiden.",
    "Jeden Container dokumentieren — Basis für Jahresverträge {pk}.",
  ],
  commH2: "Lieferantenkommunikation und Produktionssichtbarkeit",
  commItems: [
    "Wöchentliche Updates: fertige m², QC-Holds, Etikettierung, Ladezeitfenster.",
    "Ladebilder, Plombennummer, BL-Entwurf vor Abfahrt beschleunigen Zoll.",
    "Wechsel zu Direkt {sk0}: 1–2 Container Lernkurve — Ersparnis ab Container drei.",
    "Mehrsprachige Exportteams für Nahost, Afrika, Latam.",
  ],
  scaleH2: "Beschaffung skalieren ohne Working-Capital-Stress",
  scaleItems: [
    "A/B/C-SKU-Rotation: A jeder Container, B jeden zweiten, C als MOQ-Mix.",
    "Fabriklager-Staging für zwei monatliche Container statt einem Mega-PO.",
    "Retail vs. Projekt getrennt kalkulieren — Auftragnehmer-Angebote schützen Händlermarge.",
    "Jahresvolumen mit Historie schaltet {sk3}-Staffel frei.",
  ],
  roadmapH2: "Umsetzungs-Roadmap für Ihre nächste Bestellung",
  roadmapP: "Schritt 1: Ziel-m², Stärke/Mil-Matrix, Zielhafen für {pk}-Preisliste. Schritt 2: Containerplan. Schritt 3: Pre-Production-Sample. Schritt 4: Wöchentliches QC. Schritt 5: Ladebilder vor BL.",
  roadmapItems: [
    "{sk1}-Angebot für 40HQ-Mix-Szenario anfordern",
    "MOQ {sk2} an Lagerkapazität anpassen",
    "Inspektion 5–7 Tage vor geplanter Beladung",
    "Kartonmarkierung für Zielhafen fixieren",
  ],
  conclusionH2: "Fazit: Partner mit Import-Ökonomie-Verständnis",
  conclusionP: "{t} — wählen Sie Partner, die {pk}, {sk0} und Container-Ökonomie beherrschen. Fabrikpreis, Sichtbarkeit und Disziplin verbessern Margen ohne Retail-Preiserhöhung und ermöglichen Skalierung von {sk3}.",
  contactP: "Exportteam kontaktieren für Fabrikpreisliste, 40HQ-Angebot und {sk2}-Preise.",
  padding:
    "Beschaffungsanalyse {n}: Käufer, die {kw} mit {pk} bewerten, sollten drei Szenarien testen — Vollcontainer ein SKU, 40HQ Mischfarben, LCL-Notfall. Produktionstage, QC-Risiko, Fracht/m² und Bruttomarge nach Reklamation erfassen. Wer nur FOB optimiert, ignoriert Logistik und Lagerkosten.",
}, {
  factory: ["Prüfen Sie ", "Fabrikkapazität und Produktionslinien in China", "/factory"],
  wall: ["Entdecken Sie ", "Wandpaneele-Großhandel für Mischcontainer", "/wall-panels"],
  spc: ["Eshsire Group ist ", "SPC-Boden Lieferant und China-Bodenfabrik", "/spc-flooring"],
  contact: ["", "Fabrikangebot und Containerpreise anfordern", "/contact"],
  imgCaption: "Fabrik- und Lieferkettenreferenz — SPC B2B Import",
  imgEnding: "Exportverladung und Container — Bodenlieferant",
});

// FR, AR, RU — compact but complete (same structure)
const FR = makePack("fr", {
  intro: "{t} — pour importateurs, grossistes, entrepreneurs et acheteurs de matériaux en Chine. Focus {pk} : prix usine, efficacité conteneur, achats volume et visibilité supply chain. Évaluer {sk0} et {sk1} protège marges et réduit litiges.",
  bjfloorH2: "Avantage usine BJFLOOR : pourquoi le direct",
  bjfloorP: "Eshsire Group (BJFLOOR) : usine intégrée 6000㎡ SPC et panneaux à Pékin. Les distributeurs nous choisissent pour {pk} vérifiable — sans reconditionnement broker — et programmes conteneur vers 30+ pays.",
  factoryDirect: "Direct {sk0} économise 8–15 % marge FOB ; BOM verrouillé stabilise les couleurs. Photos hebdo, registres de chargement et packing m²/SKU standard pour {sk2}.",
  profitH2: "Pourquoi les acheteurs SPC priorisent profit et supply chain",
  profitP1: "Le sol est une catégorie cash-flow. Coût landed/m², MOQ, délais et remplissage conteneur déterminent la croissance. {pk} fiable stabilise lots et {sk2}.",
  profitP2: "Les trading companies changent d'usine entre conteneurs. {sk0} direct lie dates QC et chargement à une seule usine.",
  docH3: "Documents avant commande",
  docItems: ["Adresse usine et prix ref. {pk}", "Matrice usure/épaisseur MOQ ({sk3})", "Plan CBM 40HQ", "Checklist QC et réclamations", "Paiement et mises à jour hebdo"],
  mistakeH2: "Erreurs d'achat coûteuses à éliminer",
  mistakeItems: ["FOB bas sans landed cost", "Pas d'audit usine", "Gros PO sans échantillon pré-prod", "Silence entre acompte et chargement"],
  chooseH2: "Évaluer un fournisseur SPC Chine avant le 1er conteneur",
  chooseItems: ["Adresse = docs export", "3 références région", "Checklist QC", "Réponse CBM avant FOB"],
  factoryPriceH2: "Prix usine vs trading company",
  factoryPriceItems: ["FOB itemisé/m²", "{pk} intégré pour {sk2}", "Comparer landed cost", "BOM verrouillé"],
  logisticsH2: "Chargement conteneur et logistique",
  logisticsItems: ["40HQ 3000–3800 m²", "Séquence de charge", "Photos conteneur scellé", "Dimensions cartons pour {sk1}"],
  riskH2: "Checklist risque achats",
  riskItems: ["Fabricant vs broker", "Sign-off échantillon", "Clauses contrat", "Dual sourcing tardif"],
  landedH2: "Économie importateur : landed cost",
  landedItems: ["FOB = début", "3500 m²/40HQ", "{sk2} trimestriel", "Documenter chaque conteneur {pk}"],
  commH2: "Communication et visibilité production",
  commItems: ["Updates m²/QC", "Photos avant BL", "Courbe 1–2 conteneurs {sk0}", "Équipe export multilingue"],
  scaleH2: "Scaler sans stress de trésorerie",
  scaleItems: ["Rotation SKU A/B/C", "Staging usine", "Retail vs projet", "Volume annuel {sk3}"],
  roadmapH2: "Feuille de route prochaine commande",
  roadmapP: "5 étapes : m² cible, plan conteneur, sample, QC hebdo, photos chargement — {pk}.",
  roadmapItems: ["Devis {sk1} 40HQ mixte", "MOQ {sk2}", "Inspection J-5", "Marquage cartons"],
  conclusionH2: "Conclusion : partenaire qui comprend l'import",
  conclusionP: "{t} — partenaires maîtrisant {pk}, {sk0}, économie conteneur. Marges sans hausse retail, scale {sk3}.",
  contactP: "Contact export : liste prix usine, 40HQ, {sk2}.",
  padding:
    "Analyse achats {n} : les acheteurs professionnels évaluant {kw} avec {pk} doivent stress-tester trois scénarios — conteneur plein mono-SKU, 40HQ multicolore et LCL urgence. Pour chaque scénario, enregistrez jours de production, risque QC, fret/m² et marge brute après réclamations. Les distributeurs qui exécutent cette analyse avant accords annuels évitent d'optimiser le FOB seul en ignorant logistique et coût stock. Les partenaires usine partageant calendrier extrusion, lead times matières et chargement méritent priorité lors du scale import SPC multi-régions.",
}, {
  factory: ["Consultez ", "capacité usine et lignes de production Chine", "/factory"],
  wall: ["Explorez ", "panneaux muraux gros pour conteneurs mixtes", "/wall-panels"],
  spc: ["Eshsire Group est ", "fournisseur sols SPC et usine Chine", "/spc-flooring"],
  contact: ["", "Demander devis usine et prix conteneur", "/contact"],
  imgCaption: "Référence usine et supply chain — import SPC B2B",
  imgEnding: "Expédition et chargement conteneur",
});

const AR = makePack("ar", {
  intro: "{t} — للموزعين والمستوردين والمقاولين الذين يشترون من الصين. التركيز على {pk}: تسعير المصنع، كفاءة الحاويات، الشراء بالجملة وشفافية سلسلة التوريد. تقييم {sk0} و{sk1} يحمي الهامش ويقلل المطالبات.",
  bjfloorH2: "ميزة مصنع BJFLOOR: لماذا التوريد المباشر",
  bjfloorP: "Eshsire Group شريك BJFLOOR — مصنع متكامل 6000㎡ في بكين. يختارنا الموزعون لـ{pk} قابل للتحقق وبرامج حاويات لأكثر من 30 دولة.",
  factoryDirect: "التوريد المباشر {sk0} يوفر 8–15% من هامش FOB؛ BOM ثابت ي stabilizes اللون. صور أسبوعية وسجلات تحميل معيارية لـ{sk2}.",
  profitH2: "لماذا يركز المشترون على الربح وسلسلة التوريد",
  profitP1: "الأرضيات فئة تدفق نقدي. تكلفة الوصول للم² وMOQ وملء الحاوية يحدد النمو. {pk} موثوق يدعم {sk2}.",
  profitP2: "شركات التجارة تغير المصانع. {sk0} مباشر يربط الإنتاج والتحميل بمنشأة واحدة.",
  docH3: "ماذا توثق قبل الطلب",
  docItems: ["عنوان المصنع وأسعار {pk}", "مصفوفة التآكل MOQ ({sk3})", "خطة CBM 40HQ", "QC والمطالبات", "الدفع والتحديثات"],
  mistakeH2: "أخطاء شراء مكلفة يجب تجنبها",
  mistakeItems: ["FOB منخفض بدون landed cost", "بدون تدقيق مصنع", "طلب كبير بدون عينة", "لا رؤية بين الدفعة والتحميل"],
  chooseH2: "تقييم مورد SPC قبل الحاوية الأولى",
  chooseItems: ["تطابق العنوان والمستندات", "3 مراجع", "قائمة QC", "تخطيط CBM"],
  factoryPriceH2: "سعر المصنع مقابل شركة تجارة",
  factoryPriceItems: ["FOB مفصل/م²", "{pk} متكامل لـ{sk2}", "مقارنة landed", "BOM ثابت"],
  logisticsH2: "تحميل الحاويات واللوجستيات",
  logisticsItems: ["40HQ 3000–3800 م²", "ترتيب التحميل", "صور الحاوية الم sealed", "أبعاد cartons لـ{sk1}"],
  riskH2: "قائمة مخاطر الشراء",
  riskItems: ["مصنع vs وسيط", "عينة pre-prod", "بنود العقد", "تنويع متأخر"],
  landedH2: "اقتصاديات المستورد: landed cost",
  landedItems: ["FOB بداية فقط", "3500 م²/40HQ", "{sk2} ربع سنوي", "توثيق كل حاوية {pk}"],
  commH2: "التواصل ورؤية الإنتاج",
  commItems: ["تحديثات m²/QC", "صور قبل BL", "منحنى 1–2 حاوية {sk0}", "فريق تصدير متعدد اللغات"],
  scaleH2: "توسيع الشراء دون ضغط السيولة",
  scaleItems: ["دوران SKU", "staging المصنع", "تجزئة vs مشروع", "حجم سنوي {sk3}"],
  roadmapH2: "خارطة طريق الطلب التالي",
  roadmapP: "5 خطوات مع {pk}: m²، حاوية، عينة، QC، صور.",
  roadmapItems: ["عرض {sk1} 40HQ", "MOQ {sk2}", "فحص قبل 5 أيام", "علامات cartons"],
  conclusionH2: "الخلاصة: شريك يفهم اقتصاد الاستيراد",
  conclusionP: "{t} — شركاء يتقنون {pk} و{sk0} و{sk3}.",
  contactP: "فريق التصدير: قائمة أسعار، 40HQ، {sk2}.",
  padding:
    "تحليل مشتريات {n}: المشترون الذين يقيّمون {kw} مع {pk} يختبرون ثلاثة scenarios — حاوية SKU واحد، 40HQ متعدد الألوان، LCL طوارئ. سجّل أيام الإنتاج ومخاطر QC والشحن/م² والهامش بعد المطالبات. تجنّب تحسين FOB فقط مع تجاهل اللوجستيات والمخزون. شارك جدول البثق ومواعيد التحميل مع شريك المصنع. وثّق كل حاوية بصور التحميل ورقم القفل وقائمة التعبئة قبل الإبحار.",
}, {
  factory: ["راجع ", "قدرة المصنع وخطوط الإنتاج في الصين", "/factory"],
  wall: ["استكشف ", "توريد ألواح جدارية بالجملة", "/wall-panels"],
  spc: ["Eshsire Group ", "مورد SPC ومصنع أرضيات في الصين", "/spc-flooring"],
  contact: ["", "اطلب عرض سعر المصنع والحاوية", "/contact"],
  imgCaption: "مرجع مصنع وسلسلة توريد — استيراد SPC",
  imgEnding: "شحن تصدير وتحميل حاوية",
});

const RU = makePack("ru", {
  intro: "{t} — для дистрибьюторов, оптовиков, подрядчиков и импортёров из Китая. Фокус {pk}: цены фабрики, контейнер, опт и прозрачность цепочки. Оценка {sk0} и {sk1} защищает маржу.",
  bjfloorH2: "Преимущество BJFLOOR: прямые поставки",
  bjfloorP: "Eshsire Group — интегрированная фабрика 6000㎡ в Пекине. Выбирают нас за проверяемую {pk} и контейнерные программы в 30+ стран.",
  factoryDirect: "Прямой {sk0} экономит 8–15% FOB; BOM фиксирует цвет. Еженедельные фото и packing lists для {sk2}.",
  profitH2: "Почему покупатели SPC смотрят на прибыль и supply chain",
  profitP1: "Напольные покрытия — cash-flow. Landed cost/м², MOQ, сроки, контейнер. {pk} поддерживает {sk2}.",
  profitP2: "Трейдеры меняют фабрики. Прямой {sk0} — одна площадка, QC и погрузка.",
  docH3: "Документы до заказа",
  docItems: ["Адрес фабрики, {pk}", "Мatrix износ/MOQ ({sk3})", "CBM 40HQ", "QC и претензии", "Оплата и апдейты"],
  mistakeH2: "Дорогие ошибки закупок",
  mistakeItems: ["Низкий FOB без landed", "Без аудита", "Крупный PO без образца", "Нет видимости до погрузки"],
  chooseH2: "Оценка поставщика SPC до первого контейнера",
  chooseItems: ["Адрес = экспорт", "3 референса", "QC checklist", "CBM до FOB"],
  factoryPriceH2: "Цена фабрики vs трейдер",
  factoryPriceItems: ["FOB по позициям/м²", "Интегрированная {pk}, {sk2}", "Landed cost", "BOM на повторы"],
  logisticsH2: "Погрузка контейнера и логистика",
  logisticsItems: ["40HQ 3000–3800 м²", "Порядок загрузки", "Фото sealed container", "Cartons для {sk1}"],
  riskH2: "Контроль рисков закупок",
  riskItems: ["Производитель vs брокер", "Pre-prod sample", "Контракт", "Dual sourcing позже"],
  landedH2: "Экономика импортёра: landed cost",
  landedItems: ["FOB — старт", "3500 м²/40HQ", "Квартальный {sk2}", "Учёт каждого контейнера {pk}"],
  commH2: "Коммуникация и видимость производства",
  commItems: ["Weekly m²/QC", "Фото до BL", "1–2 контейнера обучение {sk0}", "Multilingual export"],
  scaleH2: "Масштаб без stress капитала",
  scaleItems: ["SKU A/B/C", "Staging на фабрике", "Retail vs project", "Годовой объём {sk3}"],
  roadmapH2: "Roadmap следующего заказа",
  roadmapP: "5 шагов с {pk}: m², контейнер, sample, QC, фото.",
  roadmapItems: ["Котировка {sk1} 40HQ", "MOQ {sk2}", "Inspection -5d", "Маркировка cartons"],
  conclusionH2: "Итог: партнёр, понимающий import economics",
  conclusionP: "{t} — партнёры с {pk}, {sk0}, {sk3}.",
  contactP: "Export: прайс, 40HQ, {sk2}.",
  padding:
    "Анализ закупок {n}: профессиональные покупатели, оценивающие {kw} вместе с {pk}, должны stress-test три сценария — полный контейнер одного SKU, смешанный 40HQ и экстренный LCL. Для каждого сценария фиксируйте дни производства, риск QC, фрахт/м² и валовую маржу после претензий. Дистрибьюторы, выполняющие анализ до годовых контрактов, избегают ловушки оптимизации только FOB. Партнёры фабрики, делящиеся графиком экструзии и погрузки, приоритетны при масштабировании импорта SPC.",
}, {
  factory: ["Смотрите ", "мощности фабрики и линии в Китае", "/factory"],
  wall: ["Изучите ", "оптовые стеновые панели для mix-контейнеров", "/wall-panels"],
  spc: ["Eshsire Group — ", "поставщик SPC и фабрика в Китае", "/spc-flooring"],
  contact: ["", "Запросить котировку фабрики и контейнера", "/contact"],
  imgCaption: "Фабрика и supply chain — SPC B2B",
  imgEnding: "Экспортная погрузка контейнера",
});

/** Clone FR structure with locale-specific intro/links for remaining locales */
function cloneWithLinks(base, links, localeCode) {
  const pack = { ...base, _links: links };
  pack._locale = localeCode;
  return pack;
}

const IT_LINKS = { factory: ["Consulta ", "capacità fabbrica e linee produzione Cina", "/factory"], wall: ["Esplora ", "pannelli murali all'ingrosso", "/wall-panels"], spc: ["Eshsire Group è ", "fornitore pavimenti SPC e fabbrica Cina", "/spc-flooring"], contact: ["", "Richiedi preventivo fabbrica e container", "/contact"], imgCaption: "Riferimento fabbrica — import SPC B2B", imgEnding: "Spedizione export e container" };
const PT_LINKS = { factory: ["Consulte ", "capacidade fábrica e linhas produção China", "/factory"], wall: ["Explore ", "painéis parede grosso", "/wall-panels"], spc: ["Eshsire Group é ", "fornecedor SPC e fábrica China", "/spc-flooring"], contact: ["", "Pedir cotação fábrica e contentor", "/contact"], imgCaption: "Referência fábrica — importação SPC", imgEnding: "Expedição e carga contentor" };
const JA_LINKS = { factory: ["確認 ", "中国工場の生産能力とライン", "/factory"], wall: ["見る ", "壁パネル卸と混載コンテナ", "/wall-panels"], spc: ["Eshsire Groupは ", "SPC床材サプライヤー兼中国工場", "/spc-flooring"], contact: ["", "工場見積とコンテナ価格を依頼", "/contact"], imgCaption: "工場・サプライチェーン参考 — SPC B2B", imgEnding: "輸出積み込みとコンテナ" };
const KO_LINKS = { factory: ["확인 ", "중국 공장 생산 능력과 라인", "/factory"], wall: ["알아보기 ", "벽 패널 도매 및 혼적 컨테이너", "/wall-panels"], spc: ["Eshsire Group은 ", "SPC 바닥재 공급업체 및 중국 공장", "/spc-flooring"], contact: ["", "공장 견적 및 컨테이너 가격 요청", "/contact"], imgCaption: "공장·공급망 참고 — SPC B2B", imgEnding: "수출 적재 및 컨테이너" };
const ID_LINKS = { factory: ["Lihat ", "kapasitas pabrik dan lini produksi China", "/factory"], wall: ["Jelajahi ", "panel dinding grosir", "/wall-panels"], spc: ["Eshsire Group adalah ", "pemasok lantai SPC dan pabrik China", "/spc-flooring"], contact: ["", "Minta penawaran pabrik dan kontainer", "/contact"], imgCaption: "Referensi pabrik — impor SPC B2B", imgEnding: "Pengiriman ekspor dan kontainer" };
const TH_LINKS = { factory: ["ดู ", "ความสามารถโรงงานและสายการผลิตจีน", "/factory"], wall: ["สำรวจ ", "แผ่นผนังขายส่ง", "/wall-panels"], spc: ["Eshsire Group เป็น ", "ซัพพลายเออร์พื้น SPC และโรงงานจีน", "/spc-flooring"], contact: ["", "ขอใบเสนอราคาโรงงานและตู้คอนเทนเนอร์", "/contact"], imgCaption: "อ้างอิงโรงงาน — นำเข้า SPC B2B", imgEnding: "การส่งออกและบรรจุตู้" };
const TR_LINKS = { factory: ["İnceleyin ", "Çin fabrika kapasitesi ve hatları", "/factory"], wall: ["Keşfedin ", "toptan duvar paneli", "/wall-panels"], spc: ["Eshsire Group ", "SPC zemin tedarikçisi ve Çin fabrikası", "/spc-flooring"], contact: ["", "Fabrika teklifi ve konteyner fiyatı isteyin", "/contact"], imgCaption: "Fabrika referansı — SPC B2B ithalat", imgEnding: "İhracat yükleme ve konteyner" };
const VI_LINKS = { factory: ["Xem ", "năng lực nhà máy và dây chuyền Trung Quốc", "/factory"], wall: ["Khám phá ", "tấm ốp tường bán sỉ", "/wall-panels"], spc: ["Eshsire Group là ", "nhà cung cấp sàn SPC và nhà máy Trung Quốc", "/spc-flooring"], contact: ["", "Yêu cầu báo giá nhà máy và container", "/contact"], imgCaption: "Tham chiếu nhà máy — nhập SPC B2B", imgEnding: "Xuất khẩu và xếp container" };
const HE_LINKS = { factory: ["עיינו ", "יכולת מפעל וקווי ייצור בסין", "/factory"], wall: ["גלו ", "אספקת פאנלים לקירות בסיטונות", "/wall-panels"], spc: ["Eshsire Group הוא ", "ספק רצפות SPC ומפעל בסין", "/spc-flooring"], contact: ["", "בקש הצעת מחיר מפעל ומכולה", "/contact"], imgCaption: "התייחסות מפעל — ייבוא SPC B2B", imgEnding: "משלוח ייצוא וטעינת מכולה" };

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
    { type: "h2", text: C.bjfloorH2 },
    { type: "p", text: C.bjfloorP(pk) },
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
