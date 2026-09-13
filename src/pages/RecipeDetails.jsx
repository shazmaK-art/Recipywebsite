import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RecipeGrid from "../components/RecipeGrid";
import SectionTitle from "../components/SectionTitle";

export default function RecipeDetails({
  favorites,
  toggleFavorite,
}) {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://dummyjson.com/recipes/${id}`
        );

        if (!response.ok) {
          throw new Error("Recipe not found.");
        }

        const data = await response.json();
        setRecipe(data);

        const relatedResponse = await fetch(
          `https://dummyjson.com/recipes?limit=50`
        );

        const relatedData = await relatedResponse.json();

        setRelated(
          relatedData.recipes
            .filter(
              (item) =>
                item.id !== data.id &&
                item.cuisine === data.cuisine
            )
            .slice(0, 3)
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <main className="container loading-page">Loading recipe...</main>;
  }

  if (error || !recipe) {
    return (
      <main className="container loading-page">
        <h2>{error || "Recipe not found"}</h2>
        <Link to="/recipes" className="btn btn-dark">
          Browse recipes
        </Link>
      </main>
    );
  }

  const isFavorite = favorites.some(
    (item) => item.id === recipe.id
  );

  return (
    <main>
      {/* 1. Recipe hero */}
      <section className="section">
        <div className="container detail-hero">
          <div className="detail-image">
            <img src={recipe.image} alt={recipe.name} />
          </div>

          <div className="detail-content">
            <span className="eyebrow">{recipe.cuisine}</span>
            <h1>{recipe.name}</h1>
            <p>
              A delicious {recipe.cuisine.toLowerCase()} recipe
              for your next meal.
            </p>

            <div className="detail-stats">
              <div>
                <strong>★ {recipe.rating}</strong>
                <span>Rating</span>
              </div>
              <div>
                <strong>{recipe.cookTimeMinutes} min</strong>
                <span>Cooking time</span>
              </div>
              <div>
                <strong>{recipe.servings}</strong>
                <span>Servings</span>
              </div>
            </div>

            <button
              className="btn btn-dark"
              onClick={() => toggleFavorite(recipe)}
            >
              {isFavorite
                ? "♥ Remove Favorite"
                : "♡ Save Recipe"}
            </button>
          </div>
        </div>
      </section>

      {/* 2. Ingredients */}
      <section className="section section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="WHAT YOU NEED"
            title="Ingredients"
            description={`Everything you need to make ${recipe.name}.`}
          />

          <div className="ingredient-grid">
            {recipe.ingredients.map((ingredient, index) => (
              <div className="ingredient-item" key={index}>
                <span>✓</span>
                {ingredient}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Instructions */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="LET'S GET COOKING"
            title="Step-by-step instructions"
          />

          <div className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <div className="instruction-item" key={index}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{instruction}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Nutrition */}
      <section className="section section-soft">
        <div className="container">
          <SectionTitle
            eyebrow="GOOD TO KNOW"
            title="Nutrition information"
            description="Approximate nutritional values per serving."
          />

          <div className="nutrition-grid">
            <div>
              <strong>{recipe.caloriesPerServing}</strong>
              <span>Calories</span>
            </div>
            <div>
              <strong>{recipe.prepTimeMinutes} min</strong>
              <span>Prep time</span>
            </div>
            <div>
              <strong>{recipe.difficulty}</strong>
              <span>Difficulty</span>
            </div>
            <div>
              <strong>{recipe.reviewCount}</strong>
              <span>Reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Related recipes */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="KEEP EXPLORING"
            title="You might also love"
          />

          <RecipeGrid
            recipes={related}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </section>
    </main>
  );
}