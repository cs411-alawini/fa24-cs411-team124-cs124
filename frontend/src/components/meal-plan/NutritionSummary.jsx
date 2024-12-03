import React from 'react';

const NutritionSummary = ({ recipes }) => {
  const totalNutrition = recipes.reduce((acc, recipe) => ({
    calories: acc.calories + (recipe.nutrition?.calories || 0),
    protein: acc.protein + (recipe.nutrition?.protein || 0),
    carbs: acc.carbs + (recipe.nutrition?.carbohydrates || 0),
    fat: acc.fat + (recipe.nutrition?.fat || 0)
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-medium mb-3">Daily Nutrition Summary</h2>
      <div className="grid grid-cols-4 gap-4">
        <div>
          <div className="text-sm text-gray-600">Calories</div>
          <div className="font-medium">{Math.round(totalNutrition.calories)} kcal</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Protein</div>
          <div className="font-medium">{Math.round(totalNutrition.protein)}g</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Carbs</div>
          <div className="font-medium">{Math.round(totalNutrition.carbs)}g</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Fat</div>
          <div className="font-medium">{Math.round(totalNutrition.fat)}g</div>
        </div>
      </div>
    </div>
  );
};