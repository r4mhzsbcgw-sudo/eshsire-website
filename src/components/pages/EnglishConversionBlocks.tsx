"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useLocale } from "@/context/LocaleContext";
import { getWhatsAppUrl } from "@/lib/config";

const card = "rounded-xl border border-white/10 bg-white/5 p-5";

export function EnglishHomeConversionBar() {
  const { locale } = useLocale();
  if (locale !== "en") return null;
  const facts = [
    "30 Years Manufacturing Experience",
    "SPC Flooring / Wall Panels / Accessories",
    "OEM / ODM Support",
    "Mixed Container Support",
    "Sample & Trial Order Support",
    "Production Progress Photos / Videos",
  ];
  return (
    <section className="border-b border-white/10 bg-industrial-slate/40 px-6 py-8" aria-label="Buyer support">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => <div className={card} key={fact}><p className="text-sm font-semibold text-white">{fact}</p></div>)}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button href="/en/contact" variant="primary">Request Quote</Button>
          <Button href="/en/contact" variant="outline">Get Samples</Button>
          <Button href="/en/contact" variant="outline">Download Catalog</Button>
          <Button href={getWhatsAppUrl("en")} variant="whatsapp" external>WhatsApp Jason</Button>
        </div>
      </div>
    </section>
  );
}

const spcCards = [
  ["Quick Specs", "4mm / 5mm / 6mm · 0.2mm / 0.3mm / 0.5mm wear layer · 1220 × 184mm · IXPE and multiple surfaces optional"],
  ["MOQ & Samples", "Ask for sample availability, trial-order quantity and the loading plan for your destination."],
  ["OEM / Private Label", "Private-label cartons, specification labels and distributor-focused collections are available for qualified orders."],
  ["Packing & Container Loading", "Confirm carton strength, pallet protection, loading quantity and mixed-container compatibility before production."],
  ["Quality Control Workflow", "Specification confirmation, production checks, finished-product inspection and shipment-preparation records."],
  ["Certifications", "Request the certificates and test reports relevant to your market and selected specification."],
];

export function EnglishSpcConversionSection() {
  const { locale } = useLocale();
  if (locale !== "en") return null;
  return (
    <section className="section-padding bg-industrial-slate/30">
      <div className="mx-auto max-w-7xl">
        <p className="section-label">Buyer essentials</p>
        <h2 className="section-heading">SPC flooring order information at a glance</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {spcCards.map(([title, text]) => <div className={card} key={title}><h3 className="font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-relaxed text-industrial-light">{text}</p></div>)}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/en/contact" variant="primary">Request Quote</Button>
          <Button href={getWhatsAppUrl("en", "Hello Jason, I need an SPC flooring quotation and sample options.")} variant="whatsapp" external>WhatsApp Jason</Button>
        </div>
      </div>
    </section>
  );
}

const panelTypes = [
  ["Bamboo-wood fiber integrated wall panels", "Interior panel profiles and decorative finishes for wholesale and renovation"],
  ["WPC wall panels", "Wood-look and decorative profiles for feature walls"],
  ["PVC wall panels", "Practical interior wall covering options"],
  ["Decorative / fluted panels", "Feature-wall profiles for retail and hospitality"],
  ["PVC ceiling panels", "Ceiling supply that can be combined with wall-panel orders"],
  ["Trims, corners and installation accessories", "Matching profiles, clips and fixing-system options"],
];

export function EnglishWallPanelConversionSection() {
  const { locale } = useLocale();
  if (locale !== "en") return null;
  return (
    <>
      <section className="section-padding bg-industrial-slate/30">
        <div className="mx-auto max-w-7xl">
          <p className="section-label">Wall panel buyer guide</p>
          <h2 className="section-heading">Compare wall panel product types</h2>
          <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/10 text-white"><tr><th className="p-4">Product type</th><th className="p-4">Typical sourcing direction</th></tr></thead>
              <tbody>{panelTypes.map(([type, use]) => <tr className="border-t border-white/10" key={type}><th className="p-4 text-white">{type}</th><td className="p-4 text-industrial-light">{use}</td></tr>)}</tbody>
            </table>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className={card}><h3 className="font-bold text-white">Size & thickness</h3><p className="mt-2 text-sm text-industrial-light">400mm / 600mm widths; 2.8m / 2.9m lengths; confirm 7mm, 7.5mm, 8mm, 9mm or 25mm options by panel type.</p></div>
            <div className={card}><h3 className="font-bold text-white">Applications</h3><p className="mt-2 text-sm text-industrial-light">Hotels, apartments, retail, offices, residential renovation and commercial interiors.</p></div>
            <div className={card}><h3 className="font-bold text-white">Accessories & installation</h3><p className="mt-2 text-sm text-industrial-light">Corners, trims, skirting, clips, adhesive and compatible light-steel or PVC keel systems.</p></div>
            <div className={card}><h3 className="font-bold text-white">Samples / MOQ / OEM</h3><p className="mt-2 text-sm text-industrial-light">Request finish samples, trial-order options, OEM labels and packing requirements.</p></div>
            <div className={card}><h3 className="font-bold text-white">Mixed container support</h3><p className="mt-2 text-sm text-industrial-light">Combine wall panels, SPC flooring, PVC ceiling panels and accessories when the loading plan permits.</p></div>
            <div className={card}><h3 className="font-bold text-white">Project information</h3><p className="mt-2 text-sm text-industrial-light">Share wall dimensions, project type, target finish, quantity and destination for a practical product list.</p></div>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/en/contact" variant="primary">Request Wall Panel Catalog</Button>
            <Button href="/en/contact" variant="outline">Get Samples</Button>
            <Button href={getWhatsAppUrl("en", "Hello Jason, I need wall panel samples and a mixed container plan.")} variant="whatsapp" external>WhatsApp Jason</Button>
            <Link href="/en/mixed-container-spc-flooring-wall-panels" className="inline-flex items-center justify-center border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:border-accent">Ask for Mixed Container Plan</Link>
          </div>
        </div>
      </section>
    </>
  );
}
