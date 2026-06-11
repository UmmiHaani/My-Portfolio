import { Skeleton } from "../ui/skeleton";
import { SkeletonHeader, SkeletonSection, skeletonClass } from "./SkeletonSection";

function RoleBlockSkeleton() {
  return (
    <div className="relative border-l-2 border-[var(--pf-border)] pb-10 pl-8 last:pb-0">
      <Skeleton
        className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full ${skeletonClass}`}
      />
      <div className="space-y-3">
        <Skeleton className={`h-5 w-44 ${skeletonClass}`} />
        <Skeleton className={`h-4 w-32 ${skeletonClass}`} />
        <Skeleton className={`h-6 w-24 rounded-full ${skeletonClass}`} />
        <Skeleton className={`h-4 w-full ${skeletonClass}`} />
        <Skeleton className={`h-4 w-10/12 ${skeletonClass}`} />
      </div>
    </div>
  );
}

export function ExperienceSkeleton() {
  return (
    <SkeletonSection>
      <SkeletonHeader />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <RoleBlockSkeleton key={index} />
        ))}
      </div>
    </SkeletonSection>
  );
}
