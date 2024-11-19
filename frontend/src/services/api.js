const API_URL = 'http://localhost:5000/api';

export const api = {
  async getRecipes() {
    try {
      console.log('Attempting to fetch from:', `${API_URL}/recipes`);
      const response = await fetch(`${API_URL}/recipes`);
      console.log('Response received:', response);
      
      if (!response.ok) {
        console.log('Response not ok, status:', response.status);
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Data received:', data);
      return data;
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        stack: error.stack,
        type: error.name
      });
      throw error;
    }
  }
};