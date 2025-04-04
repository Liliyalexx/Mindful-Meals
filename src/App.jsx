// import React, { useState } from 'react';
import { Header } from './container';
import { Navbar } from './components';
import './App.css';

const App = () => {
  // const [restaurants, setRestaurants] = useState([]);

  // const handleSearch = (results) => {
  //   setRestaurants(results); 
  // };

  return (
    <div>
      <Navbar/>
      <Header  />
      
      {/* <RestaurantList restaurants={restaurants} /> */}
    </div>
  );
}

export default App;
