import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import MenuSelectionPage from './pages/MenuSelectionPage';
import { UserSettingsProvider } from './context/UserSettingsContext';

function App() {
  useEffect(() => {
    console.log('App mounted');
  }, []);

  console.log('App rendering');

  return (
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
          <Route 
            path="/settings" 
            element={
              <div>
                {console.log('Rendering Settings route')}
                <SettingsPage />
              </div>
            } 
          />
          <Route path="/menu" element={<MenuSelectionPage />} />
        </Routes>
      </div>
    </UserSettingsProvider>
  );
}

export default App;