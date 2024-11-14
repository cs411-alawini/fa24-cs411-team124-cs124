import React from 'react';
import { useUserSettings } from '../../context/UserSettingsContext';

export default function NutritionalForm() {
  const { settings, setSettings } = useUserSettings();

  const handleChange = (field, value) => {
    setSettings({
      ...settings,
      nutritionalGoals: {
        ...settings.nutritionalGoals,
        [field]: value
      }
    });
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Nutritional Goals</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Daily Calories
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="e.g., 2000"
            value={settings.nutritionalGoals?.calories || ''}
            onChange={(e) => handleChange('calories', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Protein (g)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="e.g., 150"
            value={settings.nutritionalGoals?.protein || ''}
            onChange={(e) => handleChange('protein', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Carbs (g)
          </label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            placeholder="e.g., 200"
            value={settings.nutritionalGoals?.carbs || ''}
            onChange={(e) => handleChange('carbs', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}