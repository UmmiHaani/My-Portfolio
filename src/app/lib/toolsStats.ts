import { certifications, toolCategories } from "../data/tools";

export interface ToolsHudStats {
  languages: number;
  platforms: number;
  aiSystems: number;
  certifications: number;
  totalTools: number;
}

export function computeToolsHudStats(): ToolsHudStats {
  const byId = (id: string) =>
    toolCategories.find((category) => category.id === id)?.items.length ?? 0;

  const totalTools = toolCategories.reduce(
    (sum, category) => sum + category.items.length,
    0,
  );

  return {
    languages: byId("languages"),
    platforms: byId("platforms"),
    aiSystems: byId("ai-stack"),
    certifications: certifications.length,
    totalTools,
  };
}
