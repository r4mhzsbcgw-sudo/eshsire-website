import type { Metadata } from "next";
import { FaqContent } from "@/components/pages/FaqContent";
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
    path: "/faq",
    title: dict.meta.seoTitles.faq,
    description: dict.meta.pageDesc.faq,
  });
}

export default function FaqPage() {
  return <FaqContent />;
}
