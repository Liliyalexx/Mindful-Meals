// reviewService.js

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

// Get review by restaurant ID
export const getReviewByRestaurant = async (restaurantId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token missing');
  
  try {
    const response = await axios.get(`${API_BASE_URL}/api/reviews/restaurant/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching review:', error.response?.data || error.message);
    throw error;
  }
};

// Create a new review
export const createReview = async (reviewData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token missing');
  
  try {
    const response = await axios.post(`${API_BASE_URL}/api/reviews`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error.response?.data || error.message);
    throw error;
  }
};

// Update an existing review
export const updateReview = async (reviewId, reviewData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token missing');
  
  try {
    const response = await axios.put(`${API_BASE_URL}/api/reviews/${reviewId}`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error.response?.data || error.message);
    throw error;
  }
};

// Delete a review
export const deleteReview = async (reviewId) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Authentication token missing');
  
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/reviews/${reviewId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error.response?.data || error.message);
    throw error;
  }
};
