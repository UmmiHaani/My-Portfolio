import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView } from "motion/react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import {
  Mail,
  Github,
  GraduationCap,
  FileText,
  Radio,
  X,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";

const RESEARCH_URL =
  "https://www.atlantis-press.com/proceedings/icar-t1-25/126023530";

const RESUME_URL = "/resume/Resume-Project.pdf";

type ConnectOption = "save" | "storage" | "research" | "records";

const GRID_ORDER: ConnectOption[][] = [
  ["save", "storage"],
  ["research", "records"],
];

const CHANNELS: {
  id: ConnectOption;
  code: string;
  title: string;
  subtitle: string;
  hint: string;
  icon: LucideIcon;
}[] = [
  {
    id: "save",
    code: "01",
    title: "Save Game",
    subtitle: "Email uplink",
    hint: "Copy email to clipboard",
    icon: Mail,
  },
  {
    id: "storage",
    code: "02",
    title: "Storage",
    subtitle: "GitHub depot",
    hint: "Open GitHub profile",
    icon: Github,
  },
  {
    id: "research",
    code: "03",
    title: "Academic Research",
    subtitle: "ICAR 2025 · C.A.T.E. paper",
    hint: "Open published research on Atlantis Press",
    icon: GraduationCap,
  },
  {
    id: "records",
    code: "04",
    title: "Records",
    subtitle: "Resume file",
    hint: "Preview resume in viewer",
    icon: FileText,
  },
];

interface ConnectOptionsProps {
  email: string;
  githubUrl: string;
  researchUrl?: string;
  resumeUrl?: string;
}

function gridIndex(id: ConnectOption): [number, number] {
  for (let r = 0; r < GRID_ORDER.length; r++) {
    for (let c = 0; c < GRID_ORDER[r].length; c++) {
      if (GRID_ORDER[r][c] === id) return [r, c];
    }
  }
  return [0, 0];
}

