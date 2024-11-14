import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useMealPlan() {
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        setIsLoading(true);
        const date = new Date().toISOString().split('T')[0];
        const data = await api.getMealPlan(date);
        setWeeklyPlan(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealPlan();
  }, []);

  return { weeklyPlan, isLoading, error };
}