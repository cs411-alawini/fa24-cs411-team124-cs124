import React from 'react';
import { useUserSettings } from '../../context/UserSettingsContext';

export default function DietaryForm() {
  const { settings, setSettings } = useUserSettings();

  const handleChange = (e) => {
    setSettings({
      ...settings,
      dietaryRestrictions: e.target.value
    });
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Dietary Restrictions</h3>
      <textarea
        className="w-full p-3 border rounded-lg h-32"
        placeholder="Enter your dietary restrictions (e.g., vegetarian, gluten-free, allergies)"
        value={settings.dietaryRestrictions}
        onChange={handleChange}
      />
    </div>
  );
}