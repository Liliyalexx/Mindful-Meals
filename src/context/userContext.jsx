import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { getFavorites, saveFavorite, removeFavorite } from '../services/favoriteService'; 

const UserContext = createContext();

const getUserFromToken = (token) => {
  if (!token) return null;
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [isAuthChecked, setIsAuthChecked] = useState(false); 

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsAuthChecked(true);
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth/verify`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.valid) {
          const userData = getUserFromToken(token);
          setUser(userData);
        } else {
          localStorage.removeItem('token');
          setUser(null);
        }
      } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setIsAuthChecked(true);
      }
    };

    verifyToken();
  }, []);

  useEffect(() => {
    const loadFavorites = async () => {
      const token = localStorage.getItem('token');
      if (!user || !token) return;

      try {
        const fetchedFavorites = await getFavorites(token);
        setFavorites(fetchedFavorites);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    };

    loadFavorites();
  }, [user]);

  const toggleFavorite = async (restaurant) => {
    const token = localStorage.getItem('token');

    if (!user || !token) {
      localStorage.removeItem('token');
      setUser(null);
      throw new Error('Please log in to save favorites');
    }

    const isFavorited = favorites.some(fav => fav.yelpId === restaurant.id);

    try {
      if (isFavorited) {
        const favoriteToRemove = favorites.find(fav => fav.yelpId === restaurant.id);
        await removeFavorite(favoriteToRemove._id, token);
        setFavorites(prev => prev.filter(fav => fav.yelpId !== restaurant.id));
      } else {
        const savedRestaurant = await saveFavorite(restaurant, token);
        setFavorites(prev => [...prev, savedRestaurant]);
      }
    } catch (error) {
      console.error('Favorite operation failed:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
      }
      throw error;
    }
  };

  const isFavorite = (restaurantId) => {
    return favorites.some(fav => fav.yelpId === restaurantId);
  };

  const value = { 
    user, 
    setUser,
    favorites,
    toggleFavorite,
    isFavorite,
    isAuthChecked
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
