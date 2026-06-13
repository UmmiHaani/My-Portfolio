import type { Theme } from "../hooks/useTheme";
import type { TimelineGalleryImage, TimelineImage } from "../data/projects";

export function resolveThemedImageSrc(
  image: Pick<TimelineImage, "src" | "srcByTheme">,
  theme: Theme,
): string {
  if (image.srcByTheme) {
    return theme === "light" ? image.srcByTheme.light : image.srcByTheme.dark;
  }
  return image.src ?? "";
}

export function resolveThemedGallerySrc(
  image: TimelineGalleryImage,
  theme: Theme,
): string {
  if (image.srcByTheme) {
    return theme === "light" ? image.srcByTheme.light : image.srcByTheme.dark;
  }
  return image.src;
}
