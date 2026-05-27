import { FadeIn } from "@/components/motion/FadeIn";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  centered = false,
}: SectionHeaderProps) {
  return (
    <FadeIn className={centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className="section-label">{label}</p>
      <h2 className="section-heading">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-industrial-light md:text-lg">
          {description}
        </p>
      )}
    </FadeIn>
  );
}
