import axios from 'axios';
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;

export const signUp = async (userData) => {
  try {
    // Transform data to match backend expectations
    const payload = {
      username: userData.email, // Using email as username
      password: userData.password
    };

    const response = await axios.post(`${BASE_URL}/register`, payload, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.response?.data);
    throw new Error(error.response?.data?.error || 'Registration failed. Please try again.');
  }
};

// authService.js
export const signIn = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/login`, credentials);
  return {
    token: response.data.token,
    user: response.data.user
  };
};