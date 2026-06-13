import { useCallback, useState } from "react";
import type { BlogAlbumImage } from "../../data/blogs";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { BlogLightbox } from "./BlogLightbox";

interface BlogVisualAnnexProps {
  fileCode: string;
  label?: string;
  images: BlogAlbumImage[];
  compact?: boolean;
}

export function BlogVisualAnnex({
  fileCode,
  label,
  images,
  compact = false,
}: BlogVisualAnnexProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openFrame = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  if (images.length === 0) {
    return (
      <div className="blog-annex blog-annex--empty" aria-label="Visual annex empty">
        <p className="blog-annex__label">Visual annex</p>
        <div className="blog-annex__placeholder" aria-hidden />
        <p className="blog-annex__empty-hint re4-save-prompt">No frames indexed</p>
      </div>
    );
  }

  return (
    <>
      <aside
        className={compact ? "blog-annex blog-annex--compact" : "blog-annex"}
        aria-label={label ?? "Visual annex"}
      >
        <p className="blog-annex__label">
          {label ?? "Visual annex"}
          <span className="blog-annex__count">
            {images.length} frame{images.length === 1 ? "" : "s"}
          </span>
        </p>
        <ul className="blog-annex__grid">
          {images.map((image, index) => (
            <li key={`${image.src}-${index}`} className="blog-annex__item">
              <button
                type="button"
                className="blog-annex__frame-btn"
                onClick={() => openFrame(index)}
                aria-label={`Open frame ${index + 1}: ${image.alt}`}
              >
                <span className="blog-annex__frame-index" aria-hidden>
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div
                  className={[
                    "blog-annex__frame",
                    image.variant === "screenshot"
                      ? "blog-annex__frame--screenshot"
                      : "blog-annex__frame--photo",
                  ].join(" ")}
                >
                  <ImageWithFallback
                    src={image.src}
                    alt={image.alt}
                    className="blog-annex__image"
                  />
                </div>
              </button>
              {image.caption && !compact ? (
                <p className="blog-annex__caption">{image.caption}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </aside>

      <BlogLightbox
        open={lightboxIndex !== null}
        images={images}
        index={lightboxIndex ?? 0}
        fileCode={fileCode}
        onClose={closeLightbox}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
