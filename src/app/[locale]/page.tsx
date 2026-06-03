import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ProductCategories } from "@/components/home/ProductCategories";
import { FactoryStrength } from "@/components/home/FactoryStrength";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { GlobalExport } from "@/components/home/GlobalExport";
import { FactoryVideo } from "@/components/home/FactoryVideo";
import { CompanyIntroSection } from "@/components/CompanyIntroSection";
import { ContactCTA } from "@/components/home/ContactCTA";
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
    path: "",
    title: dict.meta.siteTitle,
    description: dict.meta.siteDescription,
  });
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductCategories />
      <CompanyIntroSection />
      <FactoryStrength />
      <WhyChooseUs />
      <GlobalExport />
      <FactoryVideo />
      <ContactCTA />
    </>
  );
}
