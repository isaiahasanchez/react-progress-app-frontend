import { createContext, useContext, useState } from 'react';
import axios from 'axios'; // Import axios

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Register Method using axios
  const register = async (email, password) => {
    try {
      const response = await axios.post(
        'http://localhost:5500/register', 
        { email, password }, 
        { withCredentials: true } // Make sure to set withCredentials to true
      );
      
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
        'http://localhost:5500/login', 
        { email, password }, 
        { withCredentials: true } // Make sure to set withCredentials to true
      );
      
      if (response.status !== 200) {
        throw new Error(response.data.error || 'Failed to login');
      }

      setCurrentUser(response.data.user);

    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        'http://localhost:5500/logout', // Your server logout endpoint
        {},
        { withCredentials: true }
      );
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
