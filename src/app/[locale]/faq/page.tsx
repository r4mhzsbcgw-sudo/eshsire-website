import type { Metadata } from "next";
import { FaqContent } from "@/components/pages/FaqContent";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { BreadcrumbJsonLd, FaqJsonLd, WebPageJsonLd } from "@/components/seo/StructuredData";
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
    path: "/faq",
    title: dict.meta.seoTitles.faq,
    description: dict.meta.pageDesc.faq,
  });
}

export default async function FaqPage({
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
        path="/faq"
        name={dict.meta.seoTitles.faq}
        description={dict.meta.pageDesc.faq}
      />
      <BreadcrumbJsonLd locale={locale} path="/faq" />
      <FaqJsonLd locale={locale} path="/faq" />
      <FaqContent />
    </>
  );
}
