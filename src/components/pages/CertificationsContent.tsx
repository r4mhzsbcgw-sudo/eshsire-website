"use client";

import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactCTA } from "@/components/home/ContactCTA";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { homeImages } from "@/lib/images";

export function CertificationsContent() {
  const { locale, dict } = useLocale();
  const d = dict.certifications;

  return (
    <>
      <PageHero title={dict.meta.headings.certifications} subtitle={d.heroSubtitle} image={homeImages.factoryStrength[1]} />
      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label={d.label} title={d.title} description={d.description} centered />
          <div className="mt-16 grid-desktop-3 gap-6">
            {d.items.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.08}>
                <div className="glass-card-hover h-full p-8">
                  <h2 className="text-lg font-bold text-accent">{item.title}</h2>
                  <p className="mt-3 text-sm text-industrial-light">{item.desc}</p>
                </div>
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
