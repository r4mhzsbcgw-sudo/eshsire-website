/**
 * zh / es long-form article sections — mirrors article-builder.mjs structure.
 */
function p(text) {
  return { type: "p", text };
}
function h2(text) {
  return { type: "h2", text };
}
function h3(text) {
  return { type: "h3", text };
}
function ul(items) {
  return { type: "ul", items };
}
function richLink(text, link, href) {
  return { type: "rich-p", segments: [text, { link, href }] };
}
function sectionBlocks(heading, paragraphs) {
  const blocks = [h2(heading)];
  for (const para of paragraphs) blocks.push(p(para));
  return blocks;
}

const LINKS = {
  zh: {
    factory: ["查看 ", "中国地板工厂生产能力与生产线", "/factory"],
    wall: ["了解 ", "墙板批发供应与混装整柜方案", "/wall-panels"],
    spc: ["Eshsire Group 是专业的 ", "SPC 地板供应商与中国地板工厂", "/spc-flooring"],
    contact: ["", "索取工厂报价与整柜价格", "/contact"],
    imgCaption: "工厂与供应链参考 — SPC B2B 进口",
    imgEnding: "出口装柜与集装箱发运 — 地板经销商供应",
  },
  es: {
    factory: ["Consulte ", "capacidad de fábrica y líneas de producción en China", "/factory"],
    wall: ["Explore ", "suministro mayorista de paneles murales para contenedores mixtos", "/wall-panels"],
    spc: ["Eshsire Group es ", "proveedor de suelos SPC y fábrica de suelos en China", "/spc-flooring"],
    contact: ["", "Solicite cotización de fábrica y precios de contenedor", "/contact"],
    imgCaption: "Referencia de fábrica y cadena de suministro — importación SPC B2B",
    imgEnding: "Envío exportación y carga de contenedor — suministro distribuidor",
  },
};

