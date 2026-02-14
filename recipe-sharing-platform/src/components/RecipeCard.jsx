import React from "react";

const RecipeCard = ({ title, description, image }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 text-gray-800">
          {title}
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          {description}
        </p>

        <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
