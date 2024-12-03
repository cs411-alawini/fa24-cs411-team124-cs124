import React, { useState } from 'react';

const RecipeSelector = ({ onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Recipe</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full p-2 border rounded mb-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="max-h-96 overflow-y-auto">
          {recipes.map(recipe => (
            <div
              key={recipe.id}
              className="p-3 border-b hover:bg-gray-50 cursor-pointer"
              onClick={() => onSelect(recipe)}
            >
              <h3 className="font-medium">{recipe.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};