const COPY = {
  zh: {
    intro: (t, pk, sk0, sk1) =>
      `${t}——本文面向从中国采购的地板经销商、批发商、工程承包商及建材进口商。核心采购视角是${pk}：工厂定价逻辑、集装箱运输效率、大货批量采购与供应链透明度，而非装饰潮流。正确评估${sk0}和${sk1}，进口商才能保护利润、减少索赔并缩短补货周期。`,
    bjfloorH2: "BJFLOOR 工厂优势：进口商为何转向直供",
    bjfloorP: (pk) =>
      `BJFLOOR 合作伙伴 Eshsire Group 在北京运营 6000㎡ 一体化 SPC 地板与墙板工厂，拥有挤出、压贴、质检及出口单证团队。当经销商需要可验证生产的${pk}——而非贸易商换标贴牌——以及面向非洲、中东、欧洲和东南亚 30 多个国家的整柜项目时，会选择我们。`,
    factoryDirect: (sk0, sk2) =>
      `工厂直供${sk0}通常可省去 FOB 报价中 8–15% 的贸易商加价；锁定 BOM 参考可保持零售与工程渠道批次颜色稳定。每周生产照片、装柜记录及按 SKU 的平方米装箱单，是专业进口商对重复${sk2}的基本要求。`,
    profitH2: "SPC 地板买家为何关注利润与供应链",
    profitP1: (pk, sk2) =>
      `成功的进口商将地板视为现金流品类。到岸每平方米成本、MOQ 结构、生产交期与集装箱利用率，决定经销商能否持续增长。可靠的${pk}可去除中间商加价、稳定批次颜色并支持重复${sk2}。`,
    profitP2: (sk0) =>
      `贸易公司报价快，但常在不同集装箱之间切换工厂。工厂直供${sk0}提供与同一厂区绑定的生产日期、QC 照片、装箱单与装柜记录——当零售客户或工程项目因延迟罚款时，这一点至关重要。`,
    docH3: "下单前应记录的采购文件",
    docItems: (pk, sk3) => [
      `工厂地址、生产线照片及${pk}参考报价`,
      `耐磨层/厚度矩阵及各 SKU 的 MOQ（${sk3}）`,
      "整柜 CBM 计划：40HQ 平方米、纸箱堆码及混色可行性",
      "QC 清单、出货前检验流程及索赔处理机制",
      "付款条款、生产时间表及每周进度更新格式",
    ],
    mistakeH2: "经销商必须消除的高成本采购错误",
    mistakeItems: [
      "只追最低 FOB 而不算到岸成本——运费、索赔与断货会在两个季度内抹平差价。",
      "跳过工厂验厂或视频审核——批次色差在零售端爆发时，中间商往往消失。",
      "未锁定产前样（颜色、耐磨层、外箱标记）就下首单大货。",
      "定金到装柜之间缺乏生产可见性——沉默通常意味着排产被插队，而非进展顺利。",
    ],
    chooseH2: "首柜前如何评估中国 SPC 地板供应商",
    chooseItems: [
      "确认生产地址与出口单证、装柜照片一致——而非市中心贸易办公室。",
      "索取目标市场 3 家复购客户参考及索赔率数据。",
      "审查 QC 清单：尺寸公差、锁扣配合、耐磨层抽检及纸箱跌落标准。",
      "对比整柜 CBM 规划响应质量——正规工厂在报 FOB 前会计算 40HQ 平方米。",
    ],
    factoryPriceH2: "工厂价 vs 贸易公司报价",
    factoryPriceItems: (pk, sk2) => [
      "工厂 FOB 按厚度、耐磨层 mil、表面处理、订单量及 OEM 包装拆分——不是单一零售价。请索取分项平方米报价并注明港口与贸易术语。",
      `一体化${pk}在同一厂区完成挤出、压贴、开槽与包装，减少中间加价并提高${sk2}批次一致性。`,
      "用到岸成本比较报价：FOB + 本地费用 + 海运费 + 目的港费用 + 检验 + 资金成本。未验证供应商的低 FOB 常在延迟与索赔后更贵。",
      "复购订单锁定 BOM 参考，保持颜色、压纹与芯材配方稳定——对零售陈列与工程验收至关重要。",
    ],
    riskH2: "采购风险控制清单",
    riskItems: [
      "验证供应商是制造商而非重新打包他人纸箱的中间商；要求当日工厂大门照片并标注订单号。",
      "新系列绝不跳过产前样签字（颜色与耐磨层）。",
      "合同条款：逾期生产罚则、运输损坏替换政策、BL 与 CO 单证时间表。",
      "基础工厂关系稳定后再考虑双源——无体量分配的双源会增加复杂度与 QC 漂移。",
    ],
    landedH2: "进口商经济学：到岸成本与整柜计算",
    landedItems: (sk1, sk2, pk) => [
      `FOB 每平方米只是起点。进口商必须核算海运费、保险、目的港费用、内陆配送、资金成本及预期索赔率，再比较${sk1}报价。`,
      "优化纸箱堆码的 40HQ 装 3500 ㎡ 时，单位运费可比 LCL 拼箱低 15–25%——这一差距常超过略高 FOB 的可靠工厂。",
      `计划季度${sk2}的经销商应与工厂产能对齐排产，避免旺季排队增加 10–20 天并打乱零售促销。`,
      `记录每柜数据：出货平方米、SKU 组合、索赔次数、PO 到仓天数——这是年度${pk}供应协议谈判基础。`,
    ],
    commH2: "供应商沟通与生产可见性",
    commItems: (sk0) => [
      "每周进度应包含已完成平方米、QC 暂扣、外箱标签状态及预计装柜窗口——而非泛泛的「进行中」邮件。",
      "装柜前收到装柜照片、铅封号与 BL 草稿的进口商，清关更快，销售团队 ETA 更准确。",
      `从贸易公司转向工厂直供${sk0}，单证与 SKU 映射通常有 1–2 柜学习期——节省从第三柜开始显现。`,
      "多语言出口团队帮助中东、非洲与拉美经销商对齐外箱标记、证书与工程规格，避免翻译延误。",
    ],
    scaleH2: "扩大采购而不增加流动资金压力",
    scaleItems: (sk3) => [
      "轮换 A/B/C SKU：A 类每柜必装，B 类隔柜，C 类在 MOQ 友好的混装柜试单。",
      "可用工厂仓暂存时将一批生产拆成两个月两柜——现金流比单次大 PO 更平滑。",
      "零售与工程渠道毛利结构不同；分别核算到岸成本，避免工程报价侵蚀经销商计划利润。",
      `有出货记录的年度采购承诺可解锁${sk3}阶梯价——工厂优先排产节奏可预测的合作伙伴。`,
    ],
    roadmapH2: "下一单实施路线图",
    roadmapP: (pk) =>
      `步骤 1：发送目标平方米、厚度/耐磨层矩阵及目的港，索取${pk}工厂价目表。步骤 2：确认整柜计划与生产窗口。步骤 3：批准产前样。步骤 4：接收每周 QC 更新。步骤 5：BL 释放前审核装柜照片。`,
    roadmapItems: (sk1, sk2) => [
      `索取混装 SKU 40HQ 场景的${sk1}报价`,
      `将${sk2} MOQ 与仓库容量对齐`,
      "计划装柜日前 5–7 天安排检验",
      "锁定目的仓外箱标记与托盘模式",
    ],
    conclusionH2: "懂进口经济学的供应商",
    conclusionP: (t, pk, sk0, sk3) =>
      `${t}——专业买家的结论很简单：选择精通${pk}、${sk0}与整柜经济学的合作伙伴。当工厂定价、生产可见性与发运纪律一致时，经销商可在不提高零售价的情况下改善利润，并有信心扩大${sk3}计划。若现有供应商无法在每柜展示生产、QC 与装柜证据，是时候向中国地板工厂索取平行报价。`,
    contactP: (sk2) =>
      `联系出口团队索取工厂价目表、40HQ 整柜报价及${sk2}批量价。我们服务需要稳定供应链管控的经销商——而非营销故事。`,
    padding: (n, kw, pk) =>
      `采购深度分析 ${n}：评估${kw}与${pk}的专业买家，应对三种场景压力测试报价——单色整柜、混色 40HQ 及紧急 LCL 补货。每种场景记录生产天数、QC 暂扣风险、运费每平方米及扣除索赔后的预期毛利。签约年度协议前运行此分析，可避免只优化 FOB 而忽视物流与库存持有成本的陷阱。愿意分享挤出排产、原材料交期与装柜日历的工厂伙伴，在您跨区扩大 SPC 地板进口量时应优先考虑。`,
  },
  es: {
    intro: (t, pk, sk0, sk1) =>
      `${t}: artículo para distribuidores, mayoristas, contratistas e importadores de materiales de construcción que compran en China. Su enfoque principal es ${pk}: lógica de precio de fábrica, eficiencia de contenedor, compras al por mayor y visibilidad de cadena de suministro — no tendencias decorativas. Al evaluar bien ${sk0} y ${sk1}, los importadores protegen márgenes, reducen reclamaciones y acortan ciclos de reposición.`,
    bjfloorH2: "Ventaja BJFLOOR: por qué los importadores eligen suministro directo",
    bjfloorP: (pk) =>
      `El socio BJFLOOR Eshsire Group opera una fábrica integrada de 6000 m² de suelos SPC y paneles murales en Pekín con extrusión, laminación, QC y documentación de exportación internas. Los distribuidores nos eligen cuando necesitan ${pk} con producción verificable — no reempaquetado de intermediarios — y programas de contenedor a más de 30 países en África, Oriente Medio, Europa y el Sudeste Asiático.`,
    factoryDirect: (sk0, sk2) =>
      `El suministro directo de fábrica ${sk0} elimina el margen del comercializador (8–15 % en FOB), mientras las referencias BOM bloqueadas mantienen color estable en retail y proyectos. Fotos semanales de producción, registros de carga y packing lists por m²/SKU son estándar para ${sk2} repetidos — la transparencia que exigen importadores profesionales.`,
    profitH2: "Por qué los compradores de suelos SPC priorizan beneficio y cadena de suministro",
    profitP1: (pk, sk2) =>
      `Los importadores exitosos tratan el suelo como categoría de flujo de caja. El coste landed por m², MOQ, plazo de producción y utilización de contenedor determinan si un distribuidor crece o se estanca. Un ${pk} fiable elimina margen de intermediario, estabiliza color por lote y apoya ${sk2} repetidos.`,
    profitP2: (sk0) =>
      `Las trading companies cotizan rápido pero cambian de fábrica entre contenedores. ${sk0} directo de fábrica ofrece fechas de producción, fotos QC, packing lists y registros de carga de una sola instalación — crítico cuando clientes retail o proyectos penalizan retrasos.`,
    docH3: "Qué documentar antes de pedir",
    docItems: (pk, sk3) => [
      `Dirección de fábrica, fotos de línea y precio de referencia ${pk}`,
      `Matriz de capa de desgaste / espesor y MOQ por SKU (${sk3})`,
      "Plan CBM contenedor: m² por 40HQ, apilado de cartones y viabilidad de colores mixtos",
      "Checklist QC, inspección pre-embarque y proceso de reclamaciones",
      "Términos de pago, cronograma de producción y formato de actualización semanal",
    ],
    mistakeH2: "Errores de compras costosos que los distribuidores deben eliminar",
    mistakeItems: [
      "Perseguir el FOB más bajo sin cálculo landed — flete, reclamaciones y roturas de stock borran el ahorro en dos trimestres.",
      "Omitir auditoría de fábrica o video — los intermediarios desaparecen cuando fallan lotes de color en retail.",
      "Pedidos grandes iniciales sin bloqueo de muestra pre-producción (color, desgaste, marcado de cartón).",
      "Sin visibilidad entre depósito y carga — el silencio suele significar saltos de cola, no progreso fluido.",
    ],
    chooseH2: "Cómo evaluar un proveedor SPC en China antes del primer contenedor",
    chooseItems: [
      "Confirme que la dirección de fabricación coincide con documentación de exportación y fotos de carga — no una oficina comercial.",
      "Solicite tres referencias en su región con historial de recompra y tasa de reclamaciones.",
      "Revise checklist QC: tolerancia dimensional, ajuste click-lock, test de desgaste y caída de cartón.",
      "Compare calidad de respuesta en planificación CBM — fábricas serias calculan m² por 40HQ antes de cotizar FOB.",
    ],
    factoryPriceH2: "Precio de fábrica vs cotizaciones de trading company",
    factoryPriceItems: (pk, sk2) => [
      "El FOB de fábrica se desglosa por espesor, mil de desgaste, textura, volumen y embalaje OEM — no un precio retail único. Pida cotizaciones itemizadas por m² con puerto e incoterm.",
      `Instalaciones integradas ${pk} controlan extrusión, laminación, perfilado y embalaje en un sitio — menos markup y mejor consistencia de lote para ${sk2}.`,
      "Compare en coste landed: FOB + cargos locales + flete + destino + inspección + financiación. FOB bajo de proveedor no verificado suele salir caro tras retrasos y reclamaciones.",
      "Bloquee referencias BOM en recompras para color, gofrado y fórmula de núcleo estables — esencial para retail y sign-off de proyecto.",
    ],
    riskH2: "Checklist de control de riesgo de compras",
    riskItems: [
      "Verifique que el proveedor es fabricante, no broker que reempaqueta cartones ajenos. Pida fotos del día en puerta de fábrica con referencia de pedido.",
      "Nunca omita sign-off de muestra pre-producción en color y desgaste para nuevas colecciones.",
      "Cláusulas: penalizaciones por retraso, política de reemplazo por daño en tránsito, plazos de BL y CO.",
      "Diversifique solo tras relación estable con fábrica base — doble sourcing sin reparto de volumen aumenta complejidad y deriva QC.",
    ],
    landedH2: "Economía del importador: coste landed y matemática de contenedor",
    landedItems: (sk1, sk2, pk) => [
      `El FOB por m² es solo el inicio. Modele flete, seguro, puerto destino, entrega interior, financiación y tasa de reclamaciones antes de comparar ${sk1}.`,
      "Un 40HQ con 3500 m² y apilado optimizado reduce flete unitario 15–25 % vs LCL — a menudo supera un FOB ligeramente mayor de fábrica verificada.",
      `Distribuidores con ${sk2} trimestrales alinean slots de producción con capacidad, evitando colas de temporada (+10–20 días) que rompen promociones retail.`,
      `Documente cada contenedor: m² enviados, mix SKU, reclamaciones, días PO a almacén — base para acuerdos anuales ${pk}.`,
    ],
    commH2: "Comunicación con proveedor y visibilidad de producción",
    commItems: (sk0) => [
      "Las actualizaciones semanales deben incluir m² completados, retenciones QC, etiquetado de cartón y ventana de carga estimada — no emails genéricos «en progreso».",
      "Importadores con fotos de carga, números de precinto y BL borrador antes de salida resuelven aduanas más rápido y dan ETAs precisos a ventas.",
      `Al pasar de trading company a ${sk0} directo, espere curva de aprendizaje de 1–2 contenedores en documentación — el ahorro aparece desde el tercer envío.`,
      "Equipos de exportación multilingües ayudan a distribuidores en Oriente Medio, África y Latam a alinear marcas de cartón, certificados y specs de proyecto.",
    ],
    scaleH2: "Escalar compras sin aumentar estrés de capital de trabajo",
    scaleItems: (sk3) => [
      "Rote SKUs A/B/C: clase A cada contenedor, B cada otro ciclo, C en cargas mixtas MOQ-friendly.",
      "Use staging en almacén de fábrica para dividir una producción en dos contenedores mensuales — flujo de caja más suave que un PO grande único.",
      "Retail y proyectos tienen márgenes distintos; cotice landed por separado para que licitaciones de contratista no erosionen programas de dealer.",
      `Compromisos anuales de volumen con historial de envíos desbloquean ${sk3} por tramos — las fábricas priorizan socios con ritmo de contenedor predecible.`,
    ],
    roadmapH2: "Hoja de ruta para su próximo pedido",
    roadmapP: (pk) =>
      `Paso 1: Envíe m² objetivo, matriz espesor/desgaste y puerto destino para lista de precios ${pk}. Paso 2: Confirme plan de contenedor y ventana de producción. Paso 3: Apruebe muestra pre-producción. Paso 4: Reciba actualizaciones QC semanales. Paso 5: Revise fotos de carga antes de liberar BL.`,
    roadmapItems: (sk1, sk2) => [
      `Solicite cotización ${sk1} con escenario 40HQ mixto`,
      `Alinee MOQ de ${sk2} con capacidad de almacén`,
      "Programe inspección 5–7 días antes de carga planificada",
      "Bloquee marcado de cartón y patrón de palé para almacén destino",
    ],
    conclusionH2: "Conclusión: proveedor que entiende economía de importación",
    conclusionP: (t, pk, sk0, sk3) =>
      `${t}: la conclusión para compradores profesionales es simple — elija socios que dominen ${pk}, ${sk0} y economía de contenedor. Cuando precio de fábrica, visibilidad y disciplina de envío se alinean, los distribuidores mejoran márgenes sin subir precios retail y ganan confianza para escalar ${sk3}. Si su proveedor actual no muestra producción, QC y carga en cada contenedor, pida una cotización paralela a una fábrica de suelos en China.`,
    contactP: (sk2) =>
      `Contacte al equipo de exportación para lista de precios de fábrica, cotización 40HQ y precios ${sk2}. Apoyamos distribuidores que necesitan control estable de cadena de suministro — no historias de marketing.`,
    padding: (n, kw, pk) =>
      `Análisis de compras ${n}: compradores profesionales que evalúan ${kw} junto a ${pk} deben stress-testear cotizaciones con tres escenarios — contenedor lleno un SKU, 40HQ multicolor y top-up LCL de emergencia. Por escenario, registre días de producción, riesgo de retención QC, flete por m² y margen bruto esperado tras reclamaciones. Distribuidores que ejecutan este análisis antes de acuerdos anuales evitan optimizar solo FOB ignorando logística y coste de inventario. Socios de fábrica que comparten calendario de extrusión, lead times de materia prima y carga merecen prioridad al escalar importación de suelos SPC en varias regiones.`,
  },
};

