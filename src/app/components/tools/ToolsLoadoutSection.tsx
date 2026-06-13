import { Link } from "react-router";
import type { ToolCategory } from "../../data/tools";
import { getToolCategoryIcon } from "../../lib/toolCategoryIcons";
import { getMinSlotCount } from "../../lib/toolsCaseTabs";
import { ToolsExamineBar, useExamineFooter } from "./ToolsExamineFooter";
import { ToolsDocumentStamp } from "./ToolsDocumentStamp";

interface ToolsLoadoutSectionProps {
  category: ToolCategory;
  isLast: boolean;
}

export function ToolsLoadoutSection({ category, isLast }: ToolsLoadoutSectionProps) {
  const notedItems = category.items.filter((item) => item.note);
  const Icon = getToolCategoryIcon(category.id);
  const slotCount = getMinSlotCount(category.items.length);
  const emptySlotCount = slotCount - category.items.length;
  const { hoveredItem, bindSlot, clearExamine } = useExamineFooter();

  return (
    <article
      id={`tools-${category.id}`}
      className={[
        "tools-section",
        category.featured ? "tools-section--featured" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="tools-section__node-wrap">
        <span
          className={[
            "tools-section__index",
            category.featured ? "tools-section__index--active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden
        >
          {category.index}
        </span>
        {!isLast ? <span className="tools-section__stem" aria-hidden /> : null}
        <span className="tools-section__connector" aria-hidden />
      </div>

      <div className="tools-section__content">
        <header className="tools-section__header">
          <div className="tools-section__icon-wrap" aria-hidden>
            <Icon className="tools-section__icon" strokeWidth={1.5} />
          </div>
          <div>
            <p className="tools-section__re4-label">{category.re4Label}</p>
            <h2 className="tools-section__title">{category.title}</h2>
            <p className="tools-section__codename">{category.codename}</p>
            {category.summary ? (
              <p className="tools-section__summary">{category.summary}</p>
            ) : null}
          </div>
        </header>

        <div className="tools-section__panel tools-section__panel--case">
          {category.stamp === "Production" ? (
            <ToolsDocumentStamp label="Production" variant="production" />
          ) : null}
          <div className="tools-case-grid__texture" aria-hidden />
          <p className="exp-intel__label tools-case-grid__label">Item box</p>

          <ul
            className="tools-case-grid"
            aria-label={`${category.title} loadout`}
            onMouseLeave={clearExamine}
          >
            {category.items.map((item) => (
              <li
                key={item.name}
                className={[
                  "tools-case-slot",
                  "tools-case-slot--filled",
                  item.tag ? `tools-chip--${item.tag.toLowerCase()}` : "",
                  hoveredItem?.name === item.name ? "tools-case-slot--examined" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                data-note={item.note ?? undefined}
                tabIndex={0}
                {...bindSlot(item)}
              >
                <span className="tools-case-slot__name">{item.name}</span>
                {item.tag ? <span className="tools-chip__tag">{item.tag}</span> : null}
              </li>
            ))}
            {Array.from({ length: emptySlotCount }).map((_, index) => (
              <li
                key={`empty-${index}`}
                className="tools-case-slot tools-case-slot--empty"
                aria-hidden
              />
            ))}
          </ul>

          {category.deployedOn && category.deployedOn.length > 0 ? (
            <div className="tools-section__deploy">
              <p className="exp-intel__label">Deployed on</p>
              <div className="tools-section__deploy-links">
                {category.deployedOn.map((target) =>
                  target.href.startsWith("/") ? (
                    <Link key={target.label} to={target.href} className="exp-intel__link">
                      {target.label}
                    </Link>
                  ) : (
                    <a
                      key={target.label}
                      href={target.href}
                      className="exp-intel__link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {target.label}
                    </a>
                  ),
                )}
              </div>
            </div>
          ) : null}

          {notedItems.length > 0 ? (
            <div className="tools-section__notes">
              <p className="exp-intel__label">Field notes</p>
              <ul className="exp-intel__achievement-list">
                {notedItems.map((item) => (
                  <li key={item.name}>
                    <strong>{item.name}</strong>
                    {item.note ? ` — ${item.note}` : ""}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {category.link ? (
            category.link.href.startsWith("/") ? (
              <Link to={category.link.href} className="exp-intel__link">
                {category.link.label}
              </Link>
            ) : (
              <a
                href={category.link.href}
                className="exp-intel__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {category.link.label}
              </a>
            )
          ) : null}

          <ToolsExamineBar category={category} hoveredItem={hoveredItem} />
        </div>
      </div>
    </article>
  );
}
