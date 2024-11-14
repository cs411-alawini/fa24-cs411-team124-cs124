import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Calendar } from 'lucide-react';

export default function HomePage() {
  console.log('HomePage rendering'); // Debug log

  const navigate = useNavigate();
  
  useEffect(() => {
    console.log('HomePage mounted'); // Debug log
  }, []);

  const mockWeeklyPlan = [
    { day: 'Monday', meals: ['Grilled Chicken Salad', 'Pasta Primavera'] },
    { day: 'Tuesday', meals: ['Salmon with Rice', 'Vegetable Stir Fry'] },
    { day: 'Wednesday', meals: ['Quinoa Bowl', 'Fish Tacos'] },
    { day: 'Thursday', meals: ['Greek Salad', 'Chicken Curry'] },
    { day: 'Friday', meals: ['Buddha Bowl', 'Pizza Night'] }
  ];

  // Wrap navigate calls in try-catch
  const handleNavigate = (path) => {
    try {
      navigate(path);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  try {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">MealMaker</h1>
          
          {/* Navigation Buttons */}
          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={() => handleNavigate('/settings')}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span>User Settings</span>
            </button>
            
            <button
              onClick={() => handleNavigate('/menu')}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>Menu Selection</span>
            </button>
          </div>

          {/* Weekly Plan Display */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">This Week's Meal Plan</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mockWeeklyPlan.map((day, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg text-gray-800">{day.day}</h3>
                  <ul className="mt-2 space-y-1">
                    {day.meals.map((meal, mealIndex) => (
                      <li key={mealIndex} className="text-gray-600">
                        • {meal}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-700">Weekly Budget</h3>
              <p className="text-2xl font-bold text-green-600">$150</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-700">Meals Planned</h3>
              <p className="text-2xl font-bold text-blue-600">10/14</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-gray-700">Avg. Calories/Day</h3>
              <p className="text-2xl font-bold text-purple-600">2,100</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering HomePage:', error);
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-4xl font-bold text-center text-red-600">
          Something went wrong
        </h1>
        <pre className="mt-4 p-4 bg-red-100 rounded">
          {error.message}
        </pre>
      </div>
    );
  }
}