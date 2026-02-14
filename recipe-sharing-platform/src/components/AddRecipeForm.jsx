import React, { useState } from "react";

const AddRecipeForm = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!ingredients.trim()) newErrors.ingredients = "Ingredients are required";
    if (!steps.trim()) newErrors.steps = "Steps are required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    // Format recipe
    const newRecipe = {
      title,
      ingredients: ingredients.split(",").map((item) => item.trim()),
      steps: steps.split("\n").map((item) => item.trim()),
    };

    console.log("New Recipe Submitted:", newRecipe);

    // Reset form
    setTitle("");
    setIngredients("");
    setSteps("");
    setErrors({});
    alert("Recipe added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Add a New Recipe</h1>

        {/* Title */}
        <label className="block mb-2 font-semibold">Recipe Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter recipe title"
        />
        {errors.title && <p className="text-red-500 mb-2">{errors.title}</p>}

        {/* Ingredients */}
        <label className="block mb-2 font-semibold">Ingredients (comma-separated)</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className={`w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.ingredients ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., 2 eggs, 1 cup flour, 1/2 tsp salt"
        />
        {errors.ingredients && <p className="text-red-500 mb-2">{errors.ingredients}</p>}

        {/* Steps */}
        <label className="block mb-2 font-semibold">Preparation Steps (one per line)</label>
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className={`w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            errors.steps ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Step 1: ...&#10;Step 2: ..."
        />
        {errors.steps && <p className="text-red-500 mb-4">{errors.steps}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipeForm;
