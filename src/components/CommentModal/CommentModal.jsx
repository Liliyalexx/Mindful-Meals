import React from 'react';
import './CommentModal.css';

const CommentModal = ({ restaurant, onClose, onSubmit }) => {
  const [comment, setComment] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(restaurant.id, comment);
  };

  return (
    <div className="modal-overlay">
      <div className="comment-modal">
        <div className="modal-header">
          <h3 id="comment-modal-heading">Add Comment for {restaurant.name}</h3>
          <button 
            onClick={onClose} 
            className="close-button"
            aria-label="Close comment modal"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} aria-labelledby="comment-modal-heading">
          <label htmlFor="comment-textarea" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment-textarea"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            required
            aria-required="true"
          />
          <div className="modal-actions">
            <button 
              type="submit" 
              className="submit-button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;