import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to='/login' replace />;
  }

  // If the user is logged in, render the children components
  return children;
};

export default ProtectedRoute;
