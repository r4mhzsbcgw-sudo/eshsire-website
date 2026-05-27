import type { Metadata } from "next";
import { WallPanelsContent } from "@/components/pages/WallPanelsContent";
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
    title: dict.meta.pages.wallPanels,
    description: dict.meta.pageDesc.wallPanels,
  };
}

export default function WallPanelsPage() {
  return <WallPanelsContent />;
}
