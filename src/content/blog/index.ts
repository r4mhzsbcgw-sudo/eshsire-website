import { chooseReliableSupplierPost } from "./choose-reliable-supplier";
import { sevenMistakesPost } from "./seven-mistakes";
import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [chooseReliableSupplierPost, sevenMistakesPost];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
