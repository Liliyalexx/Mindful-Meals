import React, { useState, useEffect } from 'react';
import './CommentModal.css';
import { FaStar, FaPen, FaTrash } from 'react-icons/fa';  
import { createReview, updateReview, deleteReview } from '../../services/reviewService'; 

const CommentModal = ({ restaurant, onClose, onSubmit, existingReview }) => {
  const [commentText, setCommentText] = useState(existingReview?.comment || '');
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(existingReview ? false : true); // Start in edit mode if new review

  const handleStarClick = (index) => {
    if (isEditing) { // Only allow click when editing
      setRating(index + 1); // Set rating to clicked star (1-5)
    }
  };
  
  useEffect(() => {
    if (existingReview) {
      setCommentText(existingReview.comment);
      setRating(existingReview.rating);
      setIsEditing(false); // Disable edit mode if review exists
    }
  }, [existingReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const reviewData = {
      restaurantId: restaurant._id,
      comment: commentText,
      rating: rating,
      customTags: []
    };

    try {
      if (existingReview) {
        await updateReview(existingReview._id, reviewData); // Update existing review
      } else {
        await createReview(reviewData); // Create new review
      }

      onSubmit();  // Refresh reviews
      onClose();   // Close modal after submission
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);  // Allow editing
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReview(existingReview._id);  // Delete the review
      onSubmit();  // Refresh after deletion
      onClose();  // Close the modal
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{existingReview ? 'Edit Your Review' : `Leave a Review for ${restaurant.name}`}</h2>

        {/* Star rating system */}
        <div className="star-rating">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={`star ${rating > index ? 'filled' : ''}`}
              onClick={() => handleStarClick(index)} // Allow click if in edit mode
              style={{ cursor: isEditing ? 'pointer' : 'default', color: rating > index ? '#FFD700' : '#ccc' }}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <label>Comment: </label>
            <textarea 
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)} 
              placeholder="Write your review here..." 
              disabled={!isEditing} 
            />
          </div>

          {/* Edit button if review exists */}
          {existingReview && !isEditing && (
            <button type="button" onClick={handleEditClick} className="edit-btn">
              <FaPen /> Edit Review
            </button>
          )}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : existingReview && isEditing ? 'Save Changes' : 'Submit Review'}
          </button>

          {/* Delete review button if review exists */}
          {existingReview && !isEditing && (
            <button type="button" onClick={handleDeleteReview} className="delete-btn">
              <FaTrash /> Delete Review
            </button>
          )}
        </form>
      </div>
    </div>
  );
};


export default CommentModal;
