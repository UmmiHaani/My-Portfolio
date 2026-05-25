import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useSpring } from "motion/react";
import { Github } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SaveRoomCorner } from "./SaveRoomCorner";
import { useIsMobile } from "./ui/use-mobile";

const PANEL_WIDTH = 300;
const SLIDE_HEIGHT = Math.round(PANEL_WIDTH * (611 / 1024));

export interface FeaturedProject {
  name: string;
  description: string;
  tech: string[];
  github: string;
  demo?: string;
  previewImage: string;
  previewVideo?: string;
}

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
  saveEmail?: string;
  saveGithub?: string;
}

export function FeaturedProjects({
  projects,
  saveEmail = "haani.shahrul@example.com",
  saveGithub = "https://github.com/UmmiHaani",
}: FeaturedProjectsProps) {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const cursorX = useSpring(0, { stiffness: 400, damping: 35 });
  const cursorY = useSpring(0, { stiffness: 400, damping: 35 });

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateCursorPosition = useCallback(
    (clientX: number, clientY: number) => {
      let left = clientX - PANEL_WIDTH / 2;
      let top = clientY - SLIDE_HEIGHT / 2;

      left = Math.min(
        Math.max(8, left),
        window.innerWidth - PANEL_WIDTH - 8,
      );
      top = Math.min(
        Math.max(8, top),
        window.innerHeight - SLIDE_HEIGHT - 8,
      );

      cursorX.set(left);
      cursorY.set(top);
    },
    [cursorX, cursorY],
  );

  const hidePreview = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleSectionMouseLeave = () => {
    hidePreview();
  };

  const handleProjectEnter = (
    index: number,
    e: React.MouseEvent<HTMLDivElement>,
  ) => {
    setActiveIndex(index);
    updateCursorPosition(e.clientX, e.clientY);
  };

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeIndex === null) return;
    updateCursorPosition(e.clientX, e.clientY);
  };

  const floatingPreview =
    mounted &&
    !isMobile &&
    createPortal(
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            key="floating-preview"
            className="fixed z-50 w-[300px] pointer-events-none"
            style={{ left: cursorX, top: cursorY }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <div
              className="overflow-hidden rounded-xl shadow-lg leading-[0]"
              style={{ height: SLIDE_HEIGHT }}
            >
              <motion.div
                className="flex flex-col gap-0"
                initial={false}
                animate={{ y: -(activeIndex * SLIDE_HEIGHT) }}
                transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              >
                {projects.map((project) => (
                  <div
                    key={project.name}
                    className="shrink-0 w-full overflow-hidden"
                    style={{ height: SLIDE_HEIGHT }}
                  >
                    {project.previewVideo ? (
                      <video
                        src={project.previewVideo}
                        poster={project.previewImage}
                        muted
                        playsInline
                        loop
                        autoPlay
                        className="block h-full w-full object-cover"
                      />
                    ) : (
                      <ImageWithFallback
                        src={project.previewImage}
                        alt={`${project.name} preview`}
                        className="block h-full w-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );

  return (
    <section id="projects" className="re4-save-ui">
      <header className="re4-projects-header flex items-center gap-3">
        <div className="h-0.5 w-6 shrink-0 bg-[#58a6ff]/80" />
        <div>
          <h2 className="re4-projects-header__title">Featured Projects</h2>
          <p className="re4-projects-header__sub">Load Game — Mission files</p>
        </div>
      </header>

      <div className="re4-projects-panel relative p-6 md:p-8 pb-24">
        <div
          onMouseLeave={handleSectionMouseLeave}
          onMouseMove={handleSectionMouseMove}
        >
          <div className="space-y-6">
            {projects.map((project, index) => (
            <div
              key={project.name}
              className="re4-projects-row group relative border-l-2 border-[#30363d] pl-8 pb-8 transition-colors hover:border-[#58a6ff]/70 cursor-default"
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-[#30363d] bg-[#0d1117] transition-colors group-hover:border-[#58a6ff]" />

              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                <div
                  className="min-w-0 flex-1 space-y-3"
                  onMouseEnter={(e) => handleProjectEnter(index, e)}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="re4-projects-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="re4-projects-title">{project.name}</h3>
                  </div>

                  <p className="re4-projects-desc">{project.description}</p>

                  <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
                    {project.tech.map((tech) => (
                      <span key={tech} className="re4-projects-tech">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="flex shrink-0 flex-col gap-2 md:gap-2.5"
                  onMouseEnter={hidePreview}
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="re4-projects-link"
                    onMouseDown={hidePreview}
                    onFocus={hidePreview}
                  >
                    <span className="re4-projects-link__marker" aria-hidden>
                      ▸
                    </span>
                    <Github className="h-4 w-4 shrink-0 opacity-70" />
                    <span>View Code</span>
                  </a>
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="re4-projects-link"
                      onMouseDown={hidePreview}
                      onFocus={hidePreview}
                    >
                      <span className="re4-projects-link__marker" aria-hidden>
                        ▸
                      </span>
                      <svg
                        className="h-4 w-4 shrink-0 opacity-70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <span>Live Demo</span>
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>

        {floatingPreview}

        <SaveRoomCorner email={saveEmail} githubUrl={saveGithub} />
      </div>

    </section>
  );
}
