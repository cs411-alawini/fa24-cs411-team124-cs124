import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

export default function MealPlanPage() {
  const navigate = useNavigate();
  const { userId } = useAuth();
  
  const [mealPlans, setMealPlans] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedMealTime, setSelectedMealTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [weeklyNutrition, setWeeklyNutrition] = useState({
    calories: 0,
    protein: 0,
    carbohydrates: 0,
    fat: 0,
    sugar: 0
  });

  useEffect(() => {
    if (!userId) {
      navigate('/login');
      return;
    }
    loadMealPlans();
  }, [userId, navigate]);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const data = await api.getAvailableRecipes();
      setRecipes(data.recipes);
    } catch (err) {
      console.error('Failed to load recipes:', err);
      setError('Failed to load recipes');
    }
  };

  const loadMealPlans = async () => {
    try {
      setLoading(true);
      const data = await api.getMealPlans(userId);
      setMealPlans(data.meal_plans);
      await calculateWeeklyNutrition(data.meal_plans);
    } catch (err) {
      setError('Failed to load meal plans');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateWeeklyNutrition = async (plans) => {
    try {
      const nutritionPromises = plans.map(plan => 
        api.calculateMealPlanNutrition(plan.id)
      );
      
      const nutritionData = await Promise.all(nutritionPromises);
      
      const weekTotal = nutritionData.reduce((acc, curr) => ({
        calories: acc.calories + curr.total_nutrition.calories,
        protein: acc.protein + curr.total_nutrition.protein,
        carbohydrates: acc.carbohydrates + curr.total_nutrition.carbohydrates,
        fat: acc.fat + curr.total_nutrition.fat,
        sugar: acc.sugar + curr.total_nutrition.sugar
      }), {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        sugar: 0
      });
      
      setWeeklyNutrition(weekTotal);
    } catch (err) {
      console.error('Failed to calculate nutrition:', err);
      setError('Failed to calculate nutrition');
    }
  };

  const handleAddMeal = async (recipe, day, mealTime) => {
    try {
      const date = new Date();
      date.setDate(date.getDate() + getDayOffset(day));

      await api.createMealPlan({
        user_id: userId,
        recipe_id: recipe.id,
        date: date.toISOString().split('T')[0],
        time: mealTime
      });

      await loadMealPlans();
      setSelectedRecipe(null);
      setSelectedDay(null);
      setSelectedMealTime(null);
    } catch (err) {
      setError('Failed to add meal to plan');
      console.error(err);
    }
  };

  const handleDeleteMeal = async (planId) => {
    try {
      await api.deleteMealPlan(planId);
      await loadMealPlans();
    } catch (err) {
      setError('Failed to delete meal');
      console.error(err);
    }
  };

  const getDayOffset = (day) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();
    const targetDay = days.indexOf(day);
    let offset = targetDay - today;
    if (offset < 0) offset += 7;
    return offset;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading meal plans...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Weekly Meal Planner</h1>
          <div className="space-x-4">
            <button
              onClick={loadMealPlans}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Refresh
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Back to Home
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Weekly Calendar Grid */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-7 gap-4">
            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <div key={day} className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">{day}</h3>
                <div className="space-y-2">
                  {['Breakfast', 'Lunch', 'Dinner'].map((mealTime) => (
                    <div key={mealTime} className="space-y-1">
                      {mealPlans
                        .filter(plan => new Date(plan.date).toLocaleDateString('en-US', { weekday: 'long' }) === day && plan.time === mealTime)
                        .map((plan) => (
                          <div 
                            key={plan.id} 
                            className="bg-blue-50 p-2 rounded-lg text-sm"
                          >
                            <div className="flex justify-between items-center">
                              <span>{plan.time}: {plan.title}</span>
                              <button
                                onClick={() => handleDeleteMeal(plan.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                ×
                              </button>
                            </div>
                            
                          </div>
                        ))}
                      <button
                        onClick={() => { setSelectedDay(day); setSelectedMealTime(mealTime); }}
                        className="w-full mt-2 px-2 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded"
                      >
                        + Add/Swap {mealTime}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recipe Selection Modal */}
        {selectedDay && selectedMealTime && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add {selectedMealTime} for {selectedDay}</h2>
                <button
                  onClick={() => { setSelectedDay(null); setSelectedMealTime(null); }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {recipes.map(recipe => (
                  <button
                    key={recipe.id}
                    onClick={() => handleAddMeal(recipe, selectedDay, selectedMealTime)}
                    className="w-full p-2 text-left hover:bg-gray-50 rounded flex justify-between items-center"
                  >
                    <span>{recipe.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Nutrition Summary */}
        <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Weekly Nutrition Summary</h2>
          <div className="grid grid-cols-5 gap-4">
            <div>
              <p className="text-gray-600">Total Calories: {Math.round(weeklyNutrition.calories)}C</p>
            </div>
            <div>
              <p className="text-gray-600">Protein: {Math.round(weeklyNutrition.protein)}g</p>
            </div>
            <div>
              <p className="text-gray-600">Carbs: {Math.round(weeklyNutrition.carbohydrates)}g</p>
            </div>
            <div>
              <p className="text-gray-600">Fat: {Math.round(weeklyNutrition.fat)}g</p>
            </div>
            <div>
              <p className="text-gray-600">Sugar: {Math.round(weeklyNutrition.sugar)}g</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}