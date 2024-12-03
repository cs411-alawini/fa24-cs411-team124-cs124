import React, { useState } from 'react';

export default function UserSettingsForm({ onSubmit, hideSubmit }) {
  const [formData, setFormData] = useState({
    dietary_restrictions: '',
    budget_goal: '',
    nutrition_goals: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = {
      ...formData,
      [name]: value
    };
    setFormData(newData);
    onSubmit(newData); // Pass the updated data to parent
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Dietary Restrictions
        </label>
        <textarea
          name="dietary_restrictions"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formData.dietary_restrictions}
          onChange={handleChange}
          placeholder="Enter any dietary restrictions..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Budget Goal ($)
        </label>
        <input
          type="number"
          name="budget_goal"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formData.budget_goal}
          onChange={handleChange}
          min="0"
          step="0.01"
          placeholder="Enter your budget goal"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Daily Calorie Target
        </label>
        <input
          type="number"
          name="nutrition_goals"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={formData.nutrition_goals}
          onChange={handleChange}
          min="0"
          placeholder="Enter your daily calorie target"
        />
      </div>
    </div>
  );
}