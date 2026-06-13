import type { BlogCategory } from "./types";
import { blogPosts } from "./posts";

export type {
  BlogAlbumFile,
  BlogAlbumImage,
  BlogBlock,
  BlogCategory,
  BlogPost,
  BlogPostInput,
  BlogTimelineStep,
} from "./types";

export { blogAssetPath, definePost } from "./assets";
export { blogPosts };

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  journey: "Journey",
  leetcode: "LeetCode",
  build: "Build log",
  career: "Career",
  "photo-log": "Photo log",
};

export function parseLogNumber(fileCode: string): number {
  const match = fileCode.match(/LOG-(\d+)/);
  return match ? Number.parseInt(match[1], 10) : 9999;
}

export function sortBlogPosts<T extends { pinned?: boolean; fileCode: string }>(
  posts: T[],
): T[] {
  return [...posts].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return parseLogNumber(a.fileCode) - parseLogNumber(b.fileCode);
  });
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export const BLOG_FILTERS: { id: "all" | BlogCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "journey", label: "Journey" },
  { id: "leetcode", label: "LeetCode" },
  { id: "build", label: "Build" },
  { id: "career", label: "Career" },
  { id: "photo-log", label: "Photo log" },
];
