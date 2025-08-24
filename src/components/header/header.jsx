import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await fetch("https://edcba7fc-c004-4b3b-bd3d-b81f09e98080-00-24crlninme5mr.sisko.replit.dev/api/logout", { // ✅ full URL likho local ke liye
      method: "POST",
      credentials: "include", // cookie bhejne ke liye zaroori
    });

    navigate("/login"); // logout hone ke baad redirect
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(to right, #facc15, #f97316, #ef4444)",
      }}
    >
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/recipes">
          <img
            src="https://e7.pngegg.com/pngimages/415/27/png-clipart-fruit-logo-food-recipe-business-seasoning-ingredients-natural-foods-dried-fruit.png"
            alt="Recipe Logo"
            width="50"
            height="50"
            className="d-inline-block align-top rounded-circle border border-white shadow-sm me-2"
          />
          <span className="fw-bold fs-3 text-white">Recipe Master</span>
        </Link>

        {/* Hamburger for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/recipes">
                Generate Recipe
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white fw-semibold" to="/recipes">
                All Recipes
              </Link>
            </li>
            <li className="nav-item ms-lg-3">
              <Link className="btn btn-light text-danger fw-bold" to="/">
                Sign Up
              </Link>
            </li>
            <li className="nav-item ms-lg-3">
              <button
                className="btn btn-light text-danger fw-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
