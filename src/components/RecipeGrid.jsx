import RecipeCard from "./RecipeCard";

export default function RecipeGrid({
  recipes,
  favorites,
  toggleFavorite,
}) {
  if (!recipes.length) {
    return (
      <div className="empty-state">
        <span>🍽️</span>
        <h3>No recipes found</h3>
        <p>Try another search or explore more recipes.</p>
      </div>
    );
  }

  return (
    <div className="recipe-grid">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.some(
            (item) => item.id === recipe.id
          )}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}