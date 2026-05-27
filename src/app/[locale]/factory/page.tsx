import type { Metadata } from "next";
import { FactoryContent } from "@/components/pages/FactoryContent";
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
    title: dict.meta.pages.factory,
    description: dict.meta.pageDesc.factory,
  };
}

export default function FactoryPage() {
  return <FactoryContent />;
}
