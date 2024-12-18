import React, { useEffect } from 'react';

export default function RecipeDisplay({ recipe }) {
  useEffect(() => {
    console.log('RecipeDisplay mounted with recipe:', recipe);
  }, [recipe]);

  console.log('RecipeDisplay rendering with recipe:', recipe);

  return (
    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg text-gray-800">
        {recipe.title || recipe.name || 'Untitled Recipe'}
      </h3>
      {recipe.calories && (
        <p className="text-sm text-gray-500 mt-1">
          Calories: {recipe.calories}
        </p>
      )}
    </div>
  );
}