import type { ReactNode } from "react";

interface ToolsLockerPanelProps {
  children: ReactNode;
}

export function ToolsLockerPanel({ children }: ToolsLockerPanelProps) {
  return (
    <div className="tools-panel">
      <div className="tools-panel__bg" aria-hidden />
      <div className="tools-panel__scanlines" aria-hidden />
      <img
        src="/re4-merchant.png"
        alt=""
        className="tools-panel__art"
        draggable={false}
        aria-hidden
      />
      <div className="tools-panel__content">{children}</div>
    </div>
  );
}
