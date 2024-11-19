const API_URL = 'http://localhost:5000/api';

export const api = {
  async getRecipes() {
    try {
      const response = await fetch(`${API_URL}/recipes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        // Don't use mode: 'no-cors' as it will make response inaccessible
        credentials: 'include', // Include if you're using cookies
      });

      // Proper promise chain for response
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Handle the JSON response properly
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
};