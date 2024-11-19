import React from 'react';

export default function RecipeDisplay({ recipe }) {
  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg text-gray-800">
        {recipe.title || recipe.name || 'Untitled Recipe'}
      </h3>
      {recipe.description && (
        <p className="text-gray-600 mt-2">{recipe.description}</p>
      )}
      {recipe.ingredients && (
        <p className="text-sm text-gray-500 mt-1">
          Ingredients: {recipe.ingredients}
        </p>
      )}
      {/* Add more fields as they become available */}
    </div>
  );
}

// Update the relevant section in HomePage.jsx
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {recipes.map((recipe, index) => (
    <RecipeDisplay key={index} recipe={recipe} />
  ))}
</div>