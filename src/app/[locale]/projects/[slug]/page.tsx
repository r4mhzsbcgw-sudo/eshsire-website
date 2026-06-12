import { permanentRedirect, notFound } from "next/navigation";
import { LEGACY_PROJECT_SLUG_REDIRECTS, resolveCaseSlug } from "@/content/projects/slugs";
import { isLocale, locales } from "@/i18n/locales";

export function generateStaticParams() {
  const legacySlugs = Object.keys(LEGACY_PROJECT_SLUG_REDIRECTS);
  return locales.flatMap((locale) =>
    legacySlugs.map((slug) => ({ locale, slug }))
  );
}

/** Legacy /projects/{slug} → /cases/{new-slug} */
export default function LegacyProjectRedirect({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  if (!isLocale(locale)) notFound();
  const target = resolveCaseSlug(slug);
  if (!target) notFound();
  permanentRedirect(`/${locale}/cases/${target}`);
}
