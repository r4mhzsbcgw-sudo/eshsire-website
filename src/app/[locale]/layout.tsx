import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";
import { LocaleProvider } from "@/context/LocaleContext";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  cjkLocales,
  htmlLangMap,
  isIndexableLocale,
  isLocale,
  isRtlLocale,
  locales,
  type Locale,
} from "@/i18n/locales";
import { siteConfig } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale: localeParam } = params;
  if (!isLocale(localeParam)) return {};
  const dict = await getDictionary(localeParam);
  const indexable = isIndexableLocale(localeParam);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.meta.siteTitle,
      template: "%s | " + siteConfig.name,
    },
    description: dict.meta.siteDescription,
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale: localeParam } = params;
  if (!isLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const rtl = isRtlLocale(locale);
  const fontClass = cjkLocales.includes(locale)
    ? "font-[family-name:var(--font-noto)]"
    : "font-[family-name:var(--font-inter)]";

  return (
    <div
      lang={htmlLangMap[locale]}
      dir={rtl ? "rtl" : "ltr"}
      className={fontClass + (rtl ? " text-right" : "")}
    >
      <JsonLd locale={locale} />
      <LocaleProvider locale={locale} dict={dict}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </LocaleProvider>
    </div>
  );
}
