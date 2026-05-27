import { siteConfig, getAddress } from "@/lib/config";
import type { Locale } from "@/i18n/locales";
import { getDictionary } from "@/i18n/get-dictionary";

export async function JsonLd({ locale }: { locale: Locale }) {
  const dict = await getDictionary(locale);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
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
    },
    description: dict.meta.siteDescription,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
