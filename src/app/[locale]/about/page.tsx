import type { Metadata } from "next";
import { AboutContent } from "@/components/pages/AboutContent";
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
    path: "/about",
    title: dict.meta.seoTitles.about,
    description: dict.meta.pageDesc.about,
  });
}

export default function AboutPage() {
  return <AboutContent />;
}
