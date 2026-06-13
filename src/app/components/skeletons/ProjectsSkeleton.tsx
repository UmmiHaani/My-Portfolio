import { Skeleton } from "../ui/skeleton";
import { SkeletonHeader, SkeletonSection, skeletonClass } from "./SkeletonSection";

function TimelineRowSkeleton({ align }: { align: "left" | "right" }) {
  const card = (
    <div className="space-y-3 rounded border border-[var(--pf-border)] p-4">
      <div className="flex justify-between gap-3">
        <Skeleton className={`h-4 w-24 ${skeletonClass}`} />
        <Skeleton className={`h-6 w-20 rounded-full ${skeletonClass}`} />
      </div>
      <Skeleton className={`h-5 w-40 ${skeletonClass}`} />
      <Skeleton className={`h-4 w-28 ${skeletonClass}`} />
      <Skeleton className={`h-4 w-full ${skeletonClass}`} />
      <Skeleton className={`h-4 w-full ${skeletonClass}`} />
      <Skeleton className={`h-24 w-full ${skeletonClass}`} />
    </div>
  );

  const intel = (
    <div className="space-y-3">
      <Skeleton className={`h-10 w-full ${skeletonClass}`} />
      <Skeleton className={`h-36 w-full ${skeletonClass}`} />
      <Skeleton className={`h-24 w-full ${skeletonClass}`} />
      <Skeleton className={`h-8 w-32 ${skeletonClass}`} />
    </div>
  );

  return (
    <div className="grid grid-cols-[2.75rem_1fr] gap-4 md:grid-cols-[1fr_3.5rem_1fr] md:gap-8">
      <Skeleton className="col-start-1 row-start-1 h-11 w-11 rounded-full md:col-start-2 md:justify-self-center" />

      {align === "left" ? (
        <>
          <div className="col-start-2 row-start-1 md:col-start-1">{card}</div>
          <div className="col-span-2 col-start-1 row-start-2 pl-12 md:col-span-1 md:col-start-3 md:row-start-1 md:pl-0 md:pt-7">
            {intel}
          </div>
        </>
      ) : (
        <>
          <div className="col-span-2 col-start-1 row-start-2 pl-12 md:col-span-1 md:col-start-1 md:row-start-1 md:pl-0 md:pt-7">
            {intel}
          </div>
          <div className="col-start-2 row-start-1 md:col-start-3">{card}</div>
        </>
      )}
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <SkeletonSection>
      <SkeletonHeader />
      <div className="relative space-y-12">
        <Skeleton className={`absolute bottom-0 left-5 top-0 w-0.5 md:left-1/2 md:-translate-x-1/2 ${skeletonClass}`} />
        <TimelineRowSkeleton align="left" />
        <TimelineRowSkeleton align="right" />
        <TimelineRowSkeleton align="left" />
        <TimelineRowSkeleton align="right" />
      </div>
    </SkeletonSection>
  );
}
