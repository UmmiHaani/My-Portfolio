import React from "react";

type Re4TitleTextProps = {
  className?: string;
};

/** Game-style title: red R in Resident, red E in Evil. */
export function Re4TitleText({ className = "" }: Re4TitleTextProps) {
  return (
    <span className={["re4-title-text", className].filter(Boolean).join(" ")}>
      <span className="text-[var(--pf-re-red)]">R</span>
      <span className="text-[var(--pf-text)]">esident </span>
      <span className="text-[var(--pf-re-red)]">E</span>
      <span className="text-[var(--pf-text)]">vil 4</span>
    </span>
  );
}
