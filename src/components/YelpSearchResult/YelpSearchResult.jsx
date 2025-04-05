import React from 'react';
import './YelpSearchResult.css';

const YelpSearchResult = ({ results }) => {
  return (
    <div className="yelp-results-container">
      <div className="yelp-results-list">
        <h2 className="results-title">Search Results</h2>
        {results.length > 0 ? (
          <ul className="restaurant-list">
            {results.map((restaurant, index) => (
              <li key={index} className="restaurant-card">
                <div className="restaurant-info">
                  <h3>{restaurant.name}</h3>
                  <p className="restaurant-address">
                    {restaurant.location.address1}, {restaurant.location.city}
                  </p>
                  <div className="restaurant-meta">
                    <span className="rating">Rating: {restaurant.rating} ★</span>
                    <span className="price">{restaurant.price || '$$'}</span>
                  </div>
                  <div className="dietary-tags">
                    {restaurant.categories
                      .filter(cat => ['gluten_free', 'vegan', 'vegetarian', 'halal', 'kosher'].includes(cat.alias))
                      .map((cat, i) => (
                        <span key={i} className="dietary-tag">{cat.title}</span>
                      ))}
                  </div>
                  {restaurant.phone && (
                    <p className="restaurant-phone">
                      <a href={`tel:${restaurant.phone}`}>{restaurant.display_phone}</a>
                    </p>
                  )}
                </div>
                {restaurant.image_url && (
                  <div className="restaurant-image">
                    <img src={restaurant.image_url} alt={restaurant.name} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">No restaurants found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default YelpSearchResult;