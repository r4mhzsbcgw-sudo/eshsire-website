import { siteConfig, getAddress } from "@/lib/config";
import type { Locale } from "@/i18n/locales";
import { htmlLangMap } from "@/i18n/locales";
import { getDictionary } from "@/i18n/get-dictionary";

export async function JsonLd({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);
  const orgId = `${siteConfig.url}/#organization`;

  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: getAddress(locale),
        addressLocality: "Beijing",
        addressCountry: "CN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        name: siteConfig.contactPerson,
        telephone: siteConfig.phone,
        email: siteConfig.email,
        contactType: "sales",
        availableLanguage: ["English", "Chinese"],
      },
      description: dict.meta.siteDescription,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: dict.meta.siteDescription,
      inLanguage: htmlLangMap[locale],
      publisher: { "@id": orgId },
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
