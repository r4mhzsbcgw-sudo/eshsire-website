"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/context/LocaleContext";
import { localizedPath } from "@/i18n/navigation";
import { getWhatsAppUrl } from "@/lib/config";
import {
  appLocale,
  localizeProjectApplication,
  type ProjectApplication,
} from "@/config/projectApplications";

const copy = {
  en: {
    home: "Home",
    applications: "Applications",
    requestQuote: "Request Solution Quote",
    catalog: "Get Catalog",
    whatsapp: "WhatsApp Jason",
    who: "Who This Solution Is For",
    options: "Recommended Product Options",
    support: "How Eshsire Supports This Scenario",
    quality: "Quality & Order Control Workflow",
    shipment: "Packing, Loading & Export Support",
    gallery: "Related Product & Supply Images",
    faq: "FAQ",
    final: "Ready to plan this supply solution?",
    disclaimer:
      "This page presents typical product application and supply workflow information. Customer-specific project details are shared only with authorization.",
  },
  zh: {
    home: "首页",
    applications: "应用方案",
    requestQuote: "获取方案报价",
    catalog: "获取产品目录",
    whatsapp: "WhatsApp 联系 Jason",
    who: "适合哪些采购场景",
    options: "推荐产品选项",
    support: "Eshsire 如何支持这个场景",
    quality: "质量与订单控制流程",
    shipment: "包装、装柜与出口支持",
    gallery: "相关产品与供货图片",
    faq: "常见问题",
    final: "准备规划这个供货方案？",
    disclaimer:
      "本页面展示典型产品应用与供货流程。真实客户项目仅在获得授权后公开展示。",
  },
  es: {
    home: "Inicio",
    applications: "Aplicaciones",
    requestQuote: "Solicitar cotización",
    catalog: "Obtener catálogo",
    whatsapp: "WhatsApp Jason",
    who: "Para quién es esta solución",
    options: "Opciones de producto recomendadas",
    support: "Cómo Eshsire apoya este escenario",
    quality: "Flujo de control de calidad y pedido",
    shipment: "Empaque, carga y soporte de exportación",
    gallery: "Imágenes de producto y suministro relacionadas",
    faq: "Preguntas frecuentes",
    final: "¿Listo para planificar esta solución?",
    disclaimer:
      "Esta página muestra aplicaciones típicas de productos y flujos de suministro. Los detalles específicos de clientes solo se comparten con autorización.",
  },
} as const;

function ListSection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-industrial-mist"
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export function ApplicationDetailContent({ application }: { application: ProjectApplication }) {
  const { locale } = useLocale();
  const lang = appLocale(locale);
  const t = copy[lang];
  const localized = localizeProjectApplication(application, locale);
  const quoteMessage = `${localized.cta} - ${localized.title}`;

  return (
    <main className="bg-industrial-dark text-white">
      <section className="section-padding pt-28">
        <div className="mx-auto max-w-7xl">
          <nav className="text-sm text-industrial-mist" aria-label="Breadcrumb">
            <Link href={localizedPath(locale, "/")} className="hover:text-accent">
              {t.home}
            </Link>
            <span className="mx-2">/</span>
            <span>{t.applications}</span>
            <span className="mx-2">/</span>
            <span className="text-white">{localized.title}</span>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <span className="inline-flex rounded border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                {localized.tag}
              </span>
              <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
                {localized.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-industrial-mist">
                {localized.summary}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={localizedPath(locale, "/contact")}
                  className="rounded bg-accent px-5 py-3 text-sm font-bold text-industrial-dark transition-colors hover:bg-white"
                >
                  {t.requestQuote}
                </Link>
                <Link
                  href={localizedPath(locale, application.id === "wall-panels" ? "/wall-panels" : "/spc-flooring")}
                  className="rounded border border-white/20 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-accent hover:text-accent"
                >
                  {t.catalog}
                </Link>
                <a
                  href={getWhatsAppUrl(locale, quoteMessage)}
                  className="rounded border border-accent/50 px-5 py-3 text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-industrial-dark"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.whatsapp}
                </a>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-white/5">
              <Image
                src={application.heroImage}
                alt={localized.alt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-industrial-panel/70">
        <div className="mx-auto grid max-w-7xl gap-x-10 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:px-8">
          <ListSection title={t.who} items={localized.suitableFor} />
          <ListSection title={t.options} items={localized.productOptions} />
          <ListSection title={t.support} items={localized.eshsireSupport} />
          <ListSection title={t.quality} items={localized.qualityWorkflow} />
          <ListSection title={t.shipment} items={localized.shipmentSupport} />

          <section className="py-8 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">{t.gallery}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {application.galleryImages.map((image, index) => (
                <div
                  key={image}
                  className="relative aspect-[4/3] overflow-hidden rounded-lg border border-white/10 bg-white/5"
                >
                  <Image
                    src={image}
                    alt={`${localized.title} image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </section>

          <section className="py-8 lg:col-span-2">
            <h2 className="text-2xl font-bold text-white">{t.faq}</h2>
            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              {localized.faq.map((item) => (
                <article key={item.q} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                  <h3 className="text-base font-bold text-white">{item.q}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-industrial-mist">{item.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="py-8 lg:col-span-2">
            <div className="rounded-lg border border-accent/25 bg-accent/10 p-6">
              <h2 className="text-2xl font-bold text-white">{t.final}</h2>
              <p className="mt-3 text-industrial-mist">{localized.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={localizedPath(locale, "/contact")}
                  className="rounded bg-accent px-5 py-3 text-sm font-bold text-industrial-dark transition-colors hover:bg-white"
                >
                  {localized.cta}
                </Link>
                <a
                  href={getWhatsAppUrl(locale, quoteMessage)}
                  className="rounded border border-accent/50 px-5 py-3 text-sm font-bold text-accent transition-colors hover:bg-accent hover:text-industrial-dark"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.whatsapp}
                </a>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {localized.relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizedPath(locale, link.href)}
                  className="text-industrial-mist underline-offset-4 hover:text-accent hover:underline"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-industrial-mist">{t.disclaimer}</p>
          </section>
        </div>
      </section>
    </main>
  );
}
