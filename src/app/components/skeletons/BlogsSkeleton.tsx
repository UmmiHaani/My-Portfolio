import { Skeleton } from "../ui/skeleton";
import { SkeletonHeader, SkeletonSection, skeletonClass } from "./SkeletonSection";

function BlogCardSkeleton() {
  return (
    <div className="rounded-lg border border-[var(--pf-border)] bg-[var(--pf-surface)] p-5">
      <Skeleton className={`mb-3 h-5 w-24 rounded-full ${skeletonClass}`} />
      <Skeleton className={`mb-3 h-6 w-3/4 ${skeletonClass}`} />
      <Skeleton className={`mb-2 h-4 w-full ${skeletonClass}`} />
      <Skeleton className={`mb-2 h-4 w-full ${skeletonClass}`} />
      <Skeleton className={`mb-4 h-4 w-2/3 ${skeletonClass}`} />
      <Skeleton className={`h-4 w-20 ${skeletonClass}`} />
    </div>
  );
}

export function BlogsSkeleton() {
  return (
    <SkeletonSection>
      <SkeletonHeader />
      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <BlogCardSkeleton key={index} />
        ))}
      </div>
    </SkeletonSection>
  );
}
