import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import { Save, Package, Briefcase, LucideIcon } from "lucide-react";
import { playUiClickSound } from "../lib/re4Audio";

const SAVE_IMAGE = "/re4-save-typewriter.png";
const TYPEWRITER_AUDIO = "/audio/re4-typewriter.mp3";
const MENU_CONFIRM_AUDIO = "/audio/re4-typewriter-confirm.mp3";
const TYPEWRITER_VOLUME = 0.4;
const MENU_CONFIRM_VOLUME = 0.65;
const SAVE_DONE_HOLD_MS = 600;
const SAVE_DURATION_FALLBACK_MS = 8000;

type MenuOption = "save" | "storage" | "case";

const MENU_ITEMS: {
  id: MenuOption;
  label: string;
  icon: LucideIcon;
}[] = [
  { id: "save", label: "Save Game", icon: Save },
  { id: "storage", label: "Storage", icon: Package },
  { id: "case", label: "Customize Case", icon: Briefcase },
];

interface SaveRoomCornerProps {
  email: string;
  githubUrl: string;
}

function shouldPlayTypewriterMusic(): boolean {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SaveRoomCorner({ email, githubUrl }: SaveRoomCornerProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<MenuOption>("save");
  const [phase, setPhase] = useState<"menu" | "saving" | "done">("menu");
  const [saveBarDurationMs, setSaveBarDurationMs] = useState(
    SAVE_DURATION_FALLBACK_MS,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const confirmAudioRef = useRef<HTMLAudioElement | null>(null);

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio(TYPEWRITER_AUDIO);
      audio.loop = false;
      audio.volume = TYPEWRITER_VOLUME;
      audio.preload = "metadata";
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const playTypewriterMusic = useCallback(() => {
    if (!shouldPlayTypewriterMusic()) return;
    const audio = getAudio();
    audio.currentTime = 0;
    void audio.play().catch(() => {});
  }, [getAudio]);

  const stopTypewriterMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }, []);

  const getConfirmAudio = useCallback(() => {
    if (!confirmAudioRef.current) {
      const sfx = new Audio(MENU_CONFIRM_AUDIO);
      sfx.volume = MENU_CONFIRM_VOLUME;
      sfx.preload = "auto";
      confirmAudioRef.current = sfx;
    }
    return confirmAudioRef.current;
  }, []);

  const getConfirmAudioDurationMs = useCallback(async () => {
    const sfx = getConfirmAudio();

    if (Number.isFinite(sfx.duration) && sfx.duration > 0) {
      return Math.round(sfx.duration * 1000);
    }

    await new Promise<void>((resolve) => {
      if (Number.isFinite(sfx.duration) && sfx.duration > 0) {
        resolve();
        return;
      }
      const onReady = () => {
        sfx.removeEventListener("loadedmetadata", onReady);
        resolve();
      };
      sfx.addEventListener("loadedmetadata", onReady);
      sfx.load();
    });

    return Number.isFinite(sfx.duration) && sfx.duration > 0
      ? Math.round(sfx.duration * 1000)
      : SAVE_DURATION_FALLBACK_MS;
  }, [getConfirmAudio]);

  const playMenuConfirmSound = useCallback(() => {
    if (!shouldPlayTypewriterMusic()) return;
    const sfx = getConfirmAudio();
    sfx.currentTime = 0;
    void sfx.play().catch(() => {});
  }, [getConfirmAudio]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setPhase("menu");
    setSelected("save");
  }, []);

  const openMenu = useCallback(() => {
    playUiClickSound();
    setMenuOpen(true);
    setPhase("menu");
    setSelected("save");
    playTypewriterMusic();
  }, [playTypewriterMusic]);

  useEffect(() => {
    if (!menuOpen) return;
    void getConfirmAudio().load();
  }, [menuOpen, getConfirmAudio]);

  useEffect(() => {
    return () => {
      stopTypewriterMusic();
      confirmAudioRef.current?.pause();
      audioRef.current = null;
      confirmAudioRef.current = null;
    };
  }, [stopTypewriterMusic]);

  useEffect(() => {
    if (!menuOpen) {
      stopTypewriterMusic();
    }
  }, [menuOpen, stopTypewriterMusic]);

  const showToast = useCallback(
    (title: string, description: string) => {
      toast.success(title, {
        description,
        className: "re4-toast",
        action: {
          label: "GitHub",
          onClick: () =>
            window.open(githubUrl, "_blank", "noopener,noreferrer"),
        },
      });
    },
    [githubUrl],
  );

  const runSave = useCallback(async () => {
    const durationMs = await getConfirmAudioDurationMs();
    setSaveBarDurationMs(durationMs);
    setPhase("saving");
    await new Promise((r) => setTimeout(r, durationMs));
    try {
      await navigator.clipboard.writeText(email);
      setPhase("done");
      await new Promise((r) => setTimeout(r, SAVE_DONE_HOLD_MS));
      closeMenu();
      showToast("Save successful.", "Your progress has been stored.");
    } catch {
      closeMenu();
      window.open(githubUrl, "_blank", "noopener,noreferrer");
      showToast("Save successful.", "Opened GitHub storage.");
    }
  }, [email, githubUrl, showToast, closeMenu, getConfirmAudioDurationMs]);

  const executeOption = useCallback(
    (option: MenuOption) => {
      playMenuConfirmSound();

      if (option === "save") {
        runSave();
      } else if (option === "storage") {
        closeMenu();
        window.open(githubUrl, "_blank", "noopener,noreferrer");
        showToast("Storage opened.", "GitHub profile loaded.");
      } else {
        closeMenu();
        navigator.clipboard.writeText(email).then(() => {
          showToast("Case customized.", "Email copied to clipboard.");
        });
      }
    },
    [closeMenu, email, githubUrl, runSave, showToast, playMenuConfirmSound],
  );

  const cycleSelection = useCallback((direction: 1 | -1) => {
    setSelected((current) => {
      const ids = MENU_ITEMS.map((m) => m.id);
      const idx = ids.indexOf(current);
      const next = (idx + direction + ids.length) % ids.length;
      return ids[next];
    });
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }

      if (phase !== "menu") return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        cycleSelection(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        cycleSelection(-1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        executeOption(selected);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, phase, selected, closeMenu, cycleSelection, executeOption]);

  const modal =
    menuOpen &&
    createPortal(
      <AnimatePresence>
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          className="re4-save-ui fixed inset-0 z-[100] flex items-center justify-center re4-modal-overlay p-4 outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={phase === "menu" ? closeMenu : undefined}
          role="dialog"
          aria-modal
          aria-label="Typewriter save menu"
        >
          <motion.div
            className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-sm shadow-2xl shadow-black/80"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={SAVE_IMAGE}
              alt="Resident Evil 4 typewriter save room"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {phase === "menu" && (
              <>
                <div
                  className="re4-save-menu-panel-shadow absolute inset-y-0 left-0 w-[52%] z-[1] pointer-events-none"
                  aria-hidden
                />

                {/* Menu text overlaid — RE4 Remake typewriter UI */}
                <div className="absolute top-[14%] left-[7%] z-10 w-[40%] max-w-[280px] pointer-events-none md:top-[16%] md:left-[8%]">
                  <p className="re4-save-heading mb-5 md:mb-7">TYPEWRITER</p>

                  <ul className="pointer-events-auto space-y-0">
                    {MENU_ITEMS.map((item, index) => {
                      const Icon = item.icon;
                      const isActive = selected === item.id;
                      return (
                        <li key={item.id}>
                          {index > 0 && (
                            <div className="re4-save-menu-divider my-1.5" aria-hidden />
                          )}
                          <button
                            type="button"
                            className={`re4-save-menu-hit flex w-full items-center gap-3 pl-1 pr-2 py-2 md:py-2.5 text-left ${
                              isActive ? "re4-save-menu-hit--active" : ""
                            }`}
                            onMouseEnter={() => setSelected(item.id)}
                            onClick={() => {
                              setSelected(item.id);
                              executeOption(item.id);
                            }}
                          >
                            <Icon
                              className={`re4-save-menu-icon h-[15px] w-[15px] shrink-0 text-white md:h-4 md:w-4 ${
                                isActive ? "" : ""
                              }`}
                              strokeWidth={1.25}
                            />
                            <span
                              className={`re4-save-menu-label ${
                                isActive
                                  ? "re4-save-menu-label--active"
                                  : ""
                              }`}
                            >
                              {item.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <p className="re4-save-prompt absolute bottom-[7%] left-0 right-0 z-10 text-center pointer-events-none">
                  Save your progress.
                </p>

                <div className="re4-save-prompt-keys absolute bottom-3 right-4 z-10 flex gap-5 pointer-events-none">
                  <span>
                    <kbd className="re4-prompt-key">Enter</kbd> Confirm
                  </span>
                  <span>
                    <kbd className="re4-prompt-key">Esc</kbd> Close
                  </span>
                </div>
              </>
            )}

            {(phase === "saving" || phase === "done") && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/55 backdrop-blur-[1px]">
                {phase === "saving" && (
                  <>
                    <p className="re4-save-prompt text-lg mb-6">
                      Saving...
                    </p>
                    <div
                      className="re4-saving-bar w-48 max-w-[60%]"
                      style={
                        {
                          "--re4-save-duration": `${saveBarDurationMs}ms`,
                        } as CSSProperties
                      }
                    >
                      <div
                        key={saveBarDurationMs}
                        className="re4-saving-bar__fill"
                      />
                    </div>
                  </>
                )}
                {phase === "done" && (
                  <p className="re4-save-prompt text-xl">
                    Save successful.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <button
        type="button"
        onClick={openMenu}
        className="re4-save-ui absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 group"
        aria-label="Open typewriter save room"
      >
        <div className="re4-corner-thumb relative h-[72px] w-[110px] rounded-sm transition-transform group-hover:scale-[1.04]">
          <img
            src={SAVE_IMAGE}
            alt="Typewriter save room"
            className="h-full w-full object-cover object-center"
          />
          <span className="absolute bottom-1 left-0 right-0 text-center text-[9px] font-semibold tracking-[0.2em] text-white/95 bg-black/60 py-0.5">
            SAVE
          </span>
        </div>
      </button>
      {modal}
    </>
  );
}
