import type { Metadata } from "next";
import { ContactContent } from "@/components/pages/ContactContent";
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
    path: "/contact",
    title: dict.meta.seoTitles.contact,
    description: dict.meta.pageDesc.contact,
  });
}

export default function ContactPage() {
  return <ContactContent />;
}
