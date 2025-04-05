// src/api/yelpApi.js

// yelpApi.js

// Use the VITE_ prefix to access environment variables
const apiKey = import.meta.env.VITE_YELP_API_KEY;

export const searchYelp = async (term, location) => {
  const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();
    console.log('Yelp searchResults:', data);
    return data;
  } catch (error) {
    console.error('Error fetching Yelp data:', error);
    throw error; // Propagate error for handling in the component
  }
};
