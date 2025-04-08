import React, { useState } from 'react';
import './CommentModal.css';

const CommentModal = ({ 
  restaurant, 
  onClose, 
  onSubmit 
}) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(restaurant.id, comment);
    onClose();
  };

  

  return (
    <div className="modal-overlay">
      <div className="comment-modal">
        <h3>Add Comment for {restaurant.name}</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            required
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;