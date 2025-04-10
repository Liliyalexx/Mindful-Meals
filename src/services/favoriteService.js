import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;


export const getFavorites =  async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication token missing');
    
  try {
    const response = await axios.get(`${API_BASE_URL}/api/saved`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching favorites:', error.response?.data || error.message);
    throw error;
  }
};

// Save a restaurant to favorites
export const saveFavorite = async (restaurant, token) => {
    if (!token) throw new Error('Authentication token missing');
  try {
    console.log('Sending request to:', `${API_BASE_URL}/api/saved`);
    console.log('With token:', token ? 'Present' : 'Missing');

    const response = await axios.post(`${API_BASE_URL}/api/saved`,{
      yelpId: restaurant.id,
      name: restaurant.name,
      address: restaurant.location?.address1,
      imageUrl: restaurant.image_url,
      rating: restaurant.rating,
      categories: restaurant.categories?.map(cat => cat.title)
    }, {
      headers: {
        Authorization: `Bearer ${token}`, 
         'Content-Type': 'application/json'
      }
    });
    console.log('Response received:', response);
    return response.data;
  } catch (error) {
    console.error('Full error details:', error.response?.data || error.message);
    throw error;

  }
};

// Remove a restaurant from favorites
export const removeFavorite = async (restaurantId, token) => {
  try {
    await axios.delete(`${API_BASE_URL}/saved/${restaurantId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
}