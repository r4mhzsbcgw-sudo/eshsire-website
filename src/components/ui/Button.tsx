import Link from "next/link";

type Variant = "primary" | "secondary" | "outline" | "whatsapp";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-industrial-dark hover:bg-accent-hover border border-accent",
  secondary:
    "bg-white/10 text-white hover:bg-white/20 border border-white/20 backdrop-blur-sm",
  outline:
    "bg-transparent text-white hover:bg-white/10 border border-white/30",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#20bd5a] border border-[#25D366]",
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
