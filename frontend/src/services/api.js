const API_URL = 'http://localhost:5000/api';

export const api = {
  async getRecipes() {
    try {
      const response = await fetch(`${API_URL}/recipes`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  }
};