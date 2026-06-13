import type { ComponentType } from "react";
import { BlogsSkeleton } from "./BlogsSkeleton";
import { ProjectsSkeleton } from "./ProjectsSkeleton";
import { FeaturedProjectsSkeleton } from "./FeaturedProjectsSkeleton";
import { ToolsSkeleton } from "./ToolsSkeleton";

export const ROUTE_SKELETON: Record<string, ComponentType> = {
  "/projects": ProjectsSkeleton,
  "/blogs": BlogsSkeleton,
  "/tools": ToolsSkeleton,
};

export {
  BlogsSkeleton,
  ProjectsSkeleton,
  FeaturedProjectsSkeleton,
  ToolsSkeleton,
};
