import React, { useState, useEffect } from 'react';
import { searchYelp } from '../../api/yelpApi';  

const SearchBar = () => {
  const [data, setData] = useState(null); // Holds the Yelp API response data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  // Handle the search and fetch data from Yelp API
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await searchYelp(query);
      setData(result);
    } catch (err) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchData(); 
    }
  }, [query]);

  const businesses = data ? data.businesses : []; 

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for businesses"
      />
      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div>
        {businesses.length > 0 ? (
          businesses.map((business) => (
            <div key={business.id}>
              <h3>{business.name}</h3>
              <p>{business.location.address1}</p>
            </div>
          ))
        ) : (
          <p>No businesses found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
