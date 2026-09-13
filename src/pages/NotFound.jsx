import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="not-found">
      <span>🍽️</span>
      <h1>404 — Recipe not found</h1>
      <p>Looks like this page isn't on our menu.</p>

      <Link to="/" className="btn btn-dark">
        Back to Home
      </Link>
    </main>
  );
}