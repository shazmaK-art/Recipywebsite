import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRecipes() {
      try {
        setLoading(true);

        const response = await fetch(
          "https://dummyjson.com/recipes?limit=50"
        );

        if (!response.ok) {
          throw new Error("Unable to load recipes.");
        }

        const data = await response.json();
        setRecipes(data.recipes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  function toggleFavorite(recipe) {
    setFavorites((previous) =>
      previous.some((item) => item.id === recipe.id)
        ? previous.filter((item) => item.id !== recipe.id)
        : [...previous, recipe]
    );
  }

  return (
    <>
      <Navbar favoriteCount={favorites.length} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              recipes={recipes}
              loading={loading}
              error={error}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/recipes"
          element={
            <Recipes
              recipes={recipes}
              loading={loading}
              error={error}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/recipe/:id"
          element={
            <RecipeDetails
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}