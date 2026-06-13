import { motion, useReducedMotion } from "motion/react";
import { proofDocuments, pipelineSteps, stackRecipes } from "../data/tools";
import { ToolsLocker } from "../components/tools/ToolsLocker";
import { ToolsHudStats } from "../components/tools/ToolsHudStats";
import { ToolsLockerPanel } from "../components/tools/ToolsLockerPanel";
import { ToolsPipelineStrip } from "../components/tools/ToolsPipelineStrip";
import { ToolsProofStrip } from "../components/tools/ToolsProofStrip";
import { ToolsStackRecipes } from "../components/tools/ToolsStackRecipes";
import { SiteFooter } from "../components/SiteFooter";

export function ToolsPage() {
  const reducedMotion = useReducedMotion();

  return (
    <>
      <motion.div
        className="re4-save-ui bg-[var(--pf-bg)] text-[var(--pf-text-muted)] transition-colors duration-200"
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-5xl px-8 pt-16 pb-8">
          <header className="re4-projects-header mb-6 flex items-center gap-3">
            <div className="h-0.5 w-6 shrink-0 bg-[var(--pf-accent)]/80" />
            <div>
              <h1 className="re4-projects-header__title">Tools</h1>
              <p className="re4-projects-header__sub">
                Attaché dossier — build, deploy, and ship
              </p>
            </div>
          </header>

          <ToolsHudStats />

          <ToolsProofStrip documents={proofDocuments} />

          <ToolsPipelineStrip steps={pipelineSteps} />

          <ToolsLockerPanel>
            <ToolsStackRecipes recipes={stackRecipes} />
            <ToolsLocker />
          </ToolsLockerPanel>
        </div>
      </motion.div>
      <SiteFooter />
    </>
  );
}
