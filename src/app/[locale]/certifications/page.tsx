import type { Metadata } from "next";
import { CertificationsContent } from "@/components/pages/CertificationsContent";
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
    path: "/certifications",
    title: dict.meta.seoTitles.certifications,
    description: dict.meta.pageDesc.certifications,
  });
}

export default async function CertificationsPage({
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
        path="/certifications"
        name={dict.meta.seoTitles.certifications}
        description={dict.meta.pageDesc.certifications}
      />
      <BreadcrumbJsonLd locale={locale} path="/certifications" />
      <CertificationsContent />
    </>
  );
}
