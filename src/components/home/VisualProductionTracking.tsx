"use client";

import Link from "next/link";
import { SupplyFlowIcon } from "@/components/cases/SupplyFlowIcon";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";

const PRODUCT_LINKS = [
  { href: "/spc-flooring" as const, key: "spcFlooring" as const },
  { href: "/wall-panels" as const, key: "wallPanels" as const },
  { href: "/oem-service" as const, key: "oemService" as const },
] as const;

/** Each production-tracking step links to OEM, Factory or Contact — not case-study pages. */
const STEP_HREFS = [
  "/oem-service",
  "/oem-service",
  "/factory",
  "/factory",
  "/oem-service",
  "/factory",
  "/contact",
  "/contact",
] as const;

function CardTagPills({ tags }: { tags: [string, string, string] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="rounded border border-accent/25 bg-accent/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent/90"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

export function VisualProductionTracking() {
  const { locale, dict } = useLocale();
  const p = dict.home.projects;

  return (
    <section id="production-tracking" className="section-padding bg-industrial-slate/20" aria-labelledby="tracking-heading">
      <div className="mx-auto max-w-7xl">
        <SectionHeader label={p.label} title={p.title} description={p.description} centered titleId="tracking-heading" />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {p.items.map((item, i) => (
            <FadeIn key={item.slug} delay={i * 0.06}>
              <Link
                href={localizedPath(locale, STEP_HREFS[i] ?? "/contact")}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 shadow-glass transition-all duration-300 hover:border-accent/40 hover:bg-white/10 hover:shadow-industrial md:p-6"
              >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-accent/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-accent/30 bg-gradient-to-br from-accent/15 to-accent/5 text-accent shadow-[0_0_20px_rgba(234,88,12,0.08)] transition-all group-hover:border-accent/50 group-hover:shadow-[0_0_24px_rgba(234,88,12,0.15)]">
                    <SupplyFlowIcon id={item.icon} className="h-7 w-7" />
                  </div>
                  <span className="text-lg font-bold tabular-nums tracking-tight text-accent md:text-xl">
                    {String(item.step).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-bold leading-snug text-white transition-colors group-hover:text-accent md:text-base lg:text-lg">
                  {item.title}
                </h3>
                <CardTagPills tags={item.cardTags} />
                <p className="mt-3 line-clamp-3 flex-1 text-xs leading-relaxed text-industrial-mist sm:text-sm">
                  {item.desc}
                </p>
                <span className="mt-4 inline-flex items-center text-xs font-semibold text-accent sm:text-sm">
                  {p.viewFlowDetails} →
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.15} className="mt-12 text-center">
          <p className="text-sm text-industrial-mist">{p.productLinksLabel}</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {PRODUCT_LINKS.map(({ href, key }) => (
              <Link
                key={href}
                href={localizedPath(locale, href)}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-accent/40 hover:text-accent"
              >
                {dict.nav[key]}
              </Link>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
