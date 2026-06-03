"use client";

import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CompanyIntroSection } from "@/components/CompanyIntroSection";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactCTA } from "@/components/home/ContactCTA";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { useLocale } from "@/context/LocaleContext";
import { aboutImages } from "@/lib/images";

export function AboutContent() {
  const { locale, dict } = useLocale();
  const d = dict.about;
  const aboutDetails =
    locale === "zh"
      ? {
          eyebrow: "关于 ESHSIRE GROUP",
          title: "从材料研发到出口交付的一站式制造伙伴",
          body:
            "Eshsire Group 专注 SPC 地板、墙板、格栅、PU 石材及室内装饰材料，服务经销商、工程承包商、建材品牌与跨境采购客户。我们将稳定生产、严格品控、灵活 OEM/ODM 和出口交付能力整合在同一套流程中，让客户可以更快完成选品、打样、下单和补货。",
          body2:
            "团队位于北京，配套生产、仓储、包装与装柜协同能力。无论是试单、小批量混柜，还是长期贴牌供货，我们都以清晰沟通、准时交付和可复购品质作为合作基础。",
          stats: [
            { value: "20+", label: "年建材与装饰材料经验" },
            { value: "6000㎡", label: "生产与仓储基地" },
            { value: "30+", label: "出口国家和地区" },
            { value: "OEM/ODM", label: "品牌定制支持" },
          ],
          strengthsTitle: "我们能为客户解决什么",
          strengths: [
            {
              title: "稳定选品",
              desc: "覆盖 SPC 地板、墙板、UV 大理石板、格栅与配件，适合经销、工程和家装渠道。",
            },
            {
              title: "贴牌定制",
              desc: "支持颜色、纹理、规格、包装、标签与市场资料定制，帮助客户建立自有品牌。",
            },
            {
              title: "质量管控",
              desc: "从原料、压制、表面处理到包装出货进行多节点检查，减少批量订单风险。",
            },
            {
              title: "出口协同",
              desc: "协助样品、报价、装柜、文件与物流沟通，让跨境采购流程更顺畅。",
            },
          ],
          processTitle: "合作流程",
          process: ["需求确认", "样品与报价", "包装方案", "批量生产", "质检装柜", "持续补货"],
        }
      : {
          eyebrow: "About ESHSIRE GROUP",
          title: "An integrated manufacturing partner from materials to export delivery",
          body:
            "Eshsire Group focuses on SPC flooring, wall panels, grille panels, PU stone and interior decorative materials for distributors, contractors, building-material brands and cross-border sourcing teams.",
          body2:
            "Based in Beijing, we combine production, warehousing, packaging and container-loading coordination into a practical B2B workflow for trial orders, mixed containers and long-term private-label supply.",
          stats: [
            { value: "20+", label: "Years in building materials" },
            { value: "6000㎡", label: "Production and warehouse base" },
            { value: "30+", label: "Export markets served" },
            { value: "OEM/ODM", label: "Private-label support" },
          ],
          strengthsTitle: "What we help customers solve",
          strengths: [
            {
              title: "Product sourcing",
              desc: "SPC flooring, wall panels, UV marble panels, grille panels and accessories for distribution and projects.",
            },
            {
              title: "Private label",
              desc: "Colors, textures, specifications, packaging, labels and sales materials tailored to your market.",
            },
            {
              title: "Quality control",
              desc: "Multi-stage inspection from raw materials and surface finishing to packing and shipment.",
            },
            {
              title: "Export coordination",
              desc: "Sample, quotation, loading, documentation and logistics support for smoother overseas purchasing.",
            },
          ],
          processTitle: "Cooperation Workflow",
          process: ["Requirements", "Samples & Quote", "Packaging", "Production", "QC & Loading", "Reorders"],
        };

  return (
    <>
      <PageHero title={dict.meta.headings.about} subtitle={d.heroSubtitle} image={aboutImages.hero} />

      <CompanyIntroSection showViewMore={false} />

      <section className="section-padding bg-industrial-dark">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-[1.05fr_0.95fr] items-start gap-10">
            <FadeIn>
              <p className="section-label">{aboutDetails.eyebrow}</p>
              <h2 className="mt-3 max-w-3xl text-5xl font-bold tracking-tight text-white">
                {aboutDetails.title}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-industrial-light">
                {aboutDetails.body}
              </p>
              <p className="mt-4 text-base leading-relaxed text-industrial-mist">
                {aboutDetails.body2}
              </p>
            </FadeIn>

            <div className="grid grid-cols-2 gap-4">
              {aboutDetails.stats.map((item, i) => (
                <FadeIn key={item.label} delay={i * 0.05}>
                  <div className="border border-white/10 bg-white/[0.04] p-6">
                    <p className="text-3xl font-bold text-accent">{item.value}</p>
                    <p className="mt-2 text-sm leading-relaxed text-industrial-light">{item.label}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-industrial-slate/20">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
          <SectionHeader label={d.storyLabel} title={aboutDetails.strengthsTitle} centered />
          <div className="mt-12 grid-desktop-4 gap-5">
            {aboutDetails.strengths.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="h-full border border-white/10 bg-industrial-dark/60 p-6">
                  <p className="text-sm font-semibold text-accent">0{i + 1}</p>
                  <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-industrial-light">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-12 border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <h3 className="text-xl font-bold text-white">{aboutDetails.processTitle}</h3>
              <div className="mt-6 grid grid-cols-6 gap-3">
                {aboutDetails.process.map((step, i) => (
                  <div key={step} className="border-t border-accent/70 pt-4">
                    <p className="text-xs font-semibold text-accent">{String(i + 1).padStart(2, "0")}</p>
                    <p className="mt-1 text-sm font-medium text-industrial-light">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding bg-industrial-slate/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label={d.missionLabel} title={d.missionTitle} centered />
          <div className="mt-12 grid-desktop-3 gap-8">
            {d.mission.map((item, i) => (
              <FadeIn key={item.t} delay={i * 0.1}>
                <div className="glass-card p-8 text-center">
                  <h3 className="text-lg font-bold text-accent">{item.t}</h3>
                  <p className="mt-3 text-sm text-industrial-light">{item.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
      <RelatedLinks excludePath="/about" />
    </>
  );
}
