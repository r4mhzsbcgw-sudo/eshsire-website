"use client";

import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { spcFlooringImages } from "@/lib/images";

export function SpcSpecsContent() {
  const { locale, dict } = useLocale();
  const s = dict.spcSpecs;

  return (
    <>
      <PageHero title={dict.meta.headings.spcSpecs} subtitle={s.heroSubtitle} image={spcFlooringImages.featured} />
      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <SectionHeader label={s.label} title={s.title} description={s.description} centered />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {s.rows.map((row, i) => (
              <FadeIn key={row.label} delay={i * 0.05}>
                <div className="glass-card h-full p-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">{row.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-industrial-light">{row.value}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href={localizedPath(locale, "/contact")} variant="primary">
              {dict.common.requestCatalog}
            </Button>
            <Link href={localizedPath(locale, "/spc-flooring")} className="text-sm font-semibold text-accent hover:underline">
              {dict.related.spcFlooring} →
            </Link>
          </div>
        </div>
      </section>
      <RelatedLinks excludePath="/spc-flooring/specs" />
    </>
  );
}
