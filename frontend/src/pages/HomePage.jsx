import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Calendar } from 'lucide-react';
import { api } from '../services/api';
import RecipeDisplay from '../components/RecipeDisplay';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error);
    console.error('Error info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 p-4">
          <h2>Something went wrong.</h2>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.toString()}</pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function HomePage() {
  console.log('HomePage component starting render');

  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('HomePage useEffect running');
    
    const fetchRecipes = async () => {
      console.log('Fetching recipes started');
      try {
        setLoading(true);
        const data = await api.getRecipes();
        console.log('Recipes data received:', data);
        setRecipes(data.recipes || []);
      } catch (err) {
        console.error('Error in fetchRecipes:', err);
        setError(err.message || 'Failed to load recipes');
      } finally {
        setLoading(false);
        console.log('Fetch recipes completed');
      }
    };

    fetchRecipes();
    
    return () => {
      console.log('HomePage cleanup');
    };
  }, []);

  console.log('HomePage render state:', { loading, error, recipesCount: recipes.length });

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 p-8">
        {console.log('HomePage rendering content')}
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">MealMaker</h1>
          
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={() => {
                console.log('Navigating to settings');
                navigate('/settings');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Settings size={20} />
              User Settings
            </button>
            
            <button
              onClick={() => {
                console.log('Navigating to menu');
                navigate('/menu');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Calendar size={20} />
              Menu Selection
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Available Recipes</h2>
            
            {loading && (
              <div className="text-center py-4">Loading recipes...</div>
            )}
            
            {error && (
              <div className="text-red-600 text-center py-4">{error}</div>
            )}
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe, index) => {
                console.log('Rendering recipe:', recipe);
                return (
                  <ErrorBoundary key={index}>
                    <RecipeDisplay recipe={recipe} />
                  </ErrorBoundary>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}