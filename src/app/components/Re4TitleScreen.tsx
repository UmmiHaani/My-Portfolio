import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

type MenuOption = "continue" | "projects" | "connect";

const MENU_ITEMS: { id: MenuOption; label: string; hint: string }[] = [
  { id: "continue", label: "Continue", hint: "Enter the portfolio" },
  { id: "projects", label: "Load Game", hint: "Go to Featured Projects" },
  { id: "connect", label: "Options", hint: "Open Options menu" },
];

const SCROLL_TARGETS: Record<MenuOption, string | null> = {
  continue: null,
  projects: "#projects",
  connect: "#connect",
};

export function Re4TitleScreen() {
  const [visible, setVisible] = useState(true);
  const [selected, setSelected] = useState<MenuOption>("continue");
  const dialogRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback((target: MenuOption) => {
    setVisible(false);

    const hash = SCROLL_TARGETS[target];
    window.setTimeout(() => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 350);
  }, []);

  const cycleSelection = useCallback((direction: 1 | -1) => {
    setSelected((current) => {
      const ids = MENU_ITEMS.map((m) => m.id);
      const idx = ids.indexOf(current);
      return ids[(idx + direction + ids.length) % ids.length];
    });
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
      return;
    }

    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        dismiss("continue");
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        cycleSelection(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        cycleSelection(-1);
      } else if (e.key === "Enter") {
        e.preventDefault();
        dismiss(selected);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [visible, selected, dismiss, cycleSelection]);

  const overlay =
    visible &&
    createPortal(
      <AnimatePresence>
        <motion.div
          ref={dialogRef}
          tabIndex={-1}
          className="re4-save-ui fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-modal
          aria-label="Resident Evil 4 title menu"
        >
          <motion.div
            className="flex w-full max-w-lg flex-col items-center px-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ delay: 0.1, duration: 0.35 }}
          >
            <img
              src="/favicon.png"
              alt="Resident Evil 4"
              className="mb-6 h-24 w-auto object-contain md:h-32"
            />

            <p className="re4-save-heading mb-1 text-center">Haani Shahrul</p>
            <p className="mb-10 text-center text-xs tracking-[0.35em] text-white/40 uppercase">
              Portfolio
            </p>

            <ul className="w-full max-w-xs space-y-0">
              {MENU_ITEMS.map((item, index) => {
                const isActive = selected === item.id;
                return (
                  <li key={item.id}>
                    {index > 0 && (
                      <div className="re4-save-menu-divider my-2 ml-2" aria-hidden />
                    )}
                    <button
                      type="button"
                      className={`re4-save-menu-hit flex w-full items-center px-3 py-3 text-left ${
                        isActive ? "re4-save-menu-hit--active" : ""
                      }`}
                      onMouseEnter={() => setSelected(item.id)}
                      onClick={() => dismiss(item.id)}
                    >
                      <span
                        className={`re4-save-menu-label w-8 shrink-0 ${
                          isActive ? "re4-save-menu-label--active" : ""
                        }`}
                      >
                        {isActive ? "▸" : " "}
                      </span>
                      <span
                        className={`re4-save-menu-label ${
                          isActive ? "re4-save-menu-label--active" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <p className="re4-save-prompt mt-10 text-center">
              {MENU_ITEMS.find((m) => m.id === selected)?.hint}
            </p>

            <div className="re4-save-prompt-keys mt-4 flex gap-6">
              <span>
                <kbd className="re4-prompt-key">↑↓</kbd> Select
              </span>
              <span>
                <kbd className="re4-prompt-key">Enter</kbd> Confirm
              </span>
              <span>
                <kbd className="re4-prompt-key">Esc</kbd> Continue
              </span>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>,
      document.body,
    );

  return overlay;
}
