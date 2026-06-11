import type { Locale } from "@/i18n/locales";
import { getDictionarySync } from "@/i18n/get-dictionary";
import { PROJECT_SLUGS, type ProjectSlug, isProjectSlug } from "./slugs";

export { PROJECT_SLUGS, type ProjectSlug, isProjectSlug };
export { getSupplyFlowIconId } from "./supply-flow-icons";

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
  };
}
