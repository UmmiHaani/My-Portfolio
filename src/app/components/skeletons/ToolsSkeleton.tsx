import { Skeleton } from "../ui/skeleton";
import { SkeletonHeader, SkeletonSection, skeletonClass } from "./SkeletonSection";

function HudSkeleton() {
  return (
    <div className="mb-7 flex flex-wrap items-center gap-3 rounded border border-[var(--pf-border)] p-3">
      <Skeleton className={`h-6 w-28 rounded ${skeletonClass}`} />
      <Skeleton className={`h-4 w-48 ${skeletonClass}`} />
      <Skeleton className={`h-4 w-24 ${skeletonClass}`} />
    </div>
  );
}

function LoadoutSectionSkeleton({ featured }: { featured?: boolean }) {
  return (
    <div className="grid grid-cols-[2.75rem_1fr] gap-4">
      <Skeleton className={`h-11 w-11 rounded-full ${skeletonClass}`} />
      <div className={`grid gap-4 md:grid-cols-2 ${featured ? "md:col-span-1" : ""}`}>
        <div className="grid grid-cols-[2.5rem_1fr] gap-3">
          <Skeleton className={`h-10 w-10 rounded ${skeletonClass}`} />
          <div className="space-y-2">
            <Skeleton className={`h-3 w-24 ${skeletonClass}`} />
            <Skeleton className={`h-5 w-40 ${skeletonClass}`} />
            <Skeleton className={`h-3 w-28 ${skeletonClass}`} />
          </div>
        </div>
        <div className="space-y-3 rounded border border-[var(--pf-border)] p-4">
          <Skeleton className={`h-3 w-16 ${skeletonClass}`} />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className={`h-6 w-16 rounded ${skeletonClass}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ToolsSkeleton() {
  return (
    <SkeletonSection>
      <SkeletonHeader />
      <HudSkeleton />
      <div className="mb-5 flex gap-3 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className={`h-24 w-52 shrink-0 rounded ${skeletonClass}`} />
        ))}
      </div>
      <Skeleton className={`mb-5 h-20 w-full rounded ${skeletonClass}`} />
      <div className="overflow-hidden rounded-xl border border-[var(--pf-border)] p-6">
        <div className="mb-6 grid gap-3 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className={`h-36 rounded ${skeletonClass}`} />
          ))}
        </div>
        <Skeleton className={`mb-6 h-10 w-full rounded ${skeletonClass}`} />
        <div className="relative space-y-10">
          <LoadoutSectionSkeleton featured />
          <LoadoutSectionSkeleton />
          <LoadoutSectionSkeleton />
        </div>
      </div>
    </SkeletonSection>
  );
}
