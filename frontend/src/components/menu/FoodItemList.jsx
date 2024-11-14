import React from 'react';

export default function FoodItemList() {
  const foodItems = [
    { id: 1, name: 'Chicken Breast', calories: 165 },
    { id: 2, name: 'Brown Rice', calories: 216 },
    { id: 3, name: 'Broccoli', calories: 55 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-4">Food Items</h3>
      <div className="space-y-2">
        {foodItems.map((item) => (
          <div key={item.id} className="p-2 border rounded hover:bg-gray-50">
            <span className="font-medium">{item.name}</span>
            <span className="text-sm text-gray-600 ml-2">{item.calories} cal</span>
          </div>
        ))}
      </div>
    </div>
  );
}