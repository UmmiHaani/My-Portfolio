import type { TimelineGalleryImage } from "../../data/experience";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface ExperienceImageGalleryProps {
  label?: string;
  images: TimelineGalleryImage[];
}

export function ExperienceImageGallery({
  label,
  images,
}: ExperienceImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="exp-gallery">
      {label ? <p className="exp-gallery__label">{label}</p> : null}
      <ul className="exp-gallery__grid" aria-label={label ?? "Experience photos"}>
        {images.map((image) => (
          <li key={image.src} className="exp-gallery__item">
            <div
              className={[
                "exp-gallery__frame",
                image.variant === "screenshot"
                  ? "exp-gallery__frame--screenshot"
                  : "exp-gallery__frame--photo",
              ].join(" ")}
            >
              <ImageWithFallback
                src={image.src}
                alt={image.alt}
                className="exp-gallery__image"
              />
            </div>
            {image.caption ? (
              <p className="exp-gallery__caption">{image.caption}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
