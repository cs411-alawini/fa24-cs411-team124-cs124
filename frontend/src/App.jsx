// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SettingsPage from './pages/SettingsPage';
import MenuSelectionPage from './pages/MenuSelectionPage';
import { UserSettingsProvider } from './context/UserSettingsContext';

function App() {
  return (
    <UserSettingsProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/menu" element={<MenuSelectionPage />} />
      </Routes>
    </UserSettingsProvider>
  );
}

export default App;