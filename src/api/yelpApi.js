import axios from 'axios';

const YELP_API_KEY = import.meta.env.VITE_YELP_API_KEY;

const yelpApi = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search',
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`,
  },
});

export const searchYelp = async (term, location) => {
  try {
    const response = await yelpApi.get('', {
      params: {
        term,
        location,
        categories: 'restaurants',
        limit: 10,
      },
    });

    return response.data.businesses;
  } catch (error) {
    console.error('Error fetching data from Yelp API:', error);
    return [];
  }
};
