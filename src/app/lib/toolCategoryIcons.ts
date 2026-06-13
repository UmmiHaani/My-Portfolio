import {
  Bot,
  Code2,
  Layers,
  Package,
  Server,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export const TOOL_CATEGORY_ICONS: Record<string, LucideIcon> = {
  "ai-stack": Bot,
  languages: Code2,
  frameworks: Layers,
  platforms: Terminal,
  infrastructure: Server,
  other: Package,
};

export function getToolCategoryIcon(categoryId: string): LucideIcon {
  return TOOL_CATEGORY_ICONS[categoryId] ?? Package;
}
