import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FactoryStatsBar } from "@/components/home/FactoryStatsBar";
import { ProductCategories } from "@/components/home/ProductCategories";
import { ProjectApplications } from "@/components/home/ProjectApplications";
import { VisualProductionTracking } from "@/components/home/VisualProductionTracking";
import { FactoryStrength } from "@/components/home/FactoryStrength";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { GlobalExport } from "@/components/home/GlobalExport";
import { FactoryVideo } from "@/components/home/FactoryVideo";
import { QuoteRequestSection } from "@/components/home/QuoteRequestSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ProductionTrackingJsonLd } from "@/components/seo/StructuredData";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/locales";
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

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : "en";

  return (
    <>
      <ProductionTrackingJsonLd locale={locale} />
      <Hero />
      <FactoryStatsBar />
      <ProductCategories />
      <ProjectApplications />
      <VisualProductionTracking />
      <FactoryStrength />
      <WhyChooseUs />
      <GlobalExport />
      <FactoryVideo />
      <QuoteRequestSection />
      <ContactCTA />
    </>
  );
}
