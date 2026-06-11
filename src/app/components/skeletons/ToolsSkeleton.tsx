import { Skeleton } from "../ui/skeleton";
import { SkeletonHeader, SkeletonSection, skeletonClass } from "./SkeletonSection";

function ToolTileSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-[var(--pf-border)] bg-[var(--pf-surface)] p-4">
      <Skeleton className={`h-12 w-12 rounded-md ${skeletonClass}`} />
      <Skeleton className={`h-4 w-20 ${skeletonClass}`} />
    </div>
  );
}

export function ToolsSkeleton() {
  return (
    <SkeletonSection>
      <SkeletonHeader />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ToolTileSkeleton key={index} />
        ))}
      </div>
    </SkeletonSection>
  );
}
