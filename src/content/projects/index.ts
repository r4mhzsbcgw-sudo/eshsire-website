import type { Locale } from "@/i18n/locales";
import { getDictionarySync } from "@/i18n/get-dictionary";
import { projectImages } from "@/lib/images";

export const PROJECT_SLUGS = [
  "africa-distributor",
  "middle-east-hotel",
  "school-flooring",
  "europe-apartment",
  "commercial-office",
  "southeast-asia-distributor",
  "hospital-flooring",
  "villa-wpc-wall-panel",
] as const;

export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export function isProjectSlug(value: string): value is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(value);
}

export function getAllProjectSlugs(): ProjectSlug[] {
  return [...PROJECT_SLUGS];
}

export function getProject(slug: string, locale: Locale) {
  const dict = getDictionarySync(locale);
  const index = PROJECT_SLUGS.indexOf(slug as ProjectSlug);
  if (index === -1) return null;

  const item = dict.home.projects.items[index];
  if (!item) return null;

  return {
    ...item,
    slug: slug as ProjectSlug,
    image: projectImages[index],
  };
}
