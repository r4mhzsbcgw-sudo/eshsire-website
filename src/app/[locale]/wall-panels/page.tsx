import type { Metadata } from "next";
import { WallPanelsContent } from "@/components/pages/WallPanelsContent";
import { ProductJsonLd } from "@/components/seo/StructuredData";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
import { wallPanelImages } from "@/lib/images";
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
    path: "/wall-panels",
    title: dict.meta.seoTitles.wallPanels,
    description: dict.meta.pageDesc.wallPanels,
  });
}

export default async function WallPanelsPage({
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
        name={dict.wallPanels.title}
        description={dict.wallPanels.description}
        image={wallPanelImages.hero}
        path="/wall-panels"
      />
      <WallPanelsContent />
    </>
  );
}
