import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, X } from "lucide-react";
import { playUiClickSound } from "../lib/re4Audio";

interface Re4PdfModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
  heading: string;
  subtitle: string;
  iframeTitle: string;
  dialogLabel: string;
}

export function Re4PdfModal({
  open,
  onClose,
  src,
  heading,
  subtitle,
  iframeTitle,
  dialogLabel,
}: Re4PdfModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    playUiClickSound();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
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
  }, [open, handleClose]);

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
          aria-label={dialogLabel}
        >
          <motion.div
            className="re4-resume-modal"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="re4-resume-modal__header">
              <div>
                <p className="re4-save-heading">{heading}</p>
                <p className="re4-resume-modal__sub">{subtitle}</p>
              </div>
              <div className="re4-resume-modal__actions">
                <a
                  href={src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="re4-resume-modal__link"
                  onClick={playUiClickSound}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  New tab
                </a>
                <button
                  type="button"
                  className="re4-resume-modal__close"
                  onClick={handleClose}
                  aria-label={`Close ${dialogLabel.toLowerCase()}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>
            <iframe src={src} title={iframeTitle} className="re4-resume-modal__frame" />
            <p className="re4-resume-modal__hint re4-save-prompt-keys">
              <kbd className="re4-prompt-key">Esc</kbd> Close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
