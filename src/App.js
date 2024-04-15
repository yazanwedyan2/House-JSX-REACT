// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HouseList from './HouseList';
import HouseForm from './HouseForm';

// API URL for fetching and posting house data
const API_URL = 'https://my-houses-api.com/houses';

// Main component of the application
const App = () => {
  // State variable to store the list of houses
  const [houses, setHouses] = useState([]);

  // Fetch the list of houses when the component mounts
  useEffect(() => {
    fetchHouses();
  }, []);

  // Function to fetch the list of houses from the API
  const fetchHouses = async () => {
    try {
      const response = await axios.get(API_URL);
      // Update the state with the fetched data
      setHouses(response.data);
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  // Function to add a new house to the list
  const addHouse = async (newHouse) => {
    try {
      // Post the new house data to the API
      const response = await axios.post(API_URL, newHouse);
      // Update the state with the new house added
      setHouses([...houses, response.data]);
    } catch (error) {
      console.error('Error adding house:', error);
    }
  };

  return (
    <div>
      <h1>Houses CRUD</h1>
      {/* Render the HouseForm component for adding new houses */}
      <HouseForm onSubmit={addHouse} />
      {/* Render the HouseList component to display the list of houses */}
      <HouseList houses={houses} />
    </div>
  );
};

export default App;
