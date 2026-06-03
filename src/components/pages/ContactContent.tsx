"use client";

import { PageHero } from "@/components/ui/PageHero";
import { InquiryForm } from "@/components/InquiryForm";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/context/LocaleContext";
import { getWhatsAppUrl, siteConfig, getAddress } from "@/lib/config";
import { contactImages } from "@/lib/images";

export function ContactContent() {
  const { locale, dict } = useLocale();
  const d = dict.contact;
  const formDesc = d.formDesc.replace("{name}", siteConfig.contactPerson);

  return (
    <>
      <PageHero title={dict.meta.headings.contact} subtitle={d.heroSubtitle} image={contactImages.hero} />
      <section className="section-padding">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <FadeIn>
            <p className="section-label">{d.getInTouch}</p>
            <h2 className="section-heading">{d.sendInquiry}</h2>
            <p className="mt-4 text-industrial-light">{formDesc}</p>
            <div className="mt-8 space-y-4">
              <div className="glass-card p-4">
                <p className="text-xs uppercase tracking-wider text-industrial-mist">{dict.common.contactPerson}</p>
                <p className="mt-1 font-semibold">{siteConfig.contactPerson}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs uppercase tracking-wider text-industrial-mist">{dict.common.phone}</p>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="mt-1 block font-semibold text-accent hover:underline">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs uppercase tracking-wider text-industrial-mist">{dict.common.wechat}</p>
                <p className="mt-1 font-semibold">{siteConfig.wechat}</p>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs uppercase tracking-wider text-industrial-mist">WhatsApp</p>
                <a href={getWhatsAppUrl(locale)} className="mt-1 block font-semibold text-accent hover:underline">{siteConfig.phone}</a>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs uppercase tracking-wider text-industrial-mist">{dict.common.email}</p>
                <a href={`mailto:${siteConfig.email}`} className="mt-1 block font-semibold hover:text-accent">{siteConfig.email}</a>
              </div>
              <div className="glass-card p-4">
                <p className="text-xs uppercase tracking-wider text-industrial-mist">{dict.common.address}</p>
                <p className="mt-1 text-sm leading-relaxed">{getAddress(locale)}</p>
              </div>
            </div>
            <Button href={getWhatsAppUrl(locale)} variant="whatsapp" external className="mt-8">
              {dict.whatsapp.contactJason}
            </Button>
          </FadeIn>
          <FadeIn delay={0.15}>
            <InquiryForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
