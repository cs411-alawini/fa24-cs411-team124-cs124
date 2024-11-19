const MOCK_MEAL_PLAN = [
    {
      day: 'Monday',
      meals: ['Breakfast: Oatmeal' , 'Lunch: Chicken Salad', 'Dinner: Pasta']
    },
    {
      day: 'Tuesday',
      meals: ['Breakfast: Eggs Benedict', 'Lunch: Sandwich', 'Dinner: Fish']
    },
    {
      day: 'Wednesday',
      meals: ['Breakfast: Pancakes', 'Lunch: Soup', 'Dinner: Steak']
    },
    // Add more days as needed
  ];
  
  const MOCK_SETTINGS = {
    dietaryRestrictions: ['Gluten-free', 'No nuts'],
    nutritionalGoals: {
      calories: 2000,
      protein: 150,
      carbs: 200
    },
    weeklyBudget: 150
  };
  
  export const api = {
    async getMealPlan(date) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      const TEST_MEAL_PLAN = [
        {
          day: 'Monday',
          meals: ['Breakfast: Not Oatmeal' , 'Lunch: Chicken Salad', 'Dinner: Pasta']
        },
        {
          day: 'Tuesday',
          meals: ['Breakfast: Eggs Benedict', 'Lunch: Sandwich', 'Dinner: Fish']
        },
        {
          day: 'Wednesday',
          meals: ['Breakfast: Pancakes', 'Lunch: Soup', 'Dinner: Steak']
        },
        // Add more days as needed
      ];
      return TEST_MEAL_PLAN;
    },
  
    async saveUserSettings(settings) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log('Settings saved:', settings);
      return settings;
    },
  
    async getSettings() {
      await new Promise(resolve => setTimeout(resolve, 500));
      return MOCK_SETTINGS;
    }
  };