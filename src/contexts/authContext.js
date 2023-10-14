import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { API_BASE_URL } from '../api/apiService';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Fetch current user when the app starts up
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/current-user`,
          { withCredentials: true }
        );
        console.log('current user data:', response.data);
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Failed to fetch current user', error);
      } finally{
        setLoading(false)
      }
    };

    fetchCurrentUser();
  }, []);


  // Register Method using axios
  const register = async (email, password) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/register`, 
        { email, password }, 
        { withCredentials: true } // Make sure to set withCredentials to true
      );
      console.log('Register response data:', response.data);

      
      if (response.status !== 201) {
        throw new Error(response.data.error || 'Failed to register');
      }

      // Automatically login user after registration
      setCurrentUser(response.data.user);

    } catch (error) {
      throw error;
    }
  };

  // Login Method using axios
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login`, 
        { email, password }, 
        { withCredentials: true } // Make sure to set withCredentials to true
      );
      console.log('Login response data:', response.data);
      
      if (response.status !== 200) {
        throw new Error(response.data.error || 'Failed to login');
      }

      setCurrentUser(response.data.user);

    } catch (error) {
      if (error.response && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Failed to login');
      }
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/logout`, // Your server logout endpoint
        {},
        { withCredentials: true }
      );
      console.log('Logout was called');
      setCurrentUser(null);
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };


  const value = {
    currentUser,
    login,
    logout,
    register,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
