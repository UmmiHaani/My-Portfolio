import React from "react";

type HighlightSweepTextProps = {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

function HighlightPointer() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden
      className="pf-highlight-sweep__pointer-icon"
    >
      <path
        d="M5 3v16l4.5-5 3.2 6.4 2.2-1.1-3.1-6.2H19L5 3z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HighlightSweepText({
  children,
  className = "",
  as: Tag = "span",
}: HighlightSweepTextProps) {
  return (
    <Tag className={["pf-highlight-sweep", className].filter(Boolean).join(" ")}>
      <span className="pf-highlight-sweep__inner">
        <span className="pf-highlight-sweep__marker" aria-hidden />
        <span className="pf-highlight-sweep__pointer" aria-hidden>
          <HighlightPointer />
        </span>
        <span className="pf-highlight-sweep__label">{children}</span>
      </span>
    </Tag>
  );
}
