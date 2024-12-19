import React from "react";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div className="hero">
      <img
        src="/images/hero.jpg"
        alt="Collection de Sneakers"
        className="hero-image"
      />
      <div className="hero-overlay">
        <h1>Découvrez notre collection</h1>
        <p>Les sneakers les plus exclusives et tendance, à portée de clic.</p>
        <Link to="/products" className="hero-button">
          Explorer Maintenant
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
