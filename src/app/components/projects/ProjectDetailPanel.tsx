import type { ReactNode } from "react";
import type { TimelineMilestone } from "../../data/projects";

interface ProjectDetailPanelProps {
  milestone: TimelineMilestone;
}

function IntelBlock({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="exp-intel__block">
      <p className="exp-intel__label">{label}</p>
      <div className="exp-intel__body">{children}</div>
    </div>
  );
}

export function ProjectDetailPanel({ milestone }: ProjectDetailPanelProps) {
  const isExternal =
    milestone.link?.href.startsWith("http") ?? false;

  return (
    <aside className="exp-intel" aria-label={`Intel briefing for ${milestone.org}`}>
      {milestone.quote ? (
        <blockquote className="exp-intel__quote">
          <span className="exp-intel__quote-mark" aria-hidden>
            //
          </span>
          {milestone.quote}
        </blockquote>
      ) : null}

      <div className="exp-intel__panel">
        <IntelBlock label="Objective">
          <p className="exp-intel__text">{milestone.intel.objective}</p>
        </IntelBlock>

        <IntelBlock label="Outcome">
          <p className="exp-intel__text">{milestone.intel.outcome}</p>
        </IntelBlock>

        <IntelBlock label="Loadout">
          <ul className="exp-intel__loadout">
            {milestone.intel.loadout.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </IntelBlock>
      </div>

      {milestone.achievements.length > 0 ? (
        <div className="exp-intel__achievements">
          <p className="exp-intel__label">Field notes</p>
          <ul className="exp-intel__achievement-list">
            {milestone.achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {milestone.link ? (
        <a
          href={milestone.link.href}
          className="exp-intel__link"
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {milestone.link.label}
        </a>
      ) : null}
    </aside>
  );
}
