// src/context/userContext.jsx
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if(!token) return null;
    return JSON.parse(atob(token.split('.')[1])).payload;
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(getUserFromToken());
    const [favorites, setFavorites] = useState([]);

 // Load favorites from localStorage on initial render
 useEffect(() => {
    if (user) {
        const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }
}, [user]);

useEffect(() => {
    if (user && favorites.length >= 0) {
        localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
}, [favorites, user]);

const toggleFavorite = (restaurant) => {
    if (!user) return false;
    
    setFavorites(prev => {
        const isFavorited = prev.some(fav => fav.id === restaurant.id);
        if (isFavorited) {
            return prev.filter(fav => fav.id !== restaurant.id);
        } else {
            return [...prev, restaurant];
        }
    });
    return true;
};

const isFavorite = (restaurantId) => {
    return favorites.some(fav => fav.id === restaurantId);
};


    const value = { 
        user, 
        setUser,
        favorites,
        toggleFavorite,
        isFavorite
    };
    
    return (
        <UserContext.Provider value={value}>
            { children }
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };