export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "rich-p"; segments: Array<string | { link: string; href: string }> }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "img"; src: string; alt: string; caption?: string }
  | { type: "cta"; title?: string; text?: string; variant?: "default" | "factory-quote" | "b2b-procurement" };

export type ArticleSlot = "morning" | "afternoon" | "evening";

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle?: string;
  description: string;
  date: string;
  readMinutes: number;
  heroImage: string;
  ogImage: string;
  hideTopHero?: boolean;
  slot?: ArticleSlot;
  blocks: BlogBlock[];
};
