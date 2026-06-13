export type BlogCategory =
  | "journey"
  | "leetcode"
  | "build"
  | "career"
  | "photo-log";

export interface BlogAlbumImage {
  src: string;
  alt: string;
  caption?: string;
  variant?: "screenshot" | "photo";
}

export interface BlogAlbumFile {
  file: string;
  alt: string;
  caption?: string;
  variant?: "screenshot" | "photo";
}

export interface BlogTimelineStep {
  title: string;
  location: string;
  region?: string;
}

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[] }
  | { type: "timeline"; steps: BlogTimelineStep[] };

export interface BlogPost {
  slug: string;
  fileCode: string;
  category: BlogCategory;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  coverFrame?: string;
  album: BlogAlbumImage[];
  albumLabel?: string;
  series?: string;
  pinned?: boolean;
  body: BlogBlock[];
}

export type BlogPostInput = Omit<BlogPost, "album" | "coverFrame"> & {
  coverFile?: string;
  album: BlogAlbumFile[];
};
