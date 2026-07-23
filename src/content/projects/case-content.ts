/** Visual production follow-up flow — not customer project case studies. */

import type { SupplyFlowIconId } from "./supply-flow-icons";

export type SupplyFlowItem = {
  slug: string;
  step: number;
  title: string;
  desc: string;
  cardTags: [string, string, string];
  metaDescription: string;
  icon: SupplyFlowIconId;
  problemSolved: string;
  customerConcerns: string;
  ourCooperation: string;
  valueToCustomer: string;
  suitableCustomers: string;
};

export type SupplyFlowSection = {
  label: string;
  title: string;
  description: string;
  emphasisLine: string;
  highlightTags: [string, string, string, string];
  differentiatorTitle: string;
  differentiatorPoints: string[];
  visibilityStages: [string, string, string, string, string];
  quoteCtaLabel: string;
  quoteCtaHint: string;
  viewFlowDetails: string;
  detailPageLabel: string;
  problemSolvedLabel: string;
  customerConcernsLabel: string;
  ourCooperationLabel: string;
  valueToCustomerLabel: string;
  suitableCustomersLabel: string;
  relatedTitle: string;
  productLinksLabel: string;
  ctaTitle: string;
  ctaSubtitle: string;
  items: SupplyFlowItem[];
};

export const projectCasesEn: SupplyFlowSection = {
  label: "Visual Order Follow-up System",
  title: "Visual Production Follow-up, So Customers Can See Every Step",
  description:
    "Most factories take your payment and go quiet. We assign a follow-up team that shares photos and videos at every key stage — samples, production, packaging, QC, and loading — so overseas buyers see real progress instead of waiting for vague messages.",
  emphasisLine: "Not waiting blindly after payment — customers continuously see their order progress.",
  highlightTags: [
    "Key-stage video updates",
    "Proactive production progress updates",
    "Packaging & loading photo records",
    "After-sales and reorder follow-up",
  ],
  differentiatorTitle: "Why overseas buyers work with our follow-up system",
  differentiatorPoints: [
    "After payment, you don't wait in the dark — our team proactively sends photo and video updates.",
    "See samples, production, packaging, quality checks, and container loading at every critical stage.",
    "A dedicated order follow-up team tracks each export order — not just a salesperson's verbal promise.",
    "You don't need to chase us every day — we push progress before you have to ask.",
    "We take responsibility from sample to shipment and reorder — not a one-time transaction.",
  ],
  visibilityStages: ["Sample", "Production", "Packaging", "QC", "Loading"],
  quoteCtaLabel: "Get a Quote",
  quoteCtaHint: "Tell us your product and quantity — our team responds within 24 hours with follow-up support.",
  viewFlowDetails: "View Follow-up Details",
  detailPageLabel: "Visual Follow-up Details",
  problemSolvedLabel: "What This Step Solves",
  customerConcernsLabel: "What Customers Usually Worry About",
  ourCooperationLabel: "What We Share With Photos & Videos",
  valueToCustomerLabel: "Value to the Customer",
  suitableCustomersLabel: "Suitable Customers",
  relatedTitle: "More Visual Follow-up Steps",
  productLinksLabel: "Explore SPC flooring, wall panels & OEM services",
  ctaTitle: "Ready for a Factory That Shows Progress — Not Just Promises?",
  ctaSubtitle:
    "Submit your inquiry and our follow-up team will share how we document your order with photos and videos from sample to shipment.",
  items: [
    {
      slug: "sample-video-confirmation",
      step: 1,
      title: "Sample Video Confirmation",
      desc: "Before placing an order, we can show sample details by photos or videos, including color, thickness, surface texture, locking system, and accessories, so customers can confirm clearly before bulk production.",
      cardTags: ["Video Check", "Sample Details", "Before Order"],
      metaDescription:
        "Sample video and photo confirmation for overseas SPC flooring buyers — visual follow-up from Eshsire Group.",
      icon: "video-sample",
      problemSolved:
        "Overseas buyers cannot judge plank quality from static photos alone. Without visual sample confirmation, bulk orders start with uncertainty.",
      customerConcerns:
        "Whether the sample on video matches what will be produced; whether color and lock details are visible enough; whether they must wait for physical samples before deciding.",
      ourCooperation:
        "Our team shares close-up photos or short videos of samples — color, thickness, surface texture, click-lock, and accessories — before order confirmation, so customers can approve visually without repeated follow-up messages.",
      valueToCustomer:
        "Customers confirm faster, reduce selection risk, and avoid placing bulk orders based on guesswork.",
      suitableCustomers:
        "First-time importers, remote buyers, distributors comparing suppliers, and customers who cannot visit the factory in person.",
    },
    {
      slug: "specification-order-checklist",
      step: 2,
      title: "Specification & Order Checklist Confirmation",
      desc: "Before production, we confirm specifications, quantity, packaging, accessories, and loading requirements with customers, creating a clear order checklist to avoid misunderstandings in bulk production.",
      cardTags: ["Order Checklist", "Clear Details", "Avoid Mistakes"],
      metaDescription:
        "Specification and order checklist confirmation with documented details — Eshsire Group visual follow-up.",
      icon: "checklist",
      problemSolved:
        "Verbal agreements lead to mismatches in specs, quantities, packaging, or accessories once production starts.",
      customerConcerns:
        "Whether all details are written down; whether packaging and accessories are included; whether the factory will change specs without notice.",
      ourCooperation:
        "We compile a written order checklist — specs, quantity, packaging, accessories, loading plan — and share it for customer confirmation before production, with a photo or PDF record for reference.",
      valueToCustomer:
        "Both sides work from the same document, reducing disputes and eliminating the need to chase clarification later.",
      suitableCustomers:
        "OEM customers, mixed-container buyers, wholesalers with multiple SKUs, and any buyer who needs documented order details.",
    },
    {
      slug: "production-schedule-updates",
      step: 3,
      title: "Production Schedule Updates",
      desc: "After order confirmation, we update the production schedule so customers know when production starts and when it is expected to finish, instead of waiting without clear information.",
      cardTags: ["Schedule Update", "Clear Timeline", "No Blind Waiting"],
      metaDescription:
        "Production schedule updates with proactive timeline sharing — Eshsire Group order follow-up.",
      icon: "calendar-schedule",
      problemSolved:
        "After payment, many overseas buyers hear nothing until shipment is near — making inventory and sales planning impossible.",
      customerConcerns:
        "When production actually starts; whether the order is still on track; whether delays are being communicated proactively.",
      ourCooperation:
        "Our follow-up team shares production start date, expected completion, and any schedule changes in writing — customers do not need to keep asking for updates.",
      valueToCustomer:
        "Clear timeline visibility helps customers plan local inventory, marketing, and cash flow without constant chasing.",
      suitableCustomers:
        "Importers with fixed delivery windows, distributors managing warehouse space, and buyers coordinating multiple product lines.",
    },
    {
      slug: "production-process-video-updates",
      step: 4,
      title: "Production Process Video Updates",
      desc: "During production, we can provide on-site photos or videos according to order stages, allowing customers to see that their products are being produced instead of only relying on verbal promises.",
      cardTags: ["Factory Video", "Real Progress", "Visible Production"],
      metaDescription:
        "Production process photo and video updates from the factory floor — Eshsire Group visual follow-up.",
      icon: "factory-video",
      problemSolved:
        "Customers pay deposits but have no proof that production is actually happening — only verbal assurances from sales.",
      customerConcerns:
        "Whether the factory is really producing their order; whether production quality looks acceptable; whether they must trust words alone.",
      ourCooperation:
        "At key production stages, we share on-site photos or short factory videos showing planks, panels, or packaging lines in progress — so customers see real production, not promises.",
      valueToCustomer:
        "Builds trust during the longest part of the order cycle and reduces anxiety about whether money was well spent.",
      suitableCustomers:
        "All overseas buyers, especially first-time customers, large orders, and buyers who cannot visit the factory.",
    },
    {
      slug: "packaging-label-checking",
      step: 5,
      title: "Packaging & Label Checking",
      desc: "Before shipment, we check packaging, labels, carton information, and quantity, and can provide photo or video records, especially for OEM customers and long-term distributors.",
      cardTags: ["Packaging Check", "Label Record", "OEM Support"],
      metaDescription:
        "Packaging and label checking with photo records before shipment — Eshsire Group OEM follow-up.",
      icon: "packaging-box",
      problemSolved:
        "Packaging and label errors are often discovered only after goods arrive abroad — too late for easy correction.",
      customerConcerns:
        "Whether cartons and labels match approved artwork; whether barcode and product info are correct; whether packaging is strong enough for export.",
      ourCooperation:
        "Before shipment, we inspect cartons, labels, and quantities, and share photos or videos of finished packaging — especially for OEM branding — so customers approve before goods leave the factory.",
      valueToCustomer:
        "OEM and distributor customers receive retail-ready goods with fewer surprises and less rework on arrival.",
      suitableCustomers:
        "OEM brand owners, long-term distributors, chain-store buyers, and customers with custom packaging requirements.",
    },
    {
      slug: "pre-shipment-quality-confirmation",
      step: 6,
      title: "Pre-shipment Quality Confirmation",
      desc: "Before the goods leave the factory, we check key details and try to solve problems before shipment, instead of waiting until customers receive the goods.",
      cardTags: ["Before Shipment", "Quality Check", "Risk Control"],
      metaDescription:
        "Pre-shipment quality confirmation with inspection photos — Eshsire Group export QC follow-up.",
      icon: "magnifier-check",
      problemSolved:
        "Quality issues found after arrival are expensive and slow to resolve across borders.",
      customerConcerns:
        "Whether bulk goods match approved samples; whether visible defects exist; whether the supplier will act before shipment if problems are found.",
      ourCooperation:
        "We inspect key specs, surface quality, and packaging before departure, and share inspection photos or video clips when requested — fixing issues while goods are still at the factory.",
      valueToCustomer:
        "Problems are caught before port departure, reducing after-sales cost and protecting customer reputation locally.",
      suitableCustomers:
        "All overseas buyers, especially wholesalers, distributors, and customers with strict receiving standards.",
    },
    {
      slug: "loading-photos-video-records",
      step: 7,
      title: "Loading Photos & Video Records",
      desc: "During container loading, we can provide loading photos or videos so customers can confirm cargo quantity, packaging condition, and loading process, making overseas purchasing more transparent.",
      cardTags: ["Loading Video", "Container Record", "Visible Delivery"],
      metaDescription:
        "Container loading photos and video records for export orders — Eshsire Group delivery follow-up.",
      icon: "container-camera",
      problemSolved:
        "Customers often have no visibility into what was actually loaded until goods arrive — or worse, when quantity disputes arise.",
      customerConcerns:
        "Whether all cartons were loaded; whether loading was done properly; whether they can verify shipment before goods are at sea.",
      ourCooperation:
        "During container loading, our team shares photos or videos showing pallet stacks, carton counts, and loading process — giving customers a visual record of what left the factory.",
      valueToCustomer:
        "Transparent loading records reduce disputes, improve delivery confidence, and eliminate guesswork about shipment contents.",
      suitableCustomers:
        "Full-container importers, wholesalers, distributors, and any buyer who wants documented proof of shipment.",
    },
    {
      slug: "after-sales-reorder-follow-up",
      step: 8,
      title: "After-sales & Reorder Follow-up",
      desc: "Receiving the goods is not the end of cooperation. If customers need reorders, new colors, packaging adjustments, or problem handling, we continue to follow up and take responsibility until the end.",
      cardTags: ["After-sales", "Reorder Support", "Long-term Cooperation"],
      metaDescription:
        "After-sales and reorder follow-up with continued visual support — Eshsire Group long-term supply.",
      icon: "after-sales-support",
      problemSolved:
        "One-time suppliers disappear after shipment, making reorders, color expansion, and issue resolution slow and frustrating.",
      customerConcerns:
        "Whether the same specs can be repeated; whether new colors can be added with the same follow-up quality; whether problems will be handled responsibly.",
      ourCooperation:
        "We keep approved specs, packaging records, and order history on file. For reorders or issues, the same follow-up team continues sharing updates with photos and videos — not starting from zero each time.",
      valueToCustomer:
        "Faster reorders, consistent brand presentation, and a supplier relationship that extends beyond a single shipment.",
      suitableCustomers:
        "Distributors building product lines, wholesalers with repeat demand, and brand owners planning ongoing supply.",
    },
  ],
};

