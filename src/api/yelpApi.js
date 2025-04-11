import axios from 'axios';
const BASE_URL = 'https://mindful-meals-backend-496088380dfc.herokuapp.com';

export const searchYelp = async (term, location, category = 'gluten_free') => {
  const url = `${BASE_URL}/api/yelp/search?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}&category=${encodeURIComponent(category)}`;

  console.log('🔍 Yelp Search Request URL:', url); // Add this line

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Search request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.businesses;
  } catch (error) {
    console.error('❌ Error fetching Yelp data:', error);
    throw error;
  }
};

export const fetchReviews = async (businessId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/yelp/business/${businessId}/reviews`, {
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`

         'Content-Type': 'application/json',
        },
        timeout: 5000
      }
    );

    // Handle different response structures
    if (response.data?.reviews) {
      return response.data.reviews;
    } else if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};