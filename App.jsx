import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import WishlistPage from "../pages/WishlistPage";
import LoginPage from "../pages/LoginPage";
import Register from "./components/register";
import AdminPage from "../pages/AdminPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (loggedIn, admin) => {
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
      <Routes>
        {/* Route principale pour la page d'accueil */}
        <Route path="/" element={<HomePage />} />
        {/* Route pour la page des produits */}
        <Route path="/products" element={<ProductPage />} />
        {/* Route pour la wishlist */}
        <Route path="/wishlist" element={<WishlistPage />} />
        {/* Route pour la connexion */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        {/* Route pour l'inscription */}
        <Route path="/register" element={<Register />} />
        {/* Route pour l'admin */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
