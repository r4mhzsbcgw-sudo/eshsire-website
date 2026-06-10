import { SectionHeader } from "@/components/ui/SectionHeader";

export const productFaqItems = [
  {
    q: "What is SPC flooring?",
    a: "SPC flooring is a rigid core vinyl flooring made with stone plastic composite material for stable, waterproof, and durable surfaces.",
  },
  {
    q: "Is SPC flooring waterproof?",
    a: "Yes. SPC flooring has a waterproof rigid core and is suitable for hotels, apartments, offices, schools, and other commercial interiors.",
  },
  {
    q: "What is the MOQ for SPC flooring orders?",
    a: "MOQ depends on color, thickness, and packaging requirements. Container orders are recommended for OEM programs and distributor supply.",
  },
  {
    q: "Can Eshsire Group provide OEM branding?",
    a: "Yes. Eshsire Group supports private label cartons, product labels, barcode stickers, sample boards, and market-specific documentation.",
  },
  {
    q: "What is the normal lead time?",
    a: "Sample preparation usually takes a few days, while bulk production is scheduled after specification and packaging approval.",
  },
  {
    q: "How much SPC flooring fits in a container?",
    a: "Container loading quantity depends on plank size, thickness, wear layer, carton design, and pallet requirements.",
  },
  {
    q: "Does SPC flooring include a warranty?",
    a: "Warranty terms depend on product specification and application. Commercial projects should confirm wear layer and installation conditions.",
  },
  {
    q: "How is SPC flooring installed?",
    a: "Most SPC flooring uses a click-lock system for floating installation over a clean, flat, and dry subfloor.",
  },
];

export function ProductFaqSection() {
  return (
    <section className="section-padding bg-industrial-slate/30">
      <div className="mx-auto max-w-5xl">
        <SectionHeader
          label="FAQ"
          title="SPC Flooring OEM Questions"
          description="Key questions distributors and importers ask before placing SPC flooring and related product orders."
          centered
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {productFaqItems.map((item) => (
            <article key={item.q} className="glass-card p-5">
              <h2 className="text-base font-bold text-white">{item.q}</h2>
              <p className="mt-2 text-sm leading-relaxed text-industrial-light">{item.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
