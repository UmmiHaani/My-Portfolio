import type { BlogAlbumImage, BlogPost, BlogPostInput } from "./types";

export function blogAssetPath(fileCode: string, file: string): string {
  return `/blog/${fileCode.toLowerCase()}/${file}`;
}

export function definePost(input: BlogPostInput): BlogPost {
  const { coverFile, album, ...rest } = input;

  return {
    ...rest,
    coverFrame: coverFile ? blogAssetPath(input.fileCode, coverFile) : undefined,
    album: album.map(({ file, ...image }) => ({
      ...image,
      src: blogAssetPath(input.fileCode, file),
    })) satisfies BlogAlbumImage[],
  };
}
