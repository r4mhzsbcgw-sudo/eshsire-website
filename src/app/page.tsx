import type { Metadata } from "next";
import { LanguageHub } from "@/components/LanguageHub";
import { indexableLocales } from "@/i18n/locales";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Language`,
  description: "Choose your language — Eshsire Group B2B SPC flooring & wall panel manufacturer.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: `${siteConfig.url}/en`,
    languages: Object.fromEntries(
      [
        ...indexableLocales.map((loc) => [loc, `${siteConfig.url}/${loc}`]),
        ["x-default", `${siteConfig.url}/en`],
      ]
    ),
  },
};

export default function RootLanguagePage() {
  return <LanguageHub />;
}
