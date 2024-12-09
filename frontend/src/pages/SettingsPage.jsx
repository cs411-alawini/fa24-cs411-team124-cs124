import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserSettings } from '../context/UserSettingsContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import UserSettingsForm from '../components/UserSettingsForm';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { settings, setSettings } = useUserSettings();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        if (userId) {
          const userSettings = await api.getUserSettings(userId);
          setSettings(userSettings);
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [userId, setSettings]);

  const handleSubmit = async (formData) => {
    try {
      setSaveStatus('Saving...');
      await api.saveUserSettings(userId, formData);
      setSettings(formData);
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaveStatus('Failed to save settings. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">User Settings</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg"
          >
            Back to Home
          </button>
          <button
            onClick={() => navigate('/meal-plan')}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg"
          >
            Meal Plan
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <UserSettingsForm 
            initialValues={settings}
            onSubmit={handleSubmit}
          />
          
          {saveStatus && (
            <div className={`text-center p-3 rounded ${
              saveStatus.includes('Failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {saveStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}