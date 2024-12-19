import React, { useEffect, useState } from "react";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");
      const userId = 1; // Remplace par un ID dynamique si nécessaire

      try {
        const response = await fetch(`http://localhost:3000/wishlist/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la wishlist.");
        }

        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error("Erreur :", error.message);
      }
    };

    fetchWishlist();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Ma Wishlist</h1>
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="border p-4 rounded shadow">
              <img src={item.image_url} alt={item.name} className="w-full h-48 object-cover rounded" />
              <h2 className="text-lg font-semibold mt-2">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-green-600 font-bold">{item.price}€</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Votre wishlist est vide.</p>
      )}
    </div>
  );
}

export default WishlistPage;
