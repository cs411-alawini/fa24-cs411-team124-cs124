import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Calendar } from 'lucide-react';
import { api } from '../services/api';

export default function HomePage() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await api.getRecipes();
        setRecipes(data.recipes);
      } catch (err) {
        setError('Failed to load recipes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">MealMaker</h1>
        
        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => navigate('/settings')}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Settings size={20} />
            User Settings
          </button>
          
          <button
            onClick={() => navigate('/menu')}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Calendar size={20} />
            Menu Selection
          </button>
        </div>

        {/* Recipes Display */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Available Recipes</h2>
          
          {loading && (
            <div className="text-center py-4">
              <p>Loading recipes...</p>
            </div>
          )}
          
          {error && (
            <div className="text-center py-4 text-red-600">
              <p>{error}</p>
            </div>
          )}
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg text-gray-800">{recipe.title}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold text-gray-700">Total Recipes</h3>
            <p className="text-2xl font-bold text-green-600">{recipes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}