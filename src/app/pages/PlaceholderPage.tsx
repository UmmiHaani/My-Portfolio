import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { ExperienceSkeleton, ROUTE_SKELETON } from "../components/skeletons";
import { SiteFooter } from "../components/SiteFooter";

const SKELETON_DURATION_MS = 600;

export function PlaceholderPage() {
  const { pathname } = useLocation();
  const [ready, setReady] = useState(false);

  const Skeleton = ROUTE_SKELETON[pathname] ?? ExperienceSkeleton;

  useEffect(() => {
    setReady(false);
    const timeoutId = window.setTimeout(() => setReady(true), SKELETON_DURATION_MS);
    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  if (!ready) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="min-h-[60vh] bg-[var(--pf-bg)] transition-colors duration-200" />
      <SiteFooter />
    </>
  );
}
