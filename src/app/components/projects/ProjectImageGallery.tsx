import type { TimelineGalleryImage } from "../../data/projects";
import { ImageWithFallback } from "../common/ImageWithFallback";

interface ProjectImageGalleryProps {
  label?: string;
  images: TimelineGalleryImage[];
}

export function ProjectImageGallery({
  label,
  images,
}: ProjectImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    <div className="exp-gallery">
      {label ? <p className="exp-gallery__label">{label}</p> : null}
      <ul className="exp-gallery__grid" aria-label={label ?? "Project photos"}>
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
