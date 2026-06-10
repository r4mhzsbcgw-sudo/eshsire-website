import type { Metadata } from "next";
import { AccessoriesContent } from "@/components/pages/AccessoriesContent";
import { BreadcrumbJsonLd, FaqJsonLd, ProductJsonLd } from "@/components/seo/StructuredData";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { accessoriesImages } from "@/lib/images";
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
    path: "/accessories",
    title: dict.meta.seoTitles.accessories,
    description: dict.meta.pageDesc.accessories,
  });
}

export default async function AccessoriesPage({
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
      <BreadcrumbJsonLd locale={locale} path="/accessories" />
      <FaqJsonLd locale={locale} path="/accessories" />
      <ProductJsonLd
        locale={locale}
        name={dict.accessories.title}
        description={dict.accessories.description}
        image={accessoriesImages.hero}
        path="/accessories"
        category="SPC flooring accessories"
      />
      <AccessoriesContent />
    </>
  );
}