export const projectCasesZh: SupplyFlowSection = {
  label: "可视化订单跟单体系",
  title: "可视化生产跟单，让客户看得见每一步",
  description:
    "很多工厂收款后就很少同步进度。我们安排专属跟单团队，在样品、生产、包装、质检、装柜等关键节点用图片和视频主动更新，让海外客户看见真实进度，而不是反复追问和空等消息。",
  emphasisLine: "不是付款后等待消息，而是让客户持续看到订单进度。",
  highlightTags: ["关键节点视频更新", "生产进度主动同步", "包装与装柜照片记录", "售后与复购持续跟进"],
  differentiatorTitle: "为什么海外客户选择我们的跟单方式",
  differentiatorPoints: [
    "付款后不用盲等消息，跟单团队会主动发送图片和视频进度。",
    "样品、生产、包装、质检、装柜等关键节点，客户都能看得见。",
    "每个出口订单有专属跟单团队跟进，不只是销售口头承诺。",
    "客户不必每天催进度，我们会在关键节点主动同步。",
    "从样品到出货、复购都负责到底，不是只做一次性交易。",
  ],
  visibilityStages: ["样品", "生产", "包装", "质检", "装柜"],
  quoteCtaLabel: "获取报价",
  quoteCtaHint: "告诉我们产品和数量，跟单团队 24 小时内回复并说明后续进度同步方式。",
  viewFlowDetails: "查看跟单细节",
  detailPageLabel: "可视化跟单说明",
  problemSolvedLabel: "这个环节解决什么问题",
  customerConcernsLabel: "客户通常担心什么",
  ourCooperationLabel: "我们会提供什么图片/视频/记录",
  valueToCustomerLabel: "对客户有什么价值",
  suitableCustomersLabel: "适合哪些客户",
  relatedTitle: "更多可视化跟单环节",
  productLinksLabel: "了解 SPC 地板、墙板与 OEM 服务",
  ctaTitle: "想要看得见进度的工厂，而不只是口头承诺？",
  ctaSubtitle: "提交询价后，我们的跟单团队会说明如何从样品到装柜，用图片和视频同步您的订单进度。",
  items: [
    {
      slug: "sample-video-confirmation",
      step: 1,
      title: "样品视频确认",
      desc: "正式下单前，我们可以通过图片或视频展示样品细节，包括花色、厚度、表面纹理、锁扣和配件，帮助客户在下单前确认清楚。",
      cardTags: ["Video Check", "Sample Details", "Before Order"],
      metaDescription: "海外客户 SPC 地板样品图片与视频确认 — Eshsire Group 可视化跟单。",
      icon: "video-sample",
      problemSolved: "海外客户很难只凭静态图片判断 plank 质量。没有可视化样品确认，大货生产往往从不确定开始。",
      customerConcerns: "视频里的样品是否就是将要生产的大货；花色和锁扣细节是否看得清楚；是否必须等实物样品才能决定。",
      ourCooperation:
        "跟单团队会在下单前分享样品近景图片或短视频，展示花色、厚度、表面纹理、锁扣和配件细节，客户可远程确认，无需反复追问。",
      valueToCustomer: "加快确认速度，降低选品风险，避免在信息不足的情况下下大货订单。",
      suitableCustomers: "首次进口商、远程采购客户、正在比价的经销商，以及无法来厂看样的买家。",
    },
    {
      slug: "specification-order-checklist",
      step: 2,
      title: "规格与订单清单确认",
      desc: "生产前，我们会和客户确认产品规格、数量、包装、配件和装柜需求，形成清楚的订单清单，避免大货生产后出现理解偏差。",
      cardTags: ["Order Checklist", "Clear Details", "Avoid Mistakes"],
      metaDescription: "规格与订单清单书面确认 — Eshsire Group 可视化跟单体系。",
      icon: "checklist",
      problemSolved: "口头确认容易导致规格、数量、包装或配件在生产启动后出现偏差，双方理解不一致。",
      customerConcerns: "所有细节是否有书面记录；包装和配件是否包含在内；工厂是否会在生产中擅自变更参数。",
      ourCooperation:
        "我们会整理书面订单清单，包含规格、数量、包装、配件和装柜方案，发给客户确认后再生产，并保留图片或 PDF 记录供双方查阅。",
      valueToCustomer: "双方以同一份清单为准，减少争议，客户不必反复追问细节是否一致。",
      suitableCustomers: "OEM 客户、混装整柜客户、多 SKU 批发商，以及需要书面订单记录的进口商。",
    },
    {
      slug: "production-schedule-updates",
      step: 3,
      title: "生产排期同步",
      desc: "订单确认后，我们会同步生产排期，让客户知道订单什么时候开始生产、预计什么时候完成，而不是付款后只能等待消息。",
      cardTags: ["Schedule Update", "Clear Timeline", "No Blind Waiting"],
      metaDescription: "生产排期主动同步 — Eshsire Group 订单跟单服务。",
      icon: "calendar-schedule",
      problemSolved: "很多海外客户付款后长期收不到进度，直到临近发货才有消息，无法安排本地库存和销售计划。",
      customerConcerns: "生产是否已开始；订单是否还在正常推进；如有延期是否会主动告知。",
      ourCooperation: "跟单团队会主动告知生产开始时间、预计完成时间和排期变化，客户不必每天追问「订单怎么样了」。",
      valueToCustomer: "时间线清晰可见，帮助客户安排库存、营销和资金计划，减少跨国等待的焦虑。",
      suitableCustomers: "有明确交期要求的进口商、需要管理仓库的经销商，以及同时协调多个品类的采购客户。",
    },
    {
      slug: "production-process-video-updates",
      step: 4,
      title: "生产过程视频更新",
      desc: "生产过程中，我们可以根据订单阶段提供生产现场图片或视频，让客户看到产品正在生产，而不是只听供应商口头承诺。",
      cardTags: ["Factory Video", "Real Progress", "Visible Production"],
      metaDescription: "生产过程图片与视频更新 — Eshsire Group 工厂可视化跟单。",
      icon: "factory-video",
      problemSolved: "客户付了定金，却看不到生产是否真的在进行，只能依赖销售人员的口头保证。",
      customerConcerns: "工厂是否真的在生产自己的订单；生产现场质量看起来是否正常；是否只能相信承诺而看不到证据。",
      ourCooperation:
        "在关键生产节点，我们分享工厂现场图片或短视频，展示 plank、墙板或包装线正在生产，让客户看见真实进度，而不是空口承诺。",
      valueToCustomer: "在订单周期最长的阶段建立信任，减少「钱交了不知道在不在生产」的担心。",
      suitableCustomers: "所有海外客户，尤其是首次合作、大货订单和无法来厂验货的买家。",
    },
    {
      slug: "packaging-label-checking",
      step: 5,
      title: "包装与标签检查",
      desc: "发货前，我们会检查包装、标签、纸箱信息和数量，并可提供图片或视频记录，尤其适合 OEM 品牌客户和长期经销商。",
      cardTags: ["Packaging Check", "Label Record", "OEM Support"],
      metaDescription: "包装与标签检查及图片记录 — Eshsire Group OEM 跟单支持。",
      icon: "packaging-box",
      problemSolved: "包装和标签问题往往在货物到港后才发现，跨境修改成本极高。",
      customerConcerns: "纸箱和标签是否与确认稿一致；条码和产品信息是否正确；包装强度是否适合出口运输。",
      ourCooperation:
        "发货前检查纸箱、标签和数量，并分享成品包装图片或视频供客户确认，OEM 品牌客户尤其可远程审核后再放行出货。",
      valueToCustomer: "OEM 和经销商客户到货即可销售，减少到港后的返工和品牌形象损失。",
      suitableCustomers: "OEM 品牌商、长期经销商、连锁建材客户，以及有定制包装要求的买家。",
    },
    {
      slug: "pre-shipment-quality-confirmation",
      step: 6,
      title: "发货前质量确认",
      desc: "在货物离开工厂前，我们会检查关键细节，尽量把问题解决在发货前，而不是等客户收到货后才处理。",
      cardTags: ["Before Shipment", "Quality Check", "Risk Control"],
      metaDescription: "发货前质量确认与检查图片 — Eshsire Group 出口 QC 跟单。",
      icon: "magnifier-check",
      problemSolved: "质量问题如果在到港后才发现，跨境处理成本高、周期长，客户声誉也会受损。",
      customerConcerns: "大货是否与确认样品一致；是否有明显缺陷；发现问题时供应商是否会在发货前处理。",
      ourCooperation:
        "离厂前检查关键规格、表面质量和包装状态，按需提供检验图片或视频片段，问题在工厂阶段解决，而非等到客户收货。",
      valueToCustomer: "问题在离港前拦截，降低售后成本，保护客户在当地市场的口碑。",
      suitableCustomers: "所有海外采购客户，尤其是批发商、经销商和对收货标准较严格的 OEM 客户。",
    },
    {
      slug: "loading-photos-video-records",
      step: 7,
      title: "装柜照片与视频记录",
      desc: "装柜时，我们可以提供装柜照片或视频，让客户确认货物数量、包装状态和装柜过程，跨国采购也能看得见交付现场。",
      cardTags: ["Loading Video", "Container Record", "Visible Delivery"],
      metaDescription: "装柜照片与视频记录 — Eshsire Group 出口交付可视化跟单。",
      icon: "container-camera",
      problemSolved: "客户往往不知道实际装了多少货，直到到港后才发现数量或装载问题。",
      customerConcerns: "是否全部纸箱都已装柜；装柜方式是否规范；能否在货物到港前确认出运内容。",
      ourCooperation:
        "装柜过程中，跟单团队分享托盘堆叠、纸箱数量和装柜过程的照片或视频，为客户提供可视化的出运记录。",
      valueToCustomer: "装柜记录透明可查，减少数量争议，提升交付确定性。",
      suitableCustomers: "整柜进口商、批发商、经销商，以及需要出运留档证明的采购客户。",
    },
    {
      slug: "after-sales-reorder-follow-up",
      step: 8,
      title: "售后与复购跟进",
      desc: "客户收到货不是合作结束。后续如果需要补货、扩充花色、调整包装或处理问题，我们会继续跟进，真正做到负责到底。",
      cardTags: ["After-sales", "Reorder Support", "Long-term Cooperation"],
      metaDescription: "售后与复购持续跟进 — Eshsire Group 长期可视化跟单服务。",
      icon: "after-sales-support",
      problemSolved: "只做一次交易的供应商，发货后就难以联系，复购、扩色和问题处理越来越被动。",
      customerConcerns: "后续能否保持同样规格；新增花色是否仍有同样跟单质量；出现问题是否有人负责。",
      ourCooperation:
        "我们保留已确认的规格、包装和订单记录。复购或处理问题时，同一跟单团队继续以图片和视频同步进度，不必每次从零开始沟通。",
      valueToCustomer: "复购更快、品牌呈现更稳定，供应商关系延续到每一次出货之后。",
      suitableCustomers: "正在建立产品线的经销商、有持续补货需求的批发商，以及计划长期供货的品牌商。",
    },
  ],
};
