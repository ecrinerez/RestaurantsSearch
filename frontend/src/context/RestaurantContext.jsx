import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const RestaurantContext = createContext();
// Backend adresin (launchSettings.json'daki adres)
const API_URL = 'http://localhost:5233/api/Restaurants'; 

export const RestaurantProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(API_URL);
      setRestaurants(response.data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const addRestaurant = async (newRes) => {
    try {
      const payload = {
        ...newRes,
        cuisine: Array.isArray(newRes.cuisines) ? newRes.cuisines.join(', ') : newRes.cuisines,
        address: newRes.district,
        city: "İstanbul",
        postcode: "34000",
        managerId: 1, 
        rating: 0
      };
      const response = await axios.post(API_URL, payload);
      setRestaurants(prev => [...prev, response.data]);
    } catch (error) {
      console.error("Error adding restaurant:", error);
    }
  };

  const updateRestaurant = async (id, updatedData) => {
    try {
      const payload = {
        ...updatedData,
        cuisine: Array.isArray(updatedData.cuisines) ? updatedData.cuisines.join(', ') : updatedData.cuisines,
        address: updatedData.district,
        city: "İstanbul",
        postcode: "34000",
        managerId: 1
      };
      await axios.put(`${API_URL}/${id}?currentManagerId=1`, payload);
      fetchRestaurants(); 
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const deleteRestaurant = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}?currentManagerId=1`);
      setRestaurants(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, addRestaurant, updateRestaurant, deleteRestaurant, loading }}>
      {children}
    </RestaurantContext.Provider>
  );
};

export const useRestaurants = () => useContext(RestaurantContext);