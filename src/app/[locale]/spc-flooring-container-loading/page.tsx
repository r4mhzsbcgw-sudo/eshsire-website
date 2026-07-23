import type { Metadata } from "next";
import { SeoLandingContent } from "@/components/pages/SeoLandingContent";
import { landingPages } from "@/content/landing-pages";
import { isLocale } from "@/i18n/locales";
import { buildPageMetadata } from "@/lib/seo";

const page = landingPages["spc-flooring-container-loading"];

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  return buildPageMetadata({ locale: params.locale, path: `/${page.slug}`, title: page.title, description: page.description, ogImage: page.image });
}

export default function LandingPage() {
  return <SeoLandingContent page={page} />;
}
