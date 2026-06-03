import type { Metadata } from "next";
import { CertificationsContent } from "@/components/pages/CertificationsContent";
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
    path: "/certifications",
    title: dict.meta.seoTitles.certifications,
    description: dict.meta.pageDesc.certifications,
  });
}

export default function CertificationsPage() {
  return <CertificationsContent />;
}
