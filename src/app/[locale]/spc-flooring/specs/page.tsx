import type { Metadata } from "next";
import { SpcSpecsContent } from "@/components/pages/SpcSpecsContent";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/StructuredData";
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
    path: "/spc-flooring/specs",
    title: dict.meta.seoTitles.spcSpecs,
    description: dict.meta.pageDesc.spcSpecs,
  });
}

export default async function SpcSpecsPage({
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
      <WebPageJsonLd
        locale={locale}
        path="/spc-flooring/specs"
        name={dict.meta.seoTitles.spcSpecs}
        description={dict.meta.pageDesc.spcSpecs}
      />
      <BreadcrumbJsonLd locale={locale} path="/spc-flooring/specs" />
      <SpcSpecsContent />
    </>
  );
}
