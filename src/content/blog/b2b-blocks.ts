import type { BlogBlock } from "./types";

/** Standard internal-link paragraph for auto-generated B2B articles */
export function internalLinksBlock(): BlogBlock {
  return {
    type: "rich-p",
    segments: [
      "Eshsire Group is a ",
      { link: "SPC flooring supplier", href: "/spc-flooring" },
      " and ",
      { link: "China flooring factory", href: "/factory" },
      " offering ",
      { link: "wholesale wall panel supply", href: "/wall-panels" },
      ". ",
      { link: "Request a quotation", href: "/contact" },
      " for container pricing and bulk orders.",
    ],
  };
}

export function b2bCtaBlock(text?: string): BlogBlock {
  return {
    type: "cta",
    variant: "b2b-procurement",
    title: "Factory Direct Pricing for Distributors & Contractors",
    text:
      text ??
      "Contact our export team for factory price list, 40HQ container quotation and bulk SPC flooring pricing. Reply within 24 hours.",
  };
}

export function imgBlock(
  src: string,
  alt: string,
  caption?: string
): BlogBlock {
  return { type: "img", src, alt, caption };
}
