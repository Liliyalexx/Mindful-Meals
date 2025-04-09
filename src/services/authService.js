import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/auth`;

const handleRequest = async (url, data) => {
  try {
    const response = await axios.post(url, data);
    return response.data;
  } catch (error) {
    console.error('API request failed:', error);
    throw new Error(error.response?.data?.error || 'Request failed');
  }
};

export const signUp = async (userData) => {
  return handleRequest(`${BASE_URL}/register`, userData); // ✅ simplified
};

export const signIn = async (credentials) => {
  return handleRequest(`${BASE_URL}/login`, credentials);
};
