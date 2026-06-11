import { Skeleton } from "../ui/skeleton";
import { SkeletonHeader, SkeletonSection, skeletonClass } from "./SkeletonSection";

function ChannelCardSkeleton() {
  return (
    <div className="rounded-lg border border-[var(--pf-border)] bg-[var(--pf-surface)] p-4">
      <Skeleton className={`mb-3 h-9 w-9 rounded-md ${skeletonClass}`} />
      <Skeleton className={`mb-2 h-4 w-28 ${skeletonClass}`} />
      <Skeleton className={`h-3 w-36 ${skeletonClass}`} />
    </div>
  );
}

export function ConnectOptionsSkeleton() {
  return (
    <SkeletonSection>
      <SkeletonHeader />
      <div className="overflow-hidden rounded-xl border border-[var(--pf-border)] bg-[var(--pf-surface)] p-6 md:p-8">
        <div className="mb-6 space-y-3">
          <Skeleton className={`h-6 w-40 rounded-full ${skeletonClass}`} />
          <Skeleton className={`h-6 w-56 ${skeletonClass}`} />
          <Skeleton className={`h-4 w-72 ${skeletonClass}`} />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <ChannelCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </SkeletonSection>
  );
}
