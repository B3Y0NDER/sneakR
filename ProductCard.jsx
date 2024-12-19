import React from "react";

const ProductCard = ({ product }) => {
  const { Name, Descrption, Price, Brand, Image } = product;

  // URL de l'image (format "medium" par défaut)
  const imageUrl = Image?.formats?.medium?.url
    ? `http://localhost:1337${Image.formats.medium.url}`
    : "https://via.placeholder.com/750x536";

  // Texte de description
  const descriptionText = Descrption?.[0]?.children?.[0]?.text || "Pas de description disponible.";

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={Name}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Contenu */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{Name}</h3>
        <p className="text-gray-600 mt-2 text-sm">{descriptionText}</p>
        <div className="flex items-center justify-between mt-4">
          <p className="text-green-600 font-bold">{Price.toLocaleString()} €</p>
          <p className="text-gray-500 text-sm italic">Marque : {Brand}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
