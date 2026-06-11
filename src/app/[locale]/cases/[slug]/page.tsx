import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ProjectDetailContent } from "@/components/pages/ProjectDetailContent";
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/seo/StructuredData";
import { getAllProjectSlugs, getProject, isProjectSlug } from "@/content/projects";
import { LEGACY_PROJECT_SLUG_REDIRECTS, resolveCaseSlug } from "@/content/projects/slugs";
import { getDictionary, getDictionarySync } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { buildPageMetadata } from "@/lib/seo";

const CASE_OG_IMAGE = "/images/home/factory/02-quality.jpg";

export function generateStaticParams() {
  const legacySlugs = Object.keys(LEGACY_PROJECT_SLUG_REDIRECTS);
  const slugs = [...new Set([...getAllProjectSlugs(), ...legacySlugs])];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  if (!isLocale(locale)) return {};
  const resolved = resolveCaseSlug(slug);
  if (!resolved) return {};
  const project = getProject(resolved, locale as Locale);
  if (!project) return {};
  const dict = getDictionarySync(locale as Locale);
  return buildPageMetadata({
    locale,
    path: `/cases/${resolved}`,
    title: `${project.title} — ${dict.home.projects.detailPageLabel} | Eshsire Group`,
    description: project.metaDescription,
    ogImage: CASE_OG_IMAGE,
  });
}

export default async function CasePage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale: localeParam, slug } = params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const resolved = resolveCaseSlug(slug);
  if (!resolved) notFound();
  if (resolved !== slug) redirect(`/${locale}/cases/${resolved}`);
  const project = getProject(resolved, locale);
  if (!project) notFound();
  await getDictionary(locale);

  return (
    <>
      <BreadcrumbJsonLd locale={locale} path={`/cases/${resolved}`} />
      <ProjectJsonLd
        locale={locale}
        slug={resolved}
        title={project.title}
        description={project.metaDescription}
      />
      <ProjectDetailContent slug={resolved} />
    </>
  );
}
