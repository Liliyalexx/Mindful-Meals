import React from 'react';
import { FaTimes, FaStar, FaRegStar, FaMapMarkerAlt, FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';
import './RestaurantReviews.css';

const RestaurantReviews = ({ reviews, restaurant, onClose }) => {
  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }

    return stars;
  };

  return (
    <div className="reviews-modal">
      <div className="reviews-modal-content">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="restaurant-header">
          <h2>{restaurant.name}</h2>
          <div className="restaurant-meta">
            <span className="rating">
              {renderStars(restaurant.rating)}
              <span className="rating-value">{restaurant.rating}</span>
            </span>
            <span className="review-count">{restaurant.review_count} reviews</span>
            {restaurant.price && (
              <span className="price">
                <FaMoneyBillWave /> {restaurant.price}
              </span>
            )}
            <span className="address">
              <FaMapMarkerAlt /> {restaurant.location?.address1}
            </span>
          </div>
        </div>

        {/* Restaurant Photos Section */}
        {restaurant.photos && restaurant.photos.length > 0 && (
          <div className="restaurant-photos-section">
            <h3>Restaurant Photos</h3>
            <div className="restaurant-photos-grid">
              {restaurant.photos.map((photo, index) => (
                <div key={`photo-${index}`} className="restaurant-photo-item">
                  <img src={photo} alt={`Restaurant view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Menu Items Section */}
        {restaurant.menu_items && restaurant.menu_items.length > 0 && (
          <div className="menu-items-section">
            <h3>Menu Highlights</h3>
            <div className="menu-items-grid">
              {restaurant.menu_items.slice(0, 6).map((item, index) => (
                <div key={`menu-${index}`} className="menu-item">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} />
                  )}
                  <div className="menu-item-info">
                    <h4>{item.name}</h4>
                    <p className="price">{item.price}</p>
                    {item.description && <p className="description">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reviews Section */}
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          <div className="reviews-list">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="reviewer-info">
                    <img 
                      src={review.user.image_url || '/default-user.png'} 
                      alt={review.user.name} 
                      className="reviewer-avatar"
                    />
                    <div>
                      <h4>{review.user.name}</h4>
                      <div className="review-meta">
                        <span className="review-rating">
                          {renderStars(review.rating)}
                        </span>
                        <span className="review-date">
                          <FaCalendarAlt /> {new Date(review.time_created).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="review-content">
                    <p className="review-text">{review.text}</p>
                    {review.photos && review.photos.length > 0 && (
                      <div className="review-photos">
                        {review.photos.map((photo, index) => (
                          <img 
                            key={`review-photo-${index}`} 
                            src={photo} 
                            alt={`Review photo ${index + 1}`} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-reviews">No reviews available for this restaurant.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantReviews;