import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import UserSettingsForm from '../components/UserSettingsForm';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [formData, setFormData] = useState({
    dietary_restrictions: '',
    budget_goal: '',
    nutrition_goals: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!username.trim()) {
        setError('Please enter a username: ');
        return;
      }

      if (isLogin) {
        const response = await api.loginUser(username);
        if (response.user_id) {
          login(response.user_id);
          navigate('/meal-plan');
        }
      } else {
        const userData = {
          username,
          ...formData
        };
        
        console.log('Submitting user data: ', userData);
        const response = await api.createUser(userData);
        if (response.user_id) {
          login(response.user_id);
          navigate('/meal-plan');
        }
      }
    } catch (err) {
    console.error('Auth error:', err);
      setError(isLogin ? 'Login failed. Please try again.' : 'Sign up failed. Please try again.');
    }
  };

  const handleSettingsChange = (newSettings) => {
    setFormData(newSettings);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome Back.' : 'Create Account.'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLogin ? 'Please enter your username to continue.' : 'Please fill in your details.'}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username:
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {!isLogin && (
            <UserSettingsForm 
              onSubmit={handleSettingsChange}
            />
          )}

          <button
            onClick={handleSubmit}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login.'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}