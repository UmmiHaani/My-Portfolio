import { Link } from "react-router";
import type { StackRecipe } from "../../data/tools";

interface ToolsStackRecipesProps {
  recipes: StackRecipe[];
}

export function ToolsStackRecipes({ recipes }: ToolsStackRecipesProps) {
  return (
    <section className="tools-recipes" aria-label="Stack recipes">
      <div className="tools-recipes__header">
        <p className="tools-recipes__label">Stack recipes</p>
        <p className="tools-recipes__hint re4-save-prompt">
          Combined loadouts that shipped real systems
        </p>
      </div>
      <ul className="tools-recipes__grid">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="tools-recipe">
            <div className="tools-recipe__bench">
              {recipe.inputs.map((input) => (
                <span key={input} className="tools-recipe__input">
                  {input}
                </span>
              ))}
              <span className="tools-recipe__plus" aria-hidden>
                →
              </span>
              <span className="tools-recipe__output">{recipe.output}</span>
            </div>
            <p className="tools-recipe__lore">{recipe.lore}</p>
            <div className="tools-recipe__links">
              {recipe.deployedOn.map((link) =>
                link.href.startsWith("/") ? (
                  <Link key={link.label} to={link.href} className="tools-recipe__link">
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="tools-recipe__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
