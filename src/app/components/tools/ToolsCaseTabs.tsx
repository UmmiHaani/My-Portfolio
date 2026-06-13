import { useCallback, useEffect, useRef, useState } from "react";
import { playUiClickSound } from "../../lib/re4Audio";
import { TOOLS_CASE_TABS } from "../../lib/toolsCaseTabs";

interface ToolsCaseTabsProps {
  sectionIds: string[];
}

function tabForSection(sectionId: string): string {
  const categoryId = sectionId.replace(/^tools-/, "");
  const tab = TOOLS_CASE_TABS.find((entry) =>
    entry.categoryIds.includes(categoryId),
  );
  return tab?.id ?? TOOLS_CASE_TABS[0].id;
}

export function ToolsCaseTabs({ sectionIds }: ToolsCaseTabsProps) {
  const [activeTab, setActiveTab] = useState(TOOLS_CASE_TABS[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current?.disconnect();

    const visible = new Map<string, number>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.intersectionRatio);
        }

        let bestId = sectionIds[0];
        let bestRatio = 0;

        for (const id of sectionIds) {
          const ratio = visible.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestRatio > 0) {
          setActiveTab(tabForSection(bestId));
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.15, 0.35, 0.55] },
    );

    for (const id of sectionIds) {
      const node = document.getElementById(id);
      if (node) observerRef.current.observe(node);
    }

    return () => observerRef.current?.disconnect();
  }, [sectionIds]);

  const scrollToTab = useCallback((tabId: string) => {
    const tab = TOOLS_CASE_TABS.find((entry) => entry.id === tabId);
    const targetId = tab?.categoryIds[0];
    if (!targetId) return;

    playUiClickSound();
    setActiveTab(tabId);
    document
      .getElementById(`tools-${targetId}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <nav className="tools-case-tabs" aria-label="Attaché case categories">
      <p className="tools-case-tabs__label">Case file</p>
      <div className="tools-case-tabs__list" role="tablist">
        {TOOLS_CASE_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={[
                "tools-case-tabs__tab",
                isActive ? "tools-case-tabs__tab--active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => scrollToTab(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
