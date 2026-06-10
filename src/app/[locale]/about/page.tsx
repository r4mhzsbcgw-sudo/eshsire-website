import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/AboutContent";
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
    path: "/about",
    title: dict.meta.seoTitles.about,
    description: dict.meta.pageDesc.about,
  });
}

export default async function AboutPage({
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
        path="/about"
        name={dict.meta.seoTitles.about}
        description={dict.meta.pageDesc.about}
      />
      <BreadcrumbJsonLd locale={locale} path="/about" />
      <AboutContent />
    </>
  );
}
