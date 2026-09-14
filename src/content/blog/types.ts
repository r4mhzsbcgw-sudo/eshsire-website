export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "rich-p"; segments: Array<string | { link: string; href: string }> }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "img"; src: string; alt: string; caption?: string }
  | { type: "cta"; title?: string; text?: string; variant?: "default" | "factory-quote" | "b2b-procurement" };

export type ArticleSlot = "morning" | "afternoon" | "evening";
export type BlogStatus = "draft" | "scheduled" | "published";
export type BlogPublishSlot = "flooring" | "wall-panel";

export type BlogQueueEntry = {
  dayNumber: number;
  locale: "en";
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  publishDate: string;
  publishGroupDate?: string;
  publishSlot?: BlogPublishSlot;
  status: BlogStatus;
  approvedForPublish: boolean;
  excerpt: string;
  category: string;
  tags: string[];
  relatedProducts: string[];
  internalLinks: Array<string | { label: string; href: string }>;
  body: string;
  faq: Array<{ question: string; answer: string }>;
  cta: { label?: string; title?: string; text?: string; href: string };
  isPlaceholder: boolean;
  featuredImage?: { src: string; alt: string; caption: string };
  inlineImages?: Array<{
    src: string;
    alt: string;
    caption: string;
    position: "after-introduction" | "before-final-recommendation";
  }>;
};

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  date: string;
  publishDate?: string;
  approvedForPublish?: boolean;
  isPlaceholder?: boolean;
  language?: string;
  author?: string;
  productCategory?: string;
  targetKeyword?: string;
  imageAlt?: string;
  internalLinks?: string[];
  ctaType?: string;
  status?: BlogStatus;
  publishGroupDate?: string;
  publishSlot?: BlogPublishSlot;
  readMinutes: number;
  heroImage: string;
  ogImage: string;
  hideTopHero?: boolean;
  slot?: ArticleSlot;
  blocks: BlogBlock[];
};
