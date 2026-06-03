import Link from "next/link";
import { headers } from "next/headers";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale } from "@/i18n/locales";
import { localizedPath } from "@/i18n/navigation";

export default async function LocaleNotFound() {
  const localeHeader = headers().get("x-locale") ?? "en";
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const dict = await getDictionary(locale);

  return (
    <section className="flex min-h-[60vh] items-center justify-center section-padding">
      <div className="max-w-md text-center">
        <p className="section-label">404</p>
        <h1 className="section-heading">{dict.common.notFoundTitle}</h1>
        <p className="mt-4 text-industrial-light">{dict.common.notFoundDesc}</p>
        <Link
          href={localizedPath(locale, "/")}
          className="mt-8 inline-block border border-accent bg-accent/10 px-6 py-3 text-sm font-semibold text-accent hover:bg-accent hover:text-industrial-dark"
        >
          {dict.common.backHome}
        </Link>
      </div>
    </section>
  );
}
