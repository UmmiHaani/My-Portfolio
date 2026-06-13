export interface ToolsCaseTab {
  id: string;
  label: string;
  categoryIds: string[];
}

export const TOOLS_CASE_TABS: ToolsCaseTab[] = [
  { id: "special", label: "Special", categoryIds: ["ai-stack"] },
  { id: "firmware", label: "Firmware", categoryIds: ["languages"] },
  { id: "attachments", label: "Attachments", categoryIds: ["frameworks"] },
  {
    id: "field-kit",
    label: "Field kit",
    categoryIds: ["platforms", "infrastructure", "other"],
  },
];

export function getCaseTabForCategory(categoryId: string): string {
  return (
    TOOLS_CASE_TABS.find((tab) => tab.categoryIds.includes(categoryId))?.id ??
    "field-kit"
  );
}

export function getMinSlotCount(itemCount: number, columns = 4): number {
  const rows = Math.max(2, Math.ceil(itemCount / columns));
  return rows * columns;
}
