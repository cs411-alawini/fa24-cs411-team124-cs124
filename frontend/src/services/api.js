const API_URL = 'http://localhost:5000/api';

export const api = {
  async getRecipes() {
    try {
      const response = await fetch(`${API_URL}/recipes`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  async getUserSettings(userId) {
    const response = await fetch(`${API_URL}/settings/${userId}`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch settings');
    return response.json();
  },

  async saveUserSettings(userId, settings) {
    const response = await fetch(`${API_URL}/settings/${userId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settings)
    });
    if (!response.ok) throw new Error('Failed to save settings');
    return response.json();
  },

  async getMealPlans(userId) {
    const response = await fetch(`${API_URL}/meal-plans?user_id=${userId}`, {
      method: 'GET',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to fetch meal plans');
    return response.json();
  },

  async createMealPlan(planData) {
    const response = await fetch(`${API_URL}/meal-plans`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(planData)
    });
    if (!response.ok) throw new Error('Failed to create meal plan');
    return response.json();
  },

  async deleteMealPlan(planId) {
    const response = await fetch(`${API_URL}/meal-plans/${planId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) throw new Error('Failed to delete meal plan');
    return response.json();
  },

  async getAvailableRecipes() {
    try {
      const response = await fetch(`${API_URL}/recipes`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  },

  async getRecipeDetails(recipeId) {
    try {
      const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to fetch recipe details');
      return response.json();
    } catch (error) {
      console.error('Recipe details fetch error:', error);
      throw error;
    }
  },

  async calculateMealPlanNutrition(mealPlanId) {
    try {
      const response = await fetch(`${API_URL}/meal-plans/${mealPlanId}/nutrition`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to fetch nutrition data');
      return response.json();
    } catch (error) {
      console.error('Nutrition calculation error:', error);
      throw error;
    }
  },
  async loginUser(username) {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    });
    if (!response.ok) throw new Error('Failed to login');
    return response.json();
  },
  
  async createUser(userData) {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  }
};