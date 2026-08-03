import queueData from "../../../content/blog/blogQueue.en.json";
import { applyBlogImageAssignment } from "./image-plan";
import type { BlogBlock, BlogPost, BlogQueueEntry } from "./types";

const MINIMUM_COMPLETE_BODY_CHARACTERS = 1000;

const queueEntries = queueData.entries as BlogQueueEntry[];

function beijingToday(): string {
  return new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function normalizedBodyLength(body: string): number {
  return body.replace(/\s+/g, " ").trim().length;
}

export function hasCompleteQueueBody(entry: BlogQueueEntry): boolean {
  if (entry.isPlaceholder) return false;
  if (!entry.body.trim()) return false;
  return normalizedBodyLength(entry.body) >= MINIMUM_COMPLETE_BODY_CHARACTERS;
}

export function isBlogQueueEntryPublishable(
  entry: BlogQueueEntry,
  today = beijingToday()
): boolean {
  if (entry.locale !== "en") return false;
  if (entry.status !== "scheduled" && entry.status !== "published") return false;
  if (entry.approvedForPublish !== true) return false;
  if (entry.publishDate > today) return false;
  return hasCompleteQueueBody(entry);
}

function markdownBodyToBlocks(body: string): BlogBlock[] {
  const blocks: BlogBlock[] = [];
  const paragraph: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    const text = paragraph.join(" ").trim();
    if (text) blocks.push({ type: "p", text });
    paragraph.length = 0;
  };
  const flushList = () => {
    if (listItems.length) blocks.push({ type: "ul", items: listItems });
    listItems = [];
  };

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }
    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h3", text: line.slice(4).trim() });
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "h2", text: line.slice(3).trim() });
      continue;
    }
    if (/^[-*]\s+/.test(line)) {
      flushParagraph();
      listItems.push(line.replace(/^[-*]\s+/, ""));
      continue;
    }
    flushList();
    paragraph.push(line.replace(/^#\s+/, ""));
  }

  flushParagraph();
  flushList();
  return blocks;
}

function queueEntryToBlogPost(entry: BlogQueueEntry): BlogPost {
  const blocks = markdownBodyToBlocks(entry.body);
  const ctaTitle = entry.cta.title || entry.cta.label || "";
  const ctaText = entry.cta.text || ctaTitle;
  if (entry.faq.length) {
    blocks.push({ type: "h2", text: "Frequently Asked Questions" });
    for (const item of entry.faq) {
      blocks.push({ type: "h3", text: item.question });
      blocks.push({ type: "p", text: item.answer });
    }
  }
  if (ctaTitle) {
    blocks.push({ type: "cta", title: ctaTitle, text: ctaText });
  }

  const wordCount = entry.body.trim().split(/\s+/).length;
  return applyBlogImageAssignment({
    slug: entry.slug,
    title: entry.title,
    metaTitle: entry.metaTitle,
    description: entry.metaDescription || entry.excerpt,
    date: entry.publishDate,
    publishDate: entry.publishDate,
    approvedForPublish: entry.approvedForPublish,
    isPlaceholder: false,
    language: "en",
    author: "Jason | Eshsire Group",
    productCategory: entry.category,
    targetKeyword: entry.targetKeyword,
    internalLinks: entry.internalLinks.map((link) =>
      typeof link === "string" ? link : link.href
    ),
    ctaType: ctaTitle,
    status: entry.status,
    readMinutes: Math.max(1, Math.ceil(wordCount / 200)),
    heroImage: "",
    ogImage: "",
    blocks,
  }, entry.dayNumber);
}

export function getPublishableQueuePosts(today = beijingToday()): BlogPost[] {
  return queueEntries
    .filter((entry) => isBlogQueueEntryPublishable(entry, today))
    .map(queueEntryToBlogPost);
}

export function getBlogQueueEntries(): BlogQueueEntry[] {
  return [...queueEntries];
}
