import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { LandingPage, SignIn, Navbar, YelpSearchResult } from './components';
import { Header } from './container';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

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
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleAuth = (authData) => {
    // Here you would typically verify credentials with your backend
    // For now, we'll just authenticate
    setIsAuthenticated(true);
    setShowAuthForm(false);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  const HomeContent = () => (
    <div className="app min-h-screen flex flex-col">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
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

  return (
    <div className="app min-h-screen flex flex-col">
      <Navbar 
        isAuthenticated={isAuthenticated}
        onLoginClick={() => {
          setIsLogin(true);
          setShowAuthForm(true);
        }}
        onSignupClick={() => {
          setIsLogin(false);
          setShowAuthForm(true);
        }}
        onLogoutClick={handleLogout}
        showAuthForm={showAuthForm}
        setShowAuthForm={setShowAuthForm}
      />
      
      {/* Auth Form Modal */}
      {showAuthForm && (
        <div className="auth-modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </h2>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const authData = Object.fromEntries(formData);
              handleAuth(authData);
            }}>
              {!isLogin && (
                <input 
                  className="border p-3 w-full mb-4 rounded" 
                  type="text" 
                  name="name" 
                  placeholder="Full Name" 
                  required
                />
              )}
              <input 
                className="border p-3 w-full mb-4 rounded" 
                type="email" 
                name="email" 
                placeholder="Email" 
                required
              />
              <input 
                className="border p-3 w-full mb-4 rounded" 
                type="password" 
                name="password" 
                placeholder="Password" 
                required
              />
              
              <button 
                type="submit" 
                className="bg-golden text-black px-4 py-3 rounded-lg w-full"
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </form>

            <p className="mt-4 text-sm text-center">
              {isLogin ? (
                <>Don't have an account? <button 
                  className="text-golden" 
                  onClick={() => setIsLogin(false)}
                >
                  Sign Up
                </button></>
              ) : (
                <>Already have an account? <button 
                  className="text-golden" 
                  onClick={() => setIsLogin(true)}
                >
                  Sign In
                </button></>
              )}
            </p>

            <button 
              className="absolute top-4 right-4 text-gray-500" 
              onClick={() => setShowAuthForm(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

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