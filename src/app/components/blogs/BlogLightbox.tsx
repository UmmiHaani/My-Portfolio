import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { BlogAlbumImage } from "../../data/blogs";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface BlogLightboxProps {
  open: boolean;
  images: BlogAlbumImage[];
  index: number;
  fileCode: string;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function BlogLightbox({
  open,
  images,
  index,
  fileCode,
  onClose,
  onIndexChange,
}: BlogLightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const image = images[index];

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const goPrev = useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange((index - 1 + images.length) % images.length);
  }, [images.length, index, onIndexChange]);

  const goNext = useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange((index + 1) % images.length);
  }, [images.length, index, onIndexChange]);

  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, handleClose, goPrev, goNext]);

  if (!image) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          className="re4-save-ui fixed inset-0 z-[100] flex items-center justify-center re4-modal-overlay p-3 sm:p-6 outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          role="dialog"
          aria-modal
          aria-label="Visual annex frame preview"
        >
          <motion.div
            className="blog-lightbox"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="blog-lightbox__header">
              <div>
                <p className="re4-save-heading">Visual annex / {fileCode}</p>
                <p className="blog-lightbox__sub">
                  Frame {(index + 1).toString().padStart(2, "0")} of{" "}
                  {images.length.toString().padStart(2, "0")}
                </p>
              </div>
              <button
                type="button"
                className="blog-lightbox__close"
                onClick={handleClose}
                aria-label="Close frame preview"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="blog-lightbox__stage">
              {images.length > 1 ? (
                <button
                  type="button"
                  className="blog-lightbox__nav blog-lightbox__nav--prev"
                  onClick={goPrev}
                  aria-label="Previous frame"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              ) : null}

              <div className="blog-lightbox__frame">
                <ImageWithFallback
                  src={image.src}
                  alt={image.alt}
                  className={
                    image.variant === "screenshot"
                      ? "blog-lightbox__image blog-lightbox__image--screenshot"
                      : "blog-lightbox__image blog-lightbox__image--photo"
                  }
                />
              </div>

              {images.length > 1 ? (
                <button
                  type="button"
                  className="blog-lightbox__nav blog-lightbox__nav--next"
                  onClick={goNext}
                  aria-label="Next frame"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              ) : null}
            </div>

            {image.caption ? (
              <p className="blog-lightbox__caption">{image.caption}</p>
            ) : null}

            <p className="re4-resume-modal__hint re4-save-prompt-keys">
              <kbd className="re4-prompt-key">Esc</kbd> Close
              {images.length > 1 ? (
                <>
                  {" · "}
                  <kbd className="re4-prompt-key">←</kbd>
                  <kbd className="re4-prompt-key">→</kbd> Browse
                </>
              ) : null}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
