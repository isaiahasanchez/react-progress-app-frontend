import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL, registerUser, logoutUser, loginUser } from '../api/apiService';
import { useMutation } from '@tanstack/react-query';

const AuthContext = createContext();

// used to enable any component in the app to access the authentication state and methods without having to pass props down manually through every level of the component tree.
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const queryClient = useQueryClient()

  // Using useEffect to monitor the page when it mounts and refreshes to keep user signed in.
  useEffect(() => {
    // Fetch current user when the app starts up or refreshes so if there is a user it isnt logged out on refresh
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/current-user`, { withCredentials: true });
        setCurrentUser(response.data);
      } catch (error) {
        console.error('Failed to fetch current user', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Register Method using React Query
  const { mutate: register } = useMutation({
    mutationKey: ['registerUser'],
    mutationFn: registerUser,
    onSuccess: (data) => {
      setCurrentUser(data.user);
    },
  });

  // Login method using React Query
  const { mutate: login } = useMutation({
    mutationKey: ['Login'],
    mutationFn: loginUser,
    onSuccess: (data) => {
      setCurrentUser(data.user);
    },
    onError: (error) => {
      console.error('Login error', error);
    },
  });

  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutUser,
    onSuccess: () => {
      setCurrentUser(null);
    },
  });

  const value = {
    currentUser,
    login,
    logout,
    register,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
