import React from 'react';
import { Search } from 'lucide-react';

export default function SearchFilter({ onSearch }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search menus or items..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg"
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <Search 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
          size={20} 
        />
      </div>
    </div>
  );
}
