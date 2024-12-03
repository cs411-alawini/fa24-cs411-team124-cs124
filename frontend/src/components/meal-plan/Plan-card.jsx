import React from 'react';

const PlanCard = ({ plan, onSelect, isSelected }) => (
  <div 
    className={`p-4 border rounded-lg cursor-pointer transition ${
      isSelected ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
    }`}
    onClick={() => onSelect(plan)}
  >
    <h3 className="font-medium text-lg">{`Plan for ${new Date(plan.date).toLocaleDateString()}`}</h3>
    <div className="mt-2 space-y-1">
      {plan.recipes.map((recipe, idx) => (
        <div key={idx} className="flex items-center text-sm text-gray-600">
          <span className="w-16 text-gray-500">{recipe.time}</span>
          <span>{recipe.title}</span>
        </div>
      ))}
    </div>
  </div>
);