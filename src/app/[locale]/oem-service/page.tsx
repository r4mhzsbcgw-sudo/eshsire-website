import type { Metadata } from "next";
import { OemContent } from "@/components/pages/OemContent";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/locales";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return {
    title: dict.meta.pages.oemService,
    description: dict.meta.pageDesc.oemService,
  };
}

export default function OemServicePage() {
  return <OemContent />;
}
