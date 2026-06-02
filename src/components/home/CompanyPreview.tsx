"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/FadeIn";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { aboutImages } from "@/lib/images";

export function CompanyPreview() {
  const { locale, dict } = useLocale();
  const d = dict.about;
  const preview = aboutImages.gallery.slice(0, 4);

  return (
    <section className="section-padding bg-industrial-slate/20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          label={d.galleryLabel}
          title={d.galleryTitle}
          description={d.galleryDesc}
          centered
        />
        <div className="mt-12 grid-desktop-4">
          {preview.map((src, i) => (
            <FadeIn key={src} delay={i * 0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10">
                <Image src={src} alt={`${d.galleryTitle} ${i + 1}`} fill className="object-cover" sizes="25vw" />
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={localizedPath(locale, "/about")}
            className="inline-flex border border-accent bg-accent/10 px-8 py-3 text-sm font-semibold uppercase tracking-wider text-accent transition-colors hover:bg-accent hover:text-industrial-dark"
          >
            {dict.common.learnMore} →
          </Link>
        </div>
      </div>
    </section>
  );
}
