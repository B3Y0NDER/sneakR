import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from './ProductCard';

// Configuration de l'API
const API_URL = 'http://localhost:1337/api';

// Création du contexte pour la wishlist
export const WishlistContext = React.createContext();

// Composant de chargement
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
    <div className="relative w-32 h-32">
      <div className="w-full h-full border-8 border-gray-200 rounded-full animate-spin border-t-gray-800"></div>
    </div>
    <div className="mt-8 text-2xl text-gray-800 font-bold">
      SNKRS
    </div>
  </div>
);

// Composant de barre de recherche et filtres
const SearchAndFilters = ({ onSearch, onBrandFilter, onSort, products }) => {
  // Extraction des marques uniques
  const uniqueBrands = [...new Set(products.map(product => product.attributes?.Brand))].filter(Boolean);

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        {/* Barre de recherche */}
        <div className="relative flex-1 max-w-full md:max-w-md">
          <input
            type="text"
            placeholder="Rechercher une sneaker..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>

        {/* Filtres */}
        <div className="flex flex-row gap-4 w-full md:w-auto">
          {/* Filtre par marque */}
          <select
            onChange={(e) => onBrandFilter(e.target.value)}
            className="flex-1 md:flex-none px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes les marques</option>
            {uniqueBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          {/* Tri par prix */}
          <select
            onChange={(e) => onSort(e.target.value)}
            className="flex-1 md:flex-none px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Trier par prix</option>
            <option value="asc">Prix croissant</option>
            <option value="desc">Prix décroissant</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Composant principal de la page produits
const ProductPage = () => {
  // États
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // État de la wishlist avec persistance localStorage
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Sauvegarde de la wishlist dans localStorage
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Fonction pour gérer la wishlist
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const isInWishlist = prev.some(item => item.id === product.id);
      if (isInWishlist) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Récupération des produits
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/product?populate=*`);
        console.log('API Response:', response.data);
        setProducts(response.data.data || []);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Erreur de chargement: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrage des produits
  useEffect(() => {
    let result = [...products];

    // Filtre par recherche
    if (searchTerm) {
      result = result.filter(product => 
        product.attributes?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.attributes?.Brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.attributes?.Description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtre par marque
    if (selectedBrand) {
      result = result.filter(product => product.attributes?.Brand === selectedBrand);
    }

    // Tri par prix
    if (sortOrder) {
      result.sort((a, b) => {
        const priceA = a.attributes?.Price || 0;
        const priceB = b.attributes?.Price || 0;
        return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
      });
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedBrand, sortOrder, products]);

  // Affichage du loader
  if (loading) return <LoadingSpinner />;

  // Affichage des erreurs
  if (error) {
    return (
      <div className="text-center p-8 text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Réessayer
        </button>
      </div>
    );
  }

  // Rendu principal
  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <header className="py-6">
            <h1 className="text-4xl font-bold text-center text-gray-800">SNKRS</h1>
          </header>

          {/* Navigation */}
          <nav className="bg-gray-800 text-white p-4 rounded-lg mb-8">
            <ul className="flex justify-center space-x-8">
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Catalogue
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-gray-300 transition-colors flex items-center">
                  Wishlist
                  {wishlist.length > 0 && (
                    <span className="ml-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-gray-300 transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          {/* Filtres et recherche */}
          <SearchAndFilters 
            onSearch={setSearchTerm}
            onBrandFilter={setSelectedBrand}
            onSort={setSortOrder}
            products={products}
          />

          {/* Liste des produits */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">Aucun produit trouvé</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </WishlistContext.Provider>
  );
};

export default ProductPage;