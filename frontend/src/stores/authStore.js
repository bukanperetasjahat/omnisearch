// frontend/src/stores/authStore.js (New Version)
// Rewritten to handle JWT stored in localStorage.
import { create } from 'zustand';
import axios from 'axios';

// Get user from localStorage if it exists
const user = JSON.parse(localStorage.getItem('user'));

const useAuthStore = create((set) => ({
  user: user ? user : null,
  loading: false, // No initial loading state needed like with Firebase
  
  // Register user
  register: async (userData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, userData);
    // We don't log in on register, user must explicitly log in.
    return response.data;
  },

  // Login user
  login: async (userData) => {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, userData);
    if (response.data) {
      // The response includes user details and the token
      const loggedInUser = {
        ...response.data,
        isAdmin: response.data.role === 'admin'
      };
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      set({ user: loggedInUser });
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
    set({ user: null });
  },
}));

export default useAuthStore;
