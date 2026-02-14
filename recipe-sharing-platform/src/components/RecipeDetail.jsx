import React from "react";
import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();

  const recipe = recipesData.find(
    (recipe) => recipe.id === parseInt(id)
  );

  if (!recipe) {
    return <h2 className="text-center mt-10">Recipe not found</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        <h1 className="text-3xl font-bold mb-4">
          {recipe.title}
        </h1>

        {/* Ingredients */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Ingredients
          </h2>
          <ul className="list-disc list-inside text-gray-700">
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Cooking Instructions
          </h2>
          <ol className="list-decimal list-inside text-gray-700">
            {recipe.instructions.map((step, index) => (
              <li key={index} className="mb-1">
                {step}
              </li>
            ))}
          </ol>
        </div>

        <Link
          to="/"
          className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
