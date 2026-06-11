import type { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";

export const skeletonClass = "bg-[var(--pf-skeleton)]";

export function SkeletonSection({ children }: { children: ReactNode }) {
  return (
    <div className="re4-save-ui min-h-[60vh] text-[var(--pf-text-muted)]">
      <div className="mx-auto max-w-5xl px-8 py-16">{children}</div>
    </div>
  );
}

export function SkeletonHeader() {
  return (
    <header className="re4-projects-header mb-10 flex items-center gap-3">
      <Skeleton className={`h-0.5 w-6 shrink-0 rounded-none ${skeletonClass}`} />
      <div className="space-y-2">
        <Skeleton className={`h-6 w-48 ${skeletonClass}`} />
        <Skeleton className={`h-3 w-64 ${skeletonClass}`} />
      </div>
    </header>
  );
}