export function getLocaleImageLabels(locale) {
  return LINKS[locale];
}

export function buildLocalizedSections(meta, locale) {
  const C = COPY[locale];
  const L = LINKS[locale];
  const pk = meta.primaryKeyword;
  const sk = meta.secondaryKeywords;
  const t = meta.title;
  const slug = meta.slug;

  const sections = [
    p(C.intro(t, pk, sk[0], sk[1])),
    h2(C.bjfloorH2),
    p(C.bjfloorP(pk)),
    richLink(...L.factory),
    p(C.factoryDirect(sk[0], sk[2])),
    richLink(...L.wall),
    h2(C.profitH2),
    p(C.profitP1(pk, sk[2])),
    p(C.profitP2(sk[0])),
    h3(C.docH3),
    ul(C.docItems(pk, sk[3])),
  ];

  if (slug.includes("mistake") || slug.includes("7-mistakes")) {
    sections.push(...sectionBlocks(C.mistakeH2, C.mistakeItems));
  }

  if (slug.includes("choose-reliable")) {
    sections.push(...sectionBlocks(C.chooseH2, C.chooseItems));
  }

  if (slug.includes("supplier-manufacturer")) {
    sections.push(...sectionBlocks(C.factoryPriceH2, C.factoryPriceItems(pk, sk[2])));
  }

  if (slug.includes("mistake") || slug.includes("7-mistakes")) {
    sections.push(...sectionBlocks(C.riskH2, C.riskItems));
  }

  sections.push(
    ...sectionBlocks(C.landedH2, C.landedItems(sk[1], sk[2], pk)),
    ...sectionBlocks(C.commH2, C.commItems(sk[0])),
    ...sectionBlocks(C.scaleH2, C.scaleItems(sk[3])),
    h2(C.roadmapH2),
    p(C.roadmapP(pk)),
    ul(C.roadmapItems(sk[1], sk[2])),
    h2(C.conclusionH2),
    p(C.conclusionP(t, pk, sk[0], sk[3])),
    richLink(...L.spc),
    richLink(...L.contact),
    p(C.contactP(sk[2]))
  );

  return sections;
}

