import type { Metadata } from "next";
import Image from "next/image";
import { PROJECT_APPLICATIONS, localizeApplication } from "@/content/project-applications";
import { isLocale, type Locale } from "@/i18n/locales";
import { localizedPath } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Internal — Project Application Images",
  robots: { index: false, follow: false },
};

export default function ProjectApplicationsCheckPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = isLocale(params.locale) ? (params.locale as Locale) : "en";

  return (
    <main className="min-h-screen bg-neutral-100 px-6 py-10 text-neutral-900">
      <h1 className="text-2xl font-bold">Project Application Images — Internal Check</h1>
      <p className="mt-2 text-sm text-neutral-600">Not linked from public navigation. Verify card-to-image mapping before release.</p>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {PROJECT_APPLICATIONS.map((card, i) => {
          const loc = localizeApplication(card, locale);
          return (
            <article key={card.id} className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold text-amber-700">Card {i + 1}</p>
              <h2 className="mt-1 font-bold">{loc.title}</h2>
              <p className="text-xs text-neutral-500">
                {localizedPath(locale, `/applications/${card.slug}`)}
              </p>
              <div className="relative mt-3 aspect-[16/10] overflow-hidden rounded border">
                <Image src={card.cardImage} alt={loc.alt} fill className="object-cover" sizes="400px" />
              </div>
              <dl className="mt-3 space-y-1 text-xs">
                <div>
                  <dt className="font-semibold">File</dt>
                  <dd className="font-mono">{card.cardImage}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Alt</dt>
                  <dd>{loc.alt}</dd>
                </div>
                <div>
                  <dt className="font-semibold">Tag</dt>
                  <dd>{loc.tag}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </main>
  );
}
