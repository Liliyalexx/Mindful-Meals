import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaArrowLeft } from 'react-icons/fa';
import './FavoritesList.css';

const FavoritesList = () => {
  const { user, favorites, toggleFavorite } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="favorites-container">
        <div className="login-prompt">
          <h2>Please log in to view your favorites</h2>
          <button onClick={() => navigate('/sign-in')}>Sign In</button>
        </div>
      </div>
    );
  }

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
                  onClick={() => toggleFavorite(restaurant)}
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;