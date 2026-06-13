import { ExperienceTimeline } from "../components/experience/ExperienceTimeline";
import { SiteFooter } from "../components/SiteFooter";

export function ExperiencePage() {
  return (
    <>
      <div className="re4-save-ui bg-[var(--pf-bg)] text-[var(--pf-text-muted)] transition-colors duration-200">
        <div className="mx-auto max-w-5xl px-8 pt-16 pb-8">
          <header className="re4-projects-header mb-10 flex items-center gap-3">
            <div className="h-0.5 w-6 shrink-0 bg-[var(--pf-accent)]/80" />
            <div>
              <h1 className="re4-projects-header__title">Projects</h1>
              <p className="re4-projects-header__sub">
                Mission log — four chapters, one direction forward
              </p>
            </div>
          </header>

          <ExperienceTimeline />
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
