"use client";

import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactCTA } from "@/components/home/ContactCTA";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { CERTIFICATION_RECORDS } from "@/config/certifications";
import { homeImages } from "@/lib/images";

export function CertificationsContent() {
  const { locale, dict } = useLocale();
  const d = dict.certifications;
  const lang = locale === "zh" ? "zh" : locale === "es" ? "es" : "en";

  return (
    <>
      <PageHero title={dict.meta.headings.certifications} subtitle={d.heroSubtitle} image={homeImages.factoryStrength[1]} />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label={d.label} title={d.title} description={d.description} centered />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {CERTIFICATION_RECORDS.map((record, i) => (
              <FadeIn key={record.id} delay={i * 0.08}>
                <article className="glass-card-hover flex h-full flex-col p-6 md:p-8">
                  <h2 className="text-lg font-bold text-accent">{record.name[lang]}</h2>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-semibold text-white">{d.productsLabel}</dt>
                      <dd className="mt-1 text-industrial-light">{record.products[lang]}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">{d.issuerLabel}</dt>
                      <dd className="mt-1 text-industrial-light">{record.issuer[lang]}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">{d.validityLabel}</dt>
                      <dd className="mt-1 text-industrial-light">{record.dateOrValidity[lang]}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-white">{d.scopeLabel}</dt>
                      <dd className="mt-1 text-industrial-light">{record.scope[lang]}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    {record.hasFile && record.filePath ? (
                      <a
                        href={record.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-accent hover:underline"
                      >
                        {d.viewFile} →
                      </a>
                    ) : (
                      <p className="text-xs leading-relaxed text-industrial-mist">
                        {d.noFileNote}{" "}
                        <Link
                          href={localizedPath(locale, "/contact")}
                          className="font-semibold text-accent hover:underline"
                        >
                          {d.requestDocs}
                        </Link>
                      </p>
                    )}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-industrial-light">
            <Link href={localizedPath(locale, "/faq")} className="font-semibold text-accent hover:underline">
              {dict.nav.faq}
            </Link>
            {" · "}
            <Link href={localizedPath(locale, "/contact")} className="font-semibold text-accent hover:underline">
              {dict.meta.pages.contact}
            </Link>
          </p>
        </div>
      </section>
      <RelatedLinks excludePath="/certifications" />
      <ContactCTA />
    </>
  );
}
