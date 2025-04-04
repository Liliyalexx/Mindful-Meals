import React from 'react';
import './RestaurantList.css'; 

const RestaurantList  = ({ restaurants }) => {
  return (
    <div className="restaurant-list">
      <h2>Search Results</h2>
      {restaurants.length === 0 ? (
        <p>No results found. Try a different search.</p>
      ) : (
        <ul>
          {restaurants.map((restaurant) => (
            <li key={restaurant.id} className="restaurant-card">
              <h3>{restaurant.name}</h3>
              <p>{restaurant.location.address1}, {restaurant.location.city}</p>
              <p>⭐ {restaurant.rating} ({restaurant.review_count} reviews)</p>
              <a href={restaurant.url} target="_blank" rel="noopener noreferrer">
                View on Yelp
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

//export default RestaurantList;
