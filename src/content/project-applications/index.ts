import type { Locale } from "@/i18n/locales";
import {
  PROJECT_APPLICATIONS,
  localizeProjectApplication,
  type ProjectApplication,
} from "@/config/projectApplications";

export type ProjectApplicationCard = ProjectApplication;

export { PROJECT_APPLICATIONS };

export function localizeApplication(card: ProjectApplication, locale: Locale) {
  const localized = localizeProjectApplication(card, locale);
  return {
    title: localized.title,
    description: localized.summary,
    tag: localized.tag,
    alt: localized.alt,
  };
}
