import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <Link to="/" className="logo">
            Flavor<span>Nest</span>.
          </Link>
          <p>Good food. Simple recipes. Happy moments.</p>
        </div>

        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/recipes">Recipes</Link>
          <Link to="/favorites">Favorites</Link>
        </div>

        <p className="copyright">
          © 2026 FlavorNest. Made with love.
        </p>
      </div>
    </footer>
  );
}