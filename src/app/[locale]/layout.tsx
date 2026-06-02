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
  isLocale,
  isRtlLocale,
  locales,
  ogLocaleMap,
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

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.meta.siteTitle,
      template: "%s | " + siteConfig.name,
    },
    description: dict.meta.siteDescription,
    openGraph: {
      type: "website",
      locale: ogLocaleMap[localeParam],
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: siteConfig.url + "/" + localeParam,
      languages: Object.fromEntries([
        ...locales.map((loc) => [loc, siteConfig.url + "/" + loc]),
        ["x-default", siteConfig.url + "/en"],
      ]),
    },
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
