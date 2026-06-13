import { computeToolsHudStats } from "../../lib/toolsStats";

export function ToolsHudStats() {
  const stats = computeToolsHudStats();

  const items = [
    { value: stats.languages, label: "languages" },
    { value: stats.platforms, label: "platforms" },
    { value: stats.aiSystems, label: "AI systems" },
    { value: stats.certifications, label: "cert" },
  ];

  return (
    <section className="tools-hud" aria-label="Tools inventory summary">
      <div className="tools-hud__badge">
        <span className="tools-hud__pulse" aria-hidden />
        Inventory scan
      </div>
      <div className="tools-hud__stats">
        {items.map((item, index) => (
          <span key={item.label} className="tools-hud__stat">
            <strong>{item.value}</strong> {item.label}
            {index < items.length - 1 ? (
              <span className="tools-hud__sep" aria-hidden>
                ·
              </span>
            ) : null}
          </span>
        ))}
      </div>
      <p className="tools-hud__total">
        <span className="tools-hud__total-label">Total loadout</span>
        <strong>{stats.totalTools}</strong> tools indexed
      </p>
    </section>
  );
}
