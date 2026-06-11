"use client";

import Link from "next/link";
import { SupplyFlowIcon } from "@/components/cases/SupplyFlowIcon";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/motion/FadeIn";
import { useLocale } from "@/context/LocaleContext";
import type { ProjectSlug } from "@/content/projects";
import { localizedPath } from "@/i18n/navigation";
import { getWhatsAppUrl } from "@/lib/config";

interface ProjectDetailContentProps {
  slug: ProjectSlug;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 py-5 last:border-b-0">
      <dt className="text-xs font-semibold uppercase tracking-wider text-accent">{label}</dt>
      <dd className="mt-2 text-base leading-relaxed text-industrial-light">{value}</dd>
    </div>
  );
}

export function ProjectDetailContent({ slug }: ProjectDetailContentProps) {
  const { locale, dict } = useLocale();
  const p = dict.home.projects;
  const item = p.items.find((entry) => entry.slug === slug);

  if (!item) return null;

  return (
    <>
      <PageHero
        title={item.title}
        subtitle={item.desc}
        breadcrumbParent={{ label: p.title, href: `${localizedPath(locale, "/")}#projects` }}
        breadcrumbLabel={item.title}
        icon={<SupplyFlowIcon id={item.icon} className="h-14 w-14 text-accent" />}
        step={item.step}
      />

      <section className="section-padding bg-industrial-dark">
        <div className="mx-auto max-w-4xl">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">{p.detailPageLabel}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.cardTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-accent/25 bg-accent/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="section-heading mt-4">{item.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-industrial-mist">{item.desc}</p>

            <dl className="mt-10 rounded-2xl border border-white/10 bg-industrial-slate/30 px-6 md:px-8">
              <DetailRow label={p.problemSolvedLabel} value={item.problemSolved} />
              <DetailRow label={p.customerConcernsLabel} value={item.customerConcerns} />
              <DetailRow label={p.ourCooperationLabel} value={item.ourCooperation} />
              <DetailRow label={p.valueToCustomerLabel} value={item.valueToCustomer} />
              <DetailRow label={p.suitableCustomersLabel} value={item.suitableCustomers} />
            </dl>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href={localizedPath(locale, "/contact")} variant="primary">
                {dict.common.requestQuote}
              </Button>
              <Button href={getWhatsAppUrl(locale)} variant="whatsapp" external>
                {dict.common.whatsappUs}
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding border-t border-white/10 bg-industrial-dark">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="text-center">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{p.ctaTitle}</h2>
            <p className="mt-3 text-base text-industrial-light md:text-lg">{p.ctaSubtitle}</p>
            <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Button href={localizedPath(locale, "/contact")} variant="primary" className="w-full sm:w-auto">
                {dict.common.requestQuote}
              </Button>
              <Button href={getWhatsAppUrl(locale)} variant="whatsapp" external className="w-full sm:w-auto">
                {dict.common.whatsappUs}
              </Button>
            </div>
          </FadeIn>

          <FadeIn delay={0.1} className="mt-16">
            <p className="section-label text-center">{p.label}</p>
            <h3 className="mt-3 text-center text-2xl font-bold text-white md:text-3xl">{p.relatedTitle}</h3>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {p.items
                .filter((related) => related.slug !== slug)
                .slice(0, 4)
                .map((related) => (
                  <Link
                    key={related.slug}
                    href={localizedPath(locale, `/cases/${related.slug}`)}
                    className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:border-accent/40 hover:bg-white/10"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-accent">
                        <SupplyFlowIcon id={related.icon} className="h-6 w-6" />
                      </div>
                      <span className="text-sm font-bold tabular-nums text-accent">
                        {String(related.step).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="mt-3 line-clamp-2 text-sm font-bold text-white group-hover:text-accent md:text-base">
                      {related.title}
                    </h4>
                    <span className="mt-3 text-xs font-semibold text-accent">{p.viewFlowDetails} →</span>
                  </Link>
                ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
