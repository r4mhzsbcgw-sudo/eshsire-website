import type { Metadata } from "next";
import { SpcFlooringContent } from "@/components/pages/SpcFlooringContent";
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
    title: dict.meta.pages.spcFlooring,
    description: dict.meta.pageDesc.spcFlooring,
  };
}

export default function SpcFlooringPage() {
  return <SpcFlooringContent />;
}
