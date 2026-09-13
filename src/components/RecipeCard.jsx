import { Link } from "react-router-dom";

export default function RecipeCard({
  recipe,
  isFavorite,
  toggleFavorite,
}) {
  return (
    <article className="recipe-card">
      <div className="recipe-image">
        <img src={recipe.image} alt={recipe.name} />

        <button
          className={`favorite-btn ${
            isFavorite ? "active" : ""
          }`}
          onClick={() => toggleFavorite(recipe)}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {isFavorite ? "♥" : "♡"}
        </button>

        <span className="image-tag">
          {recipe.cuisine}
        </span>
      </div>

      <div className="recipe-info">
        <div className="recipe-meta">
          <span>★ {recipe.rating}</span>
          <span>{recipe.cookTimeMinutes} min</span>
        </div>

        <h3>{recipe.name}</h3>

        <p>
          {recipe.mealType?.join(" • ") || "Delicious recipe"}
        </p>

        <Link
          to={`/recipe/${recipe.id}`}
          className="recipe-link"
        >
          View Recipe →
        </Link>
      </div>
    </article>
  );
}