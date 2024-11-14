import { useState, useEffect } from 'react';
import { api } from '../services/api';

export function useCalendarEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await api.getMealPlan();
      // Transform meal plan data into calendar events
      const calendarEvents = response.map(meal => ({
        id: meal.id,
        title: meal.name,
        start: meal.date,
        backgroundColor: getCategoryColor(meal.category),
        extendedProps: {
          nutrition: meal.nutrition,
          ingredients: meal.ingredients
        }
      }));
      setEvents(calendarEvents);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addEvent = async (event) => {
    try {
      const response = await api.addMealPlan(event);
      setEvents([...events, response]);
    } catch (err) {
      setError(err.message);
    }
  };

  const updateEvent = async (event) => {
    try {
      const response = await api.updateMealPlan(event);
      setEvents(events.map(e => e.id === event.id ? response : e));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await api.deleteMealPlan(eventId);
      setEvents(events.filter(e => e.id !== eventId));
    } catch (err) {
      setError(err.message);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      breakfast: '#93c5fd', // blue-300
      lunch: '#86efac', // green-300
      dinner: '#fca5a5', // red-300
      snack: '#fcd34d', // yellow-300
    };
    return colors[category] || '#e5e7eb'; // gray-200 as default
  };

  return {
    events,
    isLoading,
    error,
    addEvent,
    updateEvent,
    deleteEvent,
  };
}