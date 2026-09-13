import { useState } from "react";
import { Link } from "react-router-dom";
import SectionTitle from "../components/SectionTitle";
import RecipeGrid from "../components/RecipeGrid";

const categories = [
  { name: "Breakfast", icon: "🥞" },
  { name: "Lunch", icon: "🥗" },
  { name: "Dinner", icon: "🍝" },
  { name: "Dessert", icon: "🍰" },
];

export default function Home({
  recipes,
  loading,
  error,
  favorites,
  toggleFavorite,
}) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const popularRecipes = [...recipes]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <main>
      {/* 1. Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR DAILY DOSE OF DELICIOUS
            </span>

            <h1>
              Cooking made
              <br />
              <span>beautifully</span> simple.
            </h1>

            <p>
              Discover delicious recipes, explore new flavors,
              and make every meal a little more special.
            </p>

            <div className="hero-actions">
              <Link to="/recipes" className="btn btn-dark">
                Explore Recipes →
              </Link>
              <a href="#popular" className="text-link">
                Discover more ↓
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>1000+</strong>
                <span>Recipe ideas</span>
              </div>
              <div>
                <strong>Easy</strong>
                <span>Everyday cooking</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85"
              alt="Fresh colorful food on a table"
            />
            <div className="floating-note">
              <span>🍃</span>
              <div>
                <strong>Fresh & flavorful</strong>
                <small>Made for your kitchen</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="FIND YOUR FAVORITE"
            title="What are you craving?"
            description="Choose a category and discover your next favorite meal."
          />

          <div className="category-grid">
            {categories.map((category) => (
              <Link
                to={`/recipes?meal=${category.name}`}
                className="category-card"
                key={category.name}
              >
                <span>{category.icon}</span>
                <strong>{category.name}</strong>
                <small>Explore →</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular recipes */}
      <section className="section section-soft" id="popular">
        <div className="container">
          <div className="section-heading-row">
            <SectionTitle
              eyebrow="TRENDING NOW"
              title="Popular this week"
              description="Recipes that everyone is loving."
            />
            <Link to="/recipes" className="text-link">
              View all recipes →
            </Link>
          </div>

          {loading ? (
            <p className="status-message">Loading recipes...</p>
          ) : error ? (
            <p className="status-message">{error}</p>
          ) : (
            <RecipeGrid
              recipes={popularRecipes}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          )}
        </div>
      </section>

      {/* 4. Benefits */}
      <section className="section">
        <div className="container">
          <SectionTitle
            eyebrow="WHY FLAVORNEST?"
            title="A little inspiration goes a long way."
            description="Everything you need to make cooking more enjoyable."
          />

          <div className="benefits-grid">
            <div className="benefit-card">
              <span>🥕</span>
              <h3>Simple ingredients</h3>
              <p>
                Discover delicious meals made with everyday
                ingredients.
              </p>
            </div>

            <div className="benefit-card">
              <span>⏱️</span>
              <h3>Save your time</h3>
              <p>
                Find recipes with clear cooking times and
                easy-to-follow instructions.
              </p>
            </div>

            <div className="benefit-card">
              <span>❤️</span>
              <h3>Your favorites</h3>
              <p>
                Save recipes you love and build your own
                collection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Newsletter */}
      <section className="section">
        <div className="container">
          <div className="newsletter">
            <span className="eyebrow">A LITTLE KITCHEN INSPIRATION</span>
            <h2>Make something delicious.</h2>
            <p>
              Get fresh recipe inspiration delivered to your inbox.
            </p>

            <form
              className="newsletter-form"
              onSubmit={(event) => {
                event.preventDefault();
                setSubscribed(true);
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <button className="btn btn-dark" type="submit">
                Subscribe →
              </button>
            </form>

            {subscribed && (
              <p className="success-message">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}