import type { TimelineImage } from "../../data/experience";
import { useTheme } from "../../hooks/useTheme";
import { resolveThemedImageSrc } from "../../lib/resolveThemedImage";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ExperienceThemedImageProps {
  image: TimelineImage;
  className?: string;
}

export function ExperienceThemedImage({
  image,
  className,
}: ExperienceThemedImageProps) {
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
