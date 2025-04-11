import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { FaRegHeart, FaHeart, FaComment } from 'react-icons/fa';
import { fetchReviews } from '../../api/yelpApi';
import { useNavigate } from 'react-router-dom';
import './YelpSearchResult.css';

const YelpSearchResult = ({ results, dietaryPreference }) => {
  const navigate = useNavigate();
  const { user, toggleFavorite, isFavorite } = useContext(UserContext);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedRestaurantForComment, setSelectedRestaurantForComment] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);
  const [favoriteLoading, setFavoriteLoading] = useState({});

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

      setSelectedRestaurant(businessId);
      setReviews(response);
    } catch (error) {
      console.error('Review fetch error:', error);
      setReviewsError(`Failed to load reviews: ${error.message}`);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  const handleSubmitComment = async (restaurantId, commentData) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',  // Use PUT if updating existing review
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ ...commentData, restaurant: restaurantId })
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      console.log('Comment submitted successfully');
      setShowCommentModal(false);
    } catch (error) {
      console.error('Comment submission error:', error);
      alert('Failed to submit comment. Please try again.');
    }
  };

  const handleFavoriteClick = async (restaurant) => {
    if (!user) {
      alert('Please log in to save favorites');
      navigate('/sign-in');
      return;
    }

    setFavoriteLoading(prev => ({ ...prev, [restaurant.id]: true }));
    
    try {
      await toggleFavorite(restaurant);
    } catch (error) {
      console.error('Favorite error:', error);
      alert(error.message);
      if (error.message.includes('Please login') || error.message.includes('Authentication')) {
        navigate('/sign-in');
      }
    } finally {
      setFavoriteLoading(prev => ({ ...prev, [restaurant.id]: false }));
    }
  };

  return (
    <div className="yelp-results-container">
      <h2 className="results-title">Found {results.length} {currentDietaryName} Restaurants</h2>
      
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
              {user && (
                <button 
                  className="favorite-button"
                  onClick={() => handleFavoriteClick(restaurant)}
                  disabled={favoriteLoading[restaurant.id]}
                  aria-label={isFavorite(restaurant.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {favoriteLoading[restaurant.id] ? (
                    '...'
                  ) : isFavorite(restaurant.id) ? (
                    <FaHeart className="heart-icon filled" />
                  ) : (
                    <FaRegHeart className="heart-icon" />
                  )}
                </button>
              )}
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
              <div className="action-buttons">
                <button 
                  onClick={() => handleFetchReviews(restaurant.id)}
                  className="reviews-button"
                  disabled={isLoadingReviews}
                >
                  {isLoadingReviews && selectedRestaurant === restaurant.id ? 
                    'Loading...' : `Show ${currentDietaryName} Reviews`}
                </button>
              </div>
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
      
      {showCommentModal && (
        <CommentModal
          restaurant={selectedRestaurantForComment}
          onClose={() => setShowCommentModal(false)}
          onSubmit={handleSubmitComment}
        />
      )}
    </div>
  );
};

export default YelpSearchResult;
