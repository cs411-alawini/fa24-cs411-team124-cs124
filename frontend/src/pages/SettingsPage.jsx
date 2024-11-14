import React from 'react';
import { useNavigate } from 'react-router-dom';
import DietaryForm from '../components/settings/DietaryForm';
import NutritionalForm from '../components/settings/NutritionalForm';
import BudgetForm from '../components/settings/BudgetForm';
import { useUserSettings } from '../context/UserSettingsContext';
import { api } from '../services/api';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { settings, setSettings } = useUserSettings();

  const handleSubmit = async (formData) => {
    await api.saveUserSettings(formData);
    setSettings(formData);
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">User Settings</h1>
      <div className="max-w-2xl mx-auto space-y-6">
        <DietaryForm />
        <NutritionalForm />
        <BudgetForm />
        <div className="flex gap-4 justify-center">
          <button onClick={() => navigate('/menu')} className="px-6 py-3 bg-green-600 text-white rounded-lg">
            Save & Continue
          </button>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-gray-600 text-white rounded-lg">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}