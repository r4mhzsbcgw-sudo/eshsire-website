import type { Metadata } from "next";
import { FactoryContent } from "@/components/pages/FactoryContent";
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
    path: "/factory",
    title: dict.meta.seoTitles.factory,
    description: dict.meta.pageDesc.factory,
  });
}

export default async function FactoryPage({
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
        path="/factory"
        name={dict.meta.seoTitles.factory}
        description={dict.meta.pageDesc.factory}
      />
      <BreadcrumbJsonLd locale={locale} path="/factory" />
      <FactoryContent />
    </>
  );
}
