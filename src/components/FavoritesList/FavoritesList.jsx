import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaArrowLeft, FaComment } from 'react-icons/fa';
import CommentModal from '../CommentModal/CommentModal';
import { getReviewByRestaurant } from '../../services/reviewService';  // Import the service to fetch reviews
import './FavoritesList.css';

const FavoritesList = () => {
  const { user, favorites, toggleFavorite } = useContext(UserContext);
  const navigate = useNavigate();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedRestaurantForComment, setSelectedRestaurantForComment] = useState(null);
  const [existingReview, setExistingReview] = useState(null);

  const handleAddComment = async (restaurant) => {
    if (!user) {
      alert('Please log in to leave comments');
      return;
    }
  
    try {
      // Get the review for the restaurant
      const review = await getReviewByRestaurant(restaurant._id);
      setExistingReview(review);  // Set existing review if available
      setSelectedRestaurantForComment(restaurant);
      setShowCommentModal(true);
    } catch (error) {
      // Handle case where no review exists
      setSelectedRestaurantForComment(restaurant);
      setShowCommentModal(true);  // Open modal for creating a new review
    }
  };
  

  const handleFavoriteClick = async (restaurant) => {
    if (!user) {
      alert('Please log in to save favorites');
      navigate('/sign-in');
      return;
    }

    try {
      await toggleFavorite(restaurant);
    } catch (error) {
      console.error('Favorite error:', error);
      alert(error.message);
      if (error.message.includes('Please login') || error.message.includes('Authentication')) {
        navigate('/sign-in');
      }
    }
  };

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <h2>My Favorite Restaurants</h2>
      </div>
      
      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <p>You haven't added any favorites yet</p>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map(restaurant => (
            <div key={restaurant._id} className="favorite-card">
              <div className="favorite-image">
                <img 
                  src={restaurant.imageUrl || '/placeholder-restaurant.jpg'} 
                  alt={restaurant.name}
                  onClick={() => navigate(`/restaurant/${restaurant.yelpId}`)}
                />
                <button 
                  className="favorite-button active"
                  onClick={() => handleFavoriteClick(restaurant)}
                >
                  <FaHeart />
                </button>
              </div>
              <div className="favorite-info">
                <h3>{restaurant.name}</h3>
                <p>{restaurant.address}</p>
                <div className="favorite-meta">
                  <span>{restaurant.rating} ★</span>
                </div>
                {/* My Review Button */}
                <div className="action-buttons">
                <button onClick={() => handleAddComment(restaurant)} className="user-review-button">
                  {existingReview ? 'My Review' : 'Write a Review'}
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Show CommentModal if user clicks "My Review" */}
      {showCommentModal && (
        <CommentModal
          restaurant={selectedRestaurantForComment}
          existingReview={existingReview}  // Pass existing review if available
          onClose={() => setShowCommentModal(false)}
          onSubmit={() => setShowCommentModal(false)}  // Refresh reviews or close modal
        />
      )}
    </div>
  );
};

export default FavoritesList;