export function ConnectOptions({
  email,
  githubUrl,
  researchUrl = RESEARCH_URL,
  resumeUrl = RESUME_URL,
}: ConnectOptionsProps) {
  const [selected, setSelected] = useState<ConnectOption>("save");
  const [engaged, setEngaged] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const resumeDialogRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, margin: "-80px" });

  const closeResume = useCallback(() => setResumeOpen(false), []);

  const selectedChannel = CHANNELS.find((c) => c.id === selected)!;

  const showToast = useCallback((title: string, description: string) => {
    toast.success(title, {
      description,
      className: "re4-toast",
    });
  }, []);

  const executeOption = useCallback(
    (option: ConnectOption) => {
      if (option === "save") {
        navigator.clipboard.writeText(email).then(
          () => {
            confetti({
              particleCount: 40,
              spread: 52,
              origin: { y: 0.7 },
              colors: ["#c9a227", "#58a6ff", "#ebebeb"],
              disableForReducedMotion: true,
            });
            showToast("Save successful.", "Email copied to clipboard.");
          },
          () => {
            window.location.href = `mailto:${email}`;
            showToast("Save successful.", "Opened mail client.");
          },
        );
      } else if (option === "storage") {
        window.open(githubUrl, "_blank", "noopener,noreferrer");
        showToast("Storage opened.", "GitHub profile loaded.");
      } else if (option === "research") {
        window.open(researchUrl, "_blank", "noopener,noreferrer");
        showToast("Research file opened.", "ICAR 2025 · C.A.T.E. publication.");
      } else {
        if (resumeUrl === "#") {
          showToast("Records unavailable.", "Resume link coming soon.");
          return;
        }
        setResumeOpen(true);
        showToast("Records opened.", "Resume preview loaded.");
      }
    },
    [email, githubUrl, researchUrl, resumeUrl, showToast],
  );

  useEffect(() => {
    if (!resumeOpen) return;

    const focusTimer = window.setTimeout(() => {
      resumeDialogRef.current?.focus();
    }, 50);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeResume();
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
  }, [resumeOpen, closeResume]);

  const moveSelection = useCallback((dir: "up" | "down" | "left" | "right") => {
    const [row, col] = gridIndex(selected);
    let nextRow = row;
    let nextCol = col;

    if (dir === "up") nextRow = Math.max(0, row - 1);
    if (dir === "down") nextRow = Math.min(GRID_ORDER.length - 1, row + 1);
    if (dir === "left") nextCol = Math.max(0, col - 1);
    if (dir === "right") nextCol = Math.min(GRID_ORDER[0].length - 1, col + 1);

    setSelected(GRID_ORDER[nextRow][nextCol]);
  }, [selected]);

  useEffect(() => {
    if (!engaged || resumeOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveSelection("down");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        moveSelection("up");
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        moveSelection("left");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        moveSelection("right");
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeOption(selected);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [engaged, resumeOpen, selected, moveSelection, executeOption]);

  const resumeModal = createPortal(
    <AnimatePresence>
      {resumeOpen && (
        <motion.div
          key="resume-modal"
          ref={resumeDialogRef}
          tabIndex={-1}
          className="re4-save-ui fixed inset-0 z-[100] flex items-center justify-center re4-modal-overlay p-3 sm:p-6 outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeResume}
          role="dialog"
          aria-modal
          aria-label="Resume preview"
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
                <p className="re4-save-heading">Records / Resume</p>
                <p className="re4-resume-modal__sub">File recovery — preview mode</p>
              </div>
              <div className="re4-resume-modal__actions">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="re4-resume-modal__link"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  New tab
                </a>
                <button
                  type="button"
                  className="re4-resume-modal__close"
                  onClick={closeResume}
                  aria-label="Close resume preview"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>
            <iframe
              src={resumeUrl}
              title="Haani Shahrul — Resume"
              className="re4-resume-modal__frame"
            />
            <p className="re4-resume-modal__hint re4-save-prompt-keys">
              <kbd className="re4-prompt-key">Esc</kbd> Close
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );

  return (
    <section id="connect" className="re4-save-ui scroll-mt-8">
      <header className="re4-projects-header flex items-center gap-3">
        <div className="h-0.5 w-6 shrink-0 bg-[#58a6ff]/80" />
        <div>
          <h2 className="re4-projects-header__title">Options</h2>
          <p className="re4-projects-header__sub">
            Establish contact — transmission channels
          </p>
        </div>
      </header>

      <div
        ref={panelRef}
        tabIndex={0}
        className="re4-connect-panel outline-none focus-visible:ring-1 focus-visible:ring-[#58a6ff]/50"
        onMouseEnter={() => setEngaged(true)}
        onMouseLeave={() => setEngaged(false)}
        onFocus={() => setEngaged(true)}
        onBlur={(e) => {
          if (!panelRef.current?.contains(e.relatedTarget as Node)) {
            setEngaged(false);
          }
        }}
        role="group"
        aria-label="Contact channels"
      >
        <div className="re4-connect-panel__bg" aria-hidden />
        <div className="re4-connect-scanlines" aria-hidden />
        <img
          src="/re4-merchant.png"
          alt=""
          className="re4-connect-merchant"
          draggable={false}
          aria-hidden
        />

        <div className="re4-connect-content">
          <motion.header
            className="re4-connect-header"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="re4-connect-header__badge">
              <Radio className="h-3.5 w-3.5" />
              <span>Transmission active</span>
            </div>
            <p className="re4-connect-header__title">Select a channel</p>
            <p className="re4-connect-header__sub">
              Establish contact — stranger.
            </p>
          </motion.header>

          <div className="re4-connect-grid">
            {CHANNELS.map((channel, index) => {
              const isActive = selected === channel.id;
              const Icon = channel.icon;
              return (
                <motion.button
                  key={channel.id}
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.35, delay: 0.08 + index * 0.07 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => setSelected(channel.id)}
                  onClick={() => executeOption(channel.id)}
                  className={`re4-connect-card group text-left ${
                    isActive ? "re4-connect-card--active" : ""
                  }`}
                >
                  <span className="re4-connect-card__code">{channel.code}</span>
                  <div className="re4-connect-card__icon">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <p className="re4-connect-card__title">{channel.title}</p>
                  <p className="re4-connect-card__sub">{channel.subtitle}</p>
                  <span className="re4-connect-card__arrow" aria-hidden>
                    {isActive ? "▸" : ""}
                  </span>
                </motion.button>
              );
            })}
          </div>

          <motion.footer
            className="re4-connect-footer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <p className="re4-connect-footer__quote">
              &ldquo;What&apos;re you buyin&apos;?&rdquo;
              <span className="re4-connect-footer__hint">
                — {selectedChannel.hint}
              </span>
            </p>
            <div className="re4-save-prompt-keys flex flex-wrap gap-3 sm:gap-5">
              <span>
                <kbd className="re4-prompt-key">↑↓←→</kbd> Select
              </span>
              <span>
                <kbd className="re4-prompt-key">Enter</kbd> Connect
              </span>
            </div>
          </motion.footer>
        </div>
      </div>

      {resumeModal}
    </section>
  );
}
