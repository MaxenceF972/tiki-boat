import { prisma } from "./prisma";
import type { Section } from "@/data/blog";

/** Convertit le texte brut (## h2, - liste, plain = p) en sections */
export function parseContent(text: string): Section[] {
  return text
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.startsWith("## "))
        return { type: "h2" as const, text: block.slice(3).trim() };
      if (block.startsWith("### "))
        return { type: "h3" as const, text: block.slice(4).trim() };
      if (block.startsWith("- "))
        return {
          type: "ul" as const,
          items: block.split("\n").filter((l) => l.startsWith("- ")).map((l) => l.slice(2).trim()),
        };
      return { type: "p" as const, text: block };
    });
}

export async function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: "asc" }, { date: "desc" }],
  });
}

export async function getPostBySlug(slug: string) {
  return prisma.blogPost.findUnique({ where: { slug } });
}
