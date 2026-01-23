import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const recipes = useRecipeStore((state) => state.recipes);

  const listToShow = filteredRecipes.length > 0 || filteredRecipes.length !== recipes.length
    ? filteredRecipes
    : recipes;

  return (
    <div>
      <h2>Recipes</h2>

      {listToShow.length === 0 && <p>No recipes found.</p>}

      {listToShow.map((recipe) => (
        <div key={recipe.id}>
          <h3>
            <Link to={`/recipe/${recipe.id}`}>
              {recipe.title}
            </Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
