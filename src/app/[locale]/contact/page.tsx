import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/ContactContent";
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
    path: "/contact",
    title: dict.meta.seoTitles.contact,
    description: dict.meta.pageDesc.contact,
  });
}

export default async function ContactPage({
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
        path="/contact"
        name={dict.meta.seoTitles.contact}
        description={dict.meta.pageDesc.contact}
      />
      <BreadcrumbJsonLd locale={locale} path="/contact" />
      <ContactContent />
    </>
  );
}
