import { useState, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import SignIn from './components/SignIn/SignIn.jsx';
import SignUp from './components/SignUp/SignUp.jsx'; 
import YelpSearchResult from './components/YelpSearchResult/YelpSearchResult.jsx';
import Header from './components/Header/Header.jsx';
import FavoritesList from './components/FavoritesList/FavoritesList';
import { searchYelp } from './api/yelpApi';
import { UserContext, UserProvider } from './context/userContext.jsx';
import './App.css';

const AppContent = () => {
  const { user,isAuthChecked } = useContext(UserContext);
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
  if (!isAuthChecked) {
    return <div className="app__loading">Checking authentication...</div>;
  }

  const HomeContent = () => (
    <div className="app__content">
      <Header
        handleSearch={handleSearch}
        hasResults={hasSearched}
        isLoading={isLoading}
        location={location}
        restaurants={restaurants}
      />
      {error && <div className="app__error"><p>{error}</p></div>}
      {isLoading && <div className="app__loading"><p>Loading restaurants...</p></div>}

{!isLoading && hasSearched && (
  restaurants.length > 0 ? (
    <YelpSearchResult results={restaurants} dietaryPreference={selectedCategory} />
  ) : (
    <div className="app__no-results"><p>No restaurants found matching your criteria.</p></div>
  )
)}

    </div>
  );


  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <HomeContent /> : <Navigate to="/sign-in"  />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} /> 
        <Route path="/my-list" element={<FavoritesList />} />
      </Routes>
    </>
  );
};

const App = () => {
  
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;