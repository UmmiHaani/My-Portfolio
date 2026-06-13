import type { ComponentType } from "react";
import { BlogsSkeleton } from "./BlogsSkeleton";
import { ExperienceSkeleton } from "./ExperienceSkeleton";
import { FeaturedProjectsSkeleton } from "./FeaturedProjectsSkeleton";
import { ToolsSkeleton } from "./ToolsSkeleton";

export const ROUTE_SKELETON: Record<string, ComponentType> = {
  "/projects": ExperienceSkeleton,
  "/blogs": BlogsSkeleton,
  "/tools": ToolsSkeleton,
};

export {
  BlogsSkeleton,
  ExperienceSkeleton,
  FeaturedProjectsSkeleton,
  ToolsSkeleton,
};
