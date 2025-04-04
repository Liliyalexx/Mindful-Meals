import axios from 'axios';
const YELP_API_KEY = process.env.YELP_API_KEY;

const yelpApi = axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses/search',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
});

/**
 * Fetches restaurants based on search query
 * @param {string} term - e.g. 'gluten free', 'vegan'
 * @param {string} location - e.g. 'New York'
 */
export const searchYelp = async (term, location) => {
  try {
    const response = await yelpApi.get('', {
      params: {
        term,
        location,
        categories: 'restaurants',
        limit: 10, // Adjust the number of results
      },
    });

    return response.data.businesses;
  } catch (error) {
    console.error('Error fetching data from Yelp API:', error);
    return [];
  }
};
