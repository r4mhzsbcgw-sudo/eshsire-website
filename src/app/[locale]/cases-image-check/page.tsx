import type { Metadata } from "next";
import { CasesImageCheckContent } from "@/components/pages/CasesImageCheckContent";
import { locales } from "@/i18n/locales";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Supply Scenario Image Audit",
  robots: { index: false, follow: false },
};

export default function CasesImageCheckPage() {
  return <CasesImageCheckContent />;
}
