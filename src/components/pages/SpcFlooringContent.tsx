"use client";

import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { spcFlooringImages } from "@/lib/images";

export function SpcFlooringContent() {
  const { locale, dict } = useLocale();
  const d = dict.spcFlooring;
  const applicationImages = spcFlooringImages.applications;

  const galleryItems = spcFlooringImages.gallery.map((src, i) => ({
    src,
    alt: `${d.galleryTitle} ${i + 1}`,
  }));

  return (
    <>
      <PageHero title={dict.meta.headings.spcFlooring} subtitle={d.heroSubtitle} image={spcFlooringImages.hero} />
      <section className="section-padding">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <SectionHeader label={d.productLabel} title={d.productTitle} description={d.productDesc} />
            <ul className="mt-8 grid grid-cols-2 gap-3">
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
            <Link href={localizedPath(locale, "/spc-flooring/specs")} className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
              {dict.meta.pages.spcSpecs} →
            </Link>
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
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {d.applications.map((title, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="group glass-card-hover overflow-hidden">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={applicationImages[i] ?? applicationImages[0]}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-industrial-dark via-industrial-dark/40 to-transparent" />
                    <h3 className="absolute inset-x-0 bottom-0 p-4 text-sm font-bold uppercase tracking-wider text-white">
                      {title}
                    </h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <RelatedLinks excludePath="/spc-flooring" />
      <ContactCTA />
    </>
  );
}
