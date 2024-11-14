import React from 'react';

export default function MenuList() {
  const menus = [
    { id: 1, name: 'Healthy Week Plan', items: ['Salad', 'Grilled Chicken'] },
    { id: 2, name: 'Vegetarian Special', items: ['Veggie Stir Fry', 'Tofu Bowl'] },
    { id: 3, name: 'Low Carb Menu', items: ['Salmon', 'Cauliflower Rice'] },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold mb-4">Available Menus</h3>
      <div className="space-y-2">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="p-3 border rounded cursor-move hover:bg-gray-50"
          >
            <h4 className="font-medium">{menu.name}</h4>
            <p className="text-sm text-gray-600">{menu.items.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}