import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Dictionary } from "@/i18n/dictionaries/en";

type WallPanelFaqProps = {
  faq: Dictionary["wallPanels"]["faq"];
};

export function WallPanelFaqSection({ faq }: WallPanelFaqProps) {
  return (
    <section className="section-padding bg-industrial-slate/30">
      <div className="mx-auto max-w-5xl">
        <SectionHeader label={faq.label} title={faq.title} description={faq.description} centered />
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faq.items.map((item) => (
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

export function getWallPanelFaqItems(dict: Dictionary) {
  return dict.wallPanels.faq.items;
}
