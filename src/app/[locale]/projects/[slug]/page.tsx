import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailContent } from "@/components/pages/ProjectDetailContent";
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/seo/StructuredData";
import { getAllProjectSlugs, getProject, isProjectSlug } from "@/content/projects";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, locales, type Locale } from "@/i18n/locales";
import { buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllProjectSlugs().map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const { locale, slug } = params;
  if (!isLocale(locale) || !isProjectSlug(slug)) return {};
  const project = getProject(slug, locale as Locale);
  if (!project) return {};
  return buildPageMetadata({
    locale,
    path: `/projects/${slug}`,
    title: `${project.title} | Eshsire Group`,
    description: project.desc,
    ogImage: project.image,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale: localeParam, slug } = params;
  if (!isLocale(localeParam) || !isProjectSlug(slug)) notFound();
  const locale = localeParam as Locale;
  const project = getProject(slug, locale);
  if (!project) notFound();
  await getDictionary(locale);

  return (
    <>
      <BreadcrumbJsonLd locale={locale} path={`/projects/${slug}`} />
      <ProjectJsonLd
        locale={locale}
        slug={slug}
        title={project.title}
        description={project.desc}
        image={project.image}
        tag={project.tag}
        gallery={[project.image]}
      />
      <ProjectDetailContent slug={slug} />
    </>
  );
}
