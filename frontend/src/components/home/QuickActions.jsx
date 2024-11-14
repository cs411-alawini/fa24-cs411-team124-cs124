import React from 'react';
import { Settings, Calendar } from 'lucide-react';

export default function QuickActions({ onSettingsClick, onMenuClick }) {
  return (
    <div className="flex gap-4 justify-center mb-8">
      <button
        onClick={onSettingsClick}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Settings size={20} />
        User Settings
      </button>
      <button
        onClick={onMenuClick}
        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      >
        <Calendar size={20} />
        Menu Selection
      </button>
    </div>
  );
}