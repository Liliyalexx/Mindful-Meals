// src/services/authService.js
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;

// SIGN UP
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

// SIGN IN
export const signIn = async (credentials) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, credentials, {
      headers: { 'Content-Type': 'application/json' }
    });
    return {
      token: response.data.token,
      user: response.data.user
    };
  } catch (error) {
    console.error('Login error:', error.response?.data);
    throw new Error(error.response?.data?.error || 'Login failed. Please try again.');
  }
};
