import React from 'react';
import { useMealPlan } from '../../hooks/useMealPlan';

export default function WeeklyPlanDisplay() {
  const { weeklyPlan } = useMealPlan();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">This Week's Meal Plan</h2>
      <div className="space-y-4">
        {weeklyPlan?.map((day, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h3 className="font-semibold text-lg">{day.day}</h3>
            <ul className="list-disc list-inside text-gray-600">
              {day.meals.map((meal, mealIndex) => (
                <li key={mealIndex}>{meal}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}