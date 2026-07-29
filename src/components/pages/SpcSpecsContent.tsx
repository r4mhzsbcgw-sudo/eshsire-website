"use client";

import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { ProductFaqSection } from "@/components/seo/ProductFaq";
import { RelatedLinks } from "@/components/ui/RelatedLinks";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { spcFlooringImages } from "@/lib/images";

const ENGLISH_SPEC_ROWS = [
  { label: "Thickness", value: "4mm / 5mm / 6mm" },
  { label: "Wear Layer", value: "0.2mm / 0.3mm / 0.5mm" },
  { label: "Size", value: "1220 x 184mm" },
  { label: "Surface", value: "Wood grain, stone look, EIR optional" },
  { label: "Backing", value: "IXPE optional" },
  { label: "Application", value: "Residential, distributor stock, commercial projects" },
  { label: "Packaging", value: "Cartons and pallets" },
  { label: "OEM", value: "Private label carton support" },
];

const ENGLISH_SPECS_FAQ = {
  label: "FAQ",
  title: "SPC Flooring Specs Questions",
  description: "Common specification questions from wholesale buyers, importers and project teams.",
  items: [
    {
      q: "What SPC flooring thickness is most common for wholesale orders?",
      a: "4mm and 5mm are commonly used for wholesale and distributor orders. 6mm is often used for higher-value or commercial projects.",
    },
    {
      q: "What wear layer should importers choose?",
      a: "0.2mm is suitable for price-sensitive residential markets, 0.3mm is a balanced option for distributors, and 0.5mm is better for commercial or heavier-traffic areas.",
    },
    {
      q: "Can SPC flooring be supplied with IXPE padding?",
      a: "Yes, IXPE padding can be added depending on the target market, comfort requirement and price level.",
    },
    {
      q: "Can Eshsire support OEM packaging?",
      a: "Yes, Eshsire can support OEM carton design and private label packaging for qualified orders.",
    },
  ],
};

export function SpcSpecsContent() {
  const { locale, dict } = useLocale();
  const s = dict.spcSpecs;
  const isEnglish = locale === "en";
  const rows = isEnglish ? ENGLISH_SPEC_ROWS : s.rows;

  return (
    <>
      <PageHero title={dict.meta.headings.spcSpecs} subtitle={s.heroSubtitle} image={spcFlooringImages.featured} />
      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <SectionHeader label={s.label} title={s.title} description={s.description} centered />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {rows.map((row, i) => (
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
            {isEnglish ? (
              <Link href="/en/blog/spc-flooring-wear-layer-guide" className="text-sm font-semibold text-accent hover:underline">
                SPC flooring wear layer guide
              </Link>
            ) : null}
          </div>
        </div>
      </section>
      {isEnglish ? <ProductFaqSection faq={ENGLISH_SPECS_FAQ} /> : null}
      <RelatedLinks excludePath="/spc-flooring/specs" />
    </>
  );
}
