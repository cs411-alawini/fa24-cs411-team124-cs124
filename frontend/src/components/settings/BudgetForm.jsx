import React from 'react';
import { useUserSettings } from '../../context/UserSettingsContext';

export default function BudgetForm() {
  const { settings, setSettings } = useUserSettings();

  const handleChange = (e) => {
    setSettings({
      ...settings,
      weeklyBudget: parseFloat(e.target.value) || 0
    });
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Weekly Budget</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Budget Amount ($)
        </label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter your weekly budget"
          value={settings.weeklyBudget || ''}
          onChange={handleChange}
          min="0"
          step="0.01"
        />
      </div>
    </div>
  );
}