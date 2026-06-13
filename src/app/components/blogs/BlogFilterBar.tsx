import type { BlogCategory } from "../../data/blogs";
import { BLOG_FILTERS } from "../../data/blogs";

interface BlogFilterBarProps {
  active: "all" | BlogCategory;
  onChange: (id: "all" | BlogCategory) => void;
}

export function BlogFilterBar({ active, onChange }: BlogFilterBarProps) {
  return (
    <div className="blog-filters" role="tablist" aria-label="Filter transmission log">
      {BLOG_FILTERS.map(({ id, label }) => {
        const isActive = active === id;

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={[
              "blog-filters__chip",
              isActive ? "blog-filters__chip--active" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onChange(id)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
