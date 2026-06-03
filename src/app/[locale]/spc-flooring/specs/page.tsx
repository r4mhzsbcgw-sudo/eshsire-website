import type { Metadata } from "next";
import { SpcSpecsContent } from "@/components/pages/SpcSpecsContent";
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
    path: "/spc-flooring/specs",
    title: dict.meta.seoTitles.spcSpecs,
    description: dict.meta.pageDesc.spcSpecs,
  });
}

export default function SpcSpecsPage() {
  return <SpcSpecsContent />;
}
