import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {LandingPage} from './components';
import { Header } from './container';
import { Navbar, YelpSearchResult } from './components';
import images from './constants/images';
import { searchYelp } from './api/yelpApi'; 
import './App.css';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('gluten_free'); 
  const [location, setLocation] = useState('');

  const handleSearch = async (searchTerm, location, category) => {
    setIsLoading(true);
    setError(null);
    setSelectedCategory(category); 
    setLocation(location);
    try {
      const results = await searchYelp(searchTerm, location, category);
      setRestaurants(results);
      setHasSearched(true);
    } catch (err) {
      setError('Failed to fetch restaurants. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app min-h-screen flex flex-col">
      <Navbar />
      <div className="app__content">
        <Header 
          handleSearch={handleSearch} 
          hasResults={hasSearched} 
          isLoading={isLoading}
          location={location}
          restaurants={restaurants}
        />
        
        {error && (
          <div className="app__error">
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="app__loading">
            <p>Loading restaurants...</p>
          </div>
        ) : hasSearched ? (
          restaurants.length > 0 ? (
            <YelpSearchResult results={restaurants} dietaryPreference={selectedCategory} />
          ) : (
            <div className="app__no-results">
              <p>No restaurants found matching your criteria.</p>
            </div>
          )
        ) : (
          <div className="app__welcome">
            <img src={images.welcome} alt="Welcome" className="app__welcome-img" />
            <p className="app__welcome-text">Search for gluten-free restaurants to begin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;