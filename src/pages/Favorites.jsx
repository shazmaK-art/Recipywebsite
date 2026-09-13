import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import RecipeGrid from "../components/RecipeGrid";

export default function Favorites({
  favorites,
  toggleFavorite,
}) {
  return (
    <main>
      {/* 1. Banner */}
      <section className="page-banner">
        <div className="container">
          <span className="eyebrow">YOUR PERSONAL COLLECTION</span>
          <h1>Recipes worth saving.</h1>
          <p>
            All your favorite dishes, together in one place.
          </p>
        </div>
      </section>

      {/* 2. Collection overview */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="YOUR COLLECTION"
            title="Your saved recipes"
            description={`${favorites.length} recipes saved for later.`}
          />

          <div className="collection-summary">
            <span>❤️</span>
            <div>
              <strong>{favorites.length} favorites</strong>
              <p>Your next delicious meal is waiting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Saved recipe grid */}
      <section className="section section-soft">
        <div className="container">
          <RecipeGrid
            recipes={favorites}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </section>

      {/* 4. Cooking tips */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="A LITTLE KITCHEN WISDOM"
            title="Make your cooking easier"
          />

          <div className="benefits-grid">
            <div className="benefit-card">
              <span>📝</span>
              <h3>Plan ahead</h3>
              <p>Choose your recipes before grocery shopping.</p>
            </div>

            <div className="benefit-card">
              <span>🥬</span>
              <h3>Prep ingredients</h3>
              <p>Wash and prepare ingredients before cooking.</p>
            </div>

            <div className="benefit-card">
              <span>👨‍🍳</span>
              <h3>Enjoy the process</h3>
              <p>Take your time and have fun in the kitchen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Discovery CTA */}
      <section className="section">
        <div className="container">
          <div className="newsletter">
            <span className="eyebrow">MORE FLAVOR AWAITS</span>
            <h2>Ready to discover something new?</h2>
            <p>
              Explore our collection and find your next
              favorite recipe.
            </p>

            <Link to="/recipes" className="btn btn-dark">
              Discover Recipes →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}