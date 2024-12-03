import React from 'react';

const WeeklyCalendar = ({ plans, onAddMeal }) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mealtimes = ['Breakfast', 'Lunch', 'Dinner'];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="grid grid-cols-8 border-b">
        <div className="p-3 font-medium">Time</div>
        {days.map(day => (
          <div key={day} className="p-3 font-medium text-center border-l">
            {day}
          </div>
        ))}
      </div>
      
      {mealtimes.map(time => (
        <div key={time} className="grid grid-cols-8 border-b">
          <div className="p-3 font-medium">{time}</div>
          {days.map(day => (
            <div key={`${day}-${time}`} className="p-3 border-l min-h-[100px]">
              {plans.find(p => 
                new Date(p.date).toLocaleDateString('en-US', { weekday: 'long' }) === day && 
                p.recipes.some(r => r.time === time)
              )?.recipes.filter(r => r.time === time).map(recipe => (
                <div key={recipe.id} className="text-sm bg-blue-100 p-2 rounded">
                  {recipe.title}
                </div>
              ))}
              <button 
                onClick={() => onAddMeal(day, time)} 
                className="mt-2 text-sm text-blue-600 hover:text-blue-800"
              >
                + Add Meal
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};