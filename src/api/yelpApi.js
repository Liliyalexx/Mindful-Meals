const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

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
    const response = await fetch(`${BASE_URL}/api/yelp/business/${businessId}`);
    
    if (!response.ok) {
      throw new Error(`Review request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.reviews || [];
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    throw error;
  }
};