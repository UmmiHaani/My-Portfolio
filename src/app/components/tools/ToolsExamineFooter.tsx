import { useCallback, useState } from "react";
import type { ToolCategory, ToolItem } from "../../data/tools";

function formatExamineLine(item: ToolItem): string {
  const parts = [item.name];
  if (item.tag) parts.push(item.tag);
  if (item.note) parts.push(item.note);
  return parts.join(" · ");
}

export function useExamineFooter() {
  const [hoveredItem, setHoveredItem] = useState<ToolItem | null>(null);

  const bindSlot = useCallback(
    (item: ToolItem) => ({
      onMouseEnter: () => setHoveredItem(item),
      onFocus: () => setHoveredItem(item),
      onMouseLeave: () => setHoveredItem(null),
      onBlur: () => setHoveredItem(null),
    }),
    [],
  );

  const clearExamine = useCallback(() => setHoveredItem(null), []);

  return { hoveredItem, bindSlot, clearExamine };
}

interface ToolsExamineBarProps {
  category: ToolCategory;
  hoveredItem: ToolItem | null;
}

export function ToolsExamineBar({ category, hoveredItem }: ToolsExamineBarProps) {
  const isExamined = Boolean(hoveredItem);
  const detail = hoveredItem
    ? formatExamineLine(hoveredItem)
    : `${category.items.length} items indexed · ${category.re4Label}`;

  return (
    <footer className="tools-examine-footer" aria-live="polite">
      <span
        className={[
          "tools-examine-footer__action",
          isExamined ? "tools-examine-footer__action--active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {isExamined ? "Examined" : "Examine"}
      </span>
      <p className="tools-examine-footer__detail re4-save-prompt">{detail}</p>
      <p className="tools-examine-footer__keys re4-save-prompt-keys">
        <kbd className="re4-prompt-key">Hover</kbd> Inspect slot
      </p>
    </footer>
  );
}
