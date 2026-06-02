import type { Metadata } from "next";
import { LanguageHub } from "@/components/LanguageHub";
import { locales } from "@/i18n/locales";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Language`,
  description: "Choose English, 中文 or Español — Eshsire Group B2B website.",
  alternates: {
    languages: Object.fromEntries(
      locales.map((loc) => [loc, `${siteConfig.url}/${loc}`])
    ),
  },
};

export default function RootLanguagePage() {
  return <LanguageHub />;
}
