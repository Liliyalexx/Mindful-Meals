// src/api/yelpApi.js

// Use the VITE_ prefix to access environment variables
const apiKey = import.meta.env.VITE_YELP_API_KEY;

export const searchYelp = async (term, location, category = 'gluten_free') => {
  const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&categories=${category}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();
    console.log('Yelp searchResults:', data);
    return data.businesses; 
  } catch (error) {
    console.error('Error fetching Yelp data:', error);
    throw error;
  }
};

// Add a fetchReviews function if you want to fetch reviews for a specific business
export const fetchReviews = async (businessId) => {
    try {
      const response = await fetch(`https://api.yelp.com/v3/businesses/${businessId}/reviews`, {
        headers: { 
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Yelp API error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      
      // Validate the response structure
      if (!data || !Array.isArray(data.reviews)) {
        throw new Error('Invalid reviews data structure');
      }
  
      return data.reviews;
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      throw error;
    }
  };