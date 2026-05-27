"use client";

import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { spcFlooringImages } from "@/lib/images";

export function SpcFlooringContent() {
  const { locale, dict } = useLocale();
  const d = dict.spcFlooring;

  const galleryItems = spcFlooringImages.gallery.map((src, i) => ({
    src,
    alt: `${d.galleryTitle} ${i + 1}`,
  }));

  return (
    <>
      <PageHero title={dict.meta.pages.spcFlooring} subtitle={d.heroSubtitle} image={spcFlooringImages.hero} />
      <section className="section-padding">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <SectionHeader label={d.productLabel} title={d.productTitle} description={d.productDesc} />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {d.specs.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-industrial-light">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
            <Button href={localizedPath(locale, "/contact")} variant="primary" className="mt-8">
              {dict.common.requestCatalog}
            </Button>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10">
              <Image src={spcFlooringImages.featured} alt={d.productTitle} fill className="object-cover" sizes="50vw" />
            </div>
          </FadeIn>
        </div>
      </section>

      <ImageGallery
        label={d.galleryLabel}
        title={d.galleryTitle}
        description={d.galleryDesc}
        images={galleryItems}
        closeLabel={dict.gallery.close}
        expandHint={dict.gallery.expandHint}
      />

      <section className="section-padding bg-industrial-slate/30">
        <div className="mx-auto max-w-7xl">
          <SectionHeader label={d.applicationsLabel} title={d.applicationsTitle} centered />
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {d.applications.map((a) => (
              <span key={a} className="glass-card px-6 py-3 text-sm font-semibold uppercase tracking-wider">
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
