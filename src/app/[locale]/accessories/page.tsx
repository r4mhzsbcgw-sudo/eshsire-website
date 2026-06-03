import type { Metadata } from "next";
import { AccessoriesContent } from "@/components/pages/AccessoriesContent";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/locales";
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

export default function AccessoriesPage() {
  return <AccessoriesContent />;
}