export function localizedPaddingParagraph(locale, n, kw, pk) {
  return COPY[locale].padding(n, kw, pk);
}

export function countCjkWords(text) {
  const cjk = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  const latin = text.replace(/[\u4e00-\u9fff]/g, " ").split(/\s+/).filter(Boolean).length;
  return cjk + latin;
}

export function countBlocksWordsLocalized(blocks, locale) {
  const countText = (text) => (locale === "zh" ? countCjkWords(text) : text.split(/\s+/).filter(Boolean).length);
  return blocks.reduce((sum, b) => {
    if (b.type === "p") return sum + countText(b.text);
    if (b.type === "ul") return sum + countText(b.items.join(" "));
    if (b.type === "rich-p")
      return sum + countText(b.segments.filter((s) => typeof s === "string").join(" "));
    return sum;
  }, 0);
}

export function buildLocalizedLongFormBlocks(meta, images, locale) {
  const L = LINKS[locale];
  const sections = buildLocalizedSections(meta, locale);
  const blocks = [];
  const sectionImgs = images.sections;
  let sectionCount = 0;

  for (const block of sections) {
    blocks.push(block);
    if (block.type === "h2" && sectionCount < 3 && sectionImgs[sectionCount]) {
      blocks.push({
        type: "img",
        src: sectionImgs[sectionCount],
        alt: `${meta.primaryKeyword} ${meta.title.slice(0, 30)} ${sectionCount + 1}`,
        caption: L.imgCaption,
      });
      sectionCount++;
    }
  }

  blocks.push({
    type: "img",
    src: images.ending,
    alt: `${meta.primaryKeyword} export China`,
    caption: L.imgEnding,
  });

  let wc = countBlocksWordsLocalized(blocks, locale);
  let pad = 0;
  while (wc < 1800 && pad < 20) {
    const kw = meta.secondaryKeywords[pad % meta.secondaryKeywords.length];
    blocks.splice(
      blocks.length - 1,
      0,
      p(localizedPaddingParagraph(locale, pad + 1, kw, meta.primaryKeyword))
    );
    wc = countBlocksWordsLocalized(blocks, locale);
    pad++;
  }

  return { blocks, wordCount: wc };
}
