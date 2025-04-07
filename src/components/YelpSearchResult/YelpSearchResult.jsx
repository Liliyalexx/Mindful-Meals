import React, { useState } from 'react';
import { fetchReviews } from '../../api/yelpApi';
import './YelpSearchResult.css';

const YelpSearchResult = ({ results, dietaryPreference }) => {
  const [reviews, setReviews] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);

  const dietaryDisplayNames = {
    gluten_free: 'Gluten-Free',
    vegan: 'Vegan',
    vegetarian: 'Vegetarian',
    halal: 'Halal',
    kosher: 'Kosher',
    allergy_friendly: 'Allergy Friendly'
  };

  const currentDietaryName = dietaryDisplayNames[dietaryPreference] || 'Dietary';

  const handleFetchReviews = async (businessId) => {
    setIsLoadingReviews(true);
    setReviewsError(null);
    setReviews([]);
    
    try {
      const response = await fetchReviews(businessId);
      
      if (!response || response.length === 0) {
        setReviewsError('This restaurant has no reviews yet.');
        return;
      }

      const searchTerms = [
        dietaryPreference.toLowerCase().replace(/_/g, '-'),
        currentDietaryName.toLowerCase()
      ];

      const filteredReviews = response.filter(review => 
        review?.text && searchTerms.some(term => 
          review.text.toLowerCase().includes(term)
        )
      );

      setSelectedRestaurant(businessId);
      setReviews(filteredReviews.length > 0 ? filteredReviews : response);
      
      if (filteredReviews.length === 0) {
        setReviewsError(`No ${currentDietaryName.toLowerCase()} mentions found. Showing all reviews.`);
      }
    } catch (error) {
      console.error('Review fetch error:', error);
      setReviewsError(`Failed to load reviews: ${error.message}`);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  return (
    <div className="yelp-results-container">
      <h2 className="results-title">Found {results.length} Restaurants</h2>
      
      <div className="restaurants-grid">
        {results.map(restaurant => (
          <div 
            key={restaurant.id} 
            className={`restaurant-card ${selectedRestaurant === restaurant.id ? 'selected' : ''}`}
          >
            <div className="restaurant-image">
              <img 
                src={restaurant.image_url || '/placeholder-restaurant.jpg'} 
                alt={restaurant.name} 
                onError={(e) => {
                  e.target.src = '/placeholder-restaurant.jpg';
                }}
              />
            </div>
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p className="restaurant-address">
                {restaurant.location?.address1 || 'Address not specified'}, {restaurant.location?.city}
              </p>
              <div className="restaurant-meta">
                <span className="rating">{restaurant.rating} ★</span>
                <span className="review-count">({restaurant.review_count} reviews)</span>
                <span className="price">{restaurant.price || 'Price not available'}</span>
              </div>
              <button 
                onClick={() => handleFetchReviews(restaurant.id)}
                className="reviews-button"
                disabled={isLoadingReviews}
              >
                {isLoadingReviews ? 'Loading...' : `Show ${currentDietaryName} Reviews`}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="reviews-section">
        {reviewsError && (
          <div className="reviews-error">
            <p>{reviewsError}</p>
          </div>
        )}

        {selectedRestaurant && (
          <>
            <h3 className="reviews-title">
              {reviews.length > 0 ? currentDietaryName : 'All'} Reviews for {
                results.find(r => r.id === selectedRestaurant)?.name || 'Selected Restaurant'
              }
            </h3>
            
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={`${review.id || index}`} className="review-card">
                  <div className="review-header">
                    <div>
                      <strong>{review.user?.name || 'Anonymous'}</strong>
                      <span className="review-rating">{review.rating} ★</span>
                    </div>
                    <span className="review-date">
                      {review.time_created ? new Date(review.time_created).toLocaleDateString() : 'Date not available'}
                    </span>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))
            ) : (
              !isLoadingReviews && <p className="no-reviews">No reviews to display</p>
            )}
          </>
        )}

        {!selectedRestaurant && (
          <div className="select-restaurant-prompt">
            <p>Select a restaurant to view reviews</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default YelpSearchResult;