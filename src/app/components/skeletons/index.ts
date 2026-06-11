import type { ComponentType } from "react";
import { BlogsSkeleton } from "./BlogsSkeleton";
import { ConnectOptionsSkeleton } from "./ConnectOptionsSkeleton";
import { ExperienceSkeleton } from "./ExperienceSkeleton";
import { FeaturedProjectsSkeleton } from "./FeaturedProjectsSkeleton";
import { ToolsSkeleton } from "./ToolsSkeleton";

export const ROUTE_SKELETON: Record<string, ComponentType> = {
  "/experience": ExperienceSkeleton,
  "/projects": FeaturedProjectsSkeleton,
  "/blogs": BlogsSkeleton,
  "/contact": ConnectOptionsSkeleton,
  "/tools": ToolsSkeleton,
};

export {
  BlogsSkeleton,
  ConnectOptionsSkeleton,
  ExperienceSkeleton,
  FeaturedProjectsSkeleton,
  ToolsSkeleton,
};
