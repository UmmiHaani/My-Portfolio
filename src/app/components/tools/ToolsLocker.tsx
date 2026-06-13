import { toolCategories } from "../../data/tools";
import { ToolsCaseTabs } from "./ToolsCaseTabs";
import { ToolsLoadoutSection } from "./ToolsLoadoutSection";

const SECTION_IDS = toolCategories.map((category) => `tools-${category.id}`);

export function ToolsLocker() {
  return (
    <div className="tools-case">
      <ToolsCaseTabs sectionIds={SECTION_IDS} />

      <div className="tools-locker" aria-label="Technical loadout">
        <div className="tools-locker__case-rim" aria-hidden />

        {toolCategories.map((category, index) => (
          <ToolsLoadoutSection
            key={category.id}
            category={category}
            isLast={index === toolCategories.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
