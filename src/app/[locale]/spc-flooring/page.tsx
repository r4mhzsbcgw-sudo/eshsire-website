import type { Metadata } from "next";
import { SpcFlooringContent } from "@/components/pages/SpcFlooringContent";
import { ProductJsonLd } from "@/components/seo/StructuredData";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { spcFlooringImages } from "@/lib/images";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildPageMetadata({
    locale,
    path: "/spc-flooring",
    title: dict.meta.seoTitles.spcFlooring,
    description: dict.meta.pageDesc.spcFlooring,
  });
}

export default async function SpcFlooringPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale: localeParam } = params;
  if (!isLocale(localeParam)) return null;
  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <ProductJsonLd
        locale={locale}
        name={dict.spcFlooring.productTitle}
        description={dict.spcFlooring.productDesc}
        image={spcFlooringImages.featured}
        path="/spc-flooring"
      />
      <SpcFlooringContent />
    </>
  );
}
