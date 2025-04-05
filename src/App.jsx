import React, { useState } from 'react';
import { Header } from './container';
import { Navbar } from './components';
import { YelpSearchResult } from './components';
import './App.css';

const App = () => {
  const [restaurants, setRestaurants] = useState([]);  
 
  const handleSearch = (results) => {
    setRestaurants(results); 
  };

  return (
    <div className="app">
      <Navbar/>
      <div className="app__content">
        <Header handleSearch={handleSearch} />  
        {restaurants.length > 0 && <YelpSearchResult results={restaurants} />}
      </div>
    </div>
  );
}

export default App;