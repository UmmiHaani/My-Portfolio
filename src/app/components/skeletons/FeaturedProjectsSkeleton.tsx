import { Skeleton } from "../ui/skeleton";
import { SkeletonHeader, SkeletonSection, skeletonClass } from "./SkeletonSection";

function ProjectRowSkeleton() {
  return (
    <div className="relative border-l-2 border-[var(--pf-border)] pb-8 pl-8">
      <Skeleton
        className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full ${skeletonClass}`}
      />
      <div className="space-y-3">
        <div className="flex items-baseline gap-4">
          <Skeleton className={`h-4 w-8 ${skeletonClass}`} />
          <Skeleton className={`h-5 w-40 ${skeletonClass}`} />
        </div>
        <Skeleton className={`h-4 w-full ${skeletonClass}`} />
        <Skeleton className={`h-4 w-11/12 ${skeletonClass}`} />
        <div className="flex flex-wrap gap-2 pt-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton
              key={index}
              className={`h-5 w-14 rounded-sm ${skeletonClass}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjectsSkeleton() {
  return (
    <SkeletonSection>
      <SkeletonHeader />
      <div className="rounded border border-[var(--pf-border)] bg-[var(--pf-surface)] p-6 md:p-8">
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProjectRowSkeleton key={index} />
          ))}
        </div>
      </div>
    </SkeletonSection>
  );
}
