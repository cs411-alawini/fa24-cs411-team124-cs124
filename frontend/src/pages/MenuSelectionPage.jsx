import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuList from '../components/menu/MenuList';
import FoodItemList from '../components/menu/FoodItemList';
import SearchFilter from '../components/menu/SearchFilter';

export default function MenuSelectionPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement search functionality here
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Menu Selection</h1>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <SearchFilter onSearch={handleSearch} />
            <MenuList />
            <FoodItemList />
          </div>

          {/* Right Column - Calendar */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Weekly Calendar</h2>
            <p className="text-gray-600">
              Drag and drop menus to plan your meals for the week
            </p>
            {/* Calendar component will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}