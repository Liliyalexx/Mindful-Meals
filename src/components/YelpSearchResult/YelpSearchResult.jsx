import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";
import { FaRegHeart, FaHeart, FaComment } from "react-icons/fa";
import { fetchReviews } from "../../api/yelpApi";
import CommentModal from "../CommentModal/CommentModal";
import { saveFavorite, removeFavorite } from "../../services/favoriteService";
import { useNavigate } from "react-router-dom";
import RestaurantReviews from "../RestaurantReviews/RestaurantReviews";
import "./YelpSearchResult.css";

const YelpSearchResult = ({ results, dietaryPreference }) => {
  const navigate = useNavigate();
  const [showReviewsModal, setShowReviewsModal] = useState(false);
  const { user, favorites, toggleFavorite, isFavorite } =
    useContext(UserContext);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedRestaurantForComment, setSelectedRestaurantForComment] =
    useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviewsError, setReviewsError] = useState(null);
  const [favoriteLoading, setFavoriteLoading] = useState({});

  const dietaryDisplayNames = {
    gluten_free: "Gluten-Free",
    vegan: "Vegan",
    vegetarian: "Vegetarian",
    halal: "Halal",
    kosher: "Kosher",
    allergy_friendly: "Allergy Friendly",
  };

  const currentDietaryName =
    dietaryDisplayNames[dietaryPreference] || "Dietary";

  const handleShowReviews = async (restaurant) => {
    setIsLoadingReviews(true);
    setReviewsError(null);
    setSelectedRestaurant(restaurant);

    try {
      console.log(`Fetching reviews for: ${restaurant.id}`);
      const response = await fetchReviews(restaurant.id);
      console.log('Reviews response:', response);
      if (!response || !Array.isArray(response)) {
        setReviewsError("This restaurant has no reviews yet.");
        setReviews([]);
      } else {
        setReviews(response);
      }
    } catch (error) {
      console.error('Review fetch error:', error);
      setReviewsError(`Failed to load reviews: ${error.message}`);
      setReviews([]);
    } finally {
      setIsLoadingReviews(false);
      setShowReviewsModal(true);
    }
  };

  const handleCloseReviews = () => {
    setShowReviewsModal(false);
  };

  return (
    <div className="yelp-results-container">
      <h2 className="results-title">
        Found {results.length} {currentDietaryName} Restaurants
      </h2>

      <div className="restaurants-grid">
        {results.map((restaurant) => (
          <div
            key={restaurant.id}
            className={`restaurant-card ${
              selectedRestaurant === restaurant.id ? "selected" : ""
            }`}
          >
            <div className="restaurant-image">
              <img
                src={restaurant.image_url || "/placeholder-restaurant.jpg"}
                alt={restaurant.name}
                onError={(e) => {
                  e.target.src = "/placeholder-restaurant.jpg";
                }}
              />
              {user && (
                <button
                  className="favorite-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick(restaurant);
                  }}
                  disabled={favoriteLoading[restaurant.id]}
                  aria-label={
                    isFavorite(restaurant.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {favoriteLoading[restaurant.id] ? (
                    "..."
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
                {restaurant.location?.address1 || "Address not specified"},{" "}
                {restaurant.location?.city}
              </p>
              <div className="restaurant-meta">
                <span className="rating">{restaurant.rating} ★</span>
                <span className="review-count">
                  ({restaurant.review_count} reviews)
                </span>
                <span className="price">
                  {restaurant.price || "Price not available"}
                </span>
              </div>
              <div className="action-buttons">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShowReviews(restaurant);
                  }}
                  className="reviews-button"
                  disabled={isLoadingReviews}
                >
                  {isLoadingReviews ? "Loading..." : "Show Reviews"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddComment(restaurant);
                  }}
                  className="comment-button"
                >
                  <FaComment /> Comment
                </button>
              </div>
            </div>

            {/* Show reviews directly under the restaurant card when selected */}
            {selectedRestaurant === restaurant.id && (
              <div className="restaurant-reviews-container">
                {reviewsError && (
                  <div className="reviews-error">
                    <p>{reviewsError}</p>
                  </div>
                )}

                {isLoadingReviews ? (
                  <div className="loading-reviews">
                    <p>Loading reviews...</p>
                  </div>
                ) : (
                  <RestaurantReviews
                    reviews={reviews}
                    restaurant={restaurant}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showReviewsModal && selectedRestaurant && (
        <RestaurantReviews
          reviews={reviews}
          restaurant={selectedRestaurant}
          onClose={handleCloseReviews}
        />
      )}
    </div>
  );
};

export default YelpSearchResult;
