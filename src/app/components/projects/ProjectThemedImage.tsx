import type { TimelineImage } from "../../data/projects";
import { useTheme } from "../../hooks/useTheme";
import { resolveThemedImageSrc } from "../../lib/resolveThemedImage";
import { ImageWithFallback } from "../common/ImageWithFallback";

interface ProjectThemedImageProps {
  image: TimelineImage;
  className?: string;
}

export function ProjectThemedImage({
  image,
  className,
}: ProjectThemedImageProps) {
  const { theme } = useTheme();

  return (
    <ImageWithFallback
      key={resolveThemedImageSrc(image, theme)}
      src={resolveThemedImageSrc(image, theme)}
      alt={image.alt}
      className={className}
    />
  );
}
