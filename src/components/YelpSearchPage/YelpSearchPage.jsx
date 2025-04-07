import React, { useState, useEffect } from 'react';
import YelpSearchResult from './YelpSearchResult';
import { searchYelp } from '../../api/yelpApi'; // Function that fetches the search results

const YelpSearchPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const data = await searchYelp('restaurant'); // Example query
        setResults(data.businesses); // Assuming the API response contains 'businesses'
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Yelp results:', error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, []);

  return (
    <div>
      {loading ? <p>Loading...</p> : <YelpSearchResult results={results} />}
    </div>
  );
};

export default YelpSearchPage;
