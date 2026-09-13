import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import RecipeGrid from "../components/RecipeGrid";

const categories = [
  "All",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
];

export default function Recipes({
  recipes,
  loading,
  error,
  favorites,
  toggleFavorite,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const activeCategory = searchParams.get("meal") || "All";
  const perPage = 9;

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        activeCategory === "All" ||
        recipe.mealType?.some(
          (meal) =>
            meal.toLowerCase() === activeCategory.toLowerCase()
        );

      return matchesSearch && matchesCategory;
    });
  }, [recipes, search, activeCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecipes.length / perPage)
  );

  const currentRecipes = filteredRecipes.slice(
    (page - 1) * perPage,
    page * perPage
  );

  function chooseCategory(category) {
    setSearchParams(
      category === "All" ? {} : { meal: category }
    );
    setPage(1);
  }

  return (
    <main>
      {/* 1. Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">THE RECIPE COLLECTION</span>
          <h1>Find your next favorite.</h1>
          <p>
            Delicious ideas for breakfast, lunch, dinner,
            and everything in between.
          </p>
        </div>
      </section>

      {/* 2. Search */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="DISCOVER SOMETHING NEW"
            title="Explore our recipes"
          />

          <div className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search recipes by name..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>
      </section>

      {/* 3. Category filters */}
      <section className="container category-filters">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => chooseCategory(category)}
          >
            {category}
          </button>
        ))}
      </section>

      {/* 4. Recipe grid */}
      <section className="section">
        <div className="container">
          <div className="results-heading">
            <h2>
              {activeCategory === "All"
                ? "All recipes"
                : activeCategory}
            </h2>
            <span>{filteredRecipes.length} recipes found</span>
          </div>

          {loading ? (
            <p className="status-message">Loading recipes...</p>
          ) : error ? (
            <p className="status-message">{error}</p>
          ) : (
            <RecipeGrid
              recipes={currentRecipes}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}
        </div>
      </section>

      {/* 5. Pagination */}
      <section className="section">
        <div className="container pagination">
          <button
            className="filter-btn"
            disabled={page === 1}
            onClick={() => setPage((previous) => previous - 1)}
          >
            ← Previous
          </button>

          <span>
            Page {page} of {totalPages}
          </span>

          <button
            className="filter-btn"
            disabled={page >= totalPages}
            onClick={() => setPage((previous) => previous + 1)}
          >
            Next →
          </button>
        </div>
      </section>
    </main>
  );
}