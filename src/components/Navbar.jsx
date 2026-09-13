import { Link, NavLink } from "react-router-dom";

export default function Navbar({ favoriteCount }) {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          Flavor<span>Nest</span>.
        </Link>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/recipes">Recipes</NavLink>
          <NavLink to="/favorites">
            Favorites ({favoriteCount})
          </NavLink>
        </nav>

        <Link to="/recipes" className="btn btn-dark nav-cta">
          Explore Recipes →
        </Link>
      </div>
    </header>
  );
}