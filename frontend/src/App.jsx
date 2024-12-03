import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserSettingsProvider } from './context/UserSettingsContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import MealPlanPage from './pages/MealPlanPage';
function App() {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  console.log('App rendering');

  return (
    <AuthProvider>
      <UserSettingsProvider>
        <div className="app-container">
          {console.log('Inside App return')}
          <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  {console.log('Rendering HomePage route')}
                  <HomePage />
                </div>
              } 
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/meal-plan" element={<MealPlanPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </UserSettingsProvider>
    </AuthProvider>
  );
}

export default App;