import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="../../logo2.jpg" alt="Logo" className="logo" />
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/products">Sneakers</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
        {isLoggedIn && role === "Admin" && (
          <li>
            <Link to="/admin">Espace Admin</Link>
          </li>
        )}
      </ul>
      <div className="navbar-actions">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="navbar-btn">
              Profil
            </Link>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
              className="navbar-btn"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-btn">
              Connexion
            </Link>
            <Link to="/register" className="navbar-btn">
              Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
