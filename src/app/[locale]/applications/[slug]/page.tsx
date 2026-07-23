import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplicationDetailContent } from "@/components/pages/ApplicationDetailContent";
import {
  ApplicationBreadcrumbJsonLd,
  ApplicationFaqJsonLd,
  WebPageJsonLd,
} from "@/components/seo/StructuredData";
import {
  APPLICATION_SLUGS,
  getProjectApplication,
  localizeProjectApplication,
} from "@/config/projectApplications";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    APPLICATION_SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  if (!isLocale(locale)) return {};
  const application = getProjectApplication(slug);
  if (!application) return {};
  const localized = localizeProjectApplication(application, locale);
  return buildPageMetadata({
    locale,
    path: `/applications/${application.slug}`,
    title: localized.metaTitle,
    description: localized.metaDescription,
    ogImage: application.heroImage,
  });
}

export default async function ApplicationPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale: localeParam, slug } = params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const application = getProjectApplication(slug);
  if (!application) notFound();
  const localized = localizeProjectApplication(application, locale);
  await getDictionary(locale);

  return (
    <>
      <WebPageJsonLd
        locale={locale}
        path={`/applications/${application.slug}`}
        name={localized.title}
        description={localized.metaDescription}
      />
      <ApplicationBreadcrumbJsonLd locale={locale} application={application} />
      <ApplicationFaqJsonLd locale={locale} application={application} />
      <ApplicationDetailContent application={application} />
    </>
  );
}